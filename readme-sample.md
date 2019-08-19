<h1 align="center">RENT BOOK RESTful API</h1>

# Overview

## Introduction

Rent Book API is an API that allow the users to read books and genre information data from database. Rent Book API also allow (registered ) users to create, update and delete a book and its genre information into/from database.

There're some features included in the API which allow users to programmatically sort the books (based on released date, title, availability or genre), rent or returning a book, search a book and fetch a certain number of books from database.

This documentation outlines the rent book API functionality.

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/) [![MySQL](https://img.shields.io/badge/mysql-v2..17.2-blue)](https://www.npmjs.com/search?q=mysql) [![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-v8.x-critical)](https://www.npmjs.com/package/jsonwebtoken)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. <a href="https://expressjs.com/en/starter/installing.html">Express JS </a>
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## Getting Started

![node.js](https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png)

### Node.js
Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.

Nodejs allow developers to use javascript to write command line tools and for **server side scripting**. Hence, Nodejs represent what we know about "Javascript Everywhere" Paradigm, which allow us to us javascript on both **client-side** and **server-side**. Nodejs use **V8** Javascript Engine, the same engine for Chrome and Chromium based browser used.

Nodejs was written in 2009 by Ryan Dahl, 13 years after the introduction of first server-side javascript environment which is **Netscape's LiveWire Pro Web**. Dahl write Nodejs based on his critic on the performance limitation of the most popular web server in 2009, Apache HTTP Server.

The initial release of Nodejs in 2009 supported only Linux and Mac OS X. Later in July 2011, the first Nodejs build supporting Windows was released.

![express](https://expressjs.com/images/express-facebook-share.png)

### Express.js
Express.js, or simply Express, is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.

The philosophy of Expressjs is to provide a small and robust tooling for HTTP servers. Making it a great solution for single page apps, website, hybrids, or public HTTP APIs. 

![restful api](https://s3.amazonaws.com/kinlane-productions/salesforce/salesforce-rest-api.png)

### RESTFul API
A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST and DELETE data.

A RESTful API -- also referred to as a RESTful web service -- is based on representational state transfer (REST) technology, an architectural style and approach to communications often used in web services development.

Representational State Transfer is a software architectural style that defines a set of constraints to be used for creating Web services. Web services that conform to the REST architectural style, called RESTful Web services, provide interoperability between computer systems on the Internet.

RESTful API design was defined by Dr. Roy Fielding in his 2000 doctorate dissertation. In order to be a true RESTful API, a web service must adhere to the following six REST architectural constraints:

* Use of a uniform interface (UI). Resources should be uniquely identifiable through a single URL, and only by using the underlying methods of the network protocol, such as DELETE, PUT and GET with HTTP, should it be possible to manipulate a resource.
* Client-server based. There should be a clear delineation between the client and server. UI and request-gathering concerns are the client’s domain. Data access, workload management and security are the server’s domain. This loose coupling of the client and server enables each to be developed and enhanced independent of the other.
* Stateless operations. All client-server operations should be stateless, and any state management that is required should take place on the client, not the server.
* RESTful resource caching. All resources should allow caching unless explicitly indicated that caching is not possible.
* Layered system. REST allows for an architecture composed of multiple layers of servers.
* Code on demand. Most of the time a server will send back static representations of resources in the form of XML or JSON. However, when necessary, servers can send executable code to the client.
  
### Authentication
Access to the API is granted by providing your username and password using HTTP basic authentication. The username and password used, is the same username and password you use to register.

### Authorization
For authorization, this API use JWT (jsonwebtoken).

### HTTP Requests
All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

- `GET` Get a resource or list of resources
- `POST` Create a resource
- `PUT/PATCH` Update a resource
- `DELETE` Delete a resource

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

| Code  | Status               | Description                                                                         |
| :---- | :------------------- | :---------------------------------------------------------------------------------- |
| `200` | `OK`                 | The request was successful                                                          |
| `400` | `Bad Request`        | There was a problem with the request (security, malformed, data validation, etc.)   |
| `401` | `Unauthorized`       | The supplied API credentials are invalid                                            |
| `403` | `Forbidden`          | The credentials provided do not have permission to access the requested resource    |
| `404` | `Not found`          | An attempt was made to access a resource that does not exist in the API             |
| `405` | `Method not allowed` | The resource being accessed doesn't support the method specified (GET, POST, etc.). |
| `500` | `Server Error`       | An error on the server occurred                                                     |

## Installation

1. Clone or download this repository
2. Open app's directory in CMD or Terminal.
3. Type in Terminal `npm install` to install the required packages.
4. Make a new file, **.env** and setup the file. [instruction here](#setup-env-file)
5. Turn on Web Server and MySQL, (Also can be done with third-party tools like XAMPP, WAMP, etc)
6. Setup the database. [instruction here](#setup-database)
7. Open **Postman** desktop application or Chrome web extension (Install **Postman** if you haven't yet)
8. Choose HTTP Method and enter the request URL.(i.e. localhost:8080/books)
9. Check all **Endpoints** [here](#endpoints)

## Setup .env file
Open **.env** file on code editor and copy the code below :

```
SERVER_PORT = 8080

DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = ''
DB_NAME = 'rent_book'

TOKEN_SECRET = 'secretToken'
```

## Setup Database
You can write this code below on your Terminal with mysql cli or import it to **phpmyadmin**.

Create Database named **rent-book** :

```
CREATE DATABASE rent-book;
```

Create Table named **book** :

```
CREATE TABLE book (
    book_id INT AUTO INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    desc TEXT,
    image_url VARCHAR(255),
    released_at DATE,
    genre INT,
    available TINYINT,
    FOREIGN KEY (genre) REFERENCE genre(genre_id,
    FOREIGN KEY (available) REFERENCES status(status_id)
);
```

Create Table named **genre** :

```
CREATE TABLE genre(
    genre_id INT AUTO INCREMENT PRIMARY KEY,
    genre VARCHAR(255)
);
```

Create Table named **status** :

```
CREATE TABLE status(
    status_id TINYINT PRIMARY KEY,
    status VARCHAR(255)
);
```

Create Table named **user** :

```
CREATE TABLE user(
    id INT AUTO INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);
```

## Endpoints

#### **Homepage**

- **Request** : **`GET /`**
- **Response** :

  ```
    {
    "message": "Welcome to Rent Book Api",
    "login": "If you already have an account, please login",
    "register": "Register your account today to use Rent Book API"
  }
  ```

#### **Register**

- **Request** : **`POST /register`**
- **Response** :

  ```
    {
    "status": 200,
    "message": "The user is successfully registered!",
    "user": {
        "username": "dedy003",
        "email": "dedyprasetyoh003@gmail.com",
        "password": "$2a$10$ThIm7Ra5opmjcrVq.vkN3.9J8m5wUCNPfyYBKgm3c9du2/OhY17Mu"
    }
  }
  ```

#### **Login**

- **Request** : **`POST /login`**
- **Response** :
```
{
    "status": 200,
    "message": "Login successfully!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbWVuZXNpYSIsImlhdCI6MTU2NjAwNDI2Nn0.Pu71LkGJn9wYM6n_xk5qadXoH4DfoE1jIQq01iN_7u8"
}
```
#### **CRUD Books Endpoint**
* **Read All Books**
  - **Request** : **`GET /books`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "title": "Wordl War II",
            "desc": "The history of world war II",
            "image_url": "cover world war II",
            "released_at": "2019-08-03T17:00:00.000Z",
            "genre": "History",
            "status": "Not Available"
        },
        {
            "title": "The Witcher",
            "desc": "The Witcher is an action role-playing game developed by CD Projekt Red and published by Atari, based on the novel series of The Witcher by Polish author Andrzej Sapkowski.",
            "image_url": "image the witcher",
            "released_at": "2019-08-02T17:00:00.000Z",
            "genre": "Novel",
            "status": "Available"
        },
        {
            "title": "Calculus",
            "desc": "Mathematics hell",
            "image_url": "image book math",
            "released_at": "2019-08-01T17:00:00.000Z",
            "genre": "Education",
            "status": "Not Available"
        }
    ]
}
```
* **Read a book**
  - **Request** : **`GET /books/show/:id`**
  - **Response** :
```
[
    {
        "title": "Modern Javascript",
        "desc": "Book for modern javascript",
        "image_url": "image javacscript",
        "released_at": "2019-07-31T17:00:00.000Z",
        "genre": "Education",
        "status": "Not Available"
    }
]
```
* **Create a book** (Need Verification)
  - **Request** : **`POST /books`**
  - **Response** :
```
{
    "status": 200,
    "message": "Book has successfully added!"
}
```
* **Update a book** (Need Verification)
  - **Request** : **`PATCH /books/:id`**
  - **Response** :
```
{
    "status": 200,
    "message": "Book has successfully updated",
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 0  Warnings: 0",
        "protocol41": true,
        "changedRows": 0
    }
}
```
* **Delete a book** (Need Verification)
  - **Request** : **`DELETE /books/:id`**
  - **Response** : 
```
{
    "message": "Book has been deleted",
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```

#### CRUD Genre Endpoint
* **Read All Genres**
  - **Request** : **`GET /books/genre`**
  - **Response** :
```
{
    "status": 200,
    "message": "This is the lists of genres",
    "result": [
        {
            "genre_id": 1,
            "genre": "Education"
        },
        {
            "genre_id": 2,
            "genre": "Novel"
        },
        {
            "genre_id": 3,
            "genre": "History"
        },
        {
            "genre_id": 4,
            "genre": "Biography"
        },
        {
            "genre_id": 5,
            "genre": "Childrens"
        },
        {
            "genre_id": 6,
            "genre": "Technology"
        },
        {
            "genre_id": 7,
            "genre": "Motivation"
        },
        {
            "genre_id": 8,
            "genre": "Business"
        },
        {
            "genre_id": 11,
            "genre": "Health"
        }
    ]
}
```
* **Create a genre** (Need Verification)
  - **Request** : **`POST /books/genre`**
  - **Response** :
```
{
    "status": 200,
    "message": "Genre has successfully added"
}
```
* **Update a Genre** (Need Verification)
  - **Request** : **`PATCH /books/genre/:id`**
  - **Response** :
```
{
    "status": 200,
    "message": "Genre has successfully updated",
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
```
* **Delete a Genre** (Need Verification)
  - **Request** : **`DELETE /books/genre/:id`**
  - **Response** :
```
{
    "status": 200,
    "message": "Genre has been deleted",
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```

#### Rent and Return Book Endpoint

**Rent a Book** (Need Verification)
* **Read All Available Books**
  - **Request** : **`GET /books/rent`**
  - **Response** :
```
{
    "status": 200,
    "message": "This is the lists of available books",
    "result": [
        {
            "title": "The Witcher",
            "desc": "The Witcher is an action role-playing game developed by CD Projekt Red and published by Atari, based on the novel series of The Witcher by Polish author Andrzej Sapkowski.",
            "image_url": "image the witcher",
            "released_at": "2019-08-02T17:00:00.000Z",
            "genre": "Novel",
            "status": "Available"
        },
        {
            "title": "The Hunger Games",
            "desc": "Could you survive on your own, in the wild, with everyone out to make sure you don't live to see the morning?\r\n\r\nIn the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and one girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV. Sixteen-year-old Katniss Everdeen, who lives alone with her mother and younger sister, regards it as a death sentence when she is forced to represent her district in the Games. But Katniss has been close to dead before - and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weigh survival against humanity and life against love.",
            "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1447303603l/2767052.jpg",
            "released_at": "2018-09-13T17:00:00.000Z",
            "genre": "Novel",
            "status": "Available"
        },
        {
            "title": "To Kill a Mockingbird",
            "desc": "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.",
            "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1553383690l/2657.jpg",
            "released_at": "2006-05-22T17:00:00.000Z",
            "genre": "Novel",
            "status": "Available"
        }
    ]
}
```
* **Rent a book**
  - **Request** : **`PATCH /books/rent/:id`**
  - **Response** :
```
{
    "status": 200,
    "message": "Book has successfully rented"
}
```

**Return a Book** (Need Verification)
* **Read All Not Available Book**
  - **Request** : **`GET /books/return`**
  - **Response** : 
```
{
    "status": 200,
    "message": "This is the lists of unavailable books",
    "result": [
        {
            "title": "Modern Javascript",
            "desc": "Book for modern javascript",
            "image_url": "image javacscript",
            "released_at": "2019-07-31T17:00:00.000Z",
            "genre": "Education",
            "status": "Not Available"
        },
        {
            "title": "Calculus",
            "desc": "Mathematics hell",
            "image_url": "image book math",
            "released_at": "2019-08-01T17:00:00.000Z",
            "genre": "Education",
            "status": "Not Available"
        },
        {
            "title": "The Witcher",
            "desc": "The Witcher is an action role-playing game developed by CD Projekt Red and published by Atari, based on the novel series of The Witcher by Polish author Andrzej Sapkowski.",
            "image_url": "image the witcher",
            "released_at": "2019-08-02T17:00:00.000Z",
            "genre": "Novel",
            "status": "Not Available"
        },
        {
            "title": "Wordl War II",
            "desc": "The history of world war II",
            "image_url": "cover world war II",
            "released_at": "2019-08-03T17:00:00.000Z",
            "genre": "History",
            "status": "Not Available"
        },
        {
            "title": "Harry Potter and the Order of the Phoenix",
            "desc": "There is a door at the end of a silent corridor. And it’s haunting Harry Pottter’s dreams. Why else would he be waking in the middle of the night, screaming in terror?\r\n\r\nHarry has a lot on his mind for this, his fifth year at Hogwarts: a Defense Against the Dark Arts teacher with a personality like poisoned honey; a big surprise on the Gryffindor Quidditch team; and the looming terror of the Ordinary Wizarding Level exams. But all these things pale next to the growing threat of He-Who-Must-Not-Be-Named---a threat that neither the magical government nor the authorities at Hogwarts can stop.",
            "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546910265l/2.jpg",
            "released_at": "2004-08-31T17:00:00.000Z",
            "genre": "Novel",
            "status": "Not Available"
        },
        {
            "title": "Twilight",
            "desc": "About three things I was absolutely positive.\r\n\r\nFirst, Edward was a vampire.\r\n\r\nSecond, there was a part of him—and I didn't know how dominant that part might be—that thirsted for my blood.\r\n\r\nAnd third, I was unconditionally and irrevocably in love with him.\r\n\r\nIn the first book of the Twilight Saga, internationally bestselling author Stephenie Meyer introduces Bella Swan and Edward Cullen, a pair of star-crossed lovers whose forbidden relationship ripens against the backdrop of small-town suspicion and a mysterious coven of vampires. This is a love story with bite.",
            "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1361039443l/41865.jpg",
            "released_at": "2006-09-05T17:00:00.000Z",
            "genre": "Novel",
            "status": "Not Available"
        },
        {
            "title": "Animal Farm",
            "desc": "George Orwell's timeless and timely allegorical novel—a scathing satire on a downtrodden society’s blind march towards totalitarianism.\r\n\r\n“All animals are equal, but some animals are more equal than others.”",
            "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1424037542l/7613.jpg",
            "released_at": "2003-05-05T17:00:00.000Z",
            "genre": "Education",
            "status": "Not Available"
        },
        {
            "title": "The Chronicles of Narnia",
            "desc": "Journeys to the end of the world, fantastic creatures, and epic battles between good and evil—what more could any reader ask for in one book? The book that has it all is The Lion, the Witch and the Wardrobe, written in 1949 by Clive Staples Lewis. But Lewis did not stop there. Six more books followed, and together they became known as The Chronicles of Narnia.",
            "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1449868701l/11127._SY475_.jpg",
            "released_at": "2002-09-15T17:00:00.000Z",
            "genre": "History",
            "status": "Not Available"
        },
        {
            "title": "The Fault in Our Stars",
            "desc": "Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.",
            "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1360206420l/11870085.jpg",
            "released_at": "2012-01-09T17:00:00.000Z",
            "genre": "Education",
            "status": "Not Available"
        },
        {
            "title": "The Giving Tree",
            "desc": "\"Once there was a tree...and she loved a little boy.\"\r\n\r\nSo begins a story of unforgettable perception, beautifully written and illustrated by the gifted and versatile Shel Silverstein.\r\n\r\nEvery day the boy would come to the tree to eat her apples, swing from her branches, or slide down her trunk...and the tree was happy. But as the boy grew older he began to want more from the tree, and the tree gave and gave and gave.",
            "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1174210942l/370493._SX318_.jpg",
            "released_at": "1964-10-06T17:00:00.000Z",
            "genre": "Childrens",
            "status": "Not Available"
        }
    ]
}
```
* **Return a book**
  - **Request** : **`PATCH /books/return/:id`**
  - **Response** : 
```
{
    "status": 200,
    "message": "Book has successfully returned"
}
```

### Support

For API support, please email dedy.prasetyo.h@gmail.com