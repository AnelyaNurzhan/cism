
import React from 'react';
import { 
  AuthenticationRequired, 
  TestAccessGranted, 
  TestAccessDenied 
} from './access-state';

interface TestAccessContentProps {
  isAuthenticated: boolean;
  hasAccess: boolean;
  testId: string;
  onActivateVoucher: () => void;
  onStartTest: () => void;
}

export const TestAccessContent: React.FC<TestAccessContentProps> = ({
  isAuthenticated,
  hasAccess,
  onActivateVoucher,
  onStartTest
}) => {
  if (!isAuthenticated) {
    return <AuthenticationRequired />;
  }

  if (hasAccess) {
    return <TestAccessGranted onStartTest={onStartTest} />;
  }

  return <TestAccessDenied onActivateVoucher={onActivateVoucher} />;
};
