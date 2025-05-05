# Party.net Blog

A lightweight, SEO-optimized blog for Party.net focused on party planning, event ideas, and celebration inspiration.

## Features

- Modern, responsive design
- SEO-optimized content
- Fast loading times
- Markdown-based content management
- Clean, structured codebase

## Tech Stack

- Next.js - React framework
- CSS Modules - Styling
- Gray Matter - Markdown processing
- Remark - Markdown to HTML conversion
- Date-fns - Date formatting

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the blog.

## Content Management

### Blog Posts

All blog posts are stored as Markdown files in the `content/posts` directory. Each post has a frontmatter section with metadata and a content section with the actual article.

To add a new post:

1. Create a new `.md` file in the `content/posts` directory
2. Add frontmatter with the following fields:
   - `title`: The post title
   - `date`: Publication date in YYYY-MM-DD format
   - `author`: Author name
   - `excerpt`: A short summary of the post
   - `featuredImage`: Path to the featured image
   - `tags`: Array of tags related to the post
3. Write your content in Markdown format below the frontmatter

### Images

Store all images in the `public/images` directory. Reference them in your posts using the path `/images/your-image.jpg`.

## Deployment

To build the site for production:

```bash
npm run build
# or
yarn build
```

The static site will be generated in the `.next` directory and can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

## Customization

### Styling

Global styles are defined in `styles/globals.css`. Component-specific styles use CSS Modules and are located in the `styles` directory with the naming convention `[component-name].module.css`.

### Components

All React components are stored in the `components` directory. The main layout component is `components/layout.js`.

### Pages

Page components are stored in the `pages` directory. The file name determines the route (e.g., `about.js` creates the `/about` route).

## SEO Optimization

Each page includes appropriate meta tags for SEO. The blog posts are structured with proper heading hierarchy and semantic HTML to improve search engine rankings.

## License

This project is licensed under the MIT License.
