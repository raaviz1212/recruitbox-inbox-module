import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Inbox,
  FileText,
  ChevronDown,
} from 'lucide-react';

const NavItem = ({ to, icon: Icon, children }: { to: string; icon: any; children: React.ReactNode }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
        isActive
          ? 'bg-indigo-100 text-indigo-700'
          : 'text-gray-700 hover:bg-gray-100'
      }`
    }
  >
    <Icon className="w-5 h-5 mr-3" />
    {children}
  </NavLink>
);

export const Sidebar = () => {
  const [isRecruitmentOpen, setIsRecruitmentOpen] = React.useState(true);

  return (
    <div className="w-64 border-r bg-white">
      <div className="p-4">
        <h1 className="text-xl font-bold text-indigo-600">Lead Manager</h1>
      </div>
      
      <nav className="px-2 py-4 space-y-1">
        <NavItem to="/dashboard" icon={LayoutDashboard}>Dashboard</NavItem>
        
        <div>
          <button
            onClick={() => setIsRecruitmentOpen(!isRecruitmentOpen)}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <Users className="w-5 h-5 mr-3" />
            Recruitment
            <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${
              isRecruitmentOpen ? 'transform rotate-180' : ''
            }`} />
          </button>
          
          {isRecruitmentOpen && (
            <div className="pl-11 mt-1 space-y-1">
              <NavLink
                to="/recruitment/clients"
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm font-medium rounded-lg ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                Clients
              </NavLink>
              <NavLink
                to="/recruitment/placements"
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm font-medium rounded-lg ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                Placements
              </NavLink>
              <NavLink
                to="/recruitment/career-page"
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm font-medium rounded-lg ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                Career Page
              </NavLink>
            </div>
          )}
        </div>

        <NavItem to="/inbox" icon={Inbox}>Inbox</NavItem>
        <NavItem to="/templates" icon={FileText}>Templates</NavItem>
      </nav>
    </div>
  );
};