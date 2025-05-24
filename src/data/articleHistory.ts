import { Article } from "@/types/wiki-game";
import { formatDate } from "@/lib/utils";

export interface ArticleGroup {
  date: string;
  articles: Article[];
}

export const articleGroups: ArticleGroup[] = [
  {
    date: formatDate("2025-05-22"),
    articles: [
      {
        id: "1",
        title: "Renaissance",
        content: [
          "The Renaissance was a period in European history marking the transition from the ",
          " to modernity. It began in ",
          " in the ",
          " and spread to the rest of Europe. The period is characterized by a renewed interest in ",
          " art, architecture, and learning.",
        ],
        links: [
          {
            id: "ren-period",
            text: "Middle Ages",
            isMistake: false,
          },
          {
            id: "ren-origin",
            text: "France",
            correctAnswer: "Italy",
            isMistake: true,
          },
          {
            id: "ren-century",
            text: "late 14th century",
            isMistake: false,
          },
          {
            id: "ren-focus",
            text: "classical",
            isMistake: false,
          },
        ],
        mistakeIndex: 1,
      },
      {
        id: "2",
        title: "Theory of Evolution",
        content: [
          "The Theory of Evolution by Natural Selection was first formulated in Charles ",
          "'s book ",
          ", published in ",
          ". The ",
          " states that species change over time through the process of ",
          ", where organisms better adapted to their environment tend to survive and produce more offspring.",
        ],
        links: [
          {
            id: "evo-scientist",
            text: "Darwin",
            isMistake: false,
          },
          {
            id: "evo-book",
            text: "The Voyage of the Beagle",
            correctAnswer: ["On the Origin of Species", "The Origin of Species", "On the Origin of Species by Means of Natural Selection"],
            isMistake: true,
          },
          {
            id: "evo-year",
            text: "1859",
            isMistake: false,
          },
          {
            id: "evo-theory",
            text: "theory",
            isMistake: false,
          },
          {
            id: "evo-process",
            text: "natural selection",
            isMistake: false,
          },
        ],
        mistakeIndex: 1,
      },
      {
        id: "3",
        title: "Industrial Revolution",
        content: [
          "The Industrial Revolution was a period of major industrialization and innovation during the late ",
          " century and early 19th century. It began in ",
          " and transformed largely ",
          " societies into industrial ones. The invention of the ",
          " was one of its most significant developments.",
        ],
        links: [
          {
            id: "ind-century",
            text: "18th",
            isMistake: false,
          },
          {
            id: "ind-origin",
            text: "Germany",
            correctAnswer: ["Britain", "England", "United Kingdom", "UK", "the UK", "the United Kingdom"],
            isMistake: true,
          },
          {
            id: "ind-society",
            text: "agricultural",
            isMistake: false,
          },
          {
            id: "ind-invention",
            text: "steam engine",
            isMistake: false,
          },
        ],
        mistakeIndex: 1,
      },
      {
        id: "4",
        title: "Solar System",
        content: [
          "The Solar System consists of the Sun and everything that orbits around it, including ",
          " planets, their moons, and various smaller objects. The four inner planets are rocky, while the four outer planets are ",
          ". The system formed approximately ",
          " from a giant molecular cloud.",
        ],
        links: [
          {
            id: "sol-planets",
            text: "eight",
            isMistake: false,
          },
          {
            id: "sol-outer",
            text: "terrestrial giants",
            correctAnswer: "gas giants",
            isMistake: true,
          },
          {
            id: "sol-age",
            text: "4.6 billion years ago",
            isMistake: false,
          },
        ],
        mistakeIndex: 1,
      },
      {
        id: "5",
        title: "French Revolution",
        content: [
          "The French Revolution was a period of radical social and political upheaval in France from ",
          " to ",
          ". It began with the storming of the ",
          " on July 14, 1789. The revolution led to the establishment of a ",
          " and the eventual rise of Napoleon Bonaparte.",
        ],
        links: [
          {
            id: "fr-year",
            text: "1789",
            isMistake: false,
          },
          {
            id: "fr-year-2",
            text: "1799",
            isMistake: false,
          },
          {
            id: "fr-event",
            text: "Château d'If",
            correctAnswer: "Bastille",
            isMistake: true,
          },
          {
            id: "fr-result",
            text: "republic",
            isMistake: false,
          },
        ],
        mistakeIndex: 2,
      }
    ]
  },

  {
    date: formatDate("2025-05-23"),
    articles: [
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
    ]
  }
];