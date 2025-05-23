import { Article } from "@/types/wiki-game";

export interface ArticleGroup {
  date: string;
  articles: Article[];
}

export const articleGroups: ArticleGroup[] = [
  {
    date: "2025-05-22",
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
  }
];