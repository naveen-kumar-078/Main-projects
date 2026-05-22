import { useAuth } from '../AuthContext';
import { DEFAULT_SKILLS } from '../constants';
import { User, Mail, MapPin, Phone, ExternalLink, Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'motion/react';

export default function Portfolio() {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Profile Info */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center"
          >
            <div className="relative inline-block mb-6">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                alt={student.name}
                className="w-32 h-32 rounded-3xl bg-indigo-50 border-4 border-white shadow-lg"
              />
              <div className="absolute bottom-[-8px] right-[-8px] w-8 h-8 bg-emerald-500 border-4 border-white rounded-full" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">{student.name}</h1>
            <p className="text-indigo-600 font-medium">{student.course}</p>

            <div className="mt-8 space-y-4 text-left">
              <div className="flex items-center space-x-3 text-slate-600">
                <Mail size={18} className="text-slate-400" />
                <span className="text-sm">{student.name.toLowerCase().replace(' ', '.')}@university.edu</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <MapPin size={18} className="text-slate-400" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <Phone size={18} className="text-slate-400" />
                <span className="text-sm">+1 (555) 000-0000</span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 flex justify-center space-x-4">
              <a href="#" className="p-2 bg-slate-50 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                <Github size={20} />
              </a>
              <a href="#" className="p-2 bg-slate-50 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 bg-slate-50 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                <Twitter size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-6">Technical Skills</h3>
            <div className="space-y-6">
              {DEFAULT_SKILLS.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">{skill.name}</span>
                    <span className="text-sm font-bold text-indigo-600">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-indigo-600 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: About & Experience */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">About Me</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed">
                I am a passionate {student.course} student with a strong focus on building user-centric applications.
                My journey in technology started with a curiosity for how things work, which evolved into a deep-seated
                love for coding and problem-solving.
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                Throughout my academic career, I've maintained a high GPA while actively participating in various
                extracurricular activities and hackathons. I believe in continuous learning and staying updated
                with the latest industry trends and technologies.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Education</h2>
            <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-indigo-100 pb-2">
                <div className="absolute left-[-9px] top-0 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white shadow-sm" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <h4 className="text-lg font-bold text-slate-900">Bachelor of Science in {student.course}</h4>
                  <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mt-2 sm:mt-0">2021 - Present</span>
                </div>
                <p className="text-slate-500 font-medium">Global University of Technology</p>
                <p className="text-slate-600 mt-2 text-sm">
                  Focusing on software engineering, data structures, and algorithm design.
                  Recipient of the Dean's List for four consecutive semesters.
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-indigo-100">
                <div className="absolute left-[-9px] top-0 w-4 h-4 bg-slate-300 rounded-full border-4 border-white shadow-sm" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <h4 className="text-lg font-bold text-slate-900">High School Diploma</h4>
                  <span className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full mt-2 sm:mt-0">2017 - 2021</span>
                </div>
                <p className="text-slate-500 font-medium">Central High School</p>
                <p className="text-slate-600 mt-2 text-sm">
                  Graduated with honors. Lead of the Computer Science club and captain of the robotics team.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
