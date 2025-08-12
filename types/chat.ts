export interface Message {
  id: string;
  session_id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
  thinking?: string; // Optional thinking process content
  isThinkMode?: boolean; // Flag to indicate if message was generated with think mode
}

export interface ChatSession {
  isGeneratingTitle?: boolean;
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}
