import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import QueryProviders from "./contexts/query-provider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProviders>
      <BrowserRouter>
        <Toaster position="top-center" richColors />
        <App />
      </BrowserRouter>
    </QueryProviders>
  </StrictMode>
);
