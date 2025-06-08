# 🌤️ Weather Dashboard Widget

A responsive interactive weather dashboard built with **Vite + React + TypeScript**, following **Feature-Sliced Design (FSD)** and best practices. It visualizes weather data from OpenWeatherMap for multiple cities with unit switching, dark/light mode, and custom charts.

## 🚀 Features

- Current weather + 5-day forecast (London, New York, Tokyo, Sydney, Cairo)
- SVG-based temperature chart (no chart libraries)
- Custom hook with reducer & throttle logic
- Dark/Light theme toggle
- Debounced search input with form validation
- Responsive UI with tabbed views and transitions

## 📦 Tech Stack

- React 19 + TypeScript + Vite
- FSD Architecture: `app/`, `features/`, `entities/`, `widgets/`, `shared/`
- CSS Modules / Tailwind (based on your implementation)
- Jest / React Testing Library

## ⚙️ Setup

```bash
# Clone the repo
git clone https://github.com/liildev/weather-app.git
cd weather-app

# Install dependencies
npm install

# Run the app in dev mode
npm run dev

# Run tests (unit + hooks + snapshot)
npm run test

# Build for production
npm run build

# Preview production build
npm run preview

# Set your API key
echo "APP_OWM_API_KEY=your_api_key_here" > .env
