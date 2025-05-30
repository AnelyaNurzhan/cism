
export interface VoucherSpecializationItem {
  specializationId: string;
  levelId: string;
}

export interface UseVoucherFormProps {
  onClose: () => void;
  onVoucherCreated: () => Promise<void>;
  editingVoucher?: any | null;
}

export interface UseVoucherFormState {
  language: string;
  tests: any[];
  title: string;
  setTitle: (value: string) => void;
  selectedTestIds: string[];
  setSelectedTestIds: (value: string[]) => void;
  selectedSpecializations: VoucherSpecializationItem[];
  setSelectedSpecializations: (value: VoucherSpecializationItem[]) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  expiryDate: string;
  setExpiryDate: (value: string) => void;
  usageLimit: string;
  setUsageLimit: (value: string) => void;
  quantity: string;
  setQuantity: (value: string) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  editingVoucher: any | null;
  resetForm: () => void;
}

export interface UseVoucherFormResult {
  formState: UseVoucherFormState;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}
