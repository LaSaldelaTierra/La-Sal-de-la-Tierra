"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { initFirebaseAuth } from "@/lib/firebase";
import { ADMIN_EMAIL } from "@/lib/admin";
import { clearFirebaseAuthStorage } from "@/lib/auth-utils";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function isAllowedAdmin(user: User | null): boolean {
  return user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    initFirebaseAuth().then((auth) => {
      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser && !isAllowedAdmin(firebaseUser)) {
          await firebaseSignOut(auth);
          clearFirebaseAuthStorage();
          setUser(null);
        } else {
          setUser(firebaseUser);
        }
        setLoading(false);
      });
    });

    return () => unsubscribe?.();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const auth = await initFirebaseAuth();
    const credential = await signInWithEmailAndPassword(auth, email, password);

    if (!isAllowedAdmin(credential.user)) {
      await firebaseSignOut(auth);
      clearFirebaseAuthStorage();
      throw new Error("No tienes permiso para acceder al panel de administración.");
    }
  }, []);

  const signOut = useCallback(async () => {
    const auth = await initFirebaseAuth();
    await firebaseSignOut(auth);
    clearFirebaseAuthStorage();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, signIn, signOut }),
    [user, loading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider.");
  }
  return context;
}
