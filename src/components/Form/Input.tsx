import React from 'react'

type Props = {
  label: JSX.Element;
  type?: 'text' | 'number';
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, type = 'text', ...props }: Props) {
  return (
    <label className="flex flex-col space-y-1">
      {label}
      <input {...props} type={type} className="max-w-xs rounded-sm bg-slate-200 px-3 py-2" />
    </label>
  )
}
