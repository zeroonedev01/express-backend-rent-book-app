<h1 align="center">Rent Book RESTfull API</h1>
<p align='center'>
  <img src='https://smarttechies.files.wordpress.com/2015/10/node-express.png?w=605' />
  </a>
</p>
<p align="center">
  Built with Express.js and Mysql.
</p>

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Features](#features)
- [Built With](#built-with)
- [Requirements](#requirements)
- [Usage for Development](#usage-for-development)
- [Setup .env file](#setup-env-file)
- [End Points](#end-points)
- [Contributor](#contributor)

## Introduction
This is my repository containing a Rest Full API backend Rent Book app, this API is builded with Mysql and Express.JS

## Features
* Register and Login with JWT
* CRUD Books
* CRUD Genre
* Sorting 
* Filtering
* Pagination
* Search a books
* Rent or returning a book

## Built With
[![React Native](https://img.shields.io/badge/Express%20-4.17.1-blue.svg?style=rounded-square)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v.10.16.2-green.svg?style=rounded-square)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-v.10.16.2-orange.svg?style=rounded-square)](https://www.npmjs.com/search?q=mysql) 
[![jsonwebtoken](https://img.shields.io/badge/JWT-v.8.5.1-critical)](https://www.npmjs.com/package/jsonwebtoken)

## Requirements
* node.js
* npm
* postman (installer or chrome extension)
* code editor (visual studio code recommend)
* mysql (xampp)

## Usage for Development
* Clone this repository https://github.com/tejojr/express-backend-rent-book-app.git
* Open CMD or Terminal and enter to the app directory
* Type in Terminal npm install to install the required packages.
* Setup .env file
* Run MySql
* Create database and run example.sql script to install the necessary database structure
* Open Postman for testing API

## Setup .env file
* In windows OS, you can open command prompt, change directory to your project directory.
Example,
My project directory 
  ```
  E:\my_project
  ```
* Then you can type,
  ```
  copy .env.example .env
  ```
* Then Setup .env   

## End Points
1. Genre
* Post
  ```
  host/rentapp/genres
  ```
* Get
  ```
  host/rentapp/genres
  host/rentapp/genres?page=1&limit=2&sort=name:desc
  ```
* Patch
  ```
  host/rentapp/genres/:id
  ```
* Delete
  ```
  host/rentapp/genres/:id
  ```
2.	Book
* Post
  ```
  host/rentapp/books/
  ```
* GET
  ```
  host/rentapp/books?sort=title:desc&available=true&page=1&limit=2
  ```
* Patch
  ```
  host/rentapp/books/:id
  ```
* Delete
  ```
  host/rentapp/books/:id
  ```


3 Borrow
* Post Borrow
  ```
  host/rentapp/borrows
  ```
* Patch returnbook
  ```
  host/rentapp/borrows/:id
  ```
* getBorrow
  ```
  host/rentapp/borrows/
  ```

4.user
* post sign
  ```
  host/rentapp/users/signin
  ```
* post signup 
  ```
  host/rentapp/users/signup
  ```

## Contributor
<a href="https://github.com/tejojr">
          <img width="100" src="https://avatars2.githubusercontent.com/u/33275770?s=460&v=4" alt="Ammar Annajih Pasifiky">
          <br/>
          <sub>
          <b>Ammar Annajih Pasifiky
          </b>
          </sub>
</a>
