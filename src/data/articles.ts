import { Article } from "@/types/wiki-game";
import { articleGroups } from "./articleHistory";
import { formatDate } from "@/lib/utils";

export const getArticlesForToday = (): Article[] => {
  return [
    {
      id: "1",
      title: "Marie Curie",
      content: [
        "Marie Curie was a ",
        "-born physicist and chemist who conducted pioneering research on ",
        ". She was the first woman to win a ",
        " Prize, and the only person to win it in two different fields. She discovered the elements ",
        " and ",
        ". Her work with radioactive materials led to the development of ",
        ".",
      ],
      links: [
        {
          text: "Russian",
          correctAnswer: ["Polish", "Poland"],
          isMistake: true,
        },
        {
          text: "radioactivity",
          isMistake: false,
        },
        {
          text: "Nobel",
          isMistake: false,
        },
        {
          text: "polonium",
          isMistake: false,
        },
        {
          text: "radium",
          isMistake: false,
        },
        {
          text: "X-ray machines",
          isMistake: false,
        },
      ],
    },
    {
      id: "2",
      title: "Colosseum",
      content: [
        "The Colosseum is an elliptical amphitheater in the center of ",
        ". It is the ",
        " and held an average of ",
        " spectators. In Ancient times, the structure was used for ",
        ", ",
        ", and ",
        " reannactments.",
      ],
      links: [
        {
          text: "Rome",
          isMistake: false,
        },
        {
          text: "largest standing amphitheatre in the world",
          isMistake: false,
        },
        {
          text: "65,000",
          isMistake: false,
        },
        {
          text: "gladiatorial contests",
          isMistake: false,
        },
        {
          text: "mock sea battles",
          isMistake: false,
        },
        {
          text: "medieval battle",
          correctAnswer: ["battle", "ancient", "ancient battle"],
          isMistake: true,
        },
      ],
    },
    {
      id: "3",
      title: "Bebop",
      content: [
        "Bebop is a style of",
        " that developed in the early to mid ",
        " in ",
        ". The style is characterized by fast tempos, complex chord progressions, and ",
        ". Two leading figures in the development of bebop were ",
        " and ",
        ".",
      ],
      links: [
        {
          text: " jazz",
          isMistake: false,
        },
        {
          text: "1940s",
          isMistake: false,
        },
        {
          text: "Japan",
          isMistake: true,
          correctAnswer: [
            "The US",
            "USA",
            "the USA",
            "united states",
            "the united states",
            "The united states of america",
            "america",
          ],
        },
        {
          text: "improvisation",
          isMistake: false,
        },
        {
          text: "Charlie Parker",
          isMistake: false,
        },
        {
          text: "Dizzy Gillespie",
          isMistake: false,
        },
      ],
    },
    {
      id: "4",
      title: "Mount Everest",
      content: [
        "Mount Everest is Earth's highest mountain above sea level, located in the ",
        " mountain range. It stands at ",
        " meters above sea level. The first successful summit was achieved by ",
        " and ",
        " in ",
        ".",
      ],
      links: [
        {
          text: "Himalayan",
          isMistake: false,
        },
        {
          text: "8,848",
          isMistake: false,
        },
        {
          text: "Edmund Hillary",
          isMistake: false,
        },
        {
          text: "Tenzing Norgay",
          isMistake: false,
        },
        {
          text: "1943",
          correctAnswer: ["1953", "nineteen fifty-three"],
          isMistake: true,
        },
      ],
    },
    {
      id: "5",
      title: "Internet",
      content: [
        "The Internet is a global network of interconnected computers. It began as ",
        " in the ",
        ". The World Wide Web was created by ",
        " in ",
        ". Today, the Internet enables instant communication through ",
        " and social media platforms.",
      ],
      links: [
        {
          text: "SHERPANET",
          isMistake: true,
          correctAnswer: "ARPANET",
        },
        {
          text: "1960s",
          isMistake: false,
        },
        {
          text: "Tim Berners-Lee",
          isMistake: false,
        },
        {
          text: "1989",
          isMistake: false,
        },
        {
          text: "email",
          isMistake: false,
        },
      ],
    },
  ];
};

// Function to get a key for storing game progress in localStorage
export const getGameStorageKey = (): string => {
  return `wiki_game_${formatDate(new Date())}`;
};

// Function to get articles for a specific date
export const getArticlesForDate = (dateString: string): Article[] => {
  const articleGroup = articleGroups.find((group) => group.date === dateString);
  return articleGroup ? articleGroup.articles : getArticlesForToday();
};

// Function to get all available puzzle dates
export const getAvailableDates = (): string[] => {
  return articleGroups.map((group) => group.date);
};

// Function to get storage key for a specific date
export const getGameStorageKeyForDate = (dateString: string): string => {
  return `wiki_game_${dateString}`;
};

// Compute maximum possible score (5 points for clicking mistake + 5 points for correction per article)
export const getMaxScore = (articles: Article[]): number => {
  return articles.length * 10;
};
