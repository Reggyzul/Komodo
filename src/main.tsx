import React, { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { DataProvider } from "./context/DataContext";
import App from "./App";
import AdminApp from "./admin/AdminApp";

function RootRouter() {
  const checkIsAdmin = () => {
    if (typeof window === "undefined") return false;
    return (
      window.location.pathname.startsWith("/admin") ||
      window.location.hash.startsWith("#admin") ||
      window.location.search.includes("admin")
    );
  };

  const [isAdmin, setIsAdmin] = useState(checkIsAdmin);

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdmin(checkIsAdmin());
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  if (isAdmin) {
    return <AdminApp />;
  }

  return (
    <DataProvider>
      <App />
    </DataProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootRouter />
  </StrictMode>
);
