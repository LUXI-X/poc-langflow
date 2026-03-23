export interface Message {
  id?: string;
  text: string;
  sender: 'user' | 'ai';
  sender_name: string;
  session_id: string;
  context_id?: string;
  timestamp?: Date;
  files?: File[];
  properties?: {
    source?: {
      id?: string;
      display_name?: string;
      source?: string;
    };
  };
}

export interface ChatInputProps {
  input_value: string;
  should_store_message: boolean;
  sender: 'user' | 'ai';
  sender_name: string;
  session_id: string;
  context_id?: string;
  files?: File[];
}

export interface ChatOutputProps {
  input_value: Message | string;
  should_store_message: boolean;
  sender: 'user' | 'ai';
  sender_name: string;
  session_id: string;
  context_id?: string;
  data_template: string;
  clean_data: boolean;
}

export interface AgentConfig {
  agent_llm: string;
  api_key: string;
  base_url?: string;
  project_id?: string;
  max_output_tokens?: number;
  system_prompt: string;
  context_id?: string;
  n_messages: number;
  format_instructions?: string;
  output_schema?: OutputSchemaField[];
  add_current_date_tool: boolean;
  // Ollama specific fields
  ollama_model?: string;
  ollama_base_url?: string;
  temperature?: number;
}

export interface OutputSchemaField {
  name: string;
  description: string;
  type: 'str' | 'int' | 'float' | 'bool' | 'dict';
  multiple: boolean;
}

export interface AgentResponse {
  content: string;
  structured_output?: any;
  error?: string;
}