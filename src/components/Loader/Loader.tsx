import React from 'react'
import { LineWave } from 'react-loader-spinner'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from 'root/tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig)

export function Loader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <LineWave
        width='200'
        color={(fullConfig.theme?.colors?.['gray-2'] as string) || '#050406'}
      />
    </div>
  )
}
