declare module 'next-themes' {
  export interface ThemeProviderProps {
    children: React.ReactNode
    attribute?: string
    defaultTheme?: string
    enableSystem?: boolean
    disableTransitionOnChange?: boolean
  }

  export function useTheme(): {
    theme: string | undefined
    setTheme: (theme: string) => void
    systemTheme: string | undefined
  }

  export function ThemeProvider(props: ThemeProviderProps): JSX.Element
}