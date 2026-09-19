"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AdminContextValue {
  isAdmin: boolean;
  loading: boolean;
  refresh: () => void;
}

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  loading: true,
  refresh: () => {},
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/auth");
      const data = (await res.json()) as { authenticated: boolean };
      setIsAdmin(data.authenticated);
    } catch {
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, loading, refresh: checkAuth }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
