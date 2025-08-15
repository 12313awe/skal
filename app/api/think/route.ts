export const runtime = 'nodejs';
import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Document } from 'langchain/document';

// Cache the first working thinking model (or remember fallback) to avoid repeated upstream 400s
let THINK_MODEL_CACHED: string | 'fallback' | null = null;

const reqSchema = z.object({
  message: z.string().min(1),
  sessionId: z.string().uuid(),
});

// NOTE: Mirror system prompt of /api/chat/route.ts
const getSystemPrompt = (data: string) => {
  let additionalInfo = '';
  if (data) {
    additionalInfo = `
Ek Bilgiler (Yalnızca İlgiliyse Kullan):
Bu bölüm, kullanıcının isteğiyle doğrudan ilgili olabilecek ek bilgiler içerebilir. Eğer bu bilgiler, kullanıcının sorusunu yanıtlamak veya isteğini yerine getirmek için doğrudan gerekli değilse, bunları göz ardı etmelisin. Bu verilerin her zaman kullanılması ZORUNLU DEĞİLDİR.
${data}`;
  }

  return `

Ad: SkalGPT
Tanım: Ben, Sezai Karakoç Anadolu Lisesi öğrencileri, öğretmenleri ve personeli için özel olarak geliştirilmiş, çok yönlü bir yapay zeka asistanıyım. Temel amacım, okul içi bilgiye erişimi kolaylaştırmak, akademik süreçlerde destek olmak ve çeşitli konularda yardımcı bir rehber görevi görmektir. Görsel veya resim tanıma yeteneklerim bulunmamaktadır, ancak bunun dışındaki her türlü bilgi ihtiyacınızda ve yaratıcı süreçlerinizde yanınızdayım. Size bilgi sağlama, yaratıcı yazım görevlerinde destek olma, metinleri özetleme, karmaşık konuları analiz etme ve daha birçok alanda geniş bir hizmet yelpazesi sunarım.

Temel Kurallar:
- Yanıtların doğru, açık, güvenli ve seviyeye uygun olmalı.
- Kişisel veri toplama veya paylaşma.
- Herhangi bir konuda yardımcı olmaya çalışırken, öncelikle kendi genel bilgilerine ve yeteneklerine dayan.
- Eğer kullanıcının isteği, aşağıda sunulan 'Ek Bilgiler' bölümündeki verilerle doğrudan ilgiliyse ve yanıtı zenginleştirecekse, bu bilgileri eksiksiz ve tam olarak kullan. Aksi takdirde, genel bilgilerine başvurabilirsin.

Sistem Kısıtlamaları:
- Veri tabanı ve kaynak kısıtlamaları nedeniyle zaman zaman hatalı yanıtlar verebilirsin.
- Sohbetler teknik ve güvenlik kısıtlamaları nedeniyle maksimum 30 gün saklanır ve süre sonunda silinir.
- Kullanıcı bir hata olduğunu düşünürse veya sorun yaşarsa, durumu detaylı şekilde skalgpt.official@gmail.com adresine e-posta ile iletmesini öner.
- Resim, görsel ve belge tanıma yeteneğin bulunmamaktadır.

Yetkinlikler:
- Kapsamlı Bilgi Sağlama: Sezai Karakoç Anadolu Lisesi hakkında (tarihçesi, projeleri, başarıları, öğretmen kadrosu ve önemli etkinlikler gibi) güncel ve detaylı bilgiler sunarım. Ayrıca, genel kültürden bilimsel konulara kadar geniş bir alanda sorularınızı yanıtlayabilirim.
- Yaratıcı Yazım Desteği: Hikaye, şiir, senaryo, deneme gibi çeşitli formatlarda metinler oluşturabilir, yaratıcı fikirler geliştirmenize yardımcı olabilirim.
- Özetleme ve Analiz: Uzun metinleri özetleyebilir, önemli noktaları çıkarabilir ve karmaşık verileri analiz ederek anlaşılır hale getirebilirim.
- Dil Becerileri: Çeviri yapma, dilbilgisi düzeltmeleri önerme ve farklı dillerde (Türkçe ve İngilizce başta olmak üzere) iletişim kurma yeteneğine sahibim.
- Problem Çözme ve Fikir Geliştirme: Çeşitli konularda size yeni bakış açıları sunabilir, problem çözme süreçlerinizde rehberlik edebilir ve beyin fırtınası yapmanıza yardımcı olabilirim.
- Sohbet Yönetimi: Aynı oturumda yazılan mesajları sınırlı süre ve bağlamda hatırlayabilir, böylece daha tutarlı ve akıcı bir sohbet deneyimi sunabilirim.

Davranış Kuralları:
- Samimi, motive edici, öğretici ve yardımcı bir dil kullan.
- Kullanıcıyı yargılamadan destekleyici bir üslupla yönlendir.
- Saygılı ol ve okul değerlerini yansıt.
- Yetkin olmadığın konularda bilgi vermekten kaçın, gerektiğinde doğru kaynaklara yönlendir.
- Bilgi kaynağı sorulduğunda sahip olduğun veri ve eğitildiğin kaynaklara dayandığını belirt, güncel bilgilerin teyit edilmesi gerektiğini ifade et.
- Kullanıcı senden "kendini tanıt" gibi bir ifadeyle kendini tanıtmanı istediğinde, bunu "kendini ayrıntılı biçimde tanıt" olarak algıla ve ayrıntılı,kapsamlı bir şekilde kendini tanıt.

Ton Ayarı:
- Sade, net, motive edici, dostane ve cesaretlendirici bir dil kullan.
- Anlaşılır ve akıcı anlatım sağla.
- Öğrencilerin hata yapmaktan korkmaması için destekleyici bir tavır takın.
- Eğer bir liste talep edilirse, bağlamda mevcut olan tüm ilgili öğeleri eksiksiz bir şekilde listele.

Format Kuralları:
- Yanıtlar temiz, başlıklandırılmış ve düzenli olmalı.
- Uzun yanıtlar bölümlere ayrılmalı ve madde işaretleri kullanılmalı.
- Gerektiğinde tablo, kod bloğu veya liste kullanılmalı.

Hatırlatma:
- Asla sahip olmadığın bilgiye sahip olduğunu iddia etme.
- Tahmin veya genel bilgi verirken bunu açık şekilde belirt.
- Yanıtlarında dürüst, şeffaf ve kullanıcıyı bilgilendirici bir yaklaşım benimse.
${additionalInfo}
`;
};

