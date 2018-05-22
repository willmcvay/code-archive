# Pin Pad Test

## To run:

1. `brew install nvm`
2. `nvm install 10.0.0`
3. `brew install yarn`
4. `yarn`
5. `yarn dev` The app runs at `localhost:8000`
6. `yarn test` This will run the unit tests.
7. `yarn lint` Runs prettier and eslint - this happens automatically for staged files in a pre-commit hook.
8. `yarn build` For a production build served from the `./dist/` folder.

### Note to reviewer:

The task is probably a bit over-engineered but I wanted to play around with the new React 16.3 context API, hence using the provider / consumer model for state rather than Redux or a simpler React Component state implementation. 

I also spent a bit longer than the suggested 1.5hrs to add some solid test coverage - hopefully this is not a problem.