import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Files, 
  Image as ImageIcon, 
  Settings as SettingsIcon,
  ChevronRight,
  LogOut,
  Globe,
  PlusCircle,
  Shield,
  Box,
  BookOpen,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  onLogout: () => void;
  email?: string;
}

export function Sidebar({ onLogout, email }: SidebarProps) {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Messages', icon: MessageSquare, path: '/admin/messages' },
    { name: 'Media', icon: ImageIcon, path: '/admin/media' },
    { name: 'Blog', icon: BookOpen, path: '/admin/blog' },
    { name: 'Articles', icon: FileText, path: '/admin/articles' },
    { name: 'Services', icon: Shield, path: '/admin/services' },
    { name: 'Products', icon: Box, path: '/admin/products' },
    { name: 'Pages', icon: Files, path: '/admin/pages' },
    { name: 'Site Content', icon: Globe, path: '/admin/content' },
    { name: 'Admins', icon: Users, path: '/admin/users' },
    { name: 'Settings', icon: SettingsIcon, path: '/admin/settings' },
  ];

  return (
    <div className="w-64 bg-[#1e1e1e] text-white flex flex-col h-screen h-full sticky top-0 border-r border-white/5">
      {/* Brand */}
      <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-black/20">
        <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center">
          <Globe className="w-5 h-5 text-primary" />
        </div>
        <div>
           <h2 className="font-bold text-sm leading-tight text-white/90">1st Class Admin</h2>
           <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Management Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => cn(
              "flex items-center justify-between p-3 rounded-lg text-sm transition-all group",
              isActive 
                ? "bg-secondary text-primary font-bold shadow-lg shadow-secondary/20" 
                : "text-white/60 hover:bg-white/5 hover:text-white"
            )}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-primary" : "group-hover:text-secondary text-white/40")} />
                  <span>{item.name}</span>
                </div>
                {item.path === '/admin/articles' && (
                  <NavLink to="/admin/articles/new">
                    <PlusCircle className="w-4 h-4 text-white/20 hover:text-secondary transition-colors" />
                  </NavLink>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 bg-black/10">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border border-white/10">
             <span className="text-xs font-bold text-secondary uppercase">{email?.[0] || 'A'}</span>
          </div>
          <div className="flex-1 min-w-0">
             <p className="text-xs font-medium truncate text-white/80">{email || 'Administrator'}</p>
             <p className="text-[10px] text-white/30 uppercase">Admin Access</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          onClick={onLogout}
          className="w-full justify-start text-white/40 hover:text-red-400 hover:bg-red-400/10 gap-3 rounded-lg"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Panel</span>
        </Button>
      </div>
    </div>
  );
}
