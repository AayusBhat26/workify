"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { LoadingState } from "@/components/ui/loadingState";
import { ThemeSwitcher } from "@/components/switchers/ThemeSwitcher";
import { useEffect, useState } from "react";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function Home({ params }: { params: { locale: string } }) {
  const t = useTranslations("Index");
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      filter: "brightness(110%)",
      transition: { type: "spring", stiffness: 300 }
    },
    tap: { scale: 0.95 }
  };

  const handleContinue = () => {
    if (status === "authenticated") {
      router.push(`/${params.locale}/dashboard`);
    } else {
      router.push(`/${params.locale}/sign-in`);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      // Create new bubble with larger size
      const newBubble = {
        id: Date.now(),
        x: e.clientX + (Math.random() - 0.5) * 80,
        y: e.clientY + (Math.random() - 0.5) * 80,
        size: Math.random() * 25 + 15 // Size between 15-40px
      };

      setBubbles(prev => [...prev, newBubble]);

      // Remove bubbles after 4 seconds
      setTimeout(() => {
        setBubbles(prev => prev.filter(bubble => bubble.id !== newBubble.id));
      }, 4000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-black dark:via-gray-950 dark:to-black overflow-hidden relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Website Name */}
      <motion.h1 
        className="fixed top-8 left-8 text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Workify
      </motion.h1>

      {/* Cursor Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-lg border border-black/5 dark:border-white/5"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.x - bubble.size/2,
            top: bubble.y - bubble.size/2
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ 
            scale: [0, 1, 0.8],
            opacity: [1, 0.8, 0]
          }}
          transition={{ 
            duration: 4,
            ease: "easeOut",
            times: [0, 0.8, 1]
          }}
        />
      ))}

      {/* Continue Button */}
      <motion.div
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="relative group z-10"
      >
        <Button
          onClick={handleContinue}
          disabled={status === "loading"}
          className="px-8 py-6 rounded-2xl text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-900 dark:to-gray-800 text-white shadow-xl relative overflow-hidden border-0"
        >
          {status === "loading" ? (
            <LoadingState className="h-6 w-6 text-white" />
          ) : (
            t('CONTINUE')
          )}
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 2 }}
            className="absolute inset-0 bg-white/5 rounded-2xl mix-blend-screen"
            transition={{ type: "spring", stiffness: 300 }}
          />
        </Button>
      </motion.div>

      <ThemeSwitcher  />

      {/* Welcome message */}
      <motion.div
        className="absolute bottom-8 text-muted-foreground dark:text-gray-400 text-sm z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {t('WELCOME_MESSAGE')}
      </motion.div>
    </motion.div>
  );
}