import React from "react";
import { Article as ArticleType, Link as LinkType } from "@/types/wiki-game";
import { cn } from "@/lib/utils";
import { Edit3, ImageIcon, Loader2 } from "lucide-react";
import { useWikipediaImage } from "@/hooks/use-wikipedia-image";

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
  const {
    imageUrl,
    isLoading: imageLoading,
    error: imageError,
  } = useWikipediaImage(title);

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

  const renderWikipediaImage = () => {
    if (imageLoading) {
      return (
        <div className="w-full sm:w-48 h-32 sm:h-36 bg-gray-100 rounded-lg flex items-center justify-center mb-4 sm:mb-0 sm:mr-4 flex-shrink-0">
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-sm">Loading image...</span>
          </div>
        </div>
      );
    }

    if (imageError || !imageUrl) {
      return (
        <div className="w-full sm:w-48 h-32 sm:h-36 bg-gray-100 rounded-lg flex items-center justify-center mb-4 sm:mb-0 sm:mr-4 flex-shrink-0">
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <ImageIcon className="w-8 h-8" />
            <span className="text-xs text-center px-2">No image available</span>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full sm:w-48 h-32 sm:h-36 mb-4 sm:mb-0 sm:mr-4 flex-shrink-0">
        <img
          src={imageUrl}
          alt={`Wikipedia image for ${title}`}
          className="w-full h-full object-cover rounded-lg shadow-sm"
          onError={(e) => {
            // Fallback for broken images
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                  <div class="flex flex-col items-center gap-2 text-gray-400">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span class="text-xs text-center px-2">Image unavailable</span>
                  </div>
                </div>
              `;
            }
          }}
        />
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
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

      {/* Content with image layout */}
      <div className="flex flex-col sm:flex-row">
        {/* Wikipedia Image */}
        {renderWikipediaImage()}

        {/* Article Content */}
        <div className="flex-1">
          <p className="text-gray-700 leading-loose md:leading-relaxed text-base sm:text-lg md:text-base">
            {renderArticleContent()}
          </p>
        </div>
      </div>
    </div>
  );
};
