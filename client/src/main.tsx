import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Additional CSS for the portfolio
import './styles.css';

createRoot(document.getElementById("root")!).render(<App />);
