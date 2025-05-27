import React from "react";
import { Article as ArticleType, Link as LinkType } from "@/types/wiki-game";
import { cn } from "@/lib/utils";
import { Edit3 } from "lucide-react";

interface ArticleProps {
  article: ArticleType;
  clickedLinks: Record<string, boolean>;
  onLinkClick: (linkId: string, isMistake: boolean) => void;
  totalScore?: number;
  maxScore?: number;
}

export const Article: React.FC<ArticleProps> = ({
  article,
  clickedLinks,
  onLinkClick,
  totalScore,
  maxScore,
}) => {
  const { content, links, title } = article;

  const renderArticleContent = () => {
    return (
      <>
        {content.map((text, index) => {
          // Render regular text segment
          if (index === content.length - 1) {
            return <span key={`text-${index}`}>{text}</span>;
          }

          // After each text segment (except the last), render a link
          const link = links[index];
          const linkId = `${article.id}-${index}`;
          const isLinkClicked = clickedLinks[linkId] || false;

          return (
            <React.Fragment key={`segment-${index}`}>
              <span>{text}</span>
              <span
                className={cn(
                  "cursor-pointer transition-all duration-200 touch-manipulation",
                  // Mobile/tablet button styling (default up to md breakpoint)
                  "inline-block rounded-md px-3 py-2 mx-1 my-0.5 min-h-[52px] flex items-center",
                  "text-sm font-medium border-2",
                  // Desktop link styling (md breakpoint and up)
                  "md:inline-flex md:rounded-none md:px-0 md:py-0 md:mx-0 md:my-0 md:min-h-0 md:border-0 md:items-center md:gap-1",
                  "md:text-base md:font-normal",
                  isLinkClicked && link.isMistake
                    ? "text-red-600 line-through bg-red-50 border-red-200 md:bg-transparent"
                    : "text-blue-700 bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300 active:bg-blue-200 md:bg-transparent md:border-transparent md:text-gray-600 md:underline md:decoration-gray-600 md:underline-offset-2 md:hover:bg-gray-100 md:hover:text-gray-800",
                  !isLinkClicked &&
                    "shadow-sm hover:shadow-md md:shadow-none md:hover:shadow-none",
                )}
                onClick={() =>
                  !isLinkClicked && onLinkClick(linkId, link.isMistake)
                }
                aria-label={
                  isLinkClicked && link.isMistake
                    ? "Identified mistake"
                    : "Wikipedia link"
                }
                role="button"
                tabIndex={0}
              >
                {link.text}
                <Edit3 className="w-3 h-3 hidden md:inline text-gray-400" />
              </span>
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="flex flex-col w-full">
            <div className="flex flex-row">
              <h1 className="text-2xl font-bold mb-4 text-gray-900">{title}</h1>
              <div className="flex flex-row w-1/4 justify-end items-start ml-auto">
                {totalScore !== undefined && maxScore !== undefined && (
                  <p className="font-medium flex justify-end ml-auto items-center">
                    <span className="font-medium">Score: </span>
                    <span>{totalScore}</span>
                    <span>/</span>
                    <span>{maxScore}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-gray-700 leading-loose md:leading-relaxed text-base sm:text-lg md:text-base">
        {renderArticleContent()}
      </p>
    </div>
  );
};
