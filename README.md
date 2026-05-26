# Next.js 16 Blog Demo

A modern, feature-rich blog application built with **Next.js 16** to showcase the latest performance and caching features. This demo includes user authentication, post management, and an interactive clapping system.

## 🚀 Next.js 16 Features

This project demonstrates the cutting-edge capabilities of Next.js 16:

### **Cache Components** (`cacheComponents: true`)
- Aggressive function-level caching with the `"use cache"` directive
- **Component-level caching**: Entire async components can be cached
- Fine-grained cache control using `cacheLife()` profiles
- Granular cache invalidation with `cacheTag()` and `updateTag()`
- Separate cache tags for post content and claps for optimal performance

**Component Caching Examples in This App:**
- `HeroSection`: Static hero content cached for weeks
- `PostsList`: Posts grid cached with hourly revalidation
- Functions like `getPosts()` and `getPost()` cached independently

### **React Compiler** (`reactCompiler: true`)
- Automatic component memoization
- Optimized re-renders without manual `useMemo`/`useCallback`
- Better runtime performance

### **MCP Server Integration** (`mcpServer: true`)
- Next.js DevTools MCP server enabled
- Runtime diagnostics and page metadata introspection
- Real-time error monitoring and route analysis

### **Static Generation with ISR**
- `generateStaticParams()` for pre-rendering dynamic routes
- Incremental Static Regeneration for posts
- Optimal balance between static and dynamic content

### **Advanced Caching Strategy**
- **`getPosts()`**: Cached with `"hours"` profile (1-hour revalidation)
- **`getPost(id)`**: Cached with `"days"` profile (24-hour revalidation)
- **Granular invalidation**: Claps invalidate only `postClaps(id)`, not entire post cache
- **Time-based expiration**: Intelligent cache lifetimes prevent stale data

### **Modern React Patterns**
- Suspense boundaries with custom skeleton loading states
- Optimistic UI updates for instant feedback
- Server Actions for mutations
- Progressive enhancement

## ✨ Application Features

- **Authentication System**
  - User signup and login
  - Session-based authentication with secure cookies
  - Protected routes and actions

- **Post Management**
  - Create, read, update, and delete blog posts
  - Rich text content support
  - Author attribution and timestamps

- **Interactive Claps**
  - Medium-style clapping system (up to 50 claps per user)
  - Optimistic UI updates with `useOptimistic`
  - Animated feedback with Framer Motion
  - Real-time clap count updates

- **Performance Optimizations**
  - Server-side caching with cache components
  - Static page generation
  - Streaming SSR with Suspense
  - Skeleton loading states
  - Optimistic mutations

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Styling**: TailwindCSS + shadcn/ui
- **Animations**: Framer Motion
- **Fonts**: Geist Sans & Geist Mono
- **Validation**: Zod
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
next16-demo/
├── app/                    # App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (post list)
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   └── posts/
│       ├── [id]/          # Post detail page
│       │   └── edit/      # Edit post page
│       └── new/           # Create post page
├── actions/               # Server Actions
│   ├── clapPost.action.ts
│   ├── createPost.action.ts
│   ├── updatePost.action.ts
│   ├── deletePost.action.ts
│   ├── login.action.ts
│   ├── logout.action.ts
│   └── signup.action.ts
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── ClapButton.tsx    # Optimistic clap button
│   ├── Navbar.tsx        # Navigation with auth
│   ├── PostForm.tsx      # Post create/edit form
│   ├── PostFormSkeleton.tsx
│   └── PostViewSkeleton.tsx
├── lib/                   # Utilities
│   ├── db.ts             # Database functions with "use cache"
│   ├── auth.ts           # Authentication helpers
│   └── prisma.ts         # Prisma client
├── prisma/
│   └── schema.prisma     # Database schema
├── constants/            # App constants
│   ├── cacheTags.constants.ts
│   ├── routes.constants.ts
│   └── messages.constants.ts
└── schemas/              # Zod validation schemas
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database (or Neon account)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd next16-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env` file:
   ```env
   DATABASE_URL="postgresql://..."
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Seed the database (optional)**
   ```bash
   npx prisma db seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

7. **Open the app**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Cache Configuration (`next.config.ts`)

```typescript
const nextConfig: NextConfig = {
  cacheComponents: true,    // Enable Cache Components
  reactCompiler: true,      // Enable React Compiler
  experimental: {
    mcpServer: true,        // Enable MCP Server
  }
};
```

### Database Schema

The app uses Prisma with the following models:
- **User**: Authentication and author info
- **Post**: Blog posts with title, content, and metadata
- **Clap**: User claps for posts (composite primary key)

## 📊 Performance Features

### Cache Strategies

| Function/Component | Cache Profile | Revalidation | Use Case |
|-------------------|--------------|--------------|----------|
| `getPosts()` | `"hours"` | 1 hour | Frequently updated list |
| `getPost(id)` | `"days"` | 24 hours | Individual posts (rarely change) |
| `HeroSection` | `"weeks"` | 1 week | Static hero content |
| `PostsList` | `"hours"` | 1 hour | Posts grid component |

### Component-Level Caching

This app demonstrates **component-level caching** with `"use cache"`:

#### ✅ When to Cache Components

**1. Static/Semi-Static Content**
```tsx
// HeroSection.tsx - Cached for weeks
async function HeroSection() {
  "use cache";
  cacheLife("weeks"); // Rarely changes
  return <section>...</section>;
}
```

**2. Data-Fetching Components**
```tsx
// PostsList.tsx - Cached with data
async function PostsList() {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.POSTS);
  
  const posts = await getPosts(); // Fetches within component
  return <div>{/* render posts */}</div>;
}
```

**3. Benefits**
- ✅ Cache entire component output (JSX + data)
- ✅ Independent cache invalidation per component
- ✅ Compose cached and uncached components freely
- ✅ Props become part of cache key automatically
- ✅ Reduce server load and improve response times

#### 🚫 When NOT to Cache Components

- Components that access `cookies()`, `headers()`, or `searchParams` directly
- Highly dynamic content that changes on every request
- Components with user-specific data (unless passed as props)
- Client Components (only Server Components can use `"use cache"`)

### Cache Tags

- **`posts`**: All posts list
- **`post-{id}`**: Individual post content
- **`post-claps-{id}`**: Post clap counts (granular invalidation)

### Optimizations Applied

✅ Function-level caching with `"use cache"`  
✅ **Component-level caching** for reusable UI with data  
✅ Cache lifetime control with `cacheLife()`  
✅ Granular cache invalidation with `cacheTag()`  
✅ Static page generation with `generateStaticParams()`  
✅ Suspense boundaries for streaming SSR  
✅ Optimistic UI updates for better UX  
✅ React Compiler for automatic memoization  
✅ Font optimization with `next/font`

## 🧪 Testing with Next.js DevTools MCP

This project has MCP server enabled. You can use the Next.js DevTools MCP to:

- Get page metadata and file dependencies
- Monitor runtime errors
- Analyze routes and cache behavior
- Debug cache invalidation

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! This is a demo project showcasing Next.js 16 features.

## 📚 Learn More

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Cache Components](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents)
- [React Compiler](https://react.dev/learn/react-compiler)
- [Prisma Documentation](https://www.prisma.io/docs)
