import React from 'react'

type Props = {
  label?: JSX.Element;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ label, rows = 3, ...props }: Props) {
  return (
    <label className="flex flex-col space-y-1">
      {label && label}
      <textarea {...props} rows={rows} className="rounded-sm bg-slate-200 px-3 py-2" />
    </label>
  )
}
