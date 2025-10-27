import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./sass/index.scss";
import { PokeSearch } from "./routes/PokeSearch/PokeSearch";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PokeSearch />
  </StrictMode>
);
