import platinumTextEditorStyles from "@/app/SystemFolder/SystemResources/TextEditor/PlatinumTextEditor.module.scss";
import {FC} from 'react'

interface EditorProps {
    content: string;
}

const PlatinumTextEditor: FC<EditorProps> = ({content}) => {
    return <div>
        <textarea className={platinumTextEditorStyles.platinumTextEditor}>{content}</textarea>
    </div>
}

export default PlatinumTextEditor;
