"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { LanguageSwitcher } from "@/components/switchers/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/switchers/ThemeSwitcher";
import { useTheme } from "next-themes";

const GRID_SIZE = 60;
const ACTIVE_RADIUS = 150;

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
  // Compute the center of the grid cell.
  const centerX = x + GRID_SIZE / 2;
  const centerY = y + GRID_SIZE / 2;

  // Calculate the distance from the mouse pointer.
  const distance = useTransform(() => {
    const mx = mouseX.get();
    const my = mouseY.get();
    return Math.sqrt((mx - centerX) ** 2 + (my - centerY) ** 2);
  });

  // Animate opacity, scale, and rotation based on distance.
  const opacity = useTransform(distance, [0, ACTIVE_RADIUS], [1, 0.1]);
  const scale = useTransform(distance, [0, ACTIVE_RADIUS], [1.2, 0.9]);
  const rotate = useTransform(distance, [0, 300], [0, 45]);

  // Use a dynamic background that only intensifies when the cell is within ACTIVE_RADIUS.
  const backgroundColor = useTransform(distance, (d: number) => {
    if (d < ACTIVE_RADIUS) {
      // Closer cells are rendered with a more pronounced (opaque) background.
      const activeOpacity = 1 - d / ACTIVE_RADIUS;
      return theme === "dark"
        ? `rgba(255,255,255,${activeOpacity})`
        : `rgba(0,0,0,${activeOpacity})`;
    } else {
      // Cells outside the radius use a subtle default color.
      return theme === "dark"
        ? "rgba(255,255,255,0.03)"
        : "rgba(0,0,0,0.03)";
    }
  });

  return (
    <motion.div
      className="absolute"
      style={{
        left: x,
        top: y,
        width: GRID_SIZE,
        height: GRID_SIZE,
        border: `1px solid ${theme === "dark"
          ? "rgba(255,255,255,0.05)"
          : "rgba(0,0,0,0.05)"
          }`,
        opacity,
        scale,
        rotate,
        background: backgroundColor,
        pointerEvents: "auto",
      }}
      whileHover={{
        // Optionally enlarge and tint the cell when hovered.
        background: theme === "dark"
          ? "rgba(255, 0, 0, 0.3)"
          : "rgba(0, 0, 255, 0.3)",
        scale: 1.3,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
    />
  );
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridCells, setGridCells] = useState<Array<{ x: number; y: number }>>([]);
  const mouseX = useMotionValue<number>(0);
  const mouseY = useMotionValue<number>(0);
  const { theme } = useTheme();

  // Calculate grid cells based on current window size.
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

  // Update mouse coordinates relative to the container.
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const cursorScale = useTransform(
    [mouseX, mouseY],
    ([x, y]) => Math.min(1.5 + (Math.abs(mouseX.get()) + Math.abs(mouseY.get())) / 1000, 2.5)
  );

  return (
    <main
      ref={containerRef}
      className="relative flex flex-col gap-3 justify-center items-center min-h-screen w-full p-4 md:p-6 bg-background text-foreground overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0">
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

      {/* Mouse-following radial gradient animation */}
      <motion.div
        className="fixed pointer-events-none rounded-full mix-blend-screen"
        style={{
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
          width: 300,
          height: 300,
          background: theme === "dark"
            ? "radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)"
            : "radial-gradient(circle at center, rgba(0, 0, 0, 0.3) 0%, transparent 70%)",
          filter: "blur(20px)",
          scale: cursorScale,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 0.5, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top-right controls */}
      <div className="absolute top-0 left-0 w-full flex justify-end">
        <div className="flex items-center gap-2 max-w-7xl p-4 md:p-6 backdrop-blur-sm bg-background/80 dark:bg-muted/50 rounded-bl-xl border border-l-0 border-t-0 border-border">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>

      {/* Main content passed as children */}
      {children}
    </main>
  );
};

export default AuthLayout;
