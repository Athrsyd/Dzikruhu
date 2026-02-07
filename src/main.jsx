import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LocationProvider } from './context/LocationContext.jsx'
import { NavbarProvider } from './context/NavbarContext.jsx'
import { Analytics } from "@vercel/analytics/next"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Analytics>
      <LocationProvider>
        <NavbarProvider>
          <App />
        </NavbarProvider>
      </LocationProvider>
    </Analytics>
  </StrictMode>,
)
