import { useAuth } from '../AuthContext';
import { User, BookOpen, Hash, Calendar, Trophy, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { student, isAuthReady } = useAuth();

  if (!isAuthReady) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <p className="text-slate-500">Loading...</p>
    </div>
  );

  if (!student) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <p className="text-slate-500">No student data found. Please log in again.</p>
    </div>
  );

  const stats = [
    { label: 'Completed Projects', value: '12', icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Skills Mastered', value: '8', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Days Active', value: '145', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-slate-900"
        >
          Welcome back, {student.name}!
        </motion.h1>
        <p className="text-slate-500 mt-2">Here's an overview of your academic progress.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Student Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-6">
              <User size={48} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{student.name}</h2>
            <p className="text-indigo-600 font-medium mt-1">{student.course}</p>

            <div className="w-full mt-8 space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center text-slate-500 space-x-3">
                  <Hash size={18} />
                  <span className="text-sm font-medium">Reference ID</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{student.referenceId}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center text-slate-500 space-x-3">
                  <Calendar size={18} />
                  <span className="text-sm font-medium">Joined Date</span>
                </div>
                <span className="text-sm font-bold text-slate-900">Jan 2024</span>
              </div>
            </div>

            <Link
              to="/portfolio"
              className="w-full mt-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all flex items-center justify-center space-x-2"
            >
              <span>View Full Profile</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        {/* Stats & Quick Links */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/40 border border-slate-100"
              >
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <stat.icon size={24} />
                </div>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Showcase Your Work</h3>
              <p className="text-indigo-100 mb-6 max-w-md">
                Keep your portfolio updated with your latest projects and skills to stand out to potential employers.
              </p>
              <Link
                to="/projects"
                className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
              >
                Manage Projects
              </Link>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
              <Trophy size={200} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
