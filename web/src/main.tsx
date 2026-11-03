import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HeroOneDemo from "@/components/ui/demo";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroOneDemo />
  </StrictMode>,
);
