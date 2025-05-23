import React from "react";
import { Article as ArticleType, Link as LinkType } from "@/types/wiki-game";
import { cn } from "@/lib/utils";

interface ArticleProps {
  article: ArticleType;
  clickedLinks: Record<string, boolean>;
  onLinkClick: (linkId: string, isMistake: boolean) => void;
}

export const Article: React.FC<ArticleProps> = ({
  article,
  clickedLinks,
  onLinkClick,
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
                  "cursor-pointer",
                  isLinkClicked && link.isMistake
                    ? "text-red-500 line-through"
                    : "text-blue-600 underline decoration-blue-600 underline-offset-2",
                  !isLinkClicked && "hover:bg-blue-100",
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
              </span>
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">{title}</h1>
      <p className="text-gray-700 leading-relaxed">{renderArticleContent()}</p>
    </div>
  );
};
