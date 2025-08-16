import BindExistingForm from '@/components/BindExistingForm';
import React from 'react'
import Portfolio from '@/components/Portfolio'

export const metadata = {
  title: 'QR Memory — страницы памяти с QR‑кодом',
  description: 'Оставьте заявку на изготовление таблички с QR‑кодом и созданием страницы памяти.'
}

const demoPhotos: string[] = [
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop',
]

export default function Page() {
  return (
    <main>
      {/* ...ваши остальные секции */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Portfolio photos={demoPhotos} />
        </div>
      </section>
    </main>
  )
}
