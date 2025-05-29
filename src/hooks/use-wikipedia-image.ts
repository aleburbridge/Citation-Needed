import { useState, useEffect, useCallback } from "react";

interface WikipediaImageState {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

interface WikipediaApiResponse {
  query: {
    pages: {
      [pageId: string]: {
        pageid: number;
        title: string;
        thumbnail?: {
          source: string;
          width: number;
          height: number;
        };
        pageimage?: string;
      };
    };
  };
}

// In-memory cache to avoid repeated API calls for the same article
const imageCache = new Map<string, string | null>();

/**
 * Custom hook to fetch Wikipedia article main image
 * @param articleTitle - The title of the Wikipedia article
 * @returns Object containing imageUrl, isLoading, and error states
 */
export const useWikipediaImage = (
  articleTitle: string,
): WikipediaImageState => {
  const [state, setState] = useState<WikipediaImageState>({
    imageUrl: null,
    isLoading: true,
    error: null,
  });

  const fetchImage = useCallback(async (title: string) => {
    // Normalize the title for caching (trim whitespace and handle case)
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      setState({
        imageUrl: null,
        isLoading: false,
        error: "Article title is required",
      });
      return;
    }

    // Check cache first
    if (imageCache.has(normalizedTitle)) {
      const cachedImageUrl = imageCache.get(normalizedTitle);
      setState({
        imageUrl: cachedImageUrl,
        isLoading: false,
        error: cachedImageUrl === null ? "No image available" : null,
      });
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Construct Wikipedia API URL with proper parameters
      const apiUrl = new URL("https://en.wikipedia.org/w/api.php");
      apiUrl.searchParams.set("action", "query");
      apiUrl.searchParams.set("format", "json");
      apiUrl.searchParams.set("prop", "pageimages");
      apiUrl.searchParams.set("titles", normalizedTitle);
      apiUrl.searchParams.set("pithumbsize", "300"); // Request larger thumbnail
      apiUrl.searchParams.set("piprop", "thumbnail");
      apiUrl.searchParams.set("origin", "*"); // Required for CORS

      const response = await fetch(apiUrl.toString());

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: WikipediaApiResponse = await response.json();

      if (!data.query || !data.query.pages) {
        throw new Error("Invalid API response format");
      }

      const pages = data.query.pages;
      const pageIds = Object.keys(pages);

      if (pageIds.length === 0) {
        throw new Error("No page found for the given title");
      }

      const page = pages[pageIds[0]];

      // Check if the page exists (negative page IDs indicate missing pages)
      if (page.pageid && page.pageid < 0) {
        throw new Error("Article not found");
      }

      const imageUrl = page.thumbnail?.source || null;

      // Cache the result (null if no image)
      imageCache.set(normalizedTitle, imageUrl);

      setState({
        imageUrl,
        isLoading: false,
        error: imageUrl === null ? "No image available for this article" : null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch image";

      // Cache the failure to avoid repeated failed requests
      imageCache.set(normalizedTitle, null);

      setState({
        imageUrl: null,
        isLoading: false,
        error: errorMessage,
      });
    }
  }, []);

  useEffect(() => {
    if (articleTitle) {
      fetchImage(articleTitle);
    } else {
      setState({
        imageUrl: null,
        isLoading: false,
        error: "No article title provided",
      });
    }
  }, [articleTitle, fetchImage]);

  return state;
};

/**
 * Utility function to clear the image cache (useful for testing or memory management)
 */
export const clearWikipediaImageCache = (): void => {
  imageCache.clear();
};

/**
 * Utility function to get cache size (useful for debugging)
 */
export const getWikipediaImageCacheSize = (): number => {
  return imageCache.size();
};
