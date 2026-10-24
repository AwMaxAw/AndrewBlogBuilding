"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AdminContextValue {
  isAdmin: boolean;
  loading: boolean;
  refresh: () => void;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  loading: true,
  refresh: () => {},
  logout: async () => {},
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

  const logout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch {
      // 忽略
    }
    setIsAdmin(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, loading, refresh: checkAuth, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
