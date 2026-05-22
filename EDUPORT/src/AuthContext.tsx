import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentData } from './types';
import { auth, db } from './firebase';
import { 
  onAuthStateChanged, 
  User as FirebaseUser,
  signOut
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  onSnapshot,
  getDocFromServer
} from 'firebase/firestore';

interface AuthContextType {
  student: StudentData | null;
  firebaseUser: FirebaseUser | null;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAuthReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [student, setStudent] = useState<StudentData | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Test connection to Firestore
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration. ");
        }
      }
    }
    testConnection();
  }, []);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (!user) {
        setStudent(null);
        setIsAuthReady(true);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!firebaseUser) return;

    const userDocRef = doc(db, 'users', firebaseUser.uid);
    
    const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setStudent(docSnap.data() as StudentData);
      } else {
        setStudent(null);
      }
      setIsAuthReady(true);
    }, (error) => {
      console.error("Firestore Error in AuthContext:", error);
      setIsAuthReady(true);
    });

    return () => unsubscribeSnapshot();
  }, [firebaseUser]);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ 
      student, 
      firebaseUser, 
      logout, 
      isAuthenticated: !!firebaseUser && !!student,
      isAuthReady
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
