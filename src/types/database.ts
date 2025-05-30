
export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  iin: string | null;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Test {
  id: string;
  title_ru: string;
  title_kz: string;
  description_ru: string | null;
  description_kz: string | null;
  time_limit: number;
  passing_score: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface QuestionOption {
  id: number;
  text: string;
  textKz: string;
  isCorrect?: boolean;
}

export interface Question {
  id: string;
  text: string;
  textKz: string;
  type: 'single' | 'multiple';
  options: QuestionOption[];
  correctAnswers: number[];
  points: number;
  orderNumber?: number;
}

export interface Answer {
  id: string;
  question_id: string;
  answer_text_ru: string;
  answer_text_kz: string;
  is_correct: boolean;
  created_at: string;
  updated_at: string;
}

export interface TestAttempt {
  id: string;
  user_id: string;
  test_id: string;
  start_time: string;
  end_time: string | null;
  score: number | null;
  passed: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface UserAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  answer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Voucher {
  id: string;
  title?: string;
  code: string;
  test_id: string | null;
  user_id: string | null;
  is_used: boolean;
  start_date?: string | null;
  expiry_date: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  used_count?: number;
  usage_limit?: number;
  attempts_per_voucher?: number;
}

// New interfaces for specializations and levels
export interface Specialization {
  id: string;
  name_ru: string;
  name_kz: string;
  created_at: string;
  updated_at: string;
}

export interface Level {
  id: string;
  level_number: number;
  name_ru: string;
  name_kz: string;
  created_at: string;
  updated_at: string;
}

export interface TestSpecialization {
  id: string;
  test_id: string;
  specialization_id: string;
  level_id: string;
  created_at: string;
}

export interface VoucherSpecialization {
  id: string;
  voucher_id: string;
  specialization_id: string;
  level_id: string;
  created_at: string;
}
