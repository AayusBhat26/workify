// components/switchers/ThemeSwitcher.tsx
"use client";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Moon, Sun, Monitor } from "lucide-react";
import { motion } from "framer-motion";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 p-1 rounded-full bg-card dark:bg-card-dark border border-border">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setTheme("light")}
        className={`rounded-full ${
          theme === 'light' ? 'bg-primary text-primary-foreground' : 'text-foreground'
        }`}
      >
        <motion.div
          animate={{ rotate: theme === 'light' ? 0 : 180 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Sun className="h-4 w-4" />
        </motion.div>
      </Button>

      <Button
        size="sm"
        variant="ghost"
        onClick={() => setTheme("system")}
        className={`rounded-full ${
          theme === 'system' ? 'bg-primary text-primary-foreground' : 'text-foreground'
        }`}
      >
        <Monitor className="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        variant="ghost"
        onClick={() => setTheme("dark")}
        className={`rounded-full ${
          theme === 'dark' ? 'bg-primary text-primary-foreground' : 'text-foreground'
        }`}
      >
        <motion.div
          animate={{ rotate: theme === 'dark' ? 0 : 180 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Moon className="h-4 w-4" />
        </motion.div>
      </Button>
    </div>
  );
};