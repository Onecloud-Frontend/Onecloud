import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Contact, 
  Filter, 
  Briefcase, 
  FileText, 
  Globe,
  Calendar,
  Wallet,
  Building,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Settings
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip';
import { cn } from '@/shared/utils/cn';

const CRM_NAVIGATION = [
  { label: 'Dashboard', path: '/crm/dashboard', icon: LayoutDashboard },
  { label: 'Leads', path: '/crm/leads', icon: Filter },
  { label: 'Contacts', path: '/crm/contacts', icon: Contact },
  { label: 'Opportunities', path: '/crm/opportunities', icon: Briefcase },
  { label: 'Pipeline', path: '/crm/pipeline', icon: BarChart3 },
  { label: 'Quotations', path: '/crm/quotations', icon: FileText },
  { label: 'Customer Portal', path: '/crm/customer-portal', icon: Globe },
  { label: 'Settings', path: '/crm/settings', icon: Settings },
];

const HRMS_NAVIGATION = [
  { label: 'Dashboard', path: '/hrms/dashboard', icon: LayoutDashboard },
  { label: 'Employees', path: '/hrms/employees', icon: Users },
  { label: 'Attendance', path: '/hrms/attendance', icon: Calendar },
  { label: 'Leave', path: '/hrms/leave', icon: Calendar },
  { label: 'Payroll', path: '/hrms/payroll', icon: Wallet },
  { label: 'Organization', path: '/hrms/organization', icon: Building },
  { label: 'Reports', path: '/hrms/reports', icon: FileText },
  { label: 'Settings', path: '/hrms/settings', icon: Settings },
];

/**
 * AppLayout
 *
 * Used for: All authenticated business-domain routes
 * (/hrms/*, /crm/*, /erp/*, /finance/*, etc.)
 */
const AppLayout: React.FC = () => {
  const location = useLocation();
  
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('app_sidebar_collapsed') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('app_sidebar_collapsed', String(isCollapsed));
  }, [isCollapsed]);
  
  const isCrm = location.pathname.startsWith('/crm');
  const isHrms = location.pathname.startsWith('/hrms');
  
  const currentNav = isCrm ? CRM_NAVIGATION : isHrms ? HRMS_NAVIGATION : [];
  const moduleName = isCrm ? 'CRM' : isHrms ? 'HRMS' : 'Application';
  const moduleInitials = isCrm ? 'CR' : isHrms ? 'HR' : 'APP';

  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden bg-surface-50">
        {/* Sidebar */}
        <aside 
          className={cn(
            "shrink-0 bg-surface-900 text-white flex flex-col transition-all duration-300 ease-in-out relative",
            isCollapsed ? "w-[80px]" : "w-[268px]"
          )}
        >
          {/* Brand */}
          <div className={cn("h-16 flex items-center px-4 border-b border-surface-800", isCollapsed ? "justify-center" : "justify-between")}>
            {isCollapsed ? (
              <div className="h-10 w-10 bg-brand-600 rounded-xl flex items-center justify-center font-bold text-[15px] tracking-tight text-white shadow-sm">
                {moduleInitials}
              </div>
            ) : (
              <span className="text-lg font-bold text-white truncate px-2">
                OneCloud <span className="text-brand-400 font-medium">{moduleName}</span>
              </span>
            )}
            
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white shrink-0",
                isCollapsed && "absolute top-16 right-[-14px] bg-surface-900 border border-surface-700 h-7 w-7 rounded-full z-50 hidden"
              )}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>
          </div>

          {isCollapsed && (
            <button
              onClick={() => setIsCollapsed(false)}
              className="mx-auto mt-4 flex h-7 w-7 items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

          {/* Dynamic Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-3">
            {!isCollapsed ? (
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-4 truncate">
                {moduleName} Navigation
              </p>
            ) : (
              <div className="mb-4 h-px w-full bg-white/10" />
            )}
            <div className="space-y-1">
              {currentNav.map((item) => {
                const linkContent = (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 py-2.5 rounded-md text-[13px] font-medium transition-colors",
                        isCollapsed ? "justify-center px-0" : "px-3",
                        isActive
                          ? "bg-brand-600 text-white"
                          : "text-slate-300 hover:bg-surface-800 hover:text-white"
                      )
                    }
                  >
                    <item.icon className="h-[20px] w-[20px] opacity-80 shrink-0" strokeWidth={2} />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </NavLink>
                );

                if (isCollapsed) {
                  return (
                    <Tooltip key={item.path} delayDuration={0}>
                      <TooltipTrigger asChild>
                        {linkContent}
                      </TooltipTrigger>
                      <TooltipContent side="right" className="bg-surface-800 border-surface-700 text-white font-medium text-xs ml-2">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  );
                }

                return <React.Fragment key={item.path}>{linkContent}</React.Fragment>;
              })}
            </div>
          </nav>
        </aside>

        {/* Main area */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Topbar */}
          <header className="h-16 shrink-0 bg-white border-b border-slate-200 flex items-center px-6 gap-4 justify-between">
            <div>
              <button
                type="button"
                onClick={() => window.location.href = '/admin/services'}
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                Back to Admin Portal
              </button>
            </div>
            <div className="text-sm text-slate-500">
              {moduleName} Environment
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AppLayout;
