import { Building2, LayoutDashboard, Users, Calendar, UserCheck, FileText, Settings, LogOut, X, Menu, } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
const iconMap = {
    LayoutDashboard,
    Users,
    Calendar,
    UserCheck,
    FileText,
    Settings,
};
export function AdminSidebar({ menuItems, sidebarOpen, onToggleSidebar, currentPath, }) {
    return (<aside className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0 md:w-20"} border-r border-border bg-card`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-border">
          {sidebarOpen && (<div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary"/>
              <span className="font-bold text-lg">Arte Tours</span>
            </div>)}
          <Button variant="ghost" size="sm" onClick={onToggleSidebar} className={!sidebarOpen ? "mx-auto" : ""}>
            {sidebarOpen ? (<X className="h-4 w-4"/>) : (<Menu className="h-4 w-4"/>)}
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = iconMap[item.icon] ?? LayoutDashboard;
            const isActive = currentPath === item.href;
            return (<a key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"} ${!sidebarOpen ? "justify-center" : ""}`} title={!sidebarOpen ? item.label : ""}>
                <Icon className="h-5 w-5 flex-shrink-0"/>
                {sidebarOpen && <span>{item.label}</span>}
              </a>);
        })}
        </nav>

        <div className="p-4 border-t border-border">
          <button onClick={() => (window.location.href = "/")} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-all w-full ${!sidebarOpen ? "justify-center" : ""}`}>
            <LogOut className="h-5 w-5 flex-shrink-0"/>
            {sidebarOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </div>
    </aside>);
}
