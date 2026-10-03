# portfolio-website

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_AL3bDtiGkteqGydemc4PdiBWzh0X)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

## Adding a case study

Every project lives in `lib/projects.ts`. A project card needs `title`,
`summary`, `tags`, `device` (`phone` or `browser`) and a `thumbnail`. Adding a
`caseStudy` object (`hero`, `meta`, `overview`, `problem`, `outcome`, optional
`images` and `process`) turns the card into a full case study page at
`/work/<slug>`; `components/CaseStudyLayout.tsx` renders every one in the same
order, so no component changes are needed.

Design tokens (type scale, spacing, radius, shadow, colours) are defined once
in the `@theme` block at the top of `app/globals.css`.
