import MainLayout from '@/laytouts/MainLayout';
import { Outlet } from 'react-router-dom';

export default function Main() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
