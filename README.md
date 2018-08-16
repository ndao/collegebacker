# College Backer exercise from Nhi Dao

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Minimum Requirements
```
Node 8.11.1
NPM 6.1.0

Modern browsers (tested in Chrome 68)
```

### Setup
```
npm install
npm run build
```

### Run script
```
node server
```

### Open page at `localhost:3000`

### App requirements
- [x] If there are no contributors, display a text link labeled “Invite a contributor”.

- [x] Give the user a way to add new contributors to the list.

- [x] Only display the first 6 contributors; if there are more than 6, paginate to display them.

- [x] When delivering your work, please include 1-2 paragraphs explaining your reasoning for
why you made the technical decisions you made.

- [x] Include automated tests as needed.

### Some words about this app
`Create React App` is the fastest way to start a React project so I picked it for this exercise. There is no other front end libraries aside from ReactJS that is used for this project, no fancy router/Redux/etc., just a simple page.

There is a simple Express server at `server.js`. There are a couple server side libraries to parse body data. There is no database. Data is only persisted per server session. Contributors are stored in a Map object for fast data munipulation

The entry point the app is in `src/index.js` but most of the main code is in `src/App.js`. Currently, it displays an array of contributors with only first name and last name. Array makes it easy to loop and paginate. I did not get into user photo because it is a whole other uploading/storing image topic. Right now it is just a placeholder field.

I'm using a few newer techs such as the `dialog` HTML element and didn't include any polyfill so better to use modern browsers (I've tested in Chrome 68. It does not work in Firefox 61.0.2 :P ) I have fun trying out new things in random exercise like this :D

Included are also not a very comprehesive suite of unit tests, just testing the basics. I use Enzyme because it helps a lot of abstracting all the component rendering logic.

### Other features to consider
1. Reset form fields on successful save
2. Implement interstitial state
3. Image hosting
4. Support for wider range of browsers with polyfills
