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
        images?: Array<{
          title: string;
        }>;
      };
    };
  };
}

interface WikipediaImageInfoResponse {
  query: {
    pages: {
      [pageId: string]: {
        imageinfo?: Array<{
          url: string;
          descriptionurl: string;
          width: number;
          height: number;
        }>;
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

  const fetchImageFromFile = useCallback(
    async (filename: string): Promise<string | null> => {
      try {
        const imageInfoUrl = new URL("https://en.wikipedia.org/w/api.php");
        imageInfoUrl.searchParams.set("action", "query");
        imageInfoUrl.searchParams.set("format", "json");
        imageInfoUrl.searchParams.set("titles", filename);
        imageInfoUrl.searchParams.set("prop", "imageinfo");
        imageInfoUrl.searchParams.set("iiprop", "url");
        imageInfoUrl.searchParams.set("origin", "*");

        const response = await fetch(imageInfoUrl.toString());
        if (!response.ok) return null;

        const data: WikipediaImageInfoResponse = await response.json();
        const pages = data.query?.pages;
        if (!pages) return null;

        const pageIds = Object.keys(pages);
        if (pageIds.length === 0) return null;

        const page = pages[pageIds[0]];
        return page.imageinfo?.[0]?.url || null;
      } catch {
        return null;
      }
    },
    [],
  );

  const fetchImage = useCallback(
    async (title: string) => {
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
        // First try: Get pageimages and all images
        const apiUrl = new URL("https://en.wikipedia.org/w/api.php");
        apiUrl.searchParams.set("action", "query");
        apiUrl.searchParams.set("format", "json");
        apiUrl.searchParams.set("prop", "pageimages|images");
        apiUrl.searchParams.set("titles", normalizedTitle);
        apiUrl.searchParams.set("pithumbsize", "400"); // Request larger thumbnail
        apiUrl.searchParams.set("piprop", "thumbnail");
        apiUrl.searchParams.set("imlimit", "10"); // Get first 10 images to find a good one
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

        // First try to get the main article image (pageimage)
        let imageUrl = null;
        
        if (page.pageimage) {
          console.log(`Found main article image: ${page.pageimage}`);
          imageUrl = await fetchImageFromFile(page.pageimage);
          if (imageUrl) {
            console.log(`Successfully retrieved main article image URL`);
          } else {
            console.log(`Failed to get URL for main article image: ${page.pageimage}`);
          }
        }

        // If no main image, try the thumbnail
        if (!imageUrl && page.thumbnail?.source) {
          console.log(`Using article thumbnail as fallback`);
          imageUrl = page.thumbnail.source;
        }

        // Only if both main image and thumbnail fail, try other images
        if (!imageUrl && page.images && page.images.length > 0) {
          console.log(`No main image found, searching through article images`);
          // Filter out common non-meaningful images
          const meaningfulImages = page.images.filter((img) => {
            const filename = img.title.toLowerCase();
            // Only filter out clearly non-relevant images
            return (
              !filename.includes("commons-logo") &&
              !filename.includes("wikimedia") &&
              !filename.includes("edit-icon") &&
              !filename.includes("ambox") &&
              !filename.includes("stub") &&
              // Remove the SVG filter as some diagrams and technical drawings are SVGs
              (filename.includes(".jpg") ||
                filename.includes(".jpeg") ||
                filename.includes(".png") ||
                filename.includes(".svg"))
            );
          });

          // Try to get the URL for the first meaningful image
          if (meaningfulImages.length > 0) {
            console.log(`Found ${meaningfulImages.length} potential images for "${normalizedTitle}"`);
            imageUrl = await fetchImageFromFile(meaningfulImages[0].title);
            if (!imageUrl) {
              console.log(`Failed to get URL for image: ${meaningfulImages[0].title}`);
            }
          } else {
            console.log(`No meaningful images found for "${normalizedTitle}"`);
          }
        }

        // Cache the result (null if no image)
        imageCache.set(normalizedTitle, imageUrl);

        if (!imageUrl) {
          console.log(`No image found for "${normalizedTitle}" after all attempts`);
        }

        setState({
          imageUrl,
          isLoading: false,
          error:
            imageUrl === null ? "No image available for this article" : null,
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch image";
        
        console.error(`Error fetching image for "${normalizedTitle}":`, error);

        // Cache the failure to avoid repeated failed requests
        imageCache.set(normalizedTitle, null);

        setState({
          imageUrl: null,
          isLoading: false,
          error: errorMessage,
        });
      }
    },
    [fetchImageFromFile],
  );

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
  return imageCache.size;
};

/**
 * Utility function to check if a specific title is cached
 */
export const isWikipediaImageCached = (title: string): boolean => {
  return imageCache.has(title.trim());
};
