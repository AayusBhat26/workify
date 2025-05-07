import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const OptionButton = ({ onClick, className, children, ...props}:Props)=>{
    return(
        <Button type="button" size={"icon"} variant={"ghost"}
        className={cn("w-7 h-7 flex justify-center items-center rounded-sm text-muted-foreground", className)}
        onClick={onClick}
        {...props}
        >
            {children}
        </Button>
    )
}