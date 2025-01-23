import React from "react"

// this works as the wrapper for the button component. 
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}
export const ProviderSignInButton = ({ children, ...props }: Props) => {
    return (
        <button
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700"
            {...props}
        >
            {children}
        </button>
    );
}