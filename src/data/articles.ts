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
          "Bebop is a style of ",
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
  {
    date: formatDate("2025-05-27"),
    articles: [
      {
        id: "1",
        title: "Vincent van Gogh",
        content: [
          "Vincent van Gogh was a ",
          " Post-Impressionist artist who created about ",
          " paintings in his lifetime. Despite selling only one painting, ",
          ", during his lifetime, his works now sell for millions. His most famous works include ",
          " and ",
          ".",
        ],
        links: [
          {
            text: "German",
            isMistake: true,
            correctAnswer: ["Dutch", "Dutchman"]
          },
          {
            text: "2,100",
            isMistake: false,
          },
          {
            text: "The Red Vineyard",
            isMistake: false,
          },
          {
            text: "The Starry Night",
            isMistake: false,
          },
          {
            text: "Sunflowers",
            isMistake: false,
          },
        ],
      },
      {
        id: "2",
        title: "Great Barrier Reef",
        content: [
          "The Great Barrier Reef is the world's largest ",
          " system, located off the coast of ",
          ". It consists of over 2,900 reefs and 900 islands. It is a ",
          " and one of ",
          "."
        ],
        links: [
          {
            text: "coral reef",
            isMistake: false,
          },
          {
            text: "New Zealand",
            correctAnswer: ["Australia", "Queensland"],
            isMistake: true,
          },
          {
            text: "World Heritage Site",
            isMistake: false
          },
          {
            text: "CNN's Seven Natural Wonders of the World",
            isMistake: false,
          }
        ],
      },
      {
        id: "3",
        title: "Electric Guitar",
        content: [
          "The electric guitar was developed in the ",
          " century and became popular in the ",
          ". It uses ",
          " to convert string vibrations into ",
          ". The first commercially successful electric guitar was the ",
          ", produced by ",
          "."
        ],
        links: [
          {
            text: "20th",
            isMistake: false,
          },
          {
            text: "1930s",
            isMistake: false,
          },
          {
            text: "electromagnetic pickups",
            isMistake: false
          },
          {
            text: "electric signals",
            isMistake: false
          },
          {
            text: "Steel Wok",
            isMistake: true,
            correctAnswer: ["frying pan", "the frying pan", "Rickenbacker Electro A-22", "Electro a-22", "a-22", "rickenbacker a-22", "a22", "Rickenbacker electro a22", "rickenbacker a22"]
          },
          {
            text: "Rickenbacker",
            isMistake: false,
          },
        ],
      },
      {
        id: "4",
        title: "Mount Kilimanjaro",
        content: [
          "Mount Kilimanjaro is ",
          "'s highest mountain, located in ",
          ". It stands at ",
          " meters above sea level. The mountain has three volcanic cones: ",
          ", Mawenzi, and Shira. The first successful summit was achieved by ",
          " in ",
          ".",
        ],
        links: [
          {
            text: "Africa",
            isMistake: false,
          },
          {
            text: "Kenya",
            correctAnswer: ["Tanzania", "United republic of tanzania", "republic of tanzania"],
            isMistake: true,
          },
          {
            text: "5,895",
            isMistake: false,
          },
          {
            text: "Kibo",
            isMistake: false,
          },
          {
            text: "Hans Meyer",
            isMistake: false,
          },
          {
            text: "1889",
            isMistake: false,
          },
        ],
      },
      {
        id: "5",
        title: "Printing Press",
        content: [
          "The printing press was invented by ",
          " in ",
          " century Germany. This revolutionary device used ",
          " to transfer ink onto paper or cloth. Its use in the ",
          " introduced the era of mass communication, which permanently altered the structure of society. The invention dramatically increased the spread of knowledge across ",
          ".",
        ],
        links: [
          {
            text: "Johannes Gutenberg",
            isMistake: false,
          },
          {
            text: "16th",
            correctAnswer: ["15th", "fifteenth"],
            isMistake: true,
          },
          {
            text: "movable type",
            isMistake: false,
          },
          {
            text: "Renaissance",
            isMistake: false,
          },
          {
            text: "Europe",
            isMistake: false,
          },
        ],
      },
    ],
  },
  {
    date: formatDate("2025-05-28"),
    articles: [
      {
        id: "1",
        title: "Mona Lisa",
        content: [
          "The Mona Lisa is a half-length portrait painting by Italian artist ",
          ". It is a ",
          " painting on a white poplar panel. It is considered an archetypal masterpiece of the ",
          " period. The painting is currently housed in the ",
          " in Paris. The painting was created in the early ",
          "."
        ],
        links: [
          {
            text: "Leonardo da Vinci",
            isMistake: false,
          },
          {
            text: "fresco",
            isMistake: true,
            correctAnswer: "oil"
          },
          {
            text: "Renaissance",
            isMistake: false,
          },
          {
            text: "Louvre Museum",
            isMistake: false,
          },
          {
            text: "1500s",
            isMistake: false,
          },
        ],
      },
      {
        id: "2",
        title: "Nelson Mandela",
        content: [
          "Nelson Mandela was a ",
          " anti-apartheid revolutionary and political leader who served as the first ",
          " of South Africa from 1994 to 1999. He spent ",
          " years in prison for his activism. Mandela received the ",
          " Peace Prize in 1993. Ideallogically, he was an ",
          " and a ",
          ".",
        ],
        links: [
          {
            text: "South African",
            isMistake: false,
          },
          {
            text: "prime minister",
            correctAnswer: "president",
            isMistake: true,
          },
          {
            text: "27",
            isMistake: false,
          },
          {
            text: "Nobel",
            isMistake: false,
          },
          {
            text: "African Nationalist",
            isMistake: false,
          },
          {
            text: "socialist",
            isMistake: false,
          },
        ],
      },
      {
        id: "3",
        title: "Great Depression",
        content: [
          "The Great Depression was a severe worldwide economic depression that took place during the ",
          ". It began in the United States after a major stock market crash in ",
          ". Unemployment in the U.S. rose to ",
          " percent. The Depression was ended by the outbreak of ",
          "."
        ],
        links: [
          {
            text: "1930s",
            isMistake: false,
          },
          {
            text: "October 1929",
            isMistake: false,
          },
          {
            text: "25",
            isMistake: false,
          },
          { 
            text: "World War I",
            isMistake: true,
            correctAnswer: ["World War II", "WWII", "world war 2"],
          }
        ],
      },
      {
        id: "4",
        title: "Human Brain",
        content: [
          "The human brain is the central organ of the human nervous system. It weighs ",
          " on average and is protected by the ",
          ". The brain is divided into 3 parts, the largest part being the ",
          ". The cells of the brain include neurons and ",
          "."
        ],
        links: [
          {
            text: "3 lbs",
            isMistake: false,
          },
          {
            text: "skull",
            isMistake: false,
          },
          {
            text: "cerebellum",
            isMistake: true,
            correctAnswer: ["cerebrum"]
          },
          {
            text: "glial cells",
            isMistake: false
          },
        ],
      },
      {
        id: "5",
        title: "Taj Mahal",
        content: [
          "The Taj Mahal is an ivory-white ",
          " mausoleum in ",
          ", India. It was commissioned in ",
          " by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, ",
          ". The construction took approximately ",
          " years to complete."
        ],
        links: [
          {
            text: "stone",
            isMistake: true,
            correctAnswer: ["marble"]
          },
          {
            text: "Agra",
            isMistake: false,
          },
          {
            text: "1631",
            isMistake: false,
          },
          {
            text: "Mumtaz Mahal",
            isMistake: false,
          },
          {
            text: "22",
            isMistake: false,
          },
        ],
      },
    ],
  },
  {
    date: formatDate("2025-05-29"),
    articles: [
      {
        id: "1",
        title: "Sistine Chapel",
        content: [
          "The Sistine Chapel is a chapel in the Apostolic Palace in ",
          ". Its ceiling was painted by ",
          " between ",
          " and 1512. The most famous section is ",
          ", which depicts the creation of ",
          "."
        ],
        links: [
          {
            text: "Vatican City",
            isMistake: false,
          },
          {
            text: "Michelangelo",
            isMistake: false,
          },
          {
            text: "1508",
            isMistake: false,
          },
          {
            text: "The Last Judgment",
            isMistake: true,
            correctAnswer: ["The Creation of Adam", "creation of adam", "michaelangelo's creation of adam"]
          },
          {
            text: "Adam",
            isMistake: false,
          },
        ],
      },
      {
        id: "2",
        title: "Periodic Table",
        content: [
          "The Periodic Table is a tabular arrangement of chemical elements organized by their ",
          " and ",
          ". It was first created by ",
          " in ",
          ". The table is divided into ",
          " groups and 7 periods."
        ],
        links: [
          {
            text: "atomic number",
            isMistake: false,
          },
          {
            text: "chemical properties",
            isMistake: false,
          },
          {
            text: "Isaac Newton",
            isMistake: true,
            correctAnswer: ["Dmitri Mendeleev", "Mendeleev", "Mendelev"]
          },
          {
            text: "1869",
            isMistake: false,
          },
          {
            text: "18",
            isMistake: false,
          },
        ],
      },
      {
        id: "3",
        title: "Titanic",
        content: [
          "The RMS Titanic was an ",
          " ocean liner that sank in the ",
          " Ocean on its maiden voyage in ",
          ". The ship was built by ",
          " and was considered unsinkable. The disaster resulted in the deaths of approximately ",
          " people."
        ],
        links: [
          {
            text: "American",
            isMistake: true,
            correctAnswer: ["British", "English"]
          },
          {
            text: "Atlantic",
            isMistake: false,
          },
          {
            text: "1912",
            isMistake: false,
          },
          {
            text: "White Star Line",
            isMistake: false,
          },
          {
            text: "1,500",
            isMistake: false,
          },
        ],
      },
      {
        id: "4",
        title: "Photosynthesis",
        content: [
          "Photosynthesis is the process by which plants convert ",
          " energy into chemical energy. The process requires ",
          " and produces ",
          " as a byproduct. The main pigment involved is ",
          ". This process is essential for life on Earth as it provides ",
          "."
        ],
        links: [
          {
            text: "solar",
            isMistake: false,
          },
          {
            text: "carbon dioxide",
            isMistake: false,
          },
          {
            text: "oxygen",
            isMistake: false,
          },
          {
            text: "carotene",
            isMistake: true,
            correctAnswer: ["chlorophyll", "chlorophyl", "chloryphyll", "chloryphyl"]
          },
          {
            text: "food and oxygen",
            isMistake: false,
          },
        ],
      },
      {
        id: "5",
        title: "Magna Carta",
        content: [
          "The Magna Carta was a royal charter of rights agreed to by King ",
          " of England in ",
          ". The document was sealed at ",
          ", near Windsor. Despite its eventual interpretation as a document of individual freedoms, Victorian historians concluded that the charter was an agreement between the king and ",
          "."
        ],
        links: [
          {
            text: "Henry VIII",
            isMistake: true,
            correctAnswer: ["John", "King John", "John of England", "King John of england"]
          },
          {
            text: "1215",
            isMistake: false,
          },
          {
            text: "Runnymede",
            isMistake: false,
          },
          {
            text: "the barons",
            isMistake: false,
          },
        ],
      },
    ],
  },
];

// === EXPORTED FUNCTIONS ===

/**
 * Get the current date in EST timezone
 */
const getCurrentESTDate = (): Date => {
  const now = new Date();
  const estOffset = -5; // EST is UTC-5
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000 * estOffset));
};

/**
 * Get articles for today's puzzle
 */
export const getArticlesForToday = (): Article[] => {
  const today = formatDate(getCurrentESTDate());
  const articleGroup = articleGroups.find((group) => group.date === today);
  
  // If no article group exists for today, return the most recent article group
  if (!articleGroup) {
    const sortedGroups = [...articleGroups].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sortedGroups[0].articles;
  }
  
  return articleGroup.articles;
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
  return `wiki_game_${formatDate(getCurrentESTDate())}`;
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
