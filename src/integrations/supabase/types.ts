export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      navigation_items: {
        Row: {
          created_at: string
          href: string
          id: string
          is_active: boolean
          name: string
          order_index: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          href: string
          id?: string
          is_active?: boolean
          name: string
          order_index: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          href?: string
          id?: string
          is_active?: boolean
          name?: string
          order_index?: number
          updated_at?: string
        }
        Relationships: []
      }
      personas: {
        Row: {
          budget: string
          communication_style: string
          company_size: string
          created_at: string
          decision_process: string
          id: string
          objection_style: string
          pain_points: string[]
          priorities: string[]
          sector: string
          title: string
          updated_at: string
        }
        Insert: {
          budget: string
          communication_style: string
          company_size: string
          created_at?: string
          decision_process: string
          id: string
          objection_style: string
          pain_points: string[]
          priorities: string[]
          sector: string
          title: string
          updated_at?: string
        }
        Update: {
          budget?: string
          communication_style?: string
          company_size?: string
          created_at?: string
          decision_process?: string
          id?: string
          objection_style?: string
          pain_points?: string[]
          priorities?: string[]
          sector?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          organization: string | null
          school_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          organization?: string | null
          school_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          organization?: string | null
          school_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      scenarios: {
        Row: {
          available_tools: string[]
          budget_range: string
          company_name: string
          company_sector: string
          company_size: string
          created_at: string
          description: string
          difficulty: string
          id: string
          main_objectives: string[]
          pain_points: string[]
          success_probability: number
          title: string
          updated_at: string
        }
        Insert: {
          available_tools: string[]
          budget_range: string
          company_name: string
          company_sector: string
          company_size: string
          created_at?: string
          description: string
          difficulty: string
          id: string
          main_objectives: string[]
          pain_points: string[]
          success_probability: number
          title: string
          updated_at?: string
        }
        Update: {
          available_tools?: string[]
          budget_range?: string
          company_name?: string
          company_sector?: string
          company_size?: string
          created_at?: string
          description?: string
          difficulty?: string
          id?: string
          main_objectives?: string[]
          pain_points?: string[]
          success_probability?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_config: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      training_sessions: {
        Row: {
          audio_transcript: string | null
          conversation_type: string
          created_at: string
          duration_seconds: number | null
          feedback: string | null
          id: string
          metadata: Json | null
          objectives_completed: string[] | null
          phase: string
          scenario_id: string
          score: number | null
          user_id: string
        }
        Insert: {
          audio_transcript?: string | null
          conversation_type: string
          created_at?: string
          duration_seconds?: number | null
          feedback?: string | null
          id?: string
          metadata?: Json | null
          objectives_completed?: string[] | null
          phase: string
          scenario_id: string
          score?: number | null
          user_id: string
        }
        Update: {
          audio_transcript?: string | null
          conversation_type?: string
          created_at?: string
          duration_seconds?: number | null
          feedback?: string | null
          id?: string
          metadata?: Json | null
          objectives_completed?: string[] | null
          phase?: string
          scenario_id?: string
          score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          average_score: number | null
          best_score: number | null
          completed_scenarios: string[] | null
          id: string
          improvement_rate: number | null
          last_session_date: string | null
          preferred_scenarios: string[] | null
          total_duration_minutes: number | null
          total_sessions: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          average_score?: number | null
          best_score?: number | null
          completed_scenarios?: string[] | null
          id?: string
          improvement_rate?: number | null
          last_session_date?: string | null
          preferred_scenarios?: string[] | null
          total_duration_minutes?: number | null
          total_sessions?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          average_score?: number | null
          best_score?: number | null
          completed_scenarios?: string[] | null
          id?: string
          improvement_rate?: number | null
          last_session_date?: string | null
          preferred_scenarios?: string[] | null
          total_duration_minutes?: number | null
          total_sessions?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "school" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "school", "user"],
    },
  },
} as const
