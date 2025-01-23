"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
// This file is the entry point for the ThemeProvider component. It imports the ThemeProvider component from next-themes and re-exports it with the same props. This allows us to use the ThemeProvider component from next-themes in our application without having to import it directly. The ThemeProvider component is used to provide theme context to the rest of the application, allowing us to switch between light and dark themes.