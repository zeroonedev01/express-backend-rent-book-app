<h1 align="center">Rent Book RESTfull API</h1>
<p align='center'>
  <img src='https://smarttechies.files.wordpress.com/2015/10/node-express.png?w=605' />
  </a>
</p>
<p align="center">
  Built with Express.js and Mysql.
</p>

# Table of Contents
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Requirements](#requirements)
- [END POINT](#end-point)
- [Contributor](#contributor)

# Introduction
[![React Native](https://img.shields.io/badge/Express%20-4.17.1-blue.svg?style=rounded-square)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v.10.16.2-green.svg?style=rounded-square)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-v.10.16.2-orange.svg?style=rounded-square)](https://nodejs.org/)
<br>
This is my repository containing a Rest Full API backend Rent Book app, this API is builded with Mysql and Express.JS

# Requirements
* [`npm`](https://www.npmjs.com/get-npm)
* [`Postman`](https://www.getpostman.com/)
* [`Node.Js`](https://nodejs.org/)
* [`Mysql`](https://nodejs.org/)

#INSTALLATION
# END POINT
Header :
x-access-token:token
1.	Genre
* Post
  * http://localhost:3000/rentapp/genre
  * name:Music
* Get
  * http://localhost:3000/rentapp/genre
  * http://localhost:3000/rentapp/genre?page=1&limit=2&sort=name:desc
* Patch
  * http://localhost:3000/rentapp/genre/1
  * name :blabla
* Delete
  * http://localhost:3000/rentapp/genre/13
2.	Book
* Post
  * id:BK00000005
  * title:Griffon in Action
  * desc:A beautifully written book that is a must have for every Java Developer.Ashish Kulkarni, Technical Director, E-Business Software Solutions Ltd.
  * image:https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/allen.jpg
  * available:1
  * genre:14
  * date:2012-06-04T00:00:00.000-0700
* GET
  * http://localhost:3000/rentapp/book?sort=title:desc&available=true&page=1&limit=2
* Patch
  * http://localhost:3000/rentapp/book/BK00000006
  * title:AAAA
  * desc:berubrah111
  * image:beruba11h.jpg
  * available:1
  * genre:12
  * date:2011-12-12T00:00:00.000-0800
* Delete
  * http://localhost:3000/rentapp/book/BK00000006

3 Borrow
* Post Borrow
  * http://localhost:3000/rentapp/borrow
  * id:P20190809002
  * id_book:BK00000001
  * datereturn:2019-08-20
  * datereturnuser :null
  * user_id:4
* Patch returnbook
  * http://localhost:3000/rentapp/borrow/P20190809003
* getBorrow
  * http://localhost:3000/rentapp/borrow/

4.user
* post sign:  192.168.6.109:3000/rentapp/user/signin
    * email: zeref.weismann || ammar.fiky@gmail.com (user)
    * email: pinter.gugel@gmail.com	|| natsu_dragneel (admin)		
    * password:test1234
* post signup : http://localhost:3000/rentapp/user/signup
    * username:budi1
    * email:budi1@gmail.com
    * password:test1234
    * role_id:1

# Contributor
<a href="https://github.com/tejojr">
          <img width="100" src="https://avatars2.githubusercontent.com/u/33275770?s=460&v=4" alt="Ammar Annajih Pasifiky">
          <br/>
          <sub>
          <b>Ammar Annajih Pasifiky
          </b>
          </sub>
</a>
