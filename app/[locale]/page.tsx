"use client";
import { ThemeSwitcher } from "@/components/switchers/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loadingState";
import { toast } from "@/hooks/use-toast";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const GRID_SIZE = 60;
const ACTIVE_RADIUS = 150;
// Define a palette of colors to assign to each grid cell.
const PALETTE = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33A1", "#33FFF2"];

// Helper function to convert a hex color (e.g. "#FF5733") to an rgba string with the given alpha.
function hexToRgbA(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

type GridCellProps = {
  mouseX: any;
  mouseY: any;
  x: number;
  y: number;
  theme: string | undefined;
  cellColor: string;
};

const GridCell = ({ mouseX, mouseY, x, y, theme, cellColor }: GridCellProps) => {
  const centerX = x + GRID_SIZE / 2;
  const centerY = y + GRID_SIZE / 2;

  // Compute the distance from the cell center to the cursor.
  const distance = useTransform(() => {
    const mx = mouseX.get();
    const my = mouseY.get();
    return Math.sqrt((mx - centerX) ** 2 + (my - centerY) ** 2);
  });

  // Use the computed distance to dynamically adjust opacity, scale, and rotation.
  const opacity = useTransform(distance, [0, 150], [1, 0.1]);
  const scale = useTransform(distance, [0, 150], [1.2, 0.9]);
  const rotate = useTransform(distance, [0, 300], [0, 45]);

  // Dynamically compute the background color:
  // - If the cell is within ACTIVE_RADIUS, use its base color tinted with an alpha that fades as distance increases.
  // - Otherwise, use a subtle default color.
  const backgroundColor = useTransform(distance, (d: number) => {
    if (d < ACTIVE_RADIUS) {
      const alpha = 1 - d / ACTIVE_RADIUS; // closer cells are more opaque
      return hexToRgbA(cellColor, alpha);
    } else {
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
        border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
        opacity,
        scale,
        rotate,
        background: backgroundColor,
        pointerEvents: "auto",
      }}
      // An optional hover effect to enlarge the cell further.
      whileHover={{ scale: 1.3 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
    />
  );
};

export default function Home({ params }: { params: { locale: string } }) {
  const t = useTranslations("Index");
  const { data: session, status } = useSession();
  const router = useRouter();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXVelocity = useMotionValue(0);
  const mouseYVelocity = useMotionValue(0);
  const lastMouseX = useMotionValue(0);
  const lastMouseY = useMotionValue(0);
  const dotsContainerX = useMotionValue(0);
  const dotsContainerY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // Each grid cell now also includes a color property.
  const [gridCells, setGridCells] = useState<Array<{ x: number; y: number; color: string }>>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const calculateGrid = () => {
      const columns = Math.ceil(window.innerWidth / GRID_SIZE);
      const rows = Math.ceil(window.innerHeight / GRID_SIZE);
      const cells = [];
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          // Cycle through the palette based on the cell's position.
          const color = PALETTE[(i + j) % PALETTE.length];
          cells.push({ x: i * GRID_SIZE, y: j * GRID_SIZE, color });
        }
      }
      setGridCells(cells);
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseXVelocity.set(x - lastMouseX.get());
      mouseYVelocity.set(y - lastMouseY.get());
      lastMouseX.set(x);
      lastMouseY.set(y);

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const updateContainerPosition = () => {
      const vx = mouseXVelocity.get();
      const vy = mouseYVelocity.get();

      dotsContainerX.set(dotsContainerX.get() + vx * 0.03);
      dotsContainerY.set(dotsContainerY.get() + vy * 0.03);

      requestAnimationFrame(updateContainerPosition);
    };

    const animationId = requestAnimationFrame(updateContainerPosition);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const cursorScale = useTransform(() =>
    Math.min(1.5 + Math.abs(mouseXVelocity.get()) / 100 + Math.abs(mouseYVelocity.get()) / 100, 2.5)
  );

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleContinue = () => {
    router.push(`/${params.locale}/${status === "authenticated" ? "onboarding" : "sign-in"}`);
  };
  const handleSignOut = () => {
    if (status === "authenticated") {
      signOut({
        callbackUrl: `/${params.locale}/sign-in`,
        redirect: true,
      });
    } else {
      toast({
        title: t("SUCCESS.SIGN_UP"),
        variant: "default",
      });
    }
  };

  if (!mounted) return null;

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background text-foreground relative overflow-hidden cursor-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Render grid cells with dynamic coloring based on cursor distance */}
      <div className="absolute inset-0">
        {gridCells.map((cell, index) => (
          <GridCell
            key={index}
            mouseX={mouseX}
            mouseY={mouseY}
            x={cell.x}
            y={cell.y}
            theme={theme}
            cellColor={cell.color}
          />
        ))}
      </div>

      <motion.div
        className="fixed pointer-events-none rounded-full mix-blend-screen"
        style={{
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
          width: 300,
          height: 300,
          background: `radial-gradient(circle at center, ${theme === "dark"
            ? "rgba(255, 255, 255, 0.3)"
            : "rgba(0, 0, 0, 0.3)"
            } 0%, transparent 70%)`,
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

      <div className="absolute top-4 right-4 flex gap-4 z-50">
        <ThemeSwitcher />
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative overflow-hidden"
        >
          <Button
            onClick={handleContinue}
            disabled={status === "loading"}
            className="px-6 py-4 rounded-xl text-base font-semibold bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 relative"
          >
            {status === "loading" ? (
              <LoadingState className="h-5 w-5 text-white" />
            ) : (
              <>
                {t("CONTINUE")}
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  animate={{
                    x: "100%",
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                />
              </>
            )}
          </Button>
        </motion.div>
      </div>

      <div className="relative z-10">
        <motion.h1
          className="text-8xl font-bold text-foreground text-center"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {"Workify".split("").map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
              whileHover={{ scale: 1.2, y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {letter}
            </motion.span>
          ))}
          <motion.div
            className="h-1 bg-primary mt-2"
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: 1,
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              },
            }}
          />
        </motion.h1>
      </div>

      <motion.div
        className="absolute bottom-8 text-muted-foreground text-sm z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
          {t("WELCOME_MESSAGE")}
        </motion.div>

        <AnimatePresence>
          {status === "authenticated" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              whileHover={{
                scale: 1.05,
                rotate: [0, 2, -2, 0],
                transition: { duration: 0.5 },
              }}
              whileTap={{
                scale: 0.95,
                rotate: 0,
              }}
            >
              <Button
                onClick={() =>
                  signOut({
                    callbackUrl: `/${params.locale}/sign-in`,
                    redirect: true,
                  })
                }
                className="px-6 py-4 rounded-xl text-base font-semibold bg-destructive text-destructive-foreground shadow-lg hover:bg-destructive/90 relative"
              >
                sign out
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-destructive-foreground"
                  animate={{
                    opacity: [0, 1],
                    scale: [1, 1.2],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          x: dotsContainerX,
          y: dotsContainerY,
          transition: "linear 0.1s",
        }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 100, 0],
              x: [0, 50, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
