"use client";

import { EmojiSelector } from "@/components/extra/EmojiSelector";
import { useState } from "react";

export const Logo = () => {
    const [selectedEmoji, setSelectedEmoji] = useState("🧠");

    const selectedEmojiHandler = (emoji: string)=>{
        setSelectedEmoji(emoji);
    }
    
    return (
        <EmojiSelector onSelectedEmoji={selectedEmojiHandler}>
            <span className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center text-4xl text-primary font-bold cursor-pointer hover:bg-secondary/80 transition-all duration-200 ease-in-out">
                {selectedEmoji}
            </span>
        </EmojiSelector>
    );
};