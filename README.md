# Keylo.ai – AI Companion Chat App

**Keylo.ai** is a premium, mobile-first AI companion chat application designed for modern, emotionally intelligent conversation. It combines a sleek user experience with Firebase, OpenAI, and Stripe to create a meaningful digital companion that is smart, warm, and always available.

> “Your private, intelligent companion — built for real conversations.”

---

## 🔗 Live Demo

Coming soon...

---

## 🚀 Features

- ✅ **Guest Mode** – Try the app instantly without signing up
- 💬 **AI Chat** – Emotionally intelligent conversations powered by GPT
- 🔒 **Privacy-Focused** – Chat stays private and secure
- 💡 **Creative Prompts** – Journaling, motivation, inspiration, and more
- 📱 **Mobile-First UI** – Tailwind + dark mode + soft animations
- 💰 **Paywall & Subscriptions** – Stripe-based billing with free & premium tiers
- 🧠 **Memory Layer** – Personalized conversations that adapt to you
- 🎯 **Conversion-Optimized Onboarding** – Designed to maximize engagement

---

## 🛠 Tech Stack

| Layer       | Tech                               |
|------------|-------------------------------------|
| Frontend    | Next.js, Tailwind CSS, ShadCN, React |
| Backend     | Firebase (Auth, Firestore, Hosting) |
| AI Engine   | OpenAI GPT (or compatible endpoint) |
| Payments    | Stripe Checkout & Customer Portal   |
| Styling     | Tailwind CSS, Framer Motion         |
| Deployment  | Firebase Hosting / Vercel           |

---

## 📂 Folder Structure


Keylo.ai/
├── app/ # Next.js App Router structure
│ ├── chat/ # AI Chat UI
│ ├── pricing/ # Premium pricing plans
│ ├── auth/ # Login, signup, guest mode
│ ├── dashboard/ # User account dashboard
│ └── layout.tsx # Global layout
├── components/ # UI components (navbar, chat, modals)
├── lib/ # Utility functions (AI, Stripe, auth)
├── styles/ # Tailwind & custom CSS
├── firebase.json # Firebase configuration
├── .env.example # Environment variable template
├── package.json # Project dependencies
└── README.md # Project documentation

---

## ⚙️ Local Development Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Arungharami/Keylo.ai.git
   cd Keylo.ai

Install dependencies:
npm install
# or
yarn install


Set up environment variables:
Copy .env.example to .env.local
Fill in:
OPENAI_API_KEY=
NEXT_PUBLIC_FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=


Start the app:
npm run dev



🔌 Firebase + Stripe + OpenAI Setup
1. Firebase Setup
Go to Firebase Console
Create a project (e.g. keylo-ai)
Enable:
Authentication (Email, Google)
Firestore Database
Hosting (for deployment)
Add your Firebase config to .env.local
2. Stripe Integration
Create a Stripe account
Setup:
Stripe products: monthly/yearly plans
Stripe customer portal (optional)
Add your keys:
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=


3. OpenAI / LLM Provider
Get your API key from OpenAI
Add:
OPENAI_API_KEY=



🚀 Deployment
Deploy to Vercel (Recommended)
Push your repo to GitHub
Go to vercel.com
Import the project, set environment variables, and deploy
Deploy to Firebase Hosting
firebase login
firebase init hosting
firebase deploy


🤝 Contributing
Pull requests are welcome! Please follow our minimal code style and include concise commit messages.

📄 License
This project is licensed under MIT License.

💡 Inspiration
Keylo.ai is inspired by the future of human-AI relationships — where AI becomes a gentle, useful, and private space for reflection, support, and creative exploration.


---

Let me know if you'd like:
- Badges (Vercel, Firebase, License, OpenAI)
- Screenshots or GIFs for the README
- A `CONTRIBUTING.md` or separate `LICENSE` file

I can also help you write docs for `/docs` folder or auto-generate docs for your components and API routes.


