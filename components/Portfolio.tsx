'use client'

import React from 'react'

type PortfolioProps = {
  photos?: string[]
}

export default function Portfolio({ photos = [] }: PortfolioProps) {
  if (!Array.isArray(photos)) photos = []

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {photos.length === 0 ? (
        <p className="text-sm text-neutral-500">
          Галерея пока пуста. Скоро здесь появятся примеры работ.
        </p>
      ) : (
        photos.map((src, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-neutral-200/60 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`portfolio-${i+1}`}
              className="w-full h-56 object-cover hover:scale-[1.02] transition-transform"
              loading="lazy"
            />
          </div>
        ))
      )}
    </div>
  )
}
