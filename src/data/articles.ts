import { Article } from "@/types/wiki-game";
import { articleGroups } from "./articleHistory";
import { formatDate } from "@/lib/utils";

// Get articles for today
export const getArticlesForToday = (): Article[] => {
  return [
    {
      id: "1",
      title: "Quantum Mechanics",
      content: [
        "Quantum mechanics is a fundamental theory in physics that describes the behavior of matter and light at the ",
        " scale. It was developed in the early ",
        " century by scientists including ",
        " and ",
        ". The theory introduced revolutionary concepts such as ",
        " and wave-particle duality.",
      ],
      links: [
        {
          text: "microscopic",
          isMistake: false,
        },
        {
          text: "19th",
          correctAnswer: ["20th", "twentieth", "20"],
          isMistake: true,
        },
        {
          text: "Max Planck",
          isMistake: false,
        },
        {
          text: "Werner Heisenberg",
          isMistake: false,
        },
        {
          text: "quantum superposition",
          isMistake: false,
        },
      ],
      mistakeIndex: 1,
    },
    {
      id: "2",
      title: "Ancient Egypt",
      content: [
        "Ancient Egypt was a civilization in ",
        " concentrated along the lower reaches of the ",
        ". It began around ",
        " BCE and lasted for over 3,000 years. The civilization is known for its ",
        " and the construction of massive ",
        ".",
      ],
      links: [
        {
          text: "North Africa",
          isMistake: false,
        },
        {
          text: "Tigris River",
          correctAnswer: ["Nile", "Nile River"],
          isMistake: true,
        },
        {
          text: "3100",
          isMistake: false,
        },
        {
          text: "hieroglyphic writing",
          isMistake: false,
        },
        {
          text: "pyramids",
          isMistake: false,
        },
      ],
      mistakeIndex: 1,
    },
    {
      id: "3",
      title: "Space Race",
      content: [
        "The Space Race was a 20th-century competition between the ",
        " and the ",
        " for supremacy in spaceflight capability. It began with the launch of ",
        " in 1957 and culminated with the ",
        " landing in 1969. The competition led to significant advances in ",
        " and space exploration.",
      ],
      links: [
        {
          text: "United States",
          isMistake: false,
        },
        {
          text: "Soviet Union",
          isMistake: false,
        },
        {
          text: "Explorer 1",
          correctAnswer: ["Sputnik 1", "Sputnik"],
          isMistake: true,
        },
        {
          text: "Apollo 11",
          isMistake: false,
        },
        {
          text: "rocket technology",
          isMistake: false,
        },
      ],
      mistakeIndex: 2,
    },
    {
      id: "4",
      title: "Great Wall of China",
      content: [
        "The Great Wall of China is a series of fortifications in China. Construction began during the ",
        " and continued for over ",
        ". The wall stretches for approximately 21,196 kilometers across ",
        ". It was built primarily to protect against invasions from ",
        " tribes. The wall's construction involved millions of workers and used materials like ",
        " and stone.",
      ],
      links: [
        {
          text: "Ming Dynasty",
          correctAnswer: ["Qin", "Qin Dynasty"],
          isMistake: true,
        },
        {
          text: "2,000 years",
          isMistake: false,
        },
        {
          text: "northern China",
          isMistake: false,
        },
        {
          text: "Mongol",
          isMistake: false,
        },
        {
          text: "brick",
          isMistake: false,
        },
      ],
      mistakeIndex: 0,
    },
    {
      id: "5",
      title: "Theory of Relativity",
      content: [
        "Albert Einstein's Theory of Relativity consists of two parts: Special and ",
        ". The theory was published in ",
        " and revolutionized our understanding of space and time. One of its most famous equations, ",
        ", shows the relationship between mass and energy. The theory predicts that time moves ",
        " in stronger gravitational fields. This was confirmed by experiments using ",
        ".",
      ],
      links: [
        {
          text: "  General Relativity",
          isMistake: false,
        },
        {
          text: "1915",
          isMistake: false,
        },
        {
          text: "E = mc²",
          isMistake: false,
        },
        {
          text: "faster",
          correctAnswer: "slower",
          isMistake: true,
        },
        {
          text: "atomic clocks",
          isMistake: false,
        },
      ],
      mistakeIndex: 3,
    }
  ];
};

// Function to get a key for storing game progress in localStorage
export const getGameStorageKey = (): string => {
  return `wiki_game_${formatDate(new Date())}`;
};

// Compute maximum possible score (5 points for clicking mistake + 5 points for correction per article)
export const getMaxScore = (articles: Article[]): number => {
  return articles.length * 10;
};
