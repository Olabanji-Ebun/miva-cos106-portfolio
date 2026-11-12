# Student Portfolio & Website

A responsive, multi-page personal portfolio and academic planner built with **HTML5**, **CSS3**, and **Vanilla JavaScript** for the **COS 106 (Introduction to Web Technologies)** practical term project at **MIVA Open University**.

- **Live Website:** [olabanji-ebun.github.io/miva-cos106-portfolio](https://olabanji-ebun.github.io/miva-cos106-portfolio/)
- **Repository:** [github.com/Olabanji-Ebun/miva-cos106-portfolio](https://github.com/Olabanji-Ebun/miva-cos106-portfolio)

## Pages & Features

- **Home (`index.html`):** Personal introduction, studio portrait, brief biography, and quick links to every section.
- **About Me (`about.html`):** Educational background, career goals, skills and technologies table, hobbies, and an embedded HTML5 `<audio>` player.
- **Projects (`projects.html`):** Three personal web projects (*FinTrack*, *FocusFlow*, and *EventEase*) with screenshots, descriptions, tech tags, and links.
- **Academic Planner (`planner.html`):** Interactive task manager built with Vanilla JavaScript arrays, DOM manipulation, event delegation, and `localStorage` persistence. Users can add tasks with course codes and priorities, mark tasks as completed or pending, and delete tasks with live summary counters.
- **Contact (`contact.html`):** Contact form with client-side validation (non-empty fields, valid email format, digits-only phone number) connected to **EmailJS** for live message delivery.

## Tech Stack

- **Markup:** HTML5 (semantic elements, forms, tables, lists, images, `<audio>`)
- **Styling:** External CSS3 (`css/styles.css`) using CSS custom properties, Flexbox, CSS Grid, transitions, and responsive media queries
- **Interactivity:** Vanilla JavaScript (`js/main.js`, `js/planner.js`, `js/contact.js`)
- **Email Delivery:** EmailJS Browser SDK

## Project Structure

```text
MivaPortfolio/
├── index.html
├── about.html
├── projects.html
├── planner.html
├── contact.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── planner.js
│   └── contact.js
└── assets/
    ├── images/
    │   ├── ebun.png
    │   ├── project-1.jpg
    │   ├── project-2.jpg
    │   └── project-3.jpg
    └── media/
        └── study-intro.wav
```

## Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Olabanji-Ebun/miva-cos106-portfolio.git
   cd miva-cos106-portfolio
   ```
2. Open `index.html` directly in a browser, or serve the folder locally:
   ```bash
   python -m http.server 8095
   ```
3. Visit `http://localhost:8095/`.

## Author

**Ayooluwa 'Bukunmi Olabanji-Ebun**  
B.Sc. Software Engineering, MIVA Open University
