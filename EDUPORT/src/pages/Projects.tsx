import { DEFAULT_PROJECTS } from '../constants';
import { ExternalLink, Github, Code2, Layers } from 'lucide-react';
import { motion } from 'motion/react';

export default function Projects() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12 text-center max-w-2xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-slate-900 tracking-tight"
        >
          My Projects
        </motion.h1>
        <p className="text-slate-500 mt-4 text-lg">
          A collection of my recent work, academic projects, and personal experiments.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DEFAULT_PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="flex space-x-3">
                  <button className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/40 transition-colors">
                    <Github size={20} />
                  </button>
                  <button className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/40 transition-colors">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center space-x-2 text-indigo-600 mb-3">
                <Code2 size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Project</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-semibold rounded-full border border-slate-100"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add New Project Placeholder */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="group border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:border-indigo-300 hover:bg-indigo-50/30 transition-all duration-300 h-full min-h-[400px]"
        >
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all mb-4">
            <Layers size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Add New Project</h3>
          <p className="text-slate-500 text-sm max-w-[200px]">
            Click here to add a new project to your portfolio showcase.
          </p>
        </motion.button>
      </div>
    </div>
  );
}
