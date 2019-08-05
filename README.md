# Easylancer Web App
This is the initial version of the single page app that is going to be shown to the web users. It is designed to be mobile-first with performance and UX in mind. The app sole communicator is the Client API (https://github.com/ahmedsaab/easylancer-client-api) which abstracts all the user communication. 

Authentication is made by Auth0 to get a valid JWT token (https://auth0.com/)

### Quick start

1.  Make sure that you have Node.js v8.15.1 and npm v5 or above installed.
2.  Run `npm run setup` in order to install dependencies and clean the git repo.
3.  Run `npm start` to see the app at `http://localhost:3000`
3.  Run `npm run mock-server` to start the mock server backend at `http://localhost:8080`

### Documentation

- [**The Hitchhiker's Guide to `react-boilerplate`**](docs/general/introduction.md): An introduction to the boiler-plate app that the app is based on.
- [Overview](docs/general): A short overview of the included tools
- [**Commands**](docs/general/commands.md): Getting the most out of this boilerplate
- [Testing](docs/testing): How to work with the built-in test harness
- [Styling](docs/css): How to work with the CSS tooling
- [Your app](docs/js): Supercharging your app with Routing, Redux, simple
  asynchronicity helpers, etc.
- [**Troubleshooting**](docs/general/gotchas.md): Solutions to common problems faced by developers.

### TODO (FE)

- Task Page
    - [ ] Distinguish assigned offer in offers tab
    - [X] Color code task status tag
    - [ ] Sidebar on click link backdrop bug
    - [ ] Disable scroll while OfferDetails modal open on mobile
    - [ ] Ability to hide/close the offerDetails modal
    - [ ] Action buttons restyling (sticky)
    - [ ] Offers tab empty state
    - [ ] TaskAssignedModal content
    - [ ] Empty message modal
    - [ ] Open message modal from offer
    - [ ] Open message modal from task
    - [ ] Design Spinners
    - [ ] Fix broken Auth workflow for not logged in sessions
    
### TODO (BE)

- [X] Review and change the task statuses names
- [ ] Filter out removed tasks from Client API
- [ ] Filter out investigation tasks from search, get task, and profile tasks endpoints but not in my tasks page
