import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { LayoutDashboard, User, Briefcase, LogOut, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

export default function Navbar() {
  const { student, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Portfolio', path: '/portfolio', icon: User },
    { name: 'Projects', path: '/projects', icon: Briefcase },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!student) return null;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/dashboard" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
              <GraduationCap size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:block">
              EduPort
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="h-6 w-px bg-slate-200 mx-2" />
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all duration-200 flex items-center space-x-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button (simplified for this demo) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={handleLogout}
              className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
