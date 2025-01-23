import { Loader2 } from "lucide-react";

interface Props{
    loadingText: string; 
    hideLoaderIcon?: boolean
}
export const LoadingState = ({loadingText, hideLoaderIcon}: Props) =>{
    return <>
    {!hideLoaderIcon && <Loader2 className="mr-2 h-4 2-4 animate-spin" />} 
    <p>{loadingText}</p>
    </>
}