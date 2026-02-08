import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LocationProvider } from './context/LocationContext.jsx'
import { NavbarProvider } from './context/NavbarContext.jsx'
import { LatinProvider } from './context/LatinContext.jsx'
import { Analytics } from "@vercel/analytics/react"
import { FontProvider } from './context/FontContext.jsx'
import { UsernameProvider } from './context/UsernameContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocationProvider>
      <LatinProvider>
        <ThemeProvider>
        <UsernameProvider>
          <FontProvider>
            <NavbarProvider>
              <App />
              <Analytics />
            </NavbarProvider>
          </FontProvider>
        </UsernameProvider>
        </ThemeProvider>
      </LatinProvider>
    </LocationProvider>
  </StrictMode>,
)
