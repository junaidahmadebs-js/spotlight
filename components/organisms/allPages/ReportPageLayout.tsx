"use client";

import * as React from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy, 
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type ClassValue =
  | string
  | number
  | false
  | null
  | undefined
  | Record<string, boolean>;

const cn = (...classes: ClassValue[]) => {
  return classes
    .flatMap((c) => {
      if (!c) return [];
      if (typeof c === "string" || typeof c === "number") return [String(c)];
      if (typeof c === "object")
        return Object.entries(c)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key);
      return [];
    })
    .join(" ");
};


function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-white text-gray-900 flex flex-col gap-6 rounded-xl border py-6 shadow-sm", 
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="card-action"
        className={cn(
          "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
          className
        )}
        {...props}
      />
    )
  }

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="card-description"
        className={cn("text-muted-foreground text-sm", className)}
        {...props}
      />
    )
  }


const MenuIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-gray-400 cursor-grab active:cursor-grabbing"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const PencilIcon = (props: React.ComponentProps<'svg'>) => (
    <svg 
        {...props}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="h-3 w-3 text-blue-500 cursor-pointer"
    >
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
);

const CoverImage = () => (
    <div className="flex justify-center items-center h-48 w-full bg-gray-50 rounded-lg">
        <div className="relative h-24 w-40">
            <div className="absolute top-0 left-0 h-10 w-10 bg-yellow-400 rounded-full" />
            <div className="absolute bottom-0 right-0 h-20 w-24 bg-green-500 rounded-lg rotate-12" />
            <div className="absolute bottom-4 right-8 h-12 w-16 bg-green-300 rounded-lg -rotate-6" />
        </div>
    </div>
);

const TextLine = ({ width = "w-full" }: { width?: string }) => (
    <div className={`h-2 bg-gray-200 rounded ${width}`}></div>
);

interface Page {
    id: number;
    title: string;
    content: React.ReactNode;
}


const CoverPageContent = ({ title }: { title: string }) => (
    <CardContent className="flex flex-col items-center">
        <CoverImage />
        <div className="mt-4 text-center">
            <p className="text-xs font-semibold text-gray-700 uppercase">{title}</p>
        </div>
    </CardContent>
);

const TocPageContent = () => (
    <CardContent className="flex flex-col space-y-3">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">CONTENTS</h4>
        <div className="flex justify-between items-center">
            <TextLine width="w-3/4" />
            <span className="text-sm text-gray-600">2</span>
        </div>
        <div className="flex justify-between items-center">
            <TextLine width="w-2/3" />
            <span className="text-sm text-gray-600">3</span>
           
        </div>
        <div className="flex justify-between items-center">
            <TextLine width="w-5/6" />
            <span className="text-sm text-gray-600">4</span>
        </div>
        <div className="flex justify-between items-center">
            <TextLine width="w-3/5" />
            <span className="text-sm text-gray-600">5</span>

        </div>
        <div className="flex justify-between items-center">
            <TextLine width="w-4/5" />
            <span className="text-sm text-gray-600">6</span>

        </div>
    </CardContent>
);

const SummaryPageContent = () => (
    <CardContent className="p-0">
        <div className="flex border-b text-sm">
            <div className="w-1/2 p-4 font-semibold border-b-2 border-blue-600 text-blue-600">Highlights</div>
            <div className="w-1/2 p-4 font-semibold text-gray-500 bg-blue-50">Actions</div>
        </div>
        
        <div className="px-6 py-4">
            <h4 className="text-xs font-semibold text-gray-700 mb-3">Highlights</h4>
            <div className="space-y-2 mb-6">
                <TextLine width="w-5/6" />
                <TextLine width="w-4/5" />
            </div>

            <h4 className="text-xs font-semibold text-gray-700 mb-3">Observations</h4>
            <div className="space-y-2">
                <TextLine width="w-full" />
                <TextLine width="w-3/4" />
            </div>
        </div>
    </CardContent>
);


function SortableCard({ id, page, index }: { id: number, page: Page, index: number }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 0,
        opacity: isDragging ? 0.8 : 1,
        width: '33.333333%' 
    };

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className={cn("w-1/3 flex-shrink-0", { 'shadow-xl ring-2 ring-blue-500': isDragging })}
        >
            <CardHeader className="flex flex-row items-center justify-between !gap-0">
                <div className="flex items-center space-x-2">
                    <CardTitle className="text-base text-blue-600 font-normal">{`${index + 1}. ${page.title}`}</CardTitle>
                    <PencilIcon />
                </div>
               
                <CardAction {...attributes} {...listeners}>
                    <MenuIcon />
                </CardAction>
            </CardHeader>
            {page.content}
        </Card>
    );
}


const ReportPageLayout = () => {
    const [pages, setPages] = React.useState<Page[]>([
        { id: 1, title: "Cover Page", content: <CoverPageContent title="My Report" /> },
        { id: 2, title: "Table of Contents", content: <TocPageContent /> },
        { id: 3, title: "Executive Summary", content: <SummaryPageContent /> },
    ]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor),
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setPages((currentPages) => {
                const oldIndex = currentPages.findIndex((page) => page.id === active.id);
                const newIndex = currentPages.findIndex((page) => page.id === over?.id);

                return arrayMove(currentPages, oldIndex, newIndex);
            });
        }
    }

    const pageIds = pages.map(page => page.id);


    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="mb-8 p-4 bg-white border rounded-lg flex items-center justify-between">
                <h3 className="text-lg font-medium">All Pages (Drag to Reorder)</h3>
            </div>
            
            <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext 
                    items={pageIds}
                    strategy={horizontalListSortingStrategy} 
                >
                    <div className="flex space-x-6">
                        {pages.map((page, index) => (
                            <SortableCard 
                                key={page.id} 
                                id={page.id} 
                                page={page} 
                                index={index} 
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default ReportPageLayout;
