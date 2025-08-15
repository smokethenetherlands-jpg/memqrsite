import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'QR Memory',
  description: 'memqr.ru — страницы памяти с QR-кодом',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-white text-black">{children}</body>
    </html>
  )
}
