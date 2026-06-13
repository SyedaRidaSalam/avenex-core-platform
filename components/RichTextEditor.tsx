"use client";
import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function RichTextEditor({ onChange, content }: any) {
  const editor = useEditor({
    extensions: [StarterKit.configure({ heading: { levels: [2] } })],
    content: content,
    editorProps: {
      attributes: {
        // PROSE CLASS YAHAN LAGA RAHI HAI SAB SAHI STYLE
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px] w-full p-4',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (content === "" && editor) editor.commands.setContent("");
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="border border-zinc-800 bg-zinc-950 flex flex-col">
      <div className="flex flex-wrap gap-1 p-2 border-b border-zinc-800 bg-zinc-900">
        {[
          { label: 'B', action: () => editor.chain().focus().toggleBold().run(), active: 'bold' },
          { label: 'H2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: 'heading' },
          { label: 'List', action: () => editor.chain().focus().toggleBulletList().run(), active: 'bulletList' },
        ].map((btn) => (
          <button
            key={btn.label}
            type="button"
            onClick={btn.action}
            className={`px-3 py-1 text-[10px] font-bold border ${
              editor.isActive(btn.active) ? 'bg-white text-black' : 'bg-zinc-800 text-white'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div className="flex-1 w-full">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}