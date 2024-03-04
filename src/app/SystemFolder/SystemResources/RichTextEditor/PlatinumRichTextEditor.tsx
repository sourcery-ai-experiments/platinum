'use client'

import PlatinumRichTextEditorStyles
    from "@/app/SystemFolder/SystemResources/RichTextEditor/PlatinumRichTextEditor.module.scss";
import {
    BoldItalicUnderlineToggles,
    CodeToggle,
    headingsPlugin,
    InsertThematicBreak,
    markdownShortcutPlugin,
    MDXEditor,
    MDXEditorMethods,
    quotePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
    UndoRedo
} from "@mdxeditor/editor"
import {FC} from 'react'

interface PlatinumRichTextEditorProps {
    content: string;
    editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const PlatinumRichTextEditor: FC<PlatinumRichTextEditorProps> = ({content, editorRef}) => {
    return <div className={PlatinumRichTextEditorStyles.platinumRichTextEditor}>
        <MDXEditor ref={editorRef} markdown={content} contentEditableClassName="prose"
                   plugins={[headingsPlugin(), headingsPlugin(),
                       quotePlugin(),
                       thematicBreakPlugin(),
                       markdownShortcutPlugin(),
                       toolbarPlugin({
                           toolbarContents: () => (
                               <>
                                   {' '}
                                   <UndoRedo/>
                                   <BoldItalicUnderlineToggles/>
                                   <CodeToggle></CodeToggle>
                                   <InsertThematicBreak></InsertThematicBreak>
                               </>
                           )
                       })
                   ]}/></div>
}

export default PlatinumRichTextEditor
