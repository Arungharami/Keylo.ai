# **App Name**: Keylo.ai

## Core Features:

- AI Companion Chat Interface: Enables real-time, meaningful conversations with the AI companion by sending user input to an external LLM endpoint and displaying AI-generated responses. Includes a tool to generate chat titles.
- User Authentication & Onboarding: Implements secure user sign-up and login via email/password and Google, powered by Firebase Authentication. Guides new users through a short, personalized onboarding flow to enhance engagement.
- Conversational Data Management: Stores, retrieves, and displays user-specific chat history within a persistent interface, allowing users to start new conversations, manage (view/delete) past interactions, and ensure context is maintained, leveraging Firestore for data storage.
- Free Usage & Premium Paywall: Manages a system of limited free messages, implements premium feature gating once limits are reached, and presents a high-converting, Stripe-integrated paywall for subscription upgrades, with usage data stored in Firestore.
- User Account & Billing Dashboard: Provides a personalized dashboard where users can view and update their profile, monitor their subscription status (active, trial, canceled), and manage billing details via a secure Stripe Customer Portal link, using Firestore for user and subscription data.
- Conversion-Optimized Landing Page: A visually stunning, mobile-first landing page with a powerful hero section, trust-building social proof, clear benefit showcasing, and a compelling pricing preview, designed for high conversion rates from ad traffic.

## Style Guidelines:

- Primary color: Vibrant purple (#BB52F7), chosen to evoke a sense of modern luxury and intelligence, providing a strong visual anchor on the dark background.
- Background color: Deep charcoal with a subtle cool purple undertone (#151118), providing a premium, calming dark mode aesthetic that enhances readability.
- Accent color: Energetic electric blue (#3CC9FA), used sparingly for interactive elements, highlights, and subtle glow effects to signify key actions and information.
- Body and headline font: 'Inter' (sans-serif), chosen for its clean, modern, and highly legible appearance, contributing to a startup-grade and polished feel across all text elements.
- Minimalist, crisp line icons that are subtle and modern, aligning with the premium SaaS aesthetic and maintaining visual clarity. Rounded-edge cards with soft shadows provide an approachable, clean look.
- Mobile-first responsive design featuring rounded UI elements, soft subtle shadows, and light glassmorphism effects. Emphasizes clean spacing, clear content hierarchy, elegant chat bubbles, and an accessible, intuitive layout with minimal clutter for all screens.
- Smooth, subtle transitions and micro-interactions for elements like button hovers, content loading (skeleton loaders), message entry, and paywall activation (e.g., blur effect). Features a dynamic animated gradient background in the hero section for a premium touch.