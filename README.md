MittiMart
Apni Mitti Ka Hunar, Har Ghar Tak

A premium storytelling marketplace that connects Indian village artists, local creators, women entrepreneurs, and handmade product sellers directly with customers.

Tech Stack
Frontend
React.js + Vite
Tailwind CSS
Framer Motion (animations)
React Icons (lucide-react)
Context API (state management)
Backend (Planned - MERN Stack)
Node.js + Express.js
MongoDB
JWT Authentication
Cloudinary Image Upload
Razorpay Payment Integration
Socket.io Chat
Features
Authentication System
User signup/login (buyer)
Seller registration
Voice-enabled search
Role-based dashboard access
Shopping Experience
Product browsing with storytelling cards
Cart management
Wishlist functionality
Product search with filters (state, craft, price, time)
AI Gift Finder
Artist Features
Artist profile pages with stories
Interactive India craft map
Product journey timeline
WhatsApp business integration
Design Theme
Primary: Terracotta Orange (#d4622a)

Secondary: Warm Brown (#5c3d2e)

Background: Cream (#faf6f1)

Accent: Natural Green (#4a7c59)

Modern India aesthetic

Luxury handmade marketplace feel

Apple-level clean UI

Mobile-first responsive design

Glassmorphism sections

Project Structure
src/
├── components/
│   ├── Navbar.jsx          - Navigation with search & auth
│   ├── ProductCard.jsx     - Storytelling product cards
│   ├── ArtistCard.jsx      - Artist carousel cards
│   ├── ReelCard.jsx        - Instagram-style craft reels
│   ├── IndiaMap.jsx        - Interactive India craft map
│   ├── MittiAI.jsx         - AI Gift Finder
│   ├── Loader.jsx          - Loading animation
│   ├── SpeechMic.jsx       - Voice input button
│   └── WhatsAppSimulator.jsx - WhatsApp business UI
├── context/
│   ├── AuthContext.jsx     - User/seller authentication
│   ├── CartContext.jsx     - Shopping cart state
│   ├── WishlistContext.jsx - Wishlist state
│   └── VoiceContext.jsx    - Voice input/synthesis
├── pages/
│   ├── Home.jsx            - Landing page
│   ├── Auth.jsx            - Signup/Login pages
│   ├── Cart.jsx            - Shopping cart
│   ├── Wishlist.jsx        - Wishlist page
│   ├── ProductDetails.jsx  - Product detail view
│   ├── ArtistShop.jsx      - Individual artist shops
│   ├── SellerDashboard.jsx - Seller control panel
│   ├── Tracking.jsx        - Order tracking timeline
│   └── Notifications.jsx   - User notifications
└── data/
    └── mockData.js         - Mock data for artists/products
Getting Started
npm install
npm run dev
Scripts
npm run dev - Start development server
npm run build - Build for production
npm run lint - Run ESLint
Created By
MittiMart - Empowering Village Talent Across India
