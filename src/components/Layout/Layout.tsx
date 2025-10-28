import { Outlet } from "react-router-dom";
import LeftsideSideMenuBar from "./LeftSideMenu";

const Layout = () => {
  return (
    <div className="flex min-h-screen h-screen">
      {/* Sidebar */}
      <aside className="hidden sm:flex w-[15%] h-full">
        <LeftsideSideMenuBar />
      </aside>

      {/* Page Content */}
      <main className="flex-1 bg-gray-100 h-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
