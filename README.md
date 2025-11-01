# Viktor Blog - Next.js Application

A modern blog application built with Next.js and TypeScript, featuring blog posts from Viktor.ai CMS with pagination, search, filtering, and sorting capabilities.

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd viktor-blog
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

The `.env.local` file should contain:
```
NEXT_PUBLIC_API_BASE_URL=https://cms.viktor.ai
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```


