import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Route: /admin → AdminApp, everything else → main App with DataProvider
const isAdmin = window.location.pathname.startsWith("/admin");

if (isAdmin) {
  import("./admin/AdminApp").then(({ default: AdminApp }) => {
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <AdminApp />
      </StrictMode>
    );
  });
} else {
  import("./App").then(({ default: App }) => {
    import("./context/DataContext").then(({ DataProvider }) => {
      createRoot(document.getElementById("root")!).render(
        <StrictMode>
          <DataProvider>
            <App />
          </DataProvider>
        </StrictMode>
      );
    });
  });
}
