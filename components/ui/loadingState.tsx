import { cn } from "@/lib/utils";
import { SVGProps } from "@/types/props";
import { Loader2 } from "lucide-react";

interface Props extends SVGProps {
  loadingText?: string;
  hideLoaderIcon?: boolean;
}
export const LoadingState = ({
  loadingText,
  hideLoaderIcon = false,
  className,
  ...props
}: Props) => {
  return (
    <>
      {!hideLoaderIcon && (
        <Loader2
          className={cn(`mr-2 h-4 2-4 animate-spin`, className)}
          {...props}
        />
      )}
      {loadingText && <p>{loadingText}</p>}
    </>
  );
};
