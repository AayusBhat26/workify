import { LanguageSwitcher } from "@/components/switchers/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/switchers/ThemeSwitcher";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col gap-3 justify-center items-center min-h-screen w-full p-4 md:p-6 bg-background text-foreground">
      {/* Top right controls with dark mode styling */}
      <div className="absolute top-0 left-0 w-full flex justify-end">
        <div className="flex items-center gap-2 max-w-7xl p-4 md:p-6 backdrop-blur-sm bg-background/80 dark:bg-muted/50 rounded-bl-xl border border-l-0 border-t-0 border-border">
          <LanguageSwitcher />
          {/* className="text-foreground hover:bg-accent rounded-full p-2 transition-colors" */}
          <ThemeSwitcher />
          {/* className="text-foreground hover:bg-accent rounded-full p-2 transition-colors"
            iconClass="h-5 w-5" */}
        </div>
      </div>
      
      {children}
    </main>
  );
};

export default AuthLayout;