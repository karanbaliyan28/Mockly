import { Outlet } from "react-router-dom";

import { Topbar } from "./Topbar";

import { Sidebar } from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar is now a separate component */}
      <Sidebar />
      <div className="flex w-full flex-col">
        {" "}
        {/* Adjust margin if sidebar width changes */}
        {/* Topbar is now a separate component */}
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto no-scrollbar">
          {/* Outlet tells React Router where to render the current page's component */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
