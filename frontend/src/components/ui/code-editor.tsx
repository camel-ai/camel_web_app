import * as React from "react"
import { cn } from "@/library/utils"

interface CodeEditorProps {
  language: string
  filename?: string
  code: string
  className?: string
}

export function CodeEditor({
  language,
  filename,
  code,
  className,
}: CodeEditorProps) {
  return (
    <div className={cn("relative", className)}>
      {filename && (
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{filename}</span>
          </div>
        </div>
      )}
      <pre className="p-4 overflow-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
} 