import { Icon, IconType } from '@components/Icons';
import { Nullable } from '@utils/types';
import classNames from 'classnames';
import React from 'react'

type Props = {
  label: string;
  type?: 'text' | 'number' | 'email';
  helperText?: string;
  state?: Nullable<'error' | 'success'>
  iconLeft?: IconType;
  iconRight?: IconType;
  fullWidth?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, type = 'text', helperText, state, iconLeft, iconRight, fullWidth = false, ...props }: Props) {
  return (
    <div className={classNames(
      "flex flex-col items-start space-y-2 flex-1",
      fullWidth ? "max-w-none" : "max-w-[320px]",
    )}>
      <label className="relative w-full">
        <input type={type} placeholder={label} {...props} aria-invalid="true" className={classNames(
          "peer h-14 button-md w-full text-gray-2 px-4 pt-7 pb-2 bg-white border rounded-2xl overflow-hidden placeholder-transparent transition-all appearance-none",
          "border-[#f1f1f1] focus:border-blue-3 focus:outline outline-blue-3 outline-1",
          "hover:border-blue-3",
          !!iconLeft ? 'pl-12' : 'pl-4',
          !!iconRight ? 'pr-12' : 'pr-4',
          state === 'success' && "text-green-1 border-green-1",
          state === 'error' && "text-red-3 border-red-3",
          "disabled:bg-gray-12 disabled:text-gray-8 disabled:border-[#f1f1f1]"
        )} />
        <p className={classNames(
          "absolute body-small text-gray-8 top-1.5 transition-all",
          "peer-placeholder-shown:top-4 peer-focus:top-1.5",
          !!iconLeft ? 'left-12' : 'left-4',
        )}>{label}</p>
        {iconLeft && (
          <div className="absolute top-3 left-2">
            <Icon type={iconLeft} size="md" />
          </div>
        )}
        {iconRight && (
          <div className="absolute top-3 right-2">
            <Icon type={iconRight} size="md" />
          </div>
        )}
      </label>

      {helperText && <p className="caption text-gray-8">{helperText}</p>}
    </div>
  )
}
