
/**
 * Format a date string to a human-readable format
 * @param dateString Date string in ISO format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return '-';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  } catch (error) {
    console.error('Error formatting date:', error);
    return '-';
  }
};

/**
 * Generate Excel file name with the current date
 * @param baseName Base name for the file
 * @returns File name with date
 */
export const generateExcelFileName = (baseName: string): string => {
  const date = new Date().toISOString().slice(0, 10);
  return `${baseName}_${date}.xlsx`;
};

/**
 * Generate a random voucher code
 * @param length Length of the code (default: 8)
 * @returns Random alphanumeric code
 */
export const generateRandomCode = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

/**
 * Get the appropriate CSS class for a status badge
 * @param status Status string
 * @returns CSS class string for the badge
 */
export const getStatusBadgeClass = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'inactive':
      return 'bg-gray-100 text-gray-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'expired':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

