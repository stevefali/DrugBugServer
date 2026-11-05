# DrugBugServer

DrugBug is a full-stack web app for tracking medications.
I made it using React, JavaScript, Node.js, Express,js, Knex, and Bootstrap. It includes a front end that allows users to add, view, and edit medications and doses to receive email and web push notifications when it is time for a dose or to order a refill. You can now also search for interactions your medications could have with food, drinks, or other medications.

### This is the back end repository. The repository for the front end can be found [here](https://github.com/stevefali/DrugBug)

The server, where all the magic happens, grabs the current data in the MySQL database that I created, schedules notifications using cron syntax and triggers them in real time in worker threads that build notifications and then trigger them on the NotificationApi. The server also handles interaction searches by fetching data from the US FDA API and filtering through the results to find matches for the interactor queried by the user.



## Implementation

### Tech Stack

- React
- Node
- MySQL
- Express
- Client Libraries:
  - react
  - react-router
  - axios
  - Bootstrap
- Server Libraries:
  - Bree
  - knex
  - express
  - [NotificationApi](https://www.notificationapi.com)

## Installation Instructions

To install the React app ([DrugBug](https://github.com/stevefali/DrugBug)) you need to simply run `npm i` in the command line to install the node modules.

To install the server (this repo) you need to:
- Run `npm i` in the command line to install the node modules.
- Make a mysql database, then run these commands:
	- `npm run migrate`
 	- `npm run seed`
    

### Current Database Structure Visualization

![](readme-images/drawSQL-image-export-2024-04-13.png)

## Next Steps for DrugBug
There are several updates and new features I have in mind for DrugBug, including:
- "Caregiver Mode": Refactor to allow users to add "patients" and/or family members, etc., to their profile, rather than all medications in the account being linked to just the one user.
- Add the ability for users to add new medications by taking a picture of their medication labels, instead of having to manually type every detail.
- Add a feature that estimates how much of each medication users have left (based on the doses) and when they will need to order more.
- Add a "quick view" screen that lists all the user's medications, dosages, and allergies, that they can easily present on intake to hospitals, clinics, etc.
- Allow users to add their pharmacy information, such as contact info, hours, address, etc., and make it easy to order refills.
- Front-end revamp/remodel to make the app look and feel more professional.





