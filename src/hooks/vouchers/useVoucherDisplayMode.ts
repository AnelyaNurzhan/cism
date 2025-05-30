
import { useState } from 'react';

export const useVoucherDisplayMode = () => {
  const [showAllVouchers, setShowAllVouchers] = useState(true);

  const handleToggleDisplayMode = () => {
    setShowAllVouchers(!showAllVouchers);
  };

  return {
    showAllVouchers,
    handleToggleDisplayMode
  };
};
