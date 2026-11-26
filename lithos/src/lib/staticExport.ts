/* True while the pages are rendered to plain HTML for the team (the
   static export script), never in the browser. Interactive parts then
   draw every state into the markup, and a small script switches them. */
export const STATIC = typeof window === "undefined";
