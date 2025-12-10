// main.ts
import Radar from './radar';
import type { Blip } from './types';

const sampleData: Blip[] = [
  // Languages (Q0)
  { name: 'TypeScript', quadrant: 0, ring: 0 },
  { name: 'Python', quadrant: 0, ring: 0 },
  { name: 'Rust', quadrant: 0, ring: 1 },
  { name: 'Go', quadrant: 0, ring: 0 },
  { name: 'Kotlin', quadrant: 0, ring: 1 },
  { name: 'Swift', quadrant: 0, ring: 1 },
  { name: 'Dart', quadrant: 0, ring: 2 },
  { name: 'Elixir', quadrant: 0, ring: 2 },
  
  // Frameworks (Q1)
  { name: 'React', quadrant: 1, ring: 0 },
  { name: 'Next.js', quadrant: 1, ring: 0 },
  { name: 'Vue.js', quadrant: 1, ring: 1 },
  { name: 'Svelte', quadrant: 1, ring: 1 },
  { name: 'Angular', quadrant: 1, ring: 2 },
  { name: 'FastAPI', quadrant: 1, ring: 0 },
  { name: 'Django', quadrant: 1, ring: 1 },
  { name: 'Express', quadrant: 1, ring: 0 },
  
  // Tools (Q2)
  { name: 'Docker', quadrant: 2, ring: 0 },
  { name: 'Kubernetes', quadrant: 2, ring: 1 },
  { name: 'GitHub Actions', quadrant: 2, ring: 0 },
  { name: 'Terraform', quadrant: 2, ring: 1 },
  { name: 'Playwright', quadrant: 2, ring: 1 },
  { name: 'Vite', quadrant: 2, ring: 0 },
  { name: 'ESBuild', quadrant: 2, ring: 1 },
  { name: 'Jenkins', quadrant: 2, ring: 3 },
  
  // Platforms (Q3)
  { name: 'AWS', quadrant: 3, ring: 0 },
  { name: 'Vercel', quadrant: 3, ring: 0 },
  { name: 'GCP', quadrant: 3, ring: 1 },
  { name: 'Azure', quadrant: 3, ring: 1 },
  { name: 'Cloudflare', quadrant: 3, ring: 1 },
  { name: 'Supabase', quadrant: 3, ring: 2 },
  { name: 'Railway', quadrant: 3, ring: 2 },
  { name: 'Heroku', quadrant: 3, ring: 3 }
];

// Create the radar
const radar = new Radar(sampleData);
//const radar = new Radar(sampleData);

// Optional: destroy when done
// radar.destroy();
