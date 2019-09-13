# Easylancer Web App
This is the initial version of the single page app that is going to be shown to the web users. It is designed to be mobile-first with performance and UX in mind. The app sole communicator is the Client API (https://github.com/ahmedsaab/easylancer-client-api) which abstracts all the user communication. 

Authentication is made by Auth0 to get a valid JWT token (https://auth0.com/)

### Quick start

1.  Make sure that you have Node.js v8.15.1 and npm v5 or above installed.
2.  Run `npm install` in order to install dependencies.
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
    - [X] Distinguish assigned offer in offers tab
    - [X] Color code task status tag
    - [X] Sidebar on click link backdrop bug
    - [X] Disable body scroll on open Sidebar on mobile
    - [X] Fix z-index order
    - [X] Disable scroll while OfferDetails modal open on mobile
    - [X] Ability to hide/close the offerDetails modal
    - [X] Action buttons restyling (sticky)
    - [X] Offers tab empty state
    - [X] Offer Details Modal content + actions business logic
    - [X] TaskAssignedModal content
    - [X] Create offer success/failure modal contents
    - [X] Assigned Offer on click + Modal 
    - [X] Fix broken Auth workflow for not logged in sessions
    - [X] Login button styling
    - [X] Create task button
    - [X] Create task modal
    - [X] Scrollable Fluid Modal
    - [X] Sticky offer details action buttons
    - [X] Offer Details overflow bug
    - [X] Cancel task action and modal
    - [X] Finish task action and modal
    - [X] Review widget in task page
    - [X] Edit task
    - [X] Design Spinners
    - [ ] Empty message modal
    - [ ] Open message modal from offer
    - [ ] Open message modal from task
    - [X] SideBar content regarding logged in user
    - [ ] Sign in and sign up
    
- (A) As an owner I should be able to see:
    - (1) all my open tasks (those that are open, assigned to a worker, pending my review, or pending the worker's review)
    - (2) all my closed tasks (including those that are done, not-done, cancelled, or in investigation)
    
- (B) As a worker I should be able to see:
    - (1) all the tasks I applied to (in any status)
    - (2) all my planned tasks (those that are assigned to me or waiting my review)
    - (3) all my closed tasks (including those that are done, not-done, cancelled, in investigation, or pending the owner's review)
    
A0: New -> []
A1: Planned -> [Started, Scheduled, Pending my review]
A2: Finished -> [Investigating, Done, Not Done, Pending the worker review]
A3: Cancelled -> []

B1: Planned -> [Started, Scheduled, Pending my review]
B2: Finished -> [Investigating, Done, Not Done, Pending the owner review]
B3: New -> []
B4: Cancelled -> []

### TODO (BE)

- [X] Review and change the task statuses names
- [ ] Implement badges business logic
- [ ] Distinguish new offers
- [ ] Filter out removed tasks from Client API
- [ ] Get offer endpoint with more data about the offer's user relative to the task applied (similar finished tasks, relative badges, relative success rate, relative ratings)
- [ ] Filter out investigation tasks from search, get task, and profile tasks endpoints but not in my tasks page
- [ ] Add badges functionality
- [X] Add tags functionality
- [X] Fix seen functionality
