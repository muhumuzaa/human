//import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContext from "./context/AuthContext.jsx";
import DepartmentProvider from "./context/DepartmentContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContext>
    <DepartmentProvider>
      <App />
    </DepartmentProvider>
  </AuthContext>
);
