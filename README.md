# 🕷️ Symbiote OS: Venom-Themed Developer Portfolio

#live URL will be available soon

A unique, highly interactive developer portfolio styled around a dark, Venom/Symbiote aesthetic. Built with React, Vite, and Framer Motion, this portfolio features a fully functional custom admin dashboard that allows you to edit all content on the fly without touching the code.

## ✨ Features

- **Symbiote Aesthetics:** Deep blacks, crimson reds, sci-fi terminals, and interactive Venom aesthetics.
- **Interactive Particle Backgrounds:** Features a custom `react-tsparticles` engine where Symbiote tendrils actively track and react to the user's cursor.
- **Admin Control Center:** A secure, built-in CMS (accessible at `/admin`) that lets you manage your Introduction, Experience, Education, Projects, Certificates, and Social Links.
- **In-Browser Image Processing:** Upload a background image in the admin panel and the app automatically removes the background using WebAssembly (`@imgly/background-removal`), resizing it optimally for the site.
- **Dynamic Buttons:** Add external and internal navigational buttons seamlessly through the admin panel.
- **Smooth Animations:** Powered by `framer-motion` for fluid page transitions, spring animations, and micro-interactions.
- **Local Storage Persistence:** All portfolio data is saved directly in your browser's local storage.

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** CSS3, Glassmorphism, Custom Variables
- **Animations:** Framer Motion, React-TSParticles
- **Icons:** Lucide React, React Icons
- **Image Processing:** `@imgly/background-removal`

## 🚀 Getting Started

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/harsh31tkd/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Access the Admin Panel:**
   - Go to `http://localhost:5173/admin`
   - Use your host credentials to initialize the bond!

## 📄 License

This project is open-source and available under the MIT License.
