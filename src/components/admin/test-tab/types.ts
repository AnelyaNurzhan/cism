
export interface TestType {
  id: string;
  title_ru: string;
  title_kz: string;
  description_ru: string | null;
  description_kz: string | null;
  time_limit: number;
  passing_score: number;
  is_active: boolean;
}
