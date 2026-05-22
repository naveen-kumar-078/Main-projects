import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <GraduationCap className="text-indigo-600" size={24} />
            <span className="font-bold text-lg text-slate-900">EduPort</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Student Portfolio Management System. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-slate-500">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
