# Wikipedia Challenge Game

A daily puzzle game of spotting mistakes in Wikipedia-style articles. Become the editor Wikipedia doesn't really need.

![Wikipedia Challenge Screenshot](./public/screenshot.png)

## How to Play

Head over to https://citation-needed.netlify.app/ to play. Puzzle updates at 12:00 AM EST


## Development

This project is built with:

- React 18
- TypeScript
- React Router
- Tailwind CSS
- shadcn/ui components

### Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   └── wiki-game/    # Game-specific components
├── data/
│   └── articles.ts   # Mock Wikipedia articles data
├── types/
│   └── wiki-game.ts  # TypeScript definitions
├── pages/
│   ├── Index.tsx     # Main application page
│   └── NotFound.tsx  # 404 page
└── lib/
    └── utils.ts      # Utility functions
```


## License

MIT

## Acknowledgments

- Inspired by games like Wordle
- Built with React and Vite