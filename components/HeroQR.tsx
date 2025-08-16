"use client";
export default function HeroQR() {
  return (
    <div className="relative isolate h-[440px] w-full">
      {/* мягкий фон справа сверху */}
      <div
        className="absolute -inset-10 rounded-[44px]"
        style={{ background: 'radial-gradient(1100px 440px at 70% 0%, rgba(246,243,238,.92), rgba(255,255,255,0))' }}
      />
      {/* карточка c псевдо‑QR */}
      <div className="absolute right-4 sm:right-10 top-0 rotate-6">
        <img
          src="/qr/brand-qr.svg"
          alt="QR Memory"
          className="w-[240px] sm:w-[260px] drop-shadow-2xl select-none"
          draggable={false}
        />
      </div>
      {/* свеча под карточкой */}
      <div className="absolute right-24 sm:right-36 top-[255px] pointer-events-none">
        <img
          src="/qr/candle.svg"
          alt="candle"
          className="w-[64px] sm:w-[74px] opacity-90"
          draggable={false}
        />
      </div>
    </div>
  );
}
