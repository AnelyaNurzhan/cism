
import React from 'react';
import { AdminPanelAuth } from '../components/admin/AdminPanelAuth';
import { AdminPanelContainer } from '../components/admin/AdminPanelContainer';

const AdminPanel: React.FC = () => {
  return (
    <AdminPanelAuth>
      <AdminPanelContainer />
    </AdminPanelAuth>
  );
};

export default AdminPanel;
