# Namele

[Namele](https://namele-fgldl.ondigitalocean.app/) is a [Wordle](https://www.nytimes.com/games/wordle/index.html) clone for guessing a random five letter name. I choose this project because like many, I am currently obssessed with completing the daily puzzle game and felt that this project was big enough in scope to be a fun showcase of what can be built in a relatively short period of time using some of the latest technologies and patterns in React development.

## Approach

To start, as I was aiming to get off the ground quickly, I leveraged a [boilerplate starter](https://github.com/jonluca/vite-typescript-ssr-react) that included some of the technology I wanted to use: [React](https://reactjs.org/), [Typescript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), and [TailwindCSS](https://tailwindcss.com/) already installed and ready to go. From there, I setup a few project utilities like eslint & jest and then I worked on getting the data I would need: my list of names. I got 500 of the most popular baby names from [one site](https://emma.ca/baby-names) which I decided to use to generate my "secret" name, the one the player would be trying to guess. I also pulled in a larger set of 1,600 names from [another site](https://babynames1000.com/five-letter/) that I would use as my list of acceptable names to guess from and validate against.

After I had the data, I went about designing the state of my application. I knew that I would need to track things like the current guess, the past guesses, and then have some way to check and validate a user's guess. Rather than reach for a library or use many different disparate pieces of state, I decided to make a single store for my game's state that I managed using React's built-in `useReducer`.
You can see the final code and logic in the `src/client/reducers/game.ts` file.

After I had some of the core logic implemented, I built out the UI, including the grid of guesses and characters which are rendered in the `Game` component (`src/client/components/Game.tsx`). After I had the basic UI and a playable game, I finalized the core end-game logic and the `checkGuess` function that would determine the results of a user's guess (`src/client/utils/index.ts`).

After that, I spent a little time adding a few nice-to-have features such as a way to "share" the results of the game and did some minor quality of life fixes and polish. The last thing to do was publish the project, which I did by deploying the app via [Digital Ocean's app platform](https://www.digitalocean.com/products/app-platform). This gave me a very easy built-in CI/CD pipeline that allowed me to deploy new changes after each push.

## Next Steps

This project is still missing some features from the original Wordle game that core fans would say are "must haves". Primarily, what's most glaring is the "dynamic keyboard" that updates on each guess and makes the game mobile friendly. To that end, that would be the first feature I would add.

Also, currently unlike the real Wordle, Namele doesn't have one word per day for all users. Instead, for ease of use and play, each user is given a random secret word that is stored in `localStorage` for a day. Or upon completion, players can choose to "play again" which will give the user a new name to guess. This user experience is sub-optimal for the purists out there and as part of making the app more production-ready, would be nice to have the same experience as the Wordle app.

Another thing I'd like to do is clean-up the data a little and make the game a bit more approachable. Right now, some of the names are very hard and some common five letter names seem to be missing.

Also, as far as making the app more production ready. There are several things that I can think of that would be important before this app could be considered anything more than a toy. These include but are not limited to:

- Robust error handling and logging
- Moving data into a database and creating dedicated API routes for fetching the name lists and the daily name instead of relying on static data
- Adding robust test coverage along with integration testing leveraging something like [Cypress.io](https://www.cypress.io/)
- Adding session storage and user tracking so a user could return to an in-progress game and also see how they did historically.
- Optimize mobile UX and polish UI with animiations.
- Add best practices for security including validation and protection against XSS.
- Identify performance issues and potentially git rid of un-needed rerenders by memoizing certain functions or computations.
- If adding more features somehow increased complexity, I would potentially add an external state library such as [Redux](https://redux.js.org/) or [Xstate](https://xstate.js.org/)

## Local development

This project is built using the latest version of [Node LTS](https://nodejs.org/en/about/releases/) (which at this time is `v16.14.0`) and the latest version of [Yarn v1](https://classic.yarnpkg.com/lang/en/). Before completing the installation steps, it is recommended to have those technologies installed locally but the equivelent `npm` commands should work as well.

### Getting Started

To start clone the project locally and install its dependencies:

```bash
$ git clone https://github.com/nolds9/namele.git
$ cd namele
$ yarn
```

Now you should be able to run the project's dev server and view the app in your browser of choice on the default port: `http://localhost:7456/`

```bash
$ yarn dev:server
```

Other scripts that can be run can be found in the `"scripts"` section of the `package.json` file and include scripts for linting, formatting, and testing your code.
