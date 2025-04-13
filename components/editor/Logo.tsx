"use client";

import { EmojiSelector } from "@/components/extra/EmojiSelector";
import { useState } from "react";
interface Props{
    onFormSelect: (emoji: string) => void;
}
export const Logo = ({onFormSelect}: Props) => {
    const [selectedEmoji, setSelectedEmoji] = useState<string>("🧠");
    const selectedEmojiHandler = (emoji: string) => {
        let emojiStr: string;
        if (typeof emoji === "number") {
          emojiStr = String.fromCodePoint(emoji);
        } else if (/^U\+/.test(emoji)) {
          emojiStr = String.fromCodePoint(parseInt(emoji.substring(2), 16));
        } else if (/^0x/.test(emoji)) {
          emojiStr = String.fromCodePoint(parseInt(emoji.substring(2), 16));
        } else if (/^[0-9A-F]+$/i.test(emoji)) {
          emojiStr = String.fromCodePoint(parseInt(emoji, 16));
        } else {
          emojiStr = emoji;
        }        
        setSelectedEmoji(emojiStr);
        onFormSelect(emojiStr);
      };
      
    return (
        <EmojiSelector onSelectedEmoji={selectedEmojiHandler}>
            <span className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center text-4xl text-primary font-bold cursor-pointer hover:bg-secondary/80 transition-all duration-200 ease-in-out">
                {selectedEmoji}
            </span>
        </EmojiSelector>
    );
};