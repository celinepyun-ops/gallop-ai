import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MarketingApp from './MarketingApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MarketingApp />
  </StrictMode>,
)
