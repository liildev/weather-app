# 🌤️ Weather Dashboard Widget

A responsive weather dashboard built with **Vite + React + TypeScript**, following **Feature-Sliced Design (FSD)** and best practices. Displays and analyzes weather data for major cities using OpenWeatherMap.

## ✨ Features

- Current weather + 5-day forecast (London, New York, Tokyo, Sydney, Cairo)
- SVG-based temperature chart (no external chart libraries)
- Dark/light theme toggle
- Throttled API calls, debounced search
- Custom hook + reducer-based state
- Fully responsive + tabbed views

## 🛠️ Tech Stack

- **React + TypeScript + Vite**
- **Vitest** + **@testing-library/react**
- **@testing-library/jest-dom**
- FSD folder architecture
- TailwindCSS

## ⚙️ Setup

```bash
# Clone repo
git clone https://github.com/your-username/weather-app.git
cd weather-app

# Install dependencies
npm install

# Set up environment variable
echo "APP_OWM_API_KEY=your_api_key_here" > .env
````

## 📦 Scripts

```bash
# Start development server
npm run dev

# Run tests (Vitest)
npm run test

# Build for production
npm run build

# Preview the production build
npm run preview
```

## 📁 FSD Structure

```
src/
├── app/         # App initialization (providers)
├── entities/    # Data models and logic
├── widgets/     # Widget-level UI (WeatherWidget)
├── features/    # Independent units (CitySelector, DataVisualization and etc)
├── shared/      # Common UI, LIB, API
```

## 🧪 Testing Stack

* [`vitest`](https://vitest.dev/)
* [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro/)
* [`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom)
