import { Article } from "@/types/wiki-game";
import { formatDate } from "@/lib/utils";

export interface ArticleGroup {
  date: string;
  articles: Article[];
}

// All article groups with their dates and content
export const articleGroups: ArticleGroup[] = [
  {
    date: formatDate("2025-05-21"),
    articles: [
      {
        id: "1",
        title: "World War II",
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
      },
    ]
  },
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
            correctAnswer: [
              "On the Origin of Species",
              "The Origin of Species",
              "On the Origin of Species by Means of Natural Selection",
            ],
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
            correctAnswer: [
              "Britain",
              "England",
              "United Kingdom",
              "UK",
              "the UK",
              "the United Kingdom",
            ],
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
      },
    ],
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
            text: "General Relativity",
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
      },
    ],
  },
  {
    date: formatDate("2025-05-26"),
    articles: [
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
    ],
  },
];

// === EXPORTED FUNCTIONS ===

/**
 * Get articles for today's puzzle
 */
export const getArticlesForToday = (): Article[] => {
  const today = formatDate(new Date());
  return getArticlesForDate(today);
};

/**
 * Get articles for a specific date
 */
export const getArticlesForDate = (dateString: string): Article[] => {
  const articleGroup = articleGroups.find((group) => group.date === dateString);
  return articleGroup ? articleGroup.articles : articleGroups[0].articles;
};

/**
 * Get all available puzzle dates
 */
export const getAvailableDates = (): string[] => {
  return articleGroups.map((group) => group.date);
};

/**
 * Get storage key for today's game progress
 */
export const getGameStorageKey = (): string => {
  return `wiki_game_${formatDate(new Date())}`;
};

/**
 * Get storage key for a specific date's game progress
 */
export const getGameStorageKeyForDate = (dateString: string): string => {
  return `wiki_game_${dateString}`;
};

/**
 * Compute maximum possible score for a set of articles
 * (5 points for clicking mistake + 5 points for correction per article)
 */
export const getMaxScore = (articles: Article[]): number => {
  return articles.length * 10;
};
