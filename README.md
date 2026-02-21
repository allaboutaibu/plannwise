# PlanWise — Emotion-Aware Study Planner

- PlanWise is a lightweight static site that helps students plan study sessions adapted to mood and energy, with a Pomodoro timer, smart timetable generator, and emotion-aware suggestions. It's designed to be hosted on GitHub Pages.

How to use
- Open `index.html` in a browser (or publish with GitHub Pages).
- Use the Mood Planner to get a suggested study task based on mood + energy.
- Start the Focus Timer (25-minute Pomodoro). Completed sessions are stored per-day in `localStorage`.
- Add subjects and available hours, then generate a smart timetable. Save plans to `localStorage`.

 New enhancements
 - Icons: subtle icons added to sections using Font Awesome.
 - Micro-animations: buttons, cards, timer and plan blocks have smooth, minimal animations.
 - Background particles: subtle floating particles in the background for a calm aesthetic.
 - Daily reset: the app automatically clears daily timetable and archives previous plans; session counters are tracked per-day.
 
 - Unified Planner: Mood Planner and Timetable Generator are merged into one adaptive planner that generates a burnout-aware timetable based on mood, energy, difficulty, and available time.

Publish on GitHub Pages
1. Commit this repository to GitHub.
2. In repository Settings -> Pages, set the site source to the `main` (or `master`) branch and `/ (root)` folder.
3. Visit the provided pages URL.

Files
- `index.html` — main UI
- `styles.css` — light blue theme and layout
- `app.js` — client-side logic and localStorage

Future ideas: weekly analytics, streak tracking, export/import, mobile responsive tweaks.
