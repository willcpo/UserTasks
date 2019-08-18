## 1. Express and React

Using Node JS and Express, I created a server that would run and serve an HTML document (crafted with an ejs template). This HTML document with call bundle.js a webpack build that will insert React components and other modules into your client-side data. In React I created two separate components for a login page and a page to manage the list of tasks. I also created a component for the header.

## 2. Material.UI

I use Material.UI from npm to create forms and banners to create a smooth user experience. This includes a date picker for the tasks that included a pop-over with an interactive calendar. 

## 3. Mongoose.js and MongoDB

I created a schema in mongoose.js for each mongo collection. I created a schema for Users and Tasks. The user objects include a string username and a hashed and salted string password. It also includes an embedded document list of all tasks that the user has saved. Tasks included a name and a date. All fields in collections are required.

## 4. Passport.js

I used two Passport local strategies to store and validate users and sessions. Sessions are stored and maintained in cookies via express-session and cookie-parse. The connect-ensure-login module was used that only users with active sessions would have access to the tasks page. One was for signing up new users and the other was for logging in existing ones. Bcrypt was used for hashing and salting passwords to save to the database and to compare to existing passwords.

## 5. Task API 

I created a task API on the backend for the purpose of deleting, adding and retrieving tasks from MongoDB via mongoose collection objects. this largely required finding the user of the current session in the database and pushing to, pushing from or reading the task array on that document.

## 6. Form validation

Form validation was inserted via manual scripts that ran when the submit button was pressed. If fields were empty, their Material.UI class would be changed so that an error color appears. All errors concerning form validation and user signup and login have related error messages is rendered to the DOM.  

## Bonus: Git Flow

For each of the aforementioned steps, a branch was created, checked out and committed the new step's changes to Github. On Github, the changes were then merged to the master branch. This was to adhere more to a GitFlow type of work style. Branches, where changes occur, should be separated from the main production build until they are perfected and can be merged seamlessly with the existing product.
