# Appsynth Fullstack Assignment 

## (28/09/20)
## Confidental
Please don't disclose this assignment with anyone. 

## Story and Goals
We plan to launch an URL Shortener service live. Your responsibility is to built the project from scratch and make sure the structure is flexible, easy to understand and easy to be supported by your team members. Since we are making a high-quality application, we should handle errors and logging properly.

## Your task
Your task is to create a scalable service with a clean architecture. We want to understand what you're able to achieve and what clean code and quality mean for you. 
You're also responsible for building the UI, you can use ReactJS or VueJS for client code.

## Expected Endpoints

**Shorten a new URL.**

- Displays a form to shorten URL
- Handles response from API (success/error) and inform the user accordingly

```
POST http://yourapp.com/shorten
```

**Retrieve original URL.**

- Accepts a `{key}` in param
- Redirect to the original URL
```
GET http://yourapp.com/{key}
```

## Requirements
 * The backend must be written in NodeJS only
 * We like Koa and Express but you can use any other framework you like
 * We like ReactJS and VueJS and want you to use one of these two frameworks
 * We prefer scalable, maintainable and testable code
 * Provide a list of security issues in your solution, and how you would fix them (Please add details in README file)
 * Provide a list of any scalability issues in your solution, and how you would fix them (Please add details this in README file)

## Extra points 
 * Extra points if you provide a dockerfile
 * Extra points for unit test implementation
 * Anything else that will show us your proficiency as a fullstack engineer
  
## Before you start 
  1. You can use this repository while you are developing the app. 
  2. To submit the test assignment please **close the issue "Assignment Done" in "issues" tab**.
  3. We will review the code **only after you close "Assignment Done" issue**.
  4. Feel free to reach out if you encounter any problems or have questions - good communication is a big part of the role.
  5. We wish you good luck and we're looking forward to review your code 😎

## Endpoints

* ```GET /public/index.html``` is the form for shortening URL.
* ```POST /shorten``` accept following json object 
    ```json
        {"url": "http://shorten.me"}
    ```
    and will response with

    ```json
        {
           "url": "http://original.url",
           "shortenUrl": "http://yourapp.com/shortenUrl"
        }
    ```
* ```GET /{key}``` will redirect to the original URL.

## Security issues

### DoS

* Using redirect loop by creating 2 shorten URLs then redirect to each other. This is mitigated by 
    * checking if the domain belong to us and don't redirect it.
    * implement max redirection by attaching a unique id along with the url when redirect, so, we can count the number of redirection and stop redirection, 
    once redirection count exceed its limit.
    
    However, this doesn't mitigate an attack where an attacker use 2 URL shortener services to keep redirecting to each other. This is somewhat protected by web browsers' max redirection.
* Using Cloudflare to detect and block an IP that has suspiciously height usage.
* Using a very long URL to fill the database. This is solved by validating URL length.

### Scalability issues

* To handle more requests, we can scale horizontally by hosting multiple instances of the service and set up a load balancer to spread load.
* We can also scale the database horizontally by using MongoDB replica set.

## Project structure

The service is developed using Koajs on the backend site, and MongoDB as the database. 
The frontend is developed using Vuejs.

Front end, `public/` contains the URL shortener form. 

### Backend

The backend's design is inspire by MVC. The `src` directory contains the backend code.
* `src/routes` contains endpoint handlers. This is Controller lite.
* `src/models` contains model entities for each collection.
* `src/services` contains business logic. It allows model entity injection. 
    This make business logic resistance to changes from both controllers and model entities.
