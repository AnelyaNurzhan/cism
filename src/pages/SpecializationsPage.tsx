
import React from 'react';
import SpecializationLoading from '../components/specialization/SpecializationLoading';
import SpecializationError from '../components/specialization/SpecializationError';
import SpecializationEmpty from '../components/specialization/SpecializationEmpty';
import SpecializationAuth from '../components/specialization/SpecializationAuth';
import SpecializationList from '../components/specialization/SpecializationList';
import { useSpecializations } from '../hooks/useSpecializations';

const SpecializationsPage: React.FC = () => {
  const { specializations, isLoading, error, handleRefresh, isAuthenticated } = useSpecializations();
  
  // If user is not authenticated, show login message
  if (!isAuthenticated) {
    return <SpecializationAuth />;
  }

  if (isLoading) {
    return <SpecializationLoading />;
  }

  if (error) {
    console.error('Error in SpecializationsPage component:', error);
    return <SpecializationError error={error} handleRefresh={handleRefresh} />;
  }

  if (!specializations || specializations.length === 0) {
    return <SpecializationEmpty handleRefresh={handleRefresh} />;
  }

  return (
    <SpecializationList specializations={specializations} onRefresh={handleRefresh} />
  );
};

export default SpecializationsPage;
