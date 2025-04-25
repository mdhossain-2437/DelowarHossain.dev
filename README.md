# DevAiPortfolio - Modern Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features a dynamic island navigation, 3D background, and AI-powered components.

## 🌟 Features

- 🎨 Modern UI with dynamic island navigation
- 🌌 Interactive 3D universe background
- 🤖 AI-powered components and interactions
- 📱 Fully responsive design
- 🎭 Smooth animations and transitions
- 🌙 Dark mode support
- 📊 Dynamic content loading
- 🔍 SEO optimized

## 🚀 Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Vite
  - Wouter (Routing)

- **UI Components:**
  - Radix UI
  - Lucide Icons
  - Class Variance Authority
  - Tailwind Merge

- **Animation:**
  - Framer Motion
  - GSAP
  - React Spring

- **State Management:**
  - React Query
  - React Hook Form

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/mdhossain-2437/DevAiPortfolio.git
cd DevAiPortfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🛠️ Development

- Development server runs on `http://localhost:5173`
- Hot module replacement enabled
- TypeScript for type safety
- ESLint and Prettier for code formatting

## 🚀 Deployment

### Netlify Deployment

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy to Netlify:
```bash
netlify deploy
```

4. For production deployment:
```bash
netlify deploy --prod
```

5. Your Netlify site will be available at: [https://delowar-hossain-dev.netlify.app](https://delowar-hossain-dev.netlify.app)

### Surge Deployment

1. Install Surge CLI:
```bash
npm install -g surge
```

2. Build the project:
```bash
npm run build
```

3. Create a surge-dist directory and copy files:
```bash
mkdir -p surge-dist
cp -r dist/public/* surge-dist/
```

4. Deploy to Surge:
```bash
surge surge-dist delowar-hossain-dev.surge.sh
```

5. Your Surge site will be available at: [https://delowar-hossain-dev.surge.sh](https://delowar-hossain-dev.surge.sh)

## 📁 Project Structure

```
DevAiPortfolio/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utility functions
│   │   └── styles/       # Global styles
│   └── public/           # Static assets
├── server/                # Backend server
├── shared/               # Shared types and utilities
└── package.json          # Project dependencies
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
VITE_AI_API_KEY=your_ai_api_key
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

Delowar Hossain

- GitHub: [github.com/mdhossain-2437](https://github.com/mdhossain-2437)
- Twitter: [x.com/mdhossain2437](https://x.com/mdhossain2437)
- LinkedIn: [linkedin.com/in/mdhossain2437](https://www.linkedin.com/in/mdhossain2437)

Project Link: [https://github.com/mdhossain-2437/DevAiPortfolio](https://github.com/mdhossain-2437/DevAiPortfolio) 