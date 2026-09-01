import fs from 'fs';

interface Draft {
  topic: string;
  pageTitle: string;
  draft: string;
  clicks?: number;
  impressions?: number;
}

const analytics: Record<string, { clicks: number; impressions: number }> = {
  'email marketing': { clicks: 20, impressions: 100 },
  'content strategy': { clicks: 5, impressions: 50 },
  'technical seo': { clicks: 2, impressions: 30 },
};

const drafts: Draft[] = JSON.parse(fs.readFileSync('./drafts.json', 'utf-8'));

drafts.forEach((d) => {
  const data = analytics[d.topic];
  if (data) {
    const ctr = data.clicks / data.impressions;
    if (ctr < 0.1) {
      d.draft += ' | Updated for higher CTR';
      console.log(`Optimized draft for "${d.topic}":`, d.draft);
    }
  }
});

fs.writeFileSync('./drafts.json', JSON.stringify(drafts, null, 2));
console.log('Optimization complete!');
