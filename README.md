# Lexiscore

A modern, real-time Scrabble game tracking web application for multiple players. Built with React, Vite, and TailwindCSS.

## Features
- **Interactive Scrabble Board**: 15x15 grid with multiplier squares (Double/Triple Letter & Word scores)
- **Multi-player Support**: Track games with up to 4 players
- **Score Tracking**: Automatic score calculation based on word and placement of word on the board
- **Leaderboard**: Player ranking based on scores
- **Word Validation**: Built-in dictionary verification using TWL (Tournament Word List)

## Tech Stack
- **Frontend**: React 19.1
- **Build Tool**: Vite 7.1
- **Styling**: TailwindCSS 4.1
- **Deployment**: Netlify

## Getting Started

### Prerequisites
- Node.js (version specified in `.nvmrc`)
- npm

### Installation
```bash
# Clone the repository
git clone git@github.com:zapalblizh/Lexiscore.git

# Navigate to project directory
cd Lexiscore

# Install dependencies
npm install
```

### Development
```bash
# Start development server
npm run dev

# Test build
npm run build
npm run preview

# Build for production (Netlify)
netlify build
```

## Project Structure
```
Lexiscore/
├── src/
│   └── assets/
│       ├── js/
│       │   ├── components/    # React components
│       │   ├── functions/     # Game logic utilities
│       │   ├── App.jsx        # Main app component
│       │   ├── GameContext.jsx # Game state management
│       │   └── index.jsx      # App entry point
│       └── css/               # TailwindCSS styles
├── public/
│   └── twl.txt               # Scrabble dictionary
└── index.html                # HTML entry point
```

## License

MIT License. See LICENSE file for details.

## Author

**Aleksandr Zapparov**
- Email: alexander@zapparov.dev
- Website: [zapparov.dev](https://zapparov.dev)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.