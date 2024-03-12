# Seattle Curtain Call

This project was created by **Juliette Jones**, **Salley Fang**, **Jason Yu**,  and **Chaeri Hong** as their final project proposal for **INFO 340**, Winter 2024.

**Seattle Curtain Call** showcases a diverse and growing array of local plays, musicals, concerts, adn more, with a focus on smaller, independent events happening around the Seattle area! The website specifically highlights smaller events to encourage locals and tourists to support talented performers and organizations within their community!

## Features

Our project includes the following features:

### 1. Event Calendar

* Can view only after logging in
* Filter events based on genre, audience size, and pricepoint
* Can view multiple months using arrows
* Can click on an event on the calendar and view an external website for it
* Can view new events submitted using the Event Submission page (*reads from firebase data*)
* Uses *'react-select'* React Library

### 2. Events & Event Cards

* Can view even if not logged in, but the *Save* feature doesn't show up if a user is not logged in
* Can search events using *search bar* or by scrolling through the list
* After clicking event details, it takes users to a card with venue location, venue address, dates & times of events, link to buy tickets by clicking on the ticket availability next to the time.
* When logged in, can save events using the *Save* button, which will save to their Profile
  * If the user has saved the event before, will notify them that they've saved already and not let them save again
  * Saved events for each user are stored under the UID in firebase realtime database (*writes to firebase*)
* Event card uses path parameter: *"/events/:eventId"*
  * If a user types in an invalid eventId, will redirect them to *404 Error page*


### 3. Event Submission Form

* Can view only after logging in
* Can submit event and view that event on the Event Calendar page (*writes to firebase*)
* Will inform users what fields are required if they do not fill it in and try to submit

### 4. Profile 

* Once logged in, can see their username in the *"Welcome back, {username}"* text at the top
* Can change Username in Account Settings (*writing to firebase*)
* After changing Username, the page will automatically reload and the "Welcome back, {username} will display the user's updated username (*reads from firebase*)

### 5. Carousel
* Uses the *'react-responsive-carousel'* React Library
* Users can click through event carousel on the home page using arrows
* The carousel will also automatically move to another event periodically
* Infinite loop (will reset to front once it reaches the end)

