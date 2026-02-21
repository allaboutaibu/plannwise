<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# [PlanWise] 🎯

## Basic Details

name:Theertha Sreedharan
college: viswajyothi college of engineering and technology vazhakulam


### Hosted Project Link
https://plannwise.vercel.app/

### Project Description
PlanWise is a structured, emotion-aware study planner designed to help students manage their time effectively without feeling overwhelmed. The application generates balanced daily timetables based on the user’s mood, subject difficulty, and available study hours.
It also includes a customizable Pomodoro timer that allows users to set their own focus and break durations, promoting healthy study habits and preventing burnout.
The goal of PlanWise is to combine intelligent planning with calm, distraction-free design — helping students study smarter, stay consistent, and maintain focus in a structured way.

### The Problem statement
Students often struggle to create effective study schedules that match their energy levels, mood, and subject difficulty. Traditional timetables are rigid and fail to adapt to changing workloads or mental states.
This leads to unrealistic planning, poor time management, reduced focus, and eventually burnout.
There is a need for a smart, structured, and adaptive study planning system that helps students balance subjects, manage focus sessions, and maintain productivity without overwhelming themselves.

### The Solution
To address the problem of unstructured and unrealistic study planning, PlanWise provides a smart, adaptive study planning system that generates balanced timetables based on a student’s mood, subject difficulty, and available study time.
The system intelligently distributes study sessions to avoid overload and ensures that difficult subjects are scheduled strategically. It also integrates a customizable Pomodoro timer, allowing students to manage focus and break durations according to their personal preferences.
By combining structured planning with controlled focus sessions, PlanWise helps students maintain productivity, reduce burnout, and develop consistent study habits in a calm and organized environment.

---

## Technical Details

### Technologies/Components Used

**For Software:**
- Languages used: Python,JavaScript,HTML,css
- Frameworks used: react,django
- Libraries used: Axios,pandas,bootstrap
- Tools used: vscode,git & github



---

## Features

List the key features of your project:
- Feature 1:
-  Feature 1: Smart Timetable Generator
Users can enter:
Number of subjects
Subject names
Difficulty level
Available study hours
The system automatically generates a structured study timetable based on this input.

- Feature 2:
- Feature 2: Subject Management
Users can:
Add subjects
Adjust number of subjects
Assign difficulty levels
Sync subjects easily

- Feature 3:
- Feature 3: Pomodoro Focus Timer
Built-in Pomodoro timer that includes:
Custom focus time
Custom break time
Start, Pause, and Reset controls
Session counter
Automatic phase switching (Focus ↔ Break)

- Feature 4:
- Feature 4: Interactive Dashboard Interface
Clean landing page
Navigation between Timetable and Pomodoro
Responsive and user-friendly design
Animated background effects


---


## Project Documentation

### For Software:

#### Screenshots (Add at least 3)
<p align="center">
  <img src="./Screenshot 2026-02-21 073803.png" alt="Project Banner" width="100%">
</p>
<p align="center">
  <img src="./Screenshot 2026-02-21 073812.png" alt="Project Banner" width="100%">
</p>
<p align="center">
  <img src="./Screenshot 2026-02-21 073822.png" alt="Project Banner" width="100%">
</p>

#### Diagrams

**System Architecture:**

┌──────────────────────┐
                   │        User          │
                   │  (Student / User)    │
                   └──────────┬───────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │     Web Browser      │
                   │ (Chrome / Edge etc.) │
                   └──────────┬───────────┘
                              │
                              ▼
        ┌────────────────────────────────────────┐
        │        Frontend Application            │
        │  (HTML + CSS + JavaScript)            │
        └────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌────────────────┐   ┌────────────────┐   ┌────────────────┐
│ Landing Page   │   │ Timetable      │   │ Pomodoro Timer │
│ UI Component   │   │ Generator      │   │ Module         │
└────────────────┘   └────────────────┘   └────────────────┘
                          │                      │
                          ▼                      ▼
                ┌──────────────────┐    ┌──────────────────┐
                │ Schedule Logic   │    │ Timer Logic      │
                │ (JS Functions)   │    │ (Interval Logic) │
                └──────────────────┘    └──────────────────┘
                          │                      │
                          └──────────────┬───────┘
                                         ▼
                               ┌────────────────┐
                               │ Dynamic Output │
                               │ (UI Updates)   │
                               └────────────────┘

**Application Workflow:**

Application Launch
User opens the application in a web browser.
The landing page is displayed.
User clicks “Get Started” to enter the main system.
2) Navigation Selection

After entering the app, the user chooses:
📅 Timetable Section
OR
⏱ Pomodoro Timer Section
Only the selected section is displayed.

3) Timetable Generation Workflow
Step 1: Input Collection
User enters:
Number of subjects
Subject names
Difficulty level for each subject
Available study hours
Step 2: Processing
JavaScript collects input data.
The system distributes time based on:
Total available hours
Number of subjects
Subject difficulty
Step 3: Output Generation
A structured timetable is generated.
The schedule is displayed dynamically on the screen.
Study sessions are balanced to avoid overload.

4) Pomodoro Timer Workflow
Step 1: Timer Setup
User sets:
Focus duration (minutes)
Break duration (minutes)
Step 2: Timer Start
User clicks Start.
Countdown begins.
Phase is shown (Focus or Break).
Step 3: Phase Switching
When focus ends → Break starts automatically.
Session counter increases after each focus cycle.
Step 4: Controls
User can:
Pause timer
Reset timer
Restart session

5)Dynamic Updates
UI updates in real-time.
No page reload required.
All logic runs on the client side.

---




#### Demo Output
https://drive.google.com/file/d/1WQjljEzTWOPkll03sWBdsILpI-Daabmz/view?usp=sharing


## License
MIT License

SOFTWARE.
---

Made with ❤️ at TinkerHub
