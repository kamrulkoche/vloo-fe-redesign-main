"use client";

export default function BlinkingText({ onClick, text }) {
  return (
    <div className="bg-[#00A481] py-7 text-center" onClick={onClick}>
      <p className="animate-blink cursor-pointer text-2xl font-medium">
        {text}
      </p>
    </div>
  );
}
