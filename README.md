# SEO Agent Bot

SEO Agent Bot is a full-stack SEO workspace for turning topic lists into structured content plans and identifying pages that need improvement. The Next.js application includes a CSV-driven batch generator, a performance dashboard, AI-backed API routes, a lightweight crawler, and persisted SEO runs through Prisma and SQLite.

The current UI is a working prototype: batch drafts and analytics are deterministic sample data, while the server routes demonstrate the AI and persistence workflow with Anthropic. This keeps the interface easy to test locally while preserving a clear path to production data sources.

## Workflow

```text
CSV topics or saved run
  -> generate SEO title, metadata, outline, and draft
  -> store the run with Prisma
  -> compare clicks, impressions, and CTR
  -> rewrite content that needs improvement
```

The crawler can also fetch a page, extract its title and H1–H3 headings, and produce topic-based draft records for later review.

## Core features

- Import up to five topics from a CSV file for a controlled batch run
- Generate title tags, meta descriptions, H1s, outlines, and draft copy
- Track clicks, impressions, and click-through rate in an optimization dashboard
- Flag low-performing or stale content for review
- Persist generated runs with Prisma and SQLite
- Crawl page titles and headings with Axios and Cheerio

## Runtime requirements

- Node.js 20 or newer
- npm
- An Anthropic API key for the AI-backed batch and optimization endpoints
- A writable local filesystem for SQLite persistence

Copy the environment template and add your credential:

```bash
cp .env.example .env
```

```env
DATABASE_URL="file:../dev.db"
ANTHROPIC_API_KEY=your_anthropic_api_key
```

## Local development

```bash
git clone https://github.com/yahye06/SEO-Agent-Bot.git
cd SEO-Agent-Bot
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use `public/sample.topics.csv` to try the batch workflow.

## Application surface

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/` | Open the project dashboard |
| `GET` | `/batch` | Upload topics and preview generated SEO drafts |
| `GET` | `/optimize` | Review sample performance data and suggested improvements |
| `GET` | `/api/drafts` | Return saved draft records from `drafts.json` |
| `POST` | `/api/batch-generator` | Generate and persist AI content briefs |
| `GET` | `/api/performance` | Return run, crawl, and stale-content summaries |
| `POST` | `/api/optimize` | Rewrite a saved brief for stronger SEO targeting |

Example batch request:

```bash
curl -X POST http://localhost:3000/api/batch-generator \
  -H 'content-type: application/json' \
  -d '{"domain":"example.com","topics":["technical SEO","content strategy"]}'
```

## Verification

```bash
npm run lint
npm run build
```

Run both checks together with:

```bash
npm run check
```

## Deployment

The UI can be deployed directly to Vercel after setting `ANTHROPIC_API_KEY` in the project environment. SQLite is suitable for local development, but its data is not durable on serverless filesystems; use a hosted database such as PostgreSQL before relying on persisted runs in production.

## Current limitations

- The batch page uses deterministic draft templates instead of calling the API directly
- The optimization dashboard uses sample analytics rather than Google Search Console data
- API routes do not yet include authentication, rate limiting, or request quotas
- SQLite persistence is intended for local development

## Technology

- Next.js 16, React 19, and TypeScript
- Anthropic and OpenAI SDKs
- Prisma and SQLite
- Axios and Cheerio
- Tailwind CSS 4
