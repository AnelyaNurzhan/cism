
import React from 'react';
import TestListLoading from '../components/test-list/TestListLoading';
import TestListError from '../components/test-list/TestListError';
import TestListEmpty from '../components/test-list/TestListEmpty';
import TestListAuth from '../components/test-list/TestListAuth';
import TestListContainer from '../components/test-list/TestListContainer';
import { useTests } from '../hooks/useTests';

const TestList = () => {
  const { tests, isLoading, error, handleRefresh, isAuthenticated } = useTests();
  
  // If user is not authenticated, show login message
  if (!isAuthenticated) {
    return <TestListAuth />;
  }

  if (isLoading) {
    return <TestListLoading />;
  }

  if (error) {
    console.error('Error in TestList component:', error);
    return <TestListError error={error} handleRefresh={handleRefresh} />;
  }

  if (!tests || tests.length === 0) {
    return <TestListEmpty handleRefresh={handleRefresh} />;
  }

  return (
    <TestListContainer tests={tests} handleRefresh={handleRefresh} />
  );
};

export default TestList;
