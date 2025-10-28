import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#563A9C] text-white p-6">
        <h2 className="text-2xl font-bold mb-8">FED LAB</h2>
        <nav className="flex flex-col space-y-4">
          <NavLink to="/" className="hover:text-gray-300">Dashboard</NavLink>
          <NavLink to="/more-challenges" className="hover:text-gray-300">Challenges</NavLink>
          <NavLink to="/my-planner" className="hover:text-gray-300">Planner</NavLink>
          <NavLink to="/react-challenges" className="hover:text-gray-300">React Challenges</NavLink>
          <NavLink to="/codepen" className="hover:text-gray-300">CodePen</NavLink>
          <NavLink to="/about-us" className="hover:text-gray-300">About Us</NavLink>
          <NavLink to="/contact-us" className="hover:text-gray-300">Contact</NavLink>
        </nav>
      </aside>

      {/* Page Content */}
      <main className="flex-1 bg-gray-100 p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
