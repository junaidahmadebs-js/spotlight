"use client";

import SortableCard from "../components/organisms/allPages/SortableCard";
import ReportHeader from "../components/molecules/ReportHeader";

import React from "react";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";

import { arrayMove, SortableContext } from "@dnd-kit/sortable";

interface Card {
  id: string;
  title: string;
  content: "image" | "text" | "highlights";
  image?: string;
  highlights?: string[];
  actions?: string[];
  pageTitle?: string;
  showCustomize?: boolean;
  url: string;
}

export default function Home() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const [cards, setCards] = useState<Card[]>([
    {
      id: "1",
      title: "Cover Page",
      content: "image",
      image: "MY REPORT",
      url: "/",
    },
    {
      id: "2",
      title: "Table of Contents",
      content: "text",
      url: "/",
    },
    {
      id: "3",
      title: "Executive Summary",
      content: "highlights",
      highlights: ["Observations", "Highlights"],
      actions: ["Actions"],
      showCustomize: false,
      url: "/executive",
    },
    {
      id: "4",
      title: "Introduction",
      content: "text",
      showCustomize: true,
      url: "/layout",
    },
    {
      id: "5",
      title: "Analysis",
      content: "text",
      showCustomize: true,
      url: "/executive",
    },
    {
      id: "6",
      title: "Conclusion",
      content: "text",
      showCustomize: true,
      url: "/executive",
    },
    {
      id: "7",
      title: "Recommendations",
      content: "text",
      showCustomize: true,
      url: "/executive",
    },
    {
      id: "8",
      title: "Financials",
      content: "text",
      showCustomize: true,
      url: "/executive",
    },
    {
      id: "9",
      title: "Appendix",
      content: "text",
      showCustomize: true,
      url: "/executive",
    },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    setCards((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen m-5">
      <ReportHeader />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-4">
        <div className="text-sm font-semibold text-gray-700 mb-4 bg-gray-200 p-2">
          All Pages
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={cards.map((c) => c.id)}>
            <div className="flex flex-wrap gap-6 justify-center">
              {cards.map((card, index) => (
                <SortableCard
                  key={card.id}
                  id={card.id}
                  index={index}
                  title={card.title}
                  content={card.content}
                  image={card.image}
                  highlights={card.highlights}
                  actions={card.actions}
                  pageTitle={card.url}
                  showCustomize={card.showCustomize}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    
    </div>
  );
}
