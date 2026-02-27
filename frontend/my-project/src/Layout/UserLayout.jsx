import { Outlet } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';
import UserFooter from '../components/UserFooter';

const UserLayout = () => (
  <div className="min-h-screen bg-gray-50">
    <UserNavbar />
    <main className="flex-1 p-6">
      <Outlet />
    </main>
    <UserFooter />
  </div>
);

export default UserLayout;







