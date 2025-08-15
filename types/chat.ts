export interface Message {
  id: string;
  session_id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
  // Optional fields used in UI only (may not be persisted)
  thoughts?: string;
  responseTime?: number;
}

export interface ChatSession {
  isGeneratingTitle?: boolean;
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}
