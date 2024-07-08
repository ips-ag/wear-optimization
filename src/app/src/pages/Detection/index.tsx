import MainLayout from '@/laytouts/MainLayout';
import { Outlet } from 'react-router-dom';

export default function Detect() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
