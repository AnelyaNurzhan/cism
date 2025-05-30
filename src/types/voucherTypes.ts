
export interface VoucherType {
  id: string;
  title: string;
  code: string;
  test_id?: string; // Keep for backward compatibility
  tests?: {
    id: string;
    title_ru: string;
    title_kz: string;
  }[];
  specializations?: {
    specialization_id: string;
    level_id: string;
    specializations?: {
      name_ru: string;
      name_kz: string;
    };
    levels?: {
      name_ru: string;
      name_kz: string;
    };
  }[];
  profiles: {
    full_name: string;
  } | null;
  is_used: boolean;
  usage_limit: number;
  used_count: number;
  start_date: string | null;
  expiry_date: string | null;
}

export interface VoucherGroupType {
  title: string;
  vouchers: VoucherType[];
  totalCount: number;
  activeCount: number;
  usedCount: number;
}