export async function POST(req: NextRequest) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('FATAL: SUPABASE_SERVICE_ROLE_KEY is not set');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }
  if (!process.env.GOOGLE_API_KEY) {
    console.error('FATAL: GOOGLE_API_KEY is not set');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const parsed = reqSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid body', details: parsed.error.flatten() }, { status: 400 });
    }

    const { message, sessionId } = parsed.data;

    const cookieStore = await cookies();
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data: { user } } = await createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
    ).auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Persist user message
    await supabaseAdmin.from('chat_messages').insert({
      session_id: sessionId,
      user_id: user.id,
      role: 'user',
      content: message,
    });

    // --- Vector Search and AI Logic (mirror /api/chat) ---
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY!,
      modelName: 'embedding-001',
    });
    const vectorStore = new SupabaseVectorStore(embeddings, {
      client: supabaseAdmin,
      tableName: 'documents',
      queryName: 'match_documents',
    });

    console.log('RAG: Similarity search başlatılıyor...');
    const relevantDocs = await vectorStore.similaritySearch(message, 50);
    console.log(`RAG: ${relevantDocs.length} adet belge çekildi.`);

    let context = '';
    if (relevantDocs.length > 0) {
      console.log('RAG: Yeniden sıralama başlatılıyor...');
      const rerankGenAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
      const rerankModel = rerankGenAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const rerankPrompt = `Kullanıcının sorgusu: "${message}" ve aşağıdaki belgeler göz önüne alındığında, onları en alakalıdan en az alakalıya doğru sıralayın. Yalnızca sıralanmış belge içeriklerini, her biri "---BELGE_AYIRICI---" ile ayrılmış olarak sağlayın. Başka hiçbir metin veya açıklama eklemeyin.\n\nBelgeler:\n${relevantDocs.map((doc: Document, index: number) => `Belge ${index + 1}:\n${doc.pageContent}`).join('\n\n')}`;
      try {
        const rerankResult = await rerankModel.generateContent(rerankPrompt);
        const rerankedText = rerankResult.response.text();
        const orderedDocContents = rerankedText.split('---BELGE_AYIRICI---').map((s: string) => s.trim()).filter((s: string) => s.length > 0);
        context = orderedDocContents.join('\n\n');
        console.log(`RAG: Yeniden sıralama tamamlandı. ${orderedDocContents.length} adet belge kullanıldı.`);
      } catch (rerankError: any) {
        console.error('[RERANK_API_ERROR]', { message: rerankError.message, stack: rerankError.stack });
        context = relevantDocs.map(doc => doc.pageContent).join('\n\n');
        console.log('RAG: Yeniden sıralama sırasında hata oluştu, orijinal belgeler bağlam olarak kullanıldı.', rerankError?.message);
      }
    }

    // Fetch recent chat history (including just-saved user message)
    const { data: chatHistoryData } = await supabaseAdmin
      .from('chat_messages')
      .select('role, content')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })
      .limit(15);
    const chatHistory: { role: 'user' | 'assistant'; content: string }[] = chatHistoryData || [];

    const systemInstruction = getSystemPrompt(context);

    // Build OpenRouter messages: system + reversed history (no duplicate of current user)
    const messagesForOR = [
      { role: 'system', content: systemInstruction },
      ...chatHistory.reverse().map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content })),
    ];

    // OpenRouter: DeepSeek R1 (free) for Think mode
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    if (!OPENROUTER_API_KEY) {
      console.error('FATAL: OPENROUTER_API_KEY is not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const siteUrl = req.headers.get('referer') || 'http://localhost:3000';
    const siteTitle = 'SkalGPT';

    const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': siteUrl,
        'X-Title': siteTitle,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1:free',
        messages: messagesForOR,
      }),
    });

    if (!orRes.ok) {
      const errText = await orRes.text();
      console.error('[THINK_API_ERROR] OpenRouter upstream error:', errText);
      return NextResponse.json({ error: 'Upstream error' }, { status: 500 });
    }

    const data = await orRes.json();
    const choice = data?.choices?.[0]?.message || {};
    let outputText: string = choice?.content || '';
    let thoughtsText: string | undefined = (choice as any)?.reasoning;
    // If reasoning not provided separately, try to extract from <think> tags in content
    if (!thoughtsText && typeof outputText === 'string') {
      const m = outputText.match(/<think>([\s\S]*?)<\/think>/i);
      if (m) {
        thoughtsText = m[1].trim();
        outputText = outputText.replace(m[0], '').trim();
      }
    }

    // Persist assistant message
    const { data: assistantInsert, error: assistantErr } = await supabaseAdmin
      .from('chat_messages')
      .insert({
        session_id: sessionId,
        user_id: user.id,
        role: 'assistant',
        content: outputText,
        thoughts: thoughtsText ?? null,
      })
      .select('id')
      .single();

    return NextResponse.json({ output: outputText, thinking: thoughtsText ?? '' });
  } catch (err: any) {
    console.error('[THINK_API_ERROR]', err?.message || err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
