import { Outlet } from 'react-router-dom';
import SideNavbar from '../components/SideNavbar';

const AdminLayout = () => (
  <div className="min-h-screen bg-gray-100 flex">
    <SideNavbar />
    <div className="flex-1">
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  </div>
);

export default AdminLayout;

