import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { VoiceProvider } from './context/VoiceContext'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CartProvider>
      <WishlistProvider>
        <VoiceProvider>
          <App />
        </VoiceProvider>
      </WishlistProvider>
    </CartProvider>
  </AuthProvider>
)
