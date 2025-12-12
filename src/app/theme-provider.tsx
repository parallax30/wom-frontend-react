'use client'

import { createContext, useCallback, useEffect, useState } from 'react'

// MUI imports
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

// ---------------------------------------------------------

interface ThemeContextValue {
  isDarkMode: boolean
  toggleDarkMode: () => void
  themeDir: 'rtl' | 'ltr'
  setThemeDir: (value: 'rtl' | 'ltr') => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [themeDir, setThemeDir] = useState<'rtl' | 'ltr'>('ltr')

  // -----------------------------
  // Handle Dark Mode
  // -----------------------------
  useEffect(() => {
    const root = document.querySelector('html')
    const storedTheme = localStorage.getItem('theme')

    if (storedTheme === 'dark-mode') {
      setIsDarkMode(true)
      root?.classList.add('dark')
    } else {
      setIsDarkMode(false)
      root?.classList.remove('dark')
    }
  }, [])

  // -----------------------------
  // Handle Direction (RTL/LTR)
  // -----------------------------
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dir = document.documentElement.getAttribute('dir')
      setThemeDir(dir === 'rtl' ? 'rtl' : 'ltr')
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('dir', themeDir)
    }
  }, [themeDir])

  // -----------------------------
  // Toggle Dark Mode
  // -----------------------------
  const toggleDarkMode = useCallback((): void => {
    const root = document.querySelector('html')

    if (localStorage.getItem('theme') === 'light-mode') {
      setIsDarkMode(true)
      root?.classList.add('dark')
      localStorage.setItem('theme', 'dark-mode')
    } else {
      setIsDarkMode(false)
      root?.classList.remove('dark')
      localStorage.setItem('theme', 'light-mode')
    }
  }, [])

  // ---------------------------------------------------------
  // MUI THEME CONFIGURATION — CERA PRO AS DEFAULT FONT
  // ---------------------------------------------------------

  const theme = createTheme({
    direction: themeDir,
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
    typography: {
      fontFamily: 'Cera Pro, sans-serif',
    },
  })

  // ---------------------------------------------------------
  // RETURN PROVIDERS
  // ---------------------------------------------------------

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        themeDir,
        setThemeDir,
      }}
    >
      {/* Inject MUI Theme */}
      <MuiThemeProvider theme={theme}>
        {/* Normalize CSS + apply global font */}
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
