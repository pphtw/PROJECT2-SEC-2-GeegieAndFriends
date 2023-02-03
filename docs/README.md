# Project Music Player (Release v1.0.0)

##### By _Geegie and Friends_, an INT203 Project Team

A Vue music player project for INT203 Class created for education purposes only.

Open and view the Project using the `.zip` file provided or at my [GitHub Repository]

The project is also hosted on [Netlify](https://geegie.netlify.app) (for development preview using this [link](https://geegie-dev.netlify.app))

## Table of Contents

- [Getting Started](#getting-started)
  - [Tools Required](#tools-required)
  - [Installation](#installation)
- [Development](#development)
  - [Sprint 1: Planning and Project Setup](#sprint-1-planning-and-project-setup)
    - [Step 1: Project and repository preparation](#step-1-project-and-repository-preparation)
    - [Step 2: Work flow planning and choosing the topic](#step-2-work-flow-planning-and-choosing-the-topic)
  - [Sprint 2: Home page UI and Music Player](#sprint-2-home-page-ui-and-music-player)
    - [Step 1: Design the homepage for the application](#step-1-design-the-homepage-for-the-application)
    - [Step 2: Coding the music player component and layout for the homepage](#step-2-coding-the-music-player-component-and-layout-for-the-homepage)
- [Running the App](#running-the-app)
- [Deployment](#deployment)
- [Versioning](#versioning)
- [Contributors](#contributors)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)

## Getting Started

The two primary branches in the project are `main` and `dev`.

- `main` contains the production version of the application code
- `dev` contains code under development

The project structure:

```
    PROJECT1-SEC-2-GeegieAndFriends
	├── README.md
	├── package.json
	├── .gitignore
	├── .stylelintrc.json
	├── .yarnrc.yml
	├── .gitignore
	├── package.json
	├── postcss.config.js
	├── tailwind.config.js
	├── vite.config.js
	├── yarn.lock
	├── index.html
	├── .github
	│   └── workflows
	│       └── unit-test.yml
	├── .yarn
	│   ├── cache
	│   └── releases
	├── public
	│   ├── favicon.ico
	│   └── tracks
	└── src
	    ├── assets
	    │   ├── img
	    │   └── main.css
	    ├── App.vue
	    └── Main.js
```

### Tools Required

You would require the following tools to develop and run the project:

- A text editor or an IDE (Recommended: _WebStorm_ or _Visual Studio Code_)
- _NodeJs_ v16.9.0 or later
- _Yarn_ for package management

### Installation

These installation steps are required to build the project from your local machine.

- Install NodeJs from this [_link_](https://nodejs.org/en/download/)
- Install Yarn through the [_npm package manager_](http://npmjs.org/):

  ```
  npm install --global yarn
  ```

  Check the version of Yarn by running:

  ```
  yarn --version
  ```

## Development

This section includes the development strategies, processes and contributions within the project.

### Sprint 1 Planning and Project Setup

#### Step 1 Project and repository preparation

- Create a new project with the IDE.
  - Integrating Yarn, Tailwind, etc.
  - Refactoring a package.json file.
- Setup [Netlify] for the project.
  ![The Netlify site overview for the production branch](img/netlify-site-overview.png 'Site Overview')
- Putting additional tools in the tech stack.
  - PostCSS: a transpiler that turns a special PostCSS plugin syntax into a Vanilla CSS
  - Autoprefixer: a plugin to parse CSS and add vendor prefixes to CSS rules using values from _Can I Use_.
  - Stylelint: a linter for set the CSS style rules.

#### Step 2 Work flow planning and choosing the topic

- Brainstorm the topic we want to practice and working on
- Chose a topic of music player app from 3 ideas including the split share app and restaurant recommendation app
  ![Top 3 topic we picked from the brainstorm session](img/topic-ideas.png 'Topic Ideas')
- Discussing how to contribute within the team.
  - Created the GitHub project for managing the task for contributors to pick their task.
    ![A todo board for organizing task within the team](img/github-projects-board.png 'Todo Board')
- Setup GitHub workflow for the future unit tests and linters optionally.
  ![Create unit test workflow for GitHub Actions](img/unit-test-workflow.png 'Unit Tests Workflow')

  For details now how everything has been implemented, refer the source code

### Sprint 2 Home page UI and Music Player

#### Step 1 Design the homepage for the application

- Finding some references for inspiration
- Drafting the homepage and some other pages for the future
  ![The first draft was paticipated by every contributors](img/first-draft.png 'The First Draft')
- Develop the design system for the whole project
  ![a music player component for reuse in the design](img/design-sys-music-player.png 'Music Player Component Design')
  ![Collection of color to use in the design](img/theme-and-colors.png 'Theme and Colors')
- Redesign in Figma
  ![Final design of the release v1.0.0](img/homepage-final.png 'The Redesigned Homepage')

#### Step 2 Coding the music player component and layout for the homepage

- Developing the music player algorithm in `dev` branch
  ![Some preview for the Vue source code](img/code-preview.png 'Code Preview')
- Layout for the homepage in `template` branch

## Running the App

Steps and commands for running the app:

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Compile and Minify for Production

```sh
yarn build
```

### Preview for Production

```sh
yarn preview
```

## Deployment

The `main` branch is automatically deployed to production on [geegie.netlify.app]

The `dev` branch is automatically deployed to preview the development on [geegie-dev.netlify.app]

This documentation also hosted on [Github Pages]

## Versioning

```
  Pre-release v1.0.0
  ----------------------------------------------------------------------------------
  [New] Music Player Component
  [New] Homepage
  ----------------------------------------------------------------------------------
```

## Contributors

| Student ID  | Name                     | Email                      | Github Username |
| ----------- | ------------------------ | -------------------------- | --------------- |
| 64130500066 | Phutawan Palakavong      | Phutawan.pala@kmutt.ac.th  | [pphtw]         |
| 64130500079 | Siripoom Kusonsong       | Siripoom.kuso@kmutt.ac.th  | [PhuMiZz]       |
| 64130500080 | Supapit Krawsaikom       | Supapit.kraw@kmutt.ac.th   | [supapitploy]   |
| 64130500105 | Banlearit Siriboon       | Banlearit.siri@kmutt.ac.th | [Banlearit]     |
| 64130500119 | Bowonwit Anothaisintavee | Bowonwit.anot@kmutt.ac.th  | [NewBww]        |

You can also see the complete [list of contributors][Contributors] who participated in this project.

## Authors

#### _Bowonwit Anothaisintavee_

- [Github](https://github.com/NewBww)

## Acknowledgments

This section can also be called as `Resources` or `References`

### Credits

Music in this project

- [Matsuri](https://youtu.be/NwOvu-j_WjY) (Song by _Fujii Kaze_) Licensed to YouTube by UMG (on behalf of Universal Music LLC); UMPG Publishing, BMI - Broadcast Music Inc., NexTone Inc. (Publishing), and 5 Music Rights Societies
- [double take](https://youtu.be/R8FHtIhWqNo) (Song by _dhruv_) Licensed to YouTube by SME (on behalf of Little Worry/RCA Records); BMI - Broadcast Music Inc., LatinAutor, LatinAutorPerf, and 11 Music Rights Societies
- [วาดไว้ (recall)](https://youtu.be/a0M_QUS3kC0) (Song by BOWKYLION) Licensed to What The Duck

### Inspirations

- [Music Player Web App](https://dribbble.com/shots/18946599-Music-Player-Web-App) (Dribble)
- [Web Music Player Concept](https://dribbble.com/shots/19753283-Web-Music-Player-Concept) (Dribble)

[//]: # 'HyperLinks'
[GitHub Repository]: https://github.com/NewBww/PROJECT1-SEC-2-GeegieAndFriends
[GitHub Pages]: https://NewBww.github.io/PROJECT1-SEC-2-GeegieAndFriends
[Contributors]: https://github.com/NewBww/PROJECT1-SEC-2-GeegieAndFriends/graphs/contributors
[Netlify]: https://geegie.netlify.app
[geegie.netlify.app]: https://geegie.netlify.app
[geegie-dev.netlify.app]: https://geegie.netlify.app
[//]: # 'Contributors Links'
[pphtw]: https://github.com/pphtw
[PhuMiZz]: https://github.com/PhuMiZz
[supapitploy]: https://github.com/supapitploy
[Banlearit]: https://github.com/Banlearit
[NewBww]: https://github.com/NewBww
