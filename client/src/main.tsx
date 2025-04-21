import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import React from "react";

// Add Font Awesome for icons (used throughout the design)
const fontAwesomeScript = document.createElement("link");
fontAwesomeScript.rel = "stylesheet";
fontAwesomeScript.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
document.head.appendChild(fontAwesomeScript);

// Add Google Fonts
const googleFontsLink = document.createElement("link");
googleFontsLink.rel = "stylesheet";
googleFontsLink.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600;700&display=swap";
document.head.appendChild(googleFontsLink);

// Add meta tags
const metaTitle = document.createElement("title");
metaTitle.textContent = "VivahLens - Indian Wedding Photography & Videography";
document.head.appendChild(metaTitle);

// Create a standalone static version that doesn't depend on server rendering
createRoot(document.getElementById("root")!).render(
  React.createElement(App)
);
