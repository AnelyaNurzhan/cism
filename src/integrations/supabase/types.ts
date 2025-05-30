export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      answers: {
        Row: {
          answer_text_kz: string
          answer_text_ru: string
          created_at: string
          id: string
          is_correct: boolean
          question_id: string
          updated_at: string
        }
        Insert: {
          answer_text_kz: string
          answer_text_ru: string
          created_at?: string
          id?: string
          is_correct?: boolean
          question_id: string
          updated_at?: string
        }
        Update: {
          answer_text_kz?: string
          answer_text_ru?: string
          created_at?: string
          id?: string
          is_correct?: boolean
          question_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          certificate_number: string
          created_at: string
          expiry_date: string
          full_name: string
          id: string
          issue_date: string
          test_attempt_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          certificate_number: string
          created_at?: string
          expiry_date: string
          full_name: string
          id?: string
          issue_date?: string
          test_attempt_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          certificate_number?: string
          created_at?: string
          expiry_date?: string
          full_name?: string
          id?: string
          issue_date?: string
          test_attempt_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certificates_test_attempt_id_fkey"
            columns: ["test_attempt_id"]
            isOneToOne: false
            referencedRelation: "test_attempts"
            referencedColumns: ["id"]
          },
        ]
      }
      levels: {
        Row: {
          created_at: string
          id: string
          level_number: number
          name_kz: string
          name_ru: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          level_number: number
          name_kz: string
          name_ru: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          level_number?: number
          name_kz?: string
          name_ru?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          iin: string | null
          phone: string | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id: string
          iin?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          iin?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          created_at: string
          id: string
          order_number: number
          question_text_kz: string
          question_text_ru: string
          question_type: string
          test_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          order_number: number
          question_text_kz: string
          question_text_ru: string
          question_type: string
          test_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          order_number?: number
          question_text_kz?: string
          question_text_ru?: string
          question_type?: string
          test_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
        ]
      }
      specializations: {
        Row: {
          created_at: string
          id: string
          name_kz: string
          name_ru: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name_kz: string
          name_ru: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name_kz?: string
          name_ru?: string
          updated_at?: string
        }
        Relationships: []
      }
      test_attempts: {
        Row: {
          created_at: string
          end_time: string | null
          id: string
          passed: boolean | null
          score: number | null
          start_time: string
          test_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_time?: string | null
          id?: string
          passed?: boolean | null
          score?: number | null
          start_time?: string
          test_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_time?: string | null
          id?: string
          passed?: boolean | null
          score?: number | null
          start_time?: string
          test_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_attempts_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      test_specializations: {
        Row: {
          created_at: string
          id: string
          level_id: string
          specialization_id: string
          test_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          level_id: string
          specialization_id: string
          test_id: string
        }
        Update: {
          created_at?: string
          id?: string
          level_id?: string
          specialization_id?: string
          test_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_specializations_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_specializations_specialization_id_fkey"
            columns: ["specialization_id"]
            isOneToOne: false
            referencedRelation: "specializations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_specializations_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
        ]
      }
      tests: {
        Row: {
          created_at: string
          created_by: string | null
          description_kz: string | null
          description_ru: string | null
          id: string
          is_active: boolean | null
          passing_score: number
          time_limit: number
          title_kz: string
          title_ru: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description_kz?: string | null
          description_ru?: string | null
          id?: string
          is_active?: boolean | null
          passing_score: number
          time_limit: number
          title_kz: string
          title_ru: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description_kz?: string | null
          description_ru?: string | null
          id?: string
          is_active?: boolean | null
          passing_score?: number
          time_limit?: number
          title_kz?: string
          title_ru?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tests_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_answers: {
        Row: {
          answer_id: string | null
          attempt_id: string
          created_at: string
          id: string
          question_id: string
          updated_at: string
        }
        Insert: {
          answer_id?: string | null
          attempt_id: string
          created_at?: string
          id?: string
          question_id: string
          updated_at?: string
        }
        Update: {
          answer_id?: string | null
          attempt_id?: string
          created_at?: string
          id?: string
          question_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_answers_answer_id_fkey"
            columns: ["answer_id"]
            isOneToOne: false
            referencedRelation: "answers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_answers_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "test_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_voucher_activations: {
        Row: {
          activated_at: string
          id: string
          user_id: string
          voucher_id: string
        }
        Insert: {
          activated_at?: string
          id?: string
          user_id: string
          voucher_id: string
        }
        Update: {
          activated_at?: string
          id?: string
          user_id?: string
          voucher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_voucher_activations_voucher_id_fkey"
            columns: ["voucher_id"]
            isOneToOne: false
            referencedRelation: "vouchers"
            referencedColumns: ["id"]
          },
        ]
      }
      voucher_attempts: {
        Row: {
          created_at: string
          id: string
          test_attempt_id: string | null
          test_id: string
          used_at: string
          user_id: string
          voucher_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          test_attempt_id?: string | null
          test_id: string
          used_at?: string
          user_id: string
          voucher_id: string
        }
        Update: {
          created_at?: string
          id?: string
          test_attempt_id?: string | null
          test_id?: string
          used_at?: string
          user_id?: string
          voucher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voucher_attempts_test_attempt_id_fkey"
            columns: ["test_attempt_id"]
            isOneToOne: false
            referencedRelation: "test_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voucher_attempts_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voucher_attempts_voucher_id_fkey"
            columns: ["voucher_id"]
            isOneToOne: false
            referencedRelation: "vouchers"
            referencedColumns: ["id"]
          },
        ]
      }
      voucher_specializations: {
        Row: {
          created_at: string
          id: string
          level_id: string
          specialization_id: string
          voucher_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          level_id: string
          specialization_id: string
          voucher_id: string
        }
        Update: {
          created_at?: string
          id?: string
          level_id?: string
          specialization_id?: string
          voucher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voucher_specializations_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voucher_specializations_specialization_id_fkey"
            columns: ["specialization_id"]
            isOneToOne: false
            referencedRelation: "specializations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voucher_specializations_voucher_id_fkey"
            columns: ["voucher_id"]
            isOneToOne: false
            referencedRelation: "vouchers"
            referencedColumns: ["id"]
          },
        ]
      }
      voucher_tests: {
        Row: {
          created_at: string
          id: string
          test_id: string
          voucher_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          test_id: string
          voucher_id: string
        }
        Update: {
          created_at?: string
          id?: string
          test_id?: string
          voucher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voucher_tests_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voucher_tests_voucher_id_fkey"
            columns: ["voucher_id"]
            isOneToOne: false
            referencedRelation: "vouchers"
            referencedColumns: ["id"]
          },
        ]
      }
      vouchers: {
        Row: {
          attempts_per_voucher: number | null
          code: string
          created_at: string
          created_by: string | null
          expiry_date: string | null
          id: string
          is_used: boolean | null
          start_date: string | null
          test_id: string | null
          title: string | null
          updated_at: string
          usage_limit: number | null
          used_count: number | null
          user_id: string | null
        }
        Insert: {
          attempts_per_voucher?: number | null
          code: string
          created_at?: string
          created_by?: string | null
          expiry_date?: string | null
          id?: string
          is_used?: boolean | null
          start_date?: string | null
          test_id?: string | null
          title?: string | null
          updated_at?: string
          usage_limit?: number | null
          used_count?: number | null
          user_id?: string | null
        }
        Update: {
          attempts_per_voucher?: number | null
          code?: string
          created_at?: string
          created_by?: string | null
          expiry_date?: string | null
          id?: string
          is_used?: boolean | null
          start_date?: string | null
          test_id?: string | null
          title?: string | null
          updated_at?: string
          usage_limit?: number | null
          used_count?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vouchers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vouchers_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vouchers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
