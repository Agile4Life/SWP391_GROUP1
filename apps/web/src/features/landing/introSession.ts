export const INTRO_SEEN_KEY = 'sol_intro_seen';

export function shouldPlayIntro(): boolean {
  try {
    return !sessionStorage.getItem(INTRO_SEEN_KEY) && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}
