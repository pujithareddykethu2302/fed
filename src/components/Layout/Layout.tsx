import { Outlet } from "react-router-dom";
import LeftsideSideMenuBar from "./LeftSideMenu";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const Layout = () => {
  const [CloseMenu, setcloseMenu] = useState(false);
  return (
    <div className="flex min-h-screen h-screen">

        {!CloseMenu && (
           <aside className="hidden sm:flex w-[15%] h-full">
            <LeftsideSideMenuBar   
             setcloseMenu={setcloseMenu}
            CloseMenu={CloseMenu}/>
          </aside>
        )}
      
            {!CloseMenu && (
        <div className="fixed top-0 left-0 w-64 h-full z-40 sm:hidden shadow-lg">
          <LeftsideSideMenuBar
            setcloseMenu={setcloseMenu}
            CloseMenu={CloseMenu}
          />
        </div>
      )}

       <button
          className="absolute top-4 right-4 z-50 sm:right-4 sm:top-4 cursor-pointer border border-[#563A9C] rounded-sm h-10 w-10 flex justify-center items-center bg-[#563A9C]"
          onClick={() => setcloseMenu(!CloseMenu)}
        >
          <MenuIcon sx={{ color: "white" }} />
        </button>

      <main className="flex-1 bg-gray-100 h-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
