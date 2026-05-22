import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { GraduationCap, ArrowRight, User, Hash, BookOpen, Lock, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    referenceId: '',
    course: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isLogin) {
        if (!formData.email || !formData.password) {
          throw new Error('Please fill in all fields');
        }
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        if (!formData.name || !formData.referenceId || !formData.course || !formData.email || !formData.password) {
          throw new Error('Please fill in all fields');
        }
        
        // 1. Create Auth User
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        // 2. Update Auth Profile
        await updateProfile(user, { displayName: formData.name });

        // 3. Create Firestore User Document
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: formData.name,
          referenceId: formData.referenceId,
          course: formData.course,
          email: formData.email,
          createdAt: serverTimestamp()
        });
      }
      navigate('/dashboard');
    } catch (err: any) {
      console.error("Auth Error:", err);
      let message = err.message || 'An error occurred during authentication';
      
      // Provide more helpful messages for common Firebase errors
      if (err.code === 'auth/user-not-found') {
        message = 'No account found with this email. Please Sign Up first.';
      } else if (err.code === 'auth/wrong-password') {
        message = 'Incorrect password. Please try again.';
      } else if (err.code === 'auth/email-already-in-use') {
        message = 'This email is already registered. Try logging in instead.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      } else if (err.code === 'auth/unauthorized-domain') {
        message = 'This domain is not authorized for authentication. Please wait a moment or refresh.';
      } else if (err.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
      }
      
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-200 mb-6">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="mt-2 text-slate-500">
            {isLogin ? 'Login to manage your portfolio' : 'Join EduPort to showcase your work'}
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
          <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              disabled={loading}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              disabled={loading}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                !isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="signup-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-5 overflow-hidden"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User size={18} />
                      </div>
                      <input
                        id="name"
                        type="text"
                        className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="course" className="block text-sm font-semibold text-slate-700 mb-2">
                      Course Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <BookOpen size={18} />
                      </div>
                      <input
                        id="course"
                        type="text"
                        className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Computer Science"
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="refId" className="block text-sm font-semibold text-slate-700 mb-2">
                      Reference ID
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Hash size={18} />
                      </div>
                      <input
                        id="refId"
                        type="text"
                        className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="STU-2024-001"
                        value={formData.referenceId}
                        onChange={(e) => setFormData({ ...formData, referenceId: e.target.value })}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="student@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="pass" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  id="pass"
                  type="password"
                  required
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {error && (
              <p className="text-rose-500 text-sm font-medium text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-200 transition-all duration-200 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}</span>
              {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            disabled={loading}
            className="font-semibold text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
