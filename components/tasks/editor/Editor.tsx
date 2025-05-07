"use client";
import { useEditor, BubbleMenu, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import { OptionButton } from "./tool/OptionButton";
import { Bold, Italic, Link2, Strikethrough, UnderlineIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AddLink } from "./tool/AddLink";
import {Color} from "@tiptap/extension-color";
import TextStyle  from "@tiptap/extension-text-style";
import History from "@tiptap/extension-history";
import { ToolsContainer } from "./tool/ToolsContainer";
export const EditorTasks = () => {
    const editor = useEditor({
        editorProps: {
            attributes: {
                class:
                    "focus:outline-none prose prose-headings:text-secondary-foreground prose-p:text-secondary-foreground prose-strong:text-secondary-foreground prose-a:text-primary prose-a:no-underline prose-a:cursor-pointer   w-full focus-visible:outline-none rounded-md max-w-none  prose-code:text-secondary-foreground prose-code:bg-muted  prose-ol:text-secondary-foreground prose-ul:text-secondary-foreground prose-li:marker:text-secondary-foreground prose-li:marker:font-bold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl  prose-h5:text-xl prose-h6:text-lg prose-p:text-base prose-headings:line-clamp-1 prose-headings:mt-0 prose-p:my-2",

            }
        }, extensions: [
            StarterKit.configure({
                history: false,
                heading: {
                    levels: [1, 2, 3, 4]
                }
            }),
            Underline,
            Link, 
            Color, 
            TextStyle, 
            History
        ],
        content: `
        
        <h1 class="text-4xl"> This is first level heading</h1>
        <h2 class="text-3xl"> This is second level heading</h2>
        <h3 class="text-2xl"> This is third level heading</h3>
        <h4 class="text-xl"> This is fourth level heading</h4>
        <p > This is paragraph</p>
        <p><code>this is code</code></p>
        <span>test</span>
        <ul>
            <li> this is a bullet list</li>
            <li> and it has 3 list items</li>
            <li> here is the third one</li>
        </ul>
        `
    });
    return (<>
        {editor && (
            <BubbleMenu className="rounded-md shadow-sm border bg-popover p-1 text-popover-foreground flex items-center gap-2" editor={editor} tippyOptions={{ zIndex: 20 }}>
                <OptionButton 
                    className={editor.isActive("bold") ? "bg-accent text-secondary-foreground" : ""}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold size={16} />
                </OptionButton>
                <OptionButton 
                    className={editor.isActive("italic") ? "bg-accent text-secondary-foreground" : ""}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic size={16} />
                </OptionButton>

                <OptionButton 
                    className={editor.isActive("strike") ? "bg-accent text-secondary-foreground" : ""}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <Strikethrough size={16} />
                </OptionButton>
                <OptionButton 
                    className={editor.isActive("underline") ? "bg-accent text-secondary-foreground" : ""}
                    onClick={() => editor.chain().focus().setUnderline().run()}
                >
                    <UnderlineIcon size={16} />
                </OptionButton>
                <Separator className="h-6" orientation="vertical"/>
                <AddLink editor={editor} />
                {/* <Link2/> */}
            </BubbleMenu>
        )}
        <EditorContent spellCheck={false} editor={editor}>
            <Separator className="h-6" orientation="vertical"/>
            <AddLink editor={editor}/>
            <ToolsContainer editor={Editor} />
        </EditorContent>
    </>);
}