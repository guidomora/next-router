import { CiBellOn, CiBookmarkCheck, CiChat1, CiLogout, CiMenuBurger, CiSearch } from 'react-icons/ci';
import SideBar from '../components/SideBar';
import TopMenu from '../components/TopMenu';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideBar />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <TopMenu />
        <div className="px-6 pt-6 bg-white p-2 m-2 rounded-lg">
           {children}
        </div>
      </div>
    </>
  );
}