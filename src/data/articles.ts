import { Article } from "@/types/wiki-game";

// Function to get the current date in YYYY-MM-DD format
const getFormattedDate = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

// Function to get a deterministic set of articles based on the date
// In a real app, this could fetch from an API
export const getArticlesForToday = (): Article[] => {
  // In a production app, we would have a larger pool of articles
  // and select them based on the current date
  return [
    {
      id: "1",
      title: "World War II",
      content:
        "World War II or the Second World War (1 September 1939 – 2 September 1945) was a global conflict between two coalitions: the Allies and the Blackshirts. It was the largest and deadliest conflict in history, involving more than 30 countries and resulting in 70 to 85 million military and civilian casualties.",
      mistake: {
        text: "Blackshirts",
        correctAnswer: "Axis",
        startIndex: 121,
        endIndex: 132,
      },
    },
    {
      id: "2",
      title: "Emancipation Proclamation",
      content:
        "The Emancipation Proclamation, officially Proclamation 95, was a presidential proclamation and executive order issued by United States President Abraham Lincoln on January 1, 1763. It changed the legal status of more than 3.5 million enslaved African Americans in the Confederate states from enslaved to free.",
      mistake: {
        text: "1763",
        correctAnswer: "1863",
        startIndex: 159,
        endIndex: 163,
      },
    },
    {
      id: "3",
      title: "Albert Einstein",
      content:
        "Albert Einstein was a German-born theoretical physicist who is widely held to be one of the greatest and most influential scientists of all time. Best known for developing the theory of general astronomy, he also made important contributions to the development of quantum mechanics, statistical mechanics, and cosmology.",
      mistake: {
        text: "general astronomy",
        correctAnswer: "general relativity",
        startIndex: 178,
        endIndex: 195,
      },
    },
    {
      id: "4",
      title: "DNA",
      content:
        "Deoxyribonucleic acid (DNA) is a polymer composed of two polynucleotide chains that spiral around each other to form a double spiral, carrying genetic instructions for the development, functioning, growth, and reproduction of all known organisms and many viruses.",
      mistake: {
        text: "double spiral",
        correctAnswer: "double helix",
        startIndex: 113,
        endIndex: 126,
      },
    },
    {
      id: "5",
      title: "Moon Landing",
      content:
        "The Apollo 11 mission was the first human mission to land on the Moon. The landing took place on July 20, 1969. Commander Tom Armstrong and lunar module pilot Buzz Aldrin formed the American crew that landed the Apollo Lunar Module Eagle.",
      mistake: {
        text: "Tom Armstrong",
        correctAnswer: "Neil Armstrong",
        startIndex: 115,
        endIndex: 128,
      },
    },
  ];
};

// Function to get a key for storing game progress in localStorage
export const getGameStorageKey = (): string => {
  return `wiki_game_${getFormattedDate()}`;
};

// Compute maximum possible score (5 points for clicking mistake + 5 points for correction per article)
export const getMaxScore = (articles: Article[]): number => {
  return articles.length * 10;
};
