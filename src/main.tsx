import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AdminStoreProvider } from "./admin/store/useAdminStore";

createRoot(document.getElementById("root")!).render(
  <AdminStoreProvider>
    <App />
  </AdminStoreProvider>
);
