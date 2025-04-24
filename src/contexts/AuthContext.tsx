
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      // If you want to handle saving user role to localStorage after login
      // This is just a placeholder for where you might set the role
      // You would need to implement this based on your authentication flow
      if (currentUser) {
        // Example: You might get the role from a different source like Firestore
        // For now, we'll just check if it exists and not overwrite if it's already set
        if (!localStorage.getItem("userRole")) {
          // Default role or get from somewhere else
          // localStorage.setItem("userRole", "student");
        }
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
