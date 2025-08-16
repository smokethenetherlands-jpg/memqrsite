"use client";
export default function HeroQR() {
  return (
    <div className="relative isolate h-[420px] w-full">
      <div className="absolute right-6 sm:right-10 top-0 rotate-6">
        <img
          src="/qr/brand-qr.svg"
          alt="QR Memory"
          className="w-[210px] sm:w-[230px] drop-shadow-2xl select-none"
          draggable={false}
        />
      </div>
      <div className="absolute right-24 sm:right-32 top-[230px] pointer-events-none">
        <img
          src="/qr/candle.svg"
          alt="candle"
          className="w-[60px] sm:w-[70px] opacity-90"
          draggable={false}
        />
      </div>
    </div>
  );
}
