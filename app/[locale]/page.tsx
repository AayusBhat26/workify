"use client";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { LoadingState } from "@/components/ui/loadingState";
import { ThemeSwitcher } from "@/components/switchers/ThemeSwitcher";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";

const GRID_SIZE = 60;
const COLORS = {
  light: "#f8fafc",
  dark: "#020617",
};

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

  const distance = useTransform(() => {
    const mx = mouseX.get();
    const my = mouseY.get();
    return Math.sqrt(Math.pow(mx - centerX, 2) + Math.pow(my - centerY, 2));
  });

  const opacity = useTransform(distance, [0, 150], [1, 0.1]);
  const scale = useTransform(distance, [0, 150], [1.2, 0.9]);
  const rotate = useTransform(distance, [0, 300], [0, 45]);

  const backgroundColor = useTransform(() => {
    return theme === "dark" 
      ? `rgba(255,255,255,${0.03 * (1 - distance.get() / 300)})`
      : `rgba(0,0,0,${0.03 * (1 - distance.get() / 300)})`;
  });

  return (
    <motion.div
      className="absolute pointer-events-none"
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
      }}
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
  const [gridCells, setGridCells] = useState<Array<{ x: number; y: number }>>([]);

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
          cells.push({ x: i * GRID_SIZE, y: j * GRID_SIZE });
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
    if (status === "authenticated") {
      router.push(`/${params.locale}/onboarding`);
    } else {
      router.push(`/${params.locale}/sign-in`);
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

      <motion.div
        className="fixed pointer-events-none rounded-full mix-blend-screen"
        style={{
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
          width: 300,
          height: 300,
          background: `radial-gradient(circle at center, ${
            theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.3)' 
              : 'rgba(0, 0, 0, 0.3)'
          } 0%, transparent 70%)`,
          filter: 'blur(20px)',
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
          {"Workify".split('').map((letter, index) => (
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
        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
        >
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
                transition: { duration: 0.5 }
              }}
              whileTap={{ 
                scale: 0.95,
                rotate: 0 
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
                {t("SIGN_OUT")}
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
          transition: 'linear 0.1s' 
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