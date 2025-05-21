import React from "react";
import { Article as ArticleType } from "@/types/wiki-game";
import { cn } from "@/lib/utils";

interface ArticleProps {
  article: ArticleType;
  mistakeClicked: boolean;
  onMistakeClick: () => void;
}

export const Article: React.FC<ArticleProps> = ({
  article,
  mistakeClicked,
  onMistakeClick,
}) => {
  const { content, mistake, title } = article;

  // Split the content to render with the clickable mistake
  const beforeMistake = content.substring(0, mistake.startIndex);
  const mistakeText = content.substring(mistake.startIndex, mistake.endIndex);
  const afterMistake = content.substring(mistake.endIndex);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">{title}</h1>
      <p className="text-gray-700 leading-relaxed">
        {beforeMistake}
        <span
          className={cn(
            "cursor-pointer font-medium relative",
            mistakeClicked
              ? "text-red-500 line-through"
              : "text-blue-600 underline decoration-blue-600 underline-offset-2",
            !mistakeClicked && "hover:bg-blue-100",
          )}
          onClick={() => !mistakeClicked && onMistakeClick()}
          aria-label={
            mistakeClicked ? "Identified mistake" : "Potential mistake"
          }
          role="button"
          tabIndex={0}
        >
          {mistakeText}
        </span>
        {afterMistake}
      </p>
    </div>
  );
};
