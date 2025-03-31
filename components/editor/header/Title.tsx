"use client";
import { Badge } from "@/components/ui/badge"
import { Logo } from "./Logo"
import ContentEditable, {ContentEditableEvent} from "react-contenteditable";
import { useState } from "react";
export const Title = ()=>{
    const [content, setContent] = useState("");
    const onChangeHandler = (e:ContentEditableEvent)=>{
        setContent(e.target.value);
    }
    const onPastehandler = (event: React.ClipboardEvent)=>{
        event.preventDefault() ;
        const plainText = event.clipboardData.getData("text/plain");
        setContent(plainText);
    }
    return (
        <div className="relative text-xl font-semibold outline-none inline-block min-h-0 z-20 w-full break-words break-all">
            <ContentEditable tagName="span" className=""
            html={content} onChange={onChangeHandler}
           spellCheck={false}
           onPaste={onPastehandler}
           >
            {/* test */}
            </ContentEditable>
            {!content&& <span className="text-muted-foreground pointer-events-none  min-h-0">No Content</span>}
        </div>
    )
}