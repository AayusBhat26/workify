"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { LoadingState } from "@/components/ui/loadingState";
import { ThemeSwitcher } from "@/components/switchers/ThemeSwitcher";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";

const GRID_SIZE = 60; // Increased grid size

const GridCell = ({
  mouseX,
  mouseY,
  x,
  y,
  theme,
}: {
  mouseX: any;
  mouseY: any;
  x: number;
  y: number;
  theme: string | undefined;
}) => {
  const centerX = x + GRID_SIZE / 2;
  const centerY = y + GRID_SIZE / 2;

  const opacity = useTransform(() => {
    const mx = mouseX.get();
    const my = mouseY.get();
    const distance = Math.sqrt(
      Math.pow(mx - centerX, 2) + Math.pow(my - centerY, 2)
    );
    return Math.max(0.1, 1 - distance / 150); // Increased effect radius
  });

  const scale = useTransform(opacity, [0.1, 1], [0.9, 1.2]);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        width: GRID_SIZE,
        height: GRID_SIZE,
        border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
        opacity: opacity,
        scale: scale,
        background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
      }}
    />
  );
};

export default function Home({ params }: { params: { locale: string } }) {
  const t = useTranslations("Index");
  const { data: session, status } = useSession();
  const router = useRouter();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [animateUnderline, setAnimateUnderline] = useState(true);
  const [gridCells, setGridCells] = useState<Array<{ x: number; y: number }>>([]);

  // Calculate grid cells
  useEffect(() => {
    const calculateGrid = () => {
      const columns = Math.ceil(window.innerWidth / GRID_SIZE);
      const rows = Math.ceil(window.innerHeight / GRID_SIZE);
      const cells = [];
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          cells.push({ x: i * GRID_SIZE, y: j * GRID_SIZE });
        }
      }
      setGridCells(cells);
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleContinue = () => {
    if (status === "authenticated") {
      router.push(`/${params.locale}/dashboard`);
    } else {
      router.push(`/${params.locale}/sign-in`);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background text-foreground relative overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        {gridCells.map((cell, index) => (
          <GridCell
            key={index}
            mouseX={mouseX}
            mouseY={mouseY}
            x={cell.x}
            y={cell.y}
            theme={theme}
          />
        ))}
      </div>

      {/* Cursor Glow Effect */}
      <motion.div
        className="fixed pointer-events-none rounded-full"
        style={{
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
          width: 300,
          height: 300,
          background: `radial-gradient(circle, ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 0%, transparent 70%)`,
        }}
      />

      {/* Top Right Controls */}
      <div className="absolute top-4 right-4 flex gap-4 z-50">
        <ThemeSwitcher />
        <Button
          onClick={handleContinue}
          disabled={status === "loading"}
          className="px-6 py-4 rounded-xl text-base font-semibold bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
        >
          {status === "loading" ? (
            <LoadingState className="h-5 w-5 text-white" />
          ) : (
            t('CONTINUE')
          )}
        </Button>
      </div>

      {/* Centered Application Name */}
      <div className="relative z-10">
        <motion.h1 
          className="text-8xl font-bold text-foreground text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Workify
          <motion.div
            className="h-1 bg-primary mt-2"
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: 1,
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }
            }}
          />
        </motion.h1>
      </div>

      {/* Welcome Message */}
      <motion.div
        className="absolute bottom-8 text-muted-foreground text-sm z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {t('WELCOME_MESSAGE')}
      </motion.div>
    </motion.div>
  );
}