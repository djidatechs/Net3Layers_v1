import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Net3LayersContextProvider from './Context/Netlayers'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='desktop-config select-none '>
      <BrowserRouter>
        <Net3LayersContextProvider>
          <App />
        </Net3LayersContextProvider>
      </BrowserRouter>
    </div>
  </React.StrictMode>
  
)
