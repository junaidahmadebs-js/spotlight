import React, { ReactNode } from "react";

interface Props {
  number: number;
  title: string;
  children: ReactNode;
}

export default function PageCard({ number, title, children }: Props) {
  return (
    <div className="flex flex-col h-[260px] rounded-lg overflow-hidden">
      <div className="flex justify-between items-center px-3 py-2 text-sm font-semibold text-blue-600 bg-white border-b border-gray-100">
        <span className="flex items-center">
          {number}. {title}
          <span className="ml-2 text-gray-400 text-xs cursor-pointer">✏️</span>
        </span>

        <span className="text-gray-400 cursor-pointer">☰</span>
      </div>

      <div className="flex-grow bg-white relative">{children}</div>
    </div>
  );
}
