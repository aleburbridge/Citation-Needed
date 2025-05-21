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
      // Content is now an array of strings, with spaces indicating where links should be inserted
      content: [
        "World War II or the Second World War (1 September 1939 – 2 September 1945) was a global conflict between two coalitions: the ",
        " and the ",
        ". It was the largest and deadliest conflict in history, involving more than ",
        " countries and resulting in 70 to 85 million military and civilian casualties.",
      ],
      links: [
        {
          id: "ww2-allies",
          text: "Allies",
          isMistake: false,
        },
        {
          id: "ww2-axis",
          text: "Blackshirts",
          correctAnswer: "Axis",
          isMistake: true,
        },
        {
          id: "ww2-countries",
          text: "30",
          isMistake: false,
        },
      ],
      mistakeIndex: 1,
    },
    {
      id: "2",
      title: "Emancipation Proclamation",
      content: [
        "The Emancipation Proclamation, officially Proclamation ",
        ", was a presidential proclamation and executive order issued by United States President ",
        " on January 1, ",
        ". It changed the legal status of more than 3.5 million enslaved African Americans in the ",
        " states from enslaved to free.",
      ],
      links: [
        {
          id: "ep-number",
          text: "95",
          isMistake: false,
        },
        {
          id: "ep-president",
          text: "Abraham Lincoln",
          isMistake: false,
        },
        {
          id: "ep-date",
          text: "1763",
          correctAnswer: "1863",
          isMistake: true,
        },
        {
          id: "ep-states",
          text: "Confederate",
          isMistake: false,
        },
      ],
      mistakeIndex: 2,
    },
    {
      id: "3",
      title: "Albert Einstein",
      content: [
        "Albert Einstein was a ",
        "-born theoretical physicist who is widely held to be one of the greatest and most influential scientists of all time. Best known for developing the theory of ",
        ", he also made important contributions to the development of ",
        " mechanics, statistical mechanics, and cosmology.",
      ],
      links: [
        {
          id: "ae-origin",
          text: "German",
          isMistake: false,
        },
        {
          id: "ae-theory",
          text: "general astronomy",
          correctAnswer: "general relativity",
          isMistake: true,
        },
        {
          id: "ae-field",
          text: "quantum",
          isMistake: false,
        },
      ],
      mistakeIndex: 1,
    },
    {
      id: "4",
      title: "DNA",
      content: [
        "Deoxyribonucleic acid (DNA) is a polymer composed of two ",
        " chains that spiral around each other to form a ",
        ", carrying genetic instructions for the development, functioning, growth, and reproduction of all known ",
        " and many viruses.",
      ],
      links: [
        {
          id: "dna-chains",
          text: "polynucleotide",
          isMistake: false,
        },
        {
          id: "dna-structure",
          text: "double spiral",
          correctAnswer: "double helix",
          isMistake: true,
        },
        {
          id: "dna-applies",
          text: "organisms",
          isMistake: false,
        },
      ],
      mistakeIndex: 1,
    },
    {
      id: "5",
      title: "Moon Landing",
      content: [
        "The Apollo ",
        " mission was the first human mission to land on the Moon. The landing took place on July 20, ",
        ". Commander ",
        " and lunar module pilot Buzz Aldrin formed the American crew that landed the Apollo Lunar Module Eagle.",
      ],
      links: [
        {
          id: "ml-mission",
          text: "11",
          isMistake: false,
        },
        {
          id: "ml-year",
          text: "1969",
          isMistake: false,
        },
        {
          id: "ml-commander",
          text: "Tom Armstrong",
          correctAnswer: "Neil Armstrong",
          isMistake: true,
        },
      ],
      mistakeIndex: 2,
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
