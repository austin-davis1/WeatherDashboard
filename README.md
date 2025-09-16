# 🌤️ Weather Dashboard

A modern, responsive weather application built with React and TypeScript that provides comprehensive weather information with interactive maps and beautiful UI components.

![Weather Dashboard](https://img.shields.io/badge/Weather-Dashboard-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.0.0--rc.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=for-the-badge&logo=vite)

## ✨ Features

### 🌍 **Interactive Weather Maps**

- **Multiple Map Types**: Precipitation, Temperature, Wind, Cloud coverage, and Pressure overlays
- **Click-to-Select**: Click anywhere on the map to get weather data for that location
- **Real-time Updates**: Live weather data with automatic map re-centering
- **Dark/Light Theme**: Adaptive map styling based on user preference

### 📊 **Comprehensive Weather Data**

- **Current Conditions**: Temperature, humidity, wind speed, feels-like temperature
- **Hourly Forecast**: 24-hour detailed weather predictions with precipitation probability
- **Daily Forecast**: 7-day extended forecast with min/max temperatures
- **Additional Metrics**: UV index, pressure, cloudiness, sunrise/sunset times, wind direction

### 🎨 **Modern UI/UX**

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Seamless theme switching with persistent preferences
- **Skeleton Loading**: Beautiful loading states while fetching data
- **Interactive Cards**: Hover effects and smooth animations
- **Custom Icons**: Weather-specific SVG icons for better visual representation

### 🚀 **Performance & Developer Experience**

- **React Query**: Efficient data fetching with caching and background updates
- **TypeScript**: Full type safety with Zod schema validation
- **Component Architecture**: Modular, reusable components with clear separation of concerns
- **Hot Module Replacement**: Fast development with Vite

## 🛠️ Tech Stack

### **Frontend**

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### **State Management & Data Fetching**

- **TanStack Query** - Server state management and caching
- **React Context** - Local state management for UI preferences

### **Maps & Visualization**

- **Leaflet** - Interactive maps
- **React Leaflet** - React components for Leaflet
- **MapTiler** - Base map tiles and styling

### **UI Components**

- **Radix UI** - Accessible, unstyled components
- **Lucide React** - Beautiful icons
- **Class Variance Authority** - Component variant management

### **Data Validation**

- **Zod** - Runtime type validation and parsing

### **APIs**

- **OpenWeatherMap** - Weather data and geocoding
- **MapTiler** - Map tiles and styling

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenWeatherMap API key
- MapTiler API key (optional, for enhanced map styling)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   VITE_API_KEY=your_openweathermap_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📱 Usage

### **Location Selection**

- Use the location dropdown to select from predefined cities
- Click anywhere on the map to get weather for that specific location
- The app automatically geocodes city names to coordinates

### **Map Types**

Switch between different weather overlay types:

- **Precipitation**: Rain and snow patterns
- **Temperature**: Heat maps of current temperatures
- **Wind**: Wind speed and direction visualization
- **Clouds**: Cloud coverage patterns
- **Pressure**: Atmospheric pressure maps

### **Theme Switching**

Toggle between light and dark modes using the theme switch in the header.

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── cards/           # Weather data display cards
│   ├── dropdowns/       # Location and map type selectors
│   ├── skeletons/       # Loading state components
│   ├── ui/              # Reusable UI components
│   └── ...              # Other components
├── utils/               # Utility functions and enums
├── lib/                 # Shared utilities
├── assets/              # SVG icons and images
├── api.ts              # API integration functions
├── types.ts            # TypeScript type definitions
└── ...
```

## 🔧 Configuration

### **API Keys**

- **OpenWeatherMap**: Required for weather data
  - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
  - Add your API key to the `.env` file

- **MapTiler** (Optional): For enhanced map styling
  - The app includes a demo key for basic functionality
  - For production, sign up at [MapTiler](https://www.maptiler.com/)

### **Customization**

- Modify `src/utils/MapTypeEnum.ts` to add new map types
- Update `src/components/dropdowns/LocationDropdown.tsx` to add new cities
- Customize themes in `src/components/ThemeProvider.tsx`

## 🎯 Key Features in Detail

### **Interactive Maps**

The map component supports:

- Multiple overlay types with real-time data
- Click-to-select location functionality
- Automatic centering and zoom adjustment
- Responsive design for all screen sizes

### **Weather Cards**

- **Current Weather**: Real-time conditions with local time
- **Hourly Forecast**: Detailed 24-hour predictions
- **Daily Forecast**: Extended 7-day outlook
- **Additional Info**: Comprehensive weather metrics

### **Performance Optimizations**

- React Query for intelligent caching
- Suspense boundaries for better loading states
- Optimized re-renders with proper dependency arrays
- Lazy loading of map components

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. Follow TypeScript best practices
2. Use meaningful component and variable names
3. Add proper error handling
4. Include loading states for async operations
5. Ensure responsive design principles

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for comprehensive weather data
- [MapTiler](https://www.maptiler.com/) for beautiful map tiles
- [Leaflet](https://leafletjs.com/) for interactive maps
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
