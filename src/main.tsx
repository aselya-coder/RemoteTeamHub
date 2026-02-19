import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AdminStoreProvider } from "@/admin/store/useAdminStore";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <AdminStoreProvider>
    <App />
  </AdminStoreProvider>
);
