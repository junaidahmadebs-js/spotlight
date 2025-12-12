"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const EditableSection = ({
  title,
  currentContent,
  onGenerateAI,
}: {
  title: string;
  currentContent: string | React.ReactNode;
  onGenerateAI: (prompt: string) => void;
}) => {
  const [isAiMode, setIsAiMode] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const handleClickAI = () => {
    setIsAiMode(true);
  };

  const handleGenerate = () => {
    if (aiPrompt.trim() !== "") {
      onGenerateAI(aiPrompt);
    }
    setAiPrompt("");
    setIsAiMode(false);
  };

  const handleCancel = () => {
    setAiPrompt("");
    setIsAiMode(false);
  };

  return (
    <div className="border-b border-gray-200 py-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

        <div className="flex items-center space-x-3">
          <button
            className="text-blue-600 text-sm flex items-center hover:text-blue-800 disabled:text-gray-400"
            onClick={handleClickAI}
            disabled={isAiMode}
          >
            <span className="mr-1 text-base leading-none">
              {isAiMode ? "🤖" : "✏️"}
            </span>
            {isAiMode ? "AI Mode Active" : "Edit with AI"}
          </button>
          <span className="text-gray-500 text-xl font-bold cursor-pointer hover:text-gray-700 leading-none">
            ...
          </span>
        </div>
      </div>

      <div className="editable-content">
        {isAiMode ? (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
            <p className="font-semibold mb-2">AI Prompt:</p>
            <textarea
              className="w-full h-20 p-2 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              placeholder="Type your prompt here..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                className="px-3 py-1 text-gray-700 text-xs rounded hover:bg-gray-100 border"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                onClick={handleGenerate}
                disabled={aiPrompt.trim() === ""}
              >
                Generate
              </button>
            </div>
          </div>
        ) : (
          <div className="p-2 border border-dashed border-transparent hover:border-gray-300 transition duration-100 cursor-pointer">
            {currentContent}
          </div>
        )}
      </div>
    </div>
  );
};

interface ExecutiveSummaryProps {
  pageTitle: string;
}

