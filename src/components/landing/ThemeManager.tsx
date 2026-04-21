'use client';

import { useEffect } from 'react';

export default function ThemeManager() {
  useEffect(() => {
    const updateTheme = () => {
      const hour = new Date().getHours();
      // Night is from 18:00 (6 PM) to 06:00 (6 AM)
      const isNight = hour >= 18 || hour < 6;
      
      const theme = isNight ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      
      console.log(`[ThemeManager] Current hour: ${hour}. Setting theme to: ${theme}`);
    };

    updateTheme();
    
    // Check every 15 minutes to handle transitions while the page is open
    const interval = setInterval(updateTheme, 15 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return null;
}
