// main.ts
import Radar from './radar';
import type { Blip } from './types';

const sampleData: Blip[] = [
  // Languages (Q0)
  { name: 'TypeScript', arc: 0, ring: 0 },
  { name: 'Python', arc: 0, ring: 0 },
  { name: 'Rust', arc: 0, ring: 1 },
  { name: 'Go', arc: 0, ring: 0 },
  { name: 'Kotlin', arc: 0, ring: 1 },
  { name: 'Swift', arc: 0, ring: 1 },
  { name: 'Dart', arc: 0, ring: 2 },
  { name: 'Elixir', arc: 0, ring: 2 },
  
  // Frameworks (Q1)
  { name: 'React', arc: 1, ring: 0 },
  { name: 'Next.js', arc: 1, ring: 0 },
  { name: 'Vue.js', arc: 1, ring: 1 },
  { name: 'Svelte', arc: 1, ring: 1 },
  { name: 'Angular', arc: 1, ring: 2 },
  { name: 'FastAPI', arc: 1, ring: 0 },
  { name: 'Django', arc: 1, ring: 1 },
  { name: 'Express', arc: 1, ring: 0 },
  
  // Tools (Q2)
  { name: 'Docker', arc: 2, ring: 0 },
  { name: 'Kubernetes', arc: 2, ring: 1 },
  { name: 'GitHub Actions', arc: 2, ring: 0 },
  { name: 'Terraform', arc: 2, ring: 1 },
  { name: 'Playwright', arc: 2, ring: 1 },
  { name: 'Vite', arc: 2, ring: 0 },
  { name: 'ESBuild', arc: 2, ring: 1 },
  { name: 'Jenkins', arc: 2, ring: 3 },
  
  // Platforms (Q3)
  { name: 'AWS', arc: 3, ring: 0 },
  { name: 'Vercel', arc: 3, ring: 0 },
  { name: 'GCP', arc: 3, ring: 1 },
  { name: 'Azure', arc: 3, ring: 1 },
  { name: 'Cloudflare', arc: 3, ring: 1 },
  { name: 'Supabase', arc: 3, ring: 2 },
  { name: 'Railway', arc: 3, ring: 2 },
  { name: 'Heroku', arc: 3, ring: 3 }
];

// Create the radar
const radar = new Radar(sampleData);
//const radar = new Radar(sampleData);

// Optional: destroy when done
// radar.destroy();
