# Fruit Tree finder - building our first Full-stack application in a small team. 

[FRUIT FINDER LINK - ](https://multicultural-leaf-99080.herokuapp.com/)

## Summary
The Fruit Finder web-based application solves the issue of locating freely available fruit and vegetables that are publically accessible. 

The application allows users to find freely available fruit trees in their area. A user can create an account and add fruit tree locations. The locations are added to the map and can then be viewed by other users. If a user has an account they are able to like and comment on different fruit trees. 

The app was built using Node JS and the Express JS framework to enable the server-side and Client-side to be written in JavaScript. The application utlisies the Google Maps API inorder to display and locate fruit tree location on a map.

We used the following dependencies to assist in both development and production. 
- bcrypt -> password encryption  library 
- dotenv -> moduled used to access environemnt variables within in Node JS
- express -> used to create server framework and the application API. 
- express-session -> module to create session middleware. 
- lodash -> JavaScript library used to write more concise scripts. 
- morgan -> HTTP request logger middleware fro Node JS
- pg -> Node Js module used to interface with the PostgreSQL database. 

![picture](/Users/michaelchippendale/Documents/trello.png)
![picture](/Users/michaelchippendale/Documents/wireframe.png)

## User Stories with Associated Technical Tasks

### Key Stories

* User can view fruit tree locations on a google maps interface. 
* User can filter the viewable fruit markers by type of fruit. 
* User is able to click on fruit marker and read the uploaded details.
* User can can an sign-up and create an account. Password is encrypted using brcrypt library. 
* User can login to their account. 
* User can add a fruit tree to map that can then be viewed by other users. 

### Future Stories 

* Users can like and comment on fruit. 
* Display number of likes and and comments inside the fruit marker info window. 
* Allow user to select vegetable or herb option to add location to map. 
* User can upload an image of the fruit tree. 
* User can upload a profile picture. 

## Landing Page Layout 

* Designed for a mobile interface. 
* Header - title, drop down menu option and user profile picture. 
* Main - map, fruit list and add fruit function, each section is the width of the page. 
* footer - copyright and title. 

## Functionality 

* View individual fruits on google map interface. Each fruit is represented by different fruits icons. 
* Select which type of fruit is displayed on the map. 
* Login and sign in functionality. 
* Add a fruit to the map. 

## Functionality 

* JavaScript
* HTML
* CSS
* Node JS
* Express JS
* PostgreSQL Database 
