import React from 'react';
import DataGrid from '../components/DataGrid';
import { userColumns } from '../config/userColumns';
import { userData } from '../config/userData';

export default function UserDashboard() {
  return <DataGrid columns={userColumns} data={userData} />;
}