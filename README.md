# SmartHouse      

SmartHouse is single page smart house application that enables user to manage and monitor the appliances

# User Can:
+ Add, edit, remove and monitor own houses
+ Add, edit, remove and monitor rooms in the house.
+ Add, manage, monitor, edit and remove appliances in the room.
+ On/Off any appliances in the room.
+ Change temperature of climate in the room.
  
# Extended Features!

+ Reach out house location through the Google Map
+ Log-in & Log-out (Blocking direction to other pages without logged-in)
  
# Future Works

+ Designing an alerting mechanism to show notifications from appliances instantly
+ Designing a recent activities of users
  

## Environment Setup
In order to build & run client project individually; [yarn](https://yarnpkg.com/en/) is required. Upon installation of `yarn`, dependencies listed below are needed to be installed via running `yarn install` at the root folder of the project.

### Dependencies

+ react-router-dom: [React Router DOM](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom) is used as the application router.
+ axios: [Axios](https://github.com/axios/axios) is used to enable remote calls to backend.
+ @material-ui/core provides third party component with material ui css
+ @material-ui/icons provides third party icon with material ui css
+ bootstrap provides third party bootstrap css 
+ google-map-react is used to integrate with Google Map API
+ react-bootstrap provides components with bootstrap css
+ react-dom serves as the entry point to the DOM
+ react-geocode is used to get location information from Google Geocode API
+ react-router-bootstrap provides wrapper components for routing  
+ react-scripts includes scripts and configuration used by Create React App Configuration Tool

### Development Dependencies
+ json-server: [JSON Server](https://github.com/typicode/json-server) is used as a development dependency in order to enable client side only working via providing a built-in mock server.
+ npm-run-all: https://www.npmjs.com/package/npm-run-all is used to run multiple npm-scripts in parallel or sequential.

## Running Project Locally
In order to run the project locally upon setting up environment via `yarn install` please run `yarn dev`, which starts both mock server and internal application server concurrently. While running in `dev` mode; mock data located under `db.json` is used as database.

## Log-in application
In order to log-in the application, please enter any e-mail or password or can even leave it empty, application accepts any e-mail(any string including empty string) or password(any string including empty string) to login

## Building Project For Production
In order to build the project for production; please run `yarn build` command at the root of the project folder. Upon running the command; `build` directory, which contains production ready assests, will be created within root directory of the project.

## Design Principles
+ Rest api calls and business logic & rendering are seperated because in the future, another technology can be used instead of the axios, and instead of modifiying all components, only this component will need to be modified. Besides, api url hard coded in only this component but later it can be moved to configuration file.
+ Appliance types are defined on the mock server. Can be changed dynamically and the number of appliance types can be increased. 
+ Log in and log out infrastructure was established with React routing. User cannot access other pages before log in, even if he wants to access he is directed to the login screen.
+ The application works as if there is only one user because this application but can be quickly supported to support multiple users if needed


## Known Issues & Bugs & Warnings
+ Static content served over CDN: Some of the css files and icons are served over CDN; it should be nice to keep them in local if possible.
+ Any linting mechanism is not added to application but while implementing, eslint mechanism is used over IDE(Visual Studio Code). it should be nice to add it to package.json
+ Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option> warning: <select> defaultValue or value property is not running properly so using "selected" property is found suitable
+ Multiple css and component library are used, it should be nice to keep them in local if possible or reduce multiple dependency
+ json-server sometimes may not work consistently with deletions.
