import './globals.css'
export const metadata = {
  title: 'QR Memory',
  description: 'memqr.ru — страницы памяти с QR-кодом',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="ru"><body>{children}</body></html>)
}
