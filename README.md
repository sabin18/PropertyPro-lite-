[![Build Status](https://travis-ci.org/sabin18/PropertyPro-lite-.svg?branch=develop)](https://travis-ci.org/sabin18/PropertyPro-lite-)  [![Coverage Status](https://coveralls.io/repos/github/sabin18/PropertyPro-lite-/badge.svg?branch=ch-other-package-167106462)](https://coveralls.io/github/sabin18/PropertyPro-lite-?branch=ch-other-package-167106462) [![Maintainability](https://api.codeclimate.com/v1/badges/fb44cc2ffca1613e1e16/maintainability)](https://codeclimate.com/github/sabin18/PropertyPro-lite-/maintainability)
        
# PropertyPro-lite-
#### Property Pro Lite is a platform where people can create and/or search properties for sale or rent. 

- HOSTED UI link: https://sabin18.github.io/PropertyPro-lite-/UI/
- HOSTED API link: https://propertypro-lite19.herokuapp.com/

## PROJECT DESCRIPTION

## UI images 
``````
           home page
```````
![Screenshot (122)](https://user-images.githubusercontent.com/47029978/60966269-23ff7e80-a318-11e9-8b51-5be6afb118bd.png)


``````
           details page
```````
![Screenshot (123)](https://user-images.githubusercontent.com/47029978/60966900-9de43780-a319-11e9-9e27-f28d942efa99.png)


``````
          login page
```````
![Screenshot (124)](https://user-images.githubusercontent.com/47029978/60967072-12b77180-a31a-11e9-8adf-f9ca25ff441f.png)


``````
          signup  page
```````

![Screenshot (125)](https://user-images.githubusercontent.com/47029978/60967176-4c887800-a31a-11e9-9535-d83b79b9b9d9.png)


``````
           agent panel page
```````

![Screenshot (126)](https://user-images.githubusercontent.com/47029978/60979490-1b687180-a333-11e9-9cac-377bf531a012.png)


To get the project up and running on your local machine, please follow these instructions.

- Clon this project on your machine , by running this command on in your command line or Terminal:
 ```
 git clone https://github.com/sabin18/PropertyPro-lite-.git
 
 ````
 - Install the required dependencies found in package.json by running this command:
 ```
 npm install
 ```
 
 - And then to start running  this project on your machine , run this command:
 ```
 npm start
 ```
 - then to run test, run this command:
 ````
 npm test
 `````
 ## Required Features
 
 - User can sign up.
 - User can login.
 - User (agent) can post a property advert.
 - User (agent) can update the details of a property advert.  
 - User (agent) can mark his/her posted advert as sold.  
 - User (agent) can delete a property advert.  
 - User can view all properties adverts. 
 - User can view all properties of a specific type - 2 bedroom, 3 bedroom, mini flat etc.  
 - User can view a specific property advert. 

## Optional Features

  - User can reset password.
  - flag/report a posted AD as fraudulent. 
  - User can add multiple pictures to a posted ad. 
  - The application should display a Google Map with Marker showing the red-flag or intervention location. 
  
## THE END POINTS OF THE PROJECT
 
| HTTP MEHOD | ENDPOINTS                       | ACCESS                       | DESCRIPTION                           |
|------------|---------------------------------|------------------------------|---------------------------------------|
| POST       | /api/v1/auth/signup             | public                       | create an account                     |
| POST       | /api/v1/auth/signin             | public                       | login to the app                      |
| POST       | /api/v1/property/               | private(user)                | create property adrvert               |
| GET        | /api/v1/properties/             | public                       | get all property                      |
| GET        | /api/v1/property/ID             | public                       | get specific property                 |
| PATCH      | /api/v1/property/ID             | public                       | Edit property                         |
| PATCH      | /api/v1/property/sold           | public                       | mark property as sold                 |
| POST       | /api/v1/property_id/flags       | public                       | post a flag                           |
| GET        | /api/v1/flags                   | public                       | get all flags                         |
| GET        | /api/v1/property/:ID/flags      | public                       | get flags of specific property        |
| GET        | /api/v1/flags/ID                | public                       | get a specific flags                  |
| GET        | /api/v1/users                   | public                       | get all users                         |
| GET        | /api/v1/users/ID                | public                       | get a specific user                   |
  
## Frontend

 - HTML
 - CSS -Javascript

## Backend

 - NodeJs
 - Express JS
 - Mocha
 - Chai
 ## OTHER TOOLS USED IN THIS PROJECT
 

- Linter
 #### ESLint - Linter Tool

## Style Guide
```
 Airbnb is used in this project : Airbnb maintains a very popular JavaScript Style Guide
````
- Compiler
```
  Babel - Compiler for Next Generation JavaScript(ES6).
```
```
-Pivotal Tracker  Link:https://www.pivotaltracker.com/n/projects/2356989
```
Project is currently being managed with Pivotal Tracker, a project management tool. You can find the stories on the PropertyPro-lite Pivotal Tracker Board
```
- Author:
 ### izere Roger Sabin 
