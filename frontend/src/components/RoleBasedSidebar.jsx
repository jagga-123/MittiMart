import { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Menu, X, LogOut } from 'lucide-react';
import { getSidebarItems, getRoleLabel } from '../permissions/permissions';
import { useAuth } from '../hooks/useAuth';

const storageKey = (role) => `mittimart-sidebar-${role}`;

const RoleBasedSidebar = ({ role, onNavigate }) => {
  const { logout } = useAuth();
  const items = useMemo(() => getSidebarItems(role), [role]);
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(storageKey(role)) === '1');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(storageKey(role), collapsed ? '1' : '0');
  }, [collapsed, role]);

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed left-4 top-20 z-40 w-11 h-11 rounded-full bg-brand-brown text-white shadow-premium flex items-center justify-center"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen md:h-[calc(100vh-0px)] bg-brand-brown text-white shadow-premium transition-all duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${collapsed ? 'md:w-20' : 'md:w-72'} w-72 md:flex-shrink-0`}
      >
        <div className="h-full flex flex-col p-4 md:p-5">
          <div className="flex items-center justify-between gap-3 mb-6">
            {!collapsed ? (
              <div>
                <div className="text-[11px] uppercase tracking-[0.25em] text-white/60 font-semibold">
                  {getRoleLabel(role)}
                </div>
                <h2 className="font-heading text-xl font-bold">MittiMart Panel</h2>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center font-extrabold">
                MM
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCollapsed((prev) => !prev)}
                className="hidden md:flex w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 items-center justify-center"
                aria-label="Toggle collapse"
              >
                {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="md:hidden w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 items-center justify-center flex"
                aria-label="Close sidebar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto space-y-2 pr-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                      isActive ? 'bg-white text-brand-brown shadow-sm' : 'hover:bg-white/10 text-white/90'
                    } ${collapsed ? 'md:justify-center' : ''}`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                logout();
                if (typeof onNavigate === 'function') {
                  onNavigate('login');
                }
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold hover:bg-white/10 transition-colors ${
                collapsed ? 'md:justify-center' : ''
              }`}
            >
              <LogOut className="w-4 h-4" />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default RoleBasedSidebar;

