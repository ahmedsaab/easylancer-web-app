# Easylancer Web App
This is the initial version of the single page app that is going to be shown to the web users. It is designed to be mobile-first with performance and UX in mind. The app sole communicator is the Client API (https://github.com/ahmedsaab/easylancer-client-api) which abstracts all the user communication. 

Authentication is made by Auth0 to get a valid JWT token (https://auth0.com/)

### Quick start

1.  Make sure that you have Node.js v8.15.1 and npm v5 or above installed.
2.  Run `npm run setup` in order to install dependencies and clean the git repo.
3.  Run `npm start` to see the app at `http://localhost:3000`

### Documentation

- [**The Hitchhiker's Guide to `react-boilerplate`**](docs/general/introduction.md): An introduction for newcomers to the concepts of react-boiler-plate which is what the app is based on.
- [Overview](docs/general): A short overview of the included tools
- [**Commands**](docs/general/commands.md): Getting the most out of this boilerplate
- [Testing](docs/testing): How to work with the built-in test harness
- [Styling](docs/css): How to work with the CSS tooling
- [Your app](docs/js): Supercharging your app with Routing, Redux, simple
  asynchronicity helpers, etc.
- [**Troubleshooting**](docs/general/gotchas.md): Solutions to common problems faced by developers.
