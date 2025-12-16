"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

interface ExecutiveSummaryProps {
  pageTitle?: string;
}

const EditableSection = ({
  id,
  index,
  title,
  currentContent,
  onGenerateAI,
}: {
  id: string;
  index: number;
  title: string;
  currentContent: string | React.ReactNode;
  onGenerateAI: (id: string, prompt: string) => void;
}) => {
  const [isAiMode, setIsAiMode] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const handleGenerate = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (aiPrompt.trim() !== "") {
      onGenerateAI(id, aiPrompt);
    }
    setAiPrompt("");
    setIsAiMode(false);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`relative bg-white border border-gray-200 transition-all duration-200 rounded-none -mt-[1px] ${
            snapshot.isDragging 
              ? "shadow-2xl ring-1 ring-gray-400 scale-[1.01] cursor-grabbing z-50 border-gray-800" 
              : "cursor-grab hover:border-gray-400 hover:z-10 hover:shadow-sm"
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <div className="flex items-center space-x-3">
                <button
                  className="text-blue-600 text-sm flex items-center hover:text-blue-800 font-medium"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    setIsAiMode(!isAiMode);
                  }}
                >
                  <span className="mr-1">{isAiMode ? "🤖" : "✏️"}</span>
                  {isAiMode ? "Cancel" : "Edit with AI"}
                </button>
              </div>
            </div>

            <div className="editable-content" onClick={(e) => e.stopPropagation()}>
              {isAiMode ? (
                <div className="p-3 bg-blue-50 border border-blue-800 rounded-none">
                  <textarea
                    className="w-full h-20 p-2 border border-blue-300 rounded-none text-gray-800 text-sm outline-none focus:border-gray-400"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />
                  <div className="flex justify-end mt-2">
                    <button 
                      className="px-4 py-1.5 bg-blue-600 text-white text-xs font-medium" 
                      onClick={handleGenerate}
                    >
                      Generate
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-2 border border-dashed border-transparent hover:border-gray-300 hover:bg-gray-100 transition duration-100 cursor-pointer text-gray-700 leading-relaxed">
                  {currentContent}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default function ExecutiveSummaryComponent({ pageTitle }: ExecutiveSummaryProps) {
  const [sections, setSections] = useState([
    {
      id: "overview",
      title: "General Overview",
      content: "During the period we have noted the following trends in the report and have made relevant observations and recommendations."
    },
    {
      id: "revenue",
      title: "Revenue",
      content: "The Revenue for Oct 2025 was AED 135,000, compared to AED 857,241 last month. This represents a decrease of AED 722,241, or 84.25%."
    }
  ]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSections(items);
  };

  const handleAIUpdate = (id: string, prompt: string) => {
    setSections(prev => prev.map(s => 
      s.id === id ? { ...s, content: s.content + `\n\n[AI Edit: ${prompt}]` } : s
    ));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 px-1 font-sans">
          {pageTitle || "Highlights"}
        </h2>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sections-list">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="shadow-sm">
                {sections.map((section, index) => (
                  <EditableSection
                    key={section.id}
                    id={section.id}
                    index={index}
                    title={section.title}
                    currentContent={section.content}
                    onGenerateAI={handleAIUpdate}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}