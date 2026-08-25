import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import AdminLogin from "./AdminLogin";
import AdminLayout from "./AdminLayout";

export default function AdminApp() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-blue-700 font-semibold text-sm">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onLogin={setSession} />;
  }

  return <AdminLayout session={session} onLogout={() => setSession(null)} />;
}
