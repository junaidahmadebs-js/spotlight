"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PageCard from "../../atoms/PageCard"; 
import React from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  id: string;
  title: string;
  index: number;
  pageTitle:string;
  content: "image" | "text" | "highlights";
  image?: string;
  highlights?: string[];
  actions?: string[];
  showCustomize?: boolean;

}

export default function SortableCard({
  id,
  title,
  pageTitle,
  index,
  content, 
  image, 
  showCustomize,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const router = useRouter();
  
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  const TextLine = ({ width = "w-full" }: { width?: string }) => (
    <div className={`h-2 bg-gray-300 rounded ${width}`}></div>
  );
  
  
const handleCustomiseClick = (title: string) => {
    router.push(`/customise/${title}`);
};     
      


  const renderCardContent = () => {
    switch (content) {
      case "image":
        return (
          <div className="flex flex-col items-center justify-center p-4 h-40 bg-white">
            <div className="flex items-center justify-center w-3/4 h-3/4 bg-gray-100 rounded-lg relative overflow-hidden">
              <div className="absolute top-4 left-4 w-10 h-10 bg-yellow-400 rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-full h-1/2 bg-green-500 rounded-tr-[50%]"></div>
              <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-teal-400 rounded-tr-[40%]"></div>
            </div>
            <div className="text-xs font-semibold mt-2 text-gray-700">{image}</div>
          </div>
        );
      case "text":
        return (
          <div className="p-4 h-40 bg-white">
            {title === "Table of Contents" && (
                <h4 className="font-sans text-sm font-bold text-gray-700 mb-4">CONTENTS</h4>
            )}
            <div className="space-y-2">
              {[2, 3, 4, 5, 6].map((page, i) => (
                <div key={page} className="flex justify-between items-center">
                  <TextLine width={i % 2 === 0 ? "w-4/5" : "w-3/4"} />
                  <span className="text-xs text-gray-500">{page}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "highlights":
        return (
          <div className="flex flex-col h-40 bg-white relative">
            

            <div className="flex flex-grow overflow-hidden p-4">
                <div className="flex-1 px-3 py-2 border-r border-gray-100">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Highlights</p>

                    <div className="space-y-1 mb-2">
                        <TextLine width="w-5/6" />
                        <TextLine width="w-3/4" />
                        <TextLine width="w-4/5" />
                        <TextLine width="w-5/6" />
                    </div>
                    <p className="text-xs font-semibold text-gray-700 mt-2 mb-1">Observations</p>
                    <div className="space-y-1">
                        <TextLine width="w-full" />
                        <TextLine width="w-3/4" />
                        <TextLine width="w-5/6" />
                        <TextLine width="w-3/4" />
                    </div>
                </div>
                
                <div className="w-1/3 bg-blue-50/50 p-2 mb-5">
                 <p className="text-xs font-semibold text-gray-700 mt-2 mb-1">Actions</p>
                </div>
               
            </div>
            
            <div className="absolute bottom-0 right-2 mt-2">
                <button 
                    className="text-xs text-blue-600 font-semibold border border-blue-600 rounded 
                               hover:bg-blue-50/50 p-1 px-2 cursor-pointer mr-4"
                    onClick={() => handleCustomiseClick(pageTitle)}       >
                    Customise 
                </button>
            </div>
            </div>
        );
      default:
        return 
        <div className="h-40 bg-gray-100 rounded p-4">Default Page Content</div>;
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className="w-[300px] shadow-md rounded-lg border border-gray-200 bg-white transition-shadow duration-200" 
    >
      <PageCard number={index + 1} title={title}>
        {renderCardContent()}
      
        {showCustomize && (
            <div className="p-5 pt-0 flex justify-end">
                <button 
                    className="text-xs text-blue-600 font-semibold border border-blue-600 rounded 
                                hover:bg-blue-50 p-1 px-2 cursor-pointer"
                    onClick={() => handleCustomiseClick(title)} 
                >
                    Customize 
                </button>
            </div>
        )}
        </PageCard>
    </div>
  );
}