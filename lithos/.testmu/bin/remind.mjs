#!/usr/bin/env node
/* TestMu DS reminder. Claude Code runs it on every prompt (UserPromptSubmit) and adds what it prints to the
   agent's context, so the design system applies however the request is worded, even when the agent would
   not have opened AGENTS.md. Kept short on purpose. */
import fs from 'node:fs';
import path from 'node:path';

let root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
while (!fs.existsSync(path.join(root, '.testmu')) && path.dirname(root) !== root) root = path.dirname(root);
if (!fs.existsSync(path.join(root, '.testmu'))) process.exit(0);

process.stdout.write(`TestMu design system is mandatory in this project (full rules: AGENTS.md). For any UI, page, component, style, email, chart or document:
- Only TestMu tokens from .testmu/tokens (CSS variables or the Tailwind preset). Never invent colors, fonts, sizes or spacing.
- Soft white #F5F4F0 page, white boxes, text #121212, primary buttons black, blue #1742DF only for links and focus.
- Manrope for words (400 body, 500 headings and buttons, never 700), Space Mono for code and labels, Geist Pixel for big numbers only.
- Corners: surfaces 0, buttons, inputs and selects 6px, tags 4px, pills and avatars round.
- Two or more boxes side by side are joined card frames (.tm-join): no gaps, at most 4 per row.
- Content in the fixed 1232px frame. Headings balanced, no text after the content, sentence case.
- Give buttons, inputs, tags and pills class names that say what they are (btn, input, tag, pill); the auto-fix reads them.
`);
process.exit(0);
