import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";
import { menuItems } from "../layoutServices";
export function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [currentPath] = useState(window.location.pathname);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark");
    };
    const layoutMenu = menuItems;
    return (<div className="min-h-screen bg-background">
      <AdminSidebar menuItems={layoutMenu} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} currentPath={currentPath}/>

      <div className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0 md:ml-20"}`}>
        <AdminTopbar darkMode={darkMode} onToggleDarkMode={toggleDarkMode}/>

        <main className="p-6">{children}</main>
      </div>
    </div>);
}
export { AdminLayout as DashboardLayout };