export default function ExecutiveSummaryComponent({
  pageTitle,
}: ExecutiveSummaryProps) {
  const router = useRouter();

  const initialOverview =
    "During the period we have noted the following trends in the report and have made relevant observations and recommendations.";

  const [generalOverviewContent, setGeneralOverviewContent] =
    useState(initialOverview);

  const [revenueContent, setRevenueContent] = useState(
    "The Revenue for Oct 2025 was AED 135,000, compared to AED 857,241 last month. This represents a decrease of AED 722,241, or 84.25%."
  );

  const [isGlobalAiMode, setIsGlobalAiMode] = useState(false);
  const [hasRecommendations, setHasRecommendations] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const recommendationContent =
    "\n\n**Recommendations:** We strongly suggest prioritizing the automation of the reporting process to reduce human error and improve the speed of analysis by 30% in the next quarter.";

  const suggestThreePrompts = (prompt: string, section: string) => {
    return [
      `Rewrite the ${section} professionally with clearer structure and improved readability. Focus on: ${prompt}`,
      `Summarize the ${section} key insights concisely while retaining important analytical details. User input: ${prompt}`,
      `Transform the ${section} into a more executive-level narrative emphasizing trends and impact. Based on: ${prompt}`,
    ];
  };

  const handleGeneralOverviewAI = (prompt: string) => {
    const prompts = suggestThreePrompts(prompt, "general overview");

    const simulatedResponse =
      `Suggested AI Prompts:\n\n1. ${prompts[0]}\n2. ${prompts[1]}\n3. ${prompts[2]}\n\n` +
      `Updated Content:\nThe overview section has been enhanced using your refined prompts to better represent key insights.`;

    const finalContent =
      simulatedResponse + (hasRecommendations ? recommendationContent : "");
    setGeneralOverviewContent(finalContent);
  };

  const handleRevenueAI = (prompt: string) => {
    const prompts = suggestThreePrompts(prompt, "revenue analysis");

    const simulatedResponse =
      `Suggested AI Prompts:\n\n1. ${prompts[0]}\n2. ${prompts[1]}\n3. ${prompts[2]}\n\n` +
      `Updated Revenue Analysis:\n This section now reflects a more structured financial explanation using improved prompts.`;

    setRevenueContent(simulatedResponse);
  };

  const handleGlobalAISuggestions = () => {
    setIsGlobalAiMode((prev) => !prev);
  };

  const handleIncludeRecommendations = () => {
    setHasRecommendations((prev) => {
      const newHasRecommendations = !prev;
      if (newHasRecommendations) {
        const cleanContent = generalOverviewContent.includes(
          "Suggested AI Prompts"
        )
          ? initialOverview
          : generalOverviewContent;
        setGeneralOverviewContent(
          cleanContent.split(recommendationContent)[0] + recommendationContent
        );
      } else {
        setGeneralOverviewContent((prevContent) =>
          prevContent.replace(recommendationContent, "")
        );
      }
      return newHasRecommendations;
    });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="border-b border-gray-200 px-8 py-4 flex items-center space-x-4 bg-white shadow-sm">
        <span
          className="text-blue-600 font-semibold cursor-pointer hover:text-blue-800 text-sm"
          onClick={() => router.push("/")}
        >
          All Pages
        </span>
        <span className="text-gray-500 text-sm">› </span>
        <h1 className="text-sm font-bold text-gray-800 flex items-center">
          {pageTitle}{" "}
          <span className="text-gray- text ml-1 cursor-pointer">
            Executive Summary▾{" "}
          </span>
        </h1>
      </header>

      <div className="max-w-6xl mx-auto p-5 bg-white shadow-md">
        <div className="flex justify-between items-start mb-0">
          {showAlert && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-8 py-3 rounded-lg flex items-start w-2/3 mt-1 mr-4">
              <span className="mr-1 text-lg font-bold">ⓘ</span>
              <p className="text-sm leading-relaxed flex-grow">
                Click any heading or description to edit. Changes are saved
                automatically when you exit the text box.
              </p>
              <span
                className="ml-auto text-blue-700 cursor-pointer text-lg hover:text-blue-900"
                onClick={handleCloseAlert}
              >
                x
              </span>
            </div>
          )}

          <div className="flex space-x-3 mt-1">
            <button
              className={`px-4 py-2 text-sm border rounded-lg flex items-center transition duration-150 ${
                hasRecommendations
                  ? "bg-green-50 text-green-700 border-green-300 hover:bg-green-100"
                  : "text-blue-700 border-blue-200 hover:bg-blue-50"
              }`}
              onClick={handleIncludeRecommendations}
            >
              {hasRecommendations
                ? "✅ Recommendations Included"
                : "+ Include recommendations"}
            </button>
            <button
              className="px-4 py-2 text-sm text-white bg-blue-700 rounded-lg hover:bg-blue-800 flex items-center transition duration-150"
              onClick={handleGlobalAISuggestions}
            >
              + AI suggestions
            </button>
          </div>
        </div>

        {isGlobalAiMode && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg my-4 shadow-sm">
            <h2 className="text-lg font-bold text-purple-800 mb-2">
              💡 Global AI Suggestions (Click on Edit with AI for
              section-specific suggestions)
            </h2>
            <p className="text-sm text-purple-700 mb-3">
              Here are some high-level prompts to improve the **entire**
              Executive Summary.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>
                Generate a 50-word, high-level summary of the entire report for
                the CEO.
              </li>
              <li>
                Identify the top 3 risks and opportunities presented in the
                current report data.
              </li>
              <li>
                Reformat the entire document using bullet points and
                professional business terminology.
              </li>
            </ul>
            <div className="flex justify-end mt-3">
              <button
                className="px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700"
                onClick={handleGlobalAISuggestions}
              >
                Close Suggestions
              </button>
            </div>
          </div>
        )}

        <div className="border-b border-gray-200 py-6 mb-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Highlights</h2>
            <span className="text-gray-500 text-xl font-bold cursor-pointer hover:text-gray-700 leading-none">
              ...
            </span>
          </div>
        </div>

        <EditableSection
          title="General Overview"
          currentContent={generalOverviewContent}
          onGenerateAI={handleGeneralOverviewAI}
        />

        <EditableSection
          title="Revenue"
          currentContent={revenueContent}
          onGenerateAI={handleRevenueAI}
        />
      </div>
    </div>
  );
}
