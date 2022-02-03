# <div align="center" >Book a Table Application </div>

## Full-stack application to track tables and reservations for a restaurant.

<br>

## Table of Contents

- [Summary](#Summary)
- [User Guide](#User-Guide)
- [API Documentation](#API-Documentation)
  <br>

## Summary

#### Allows users to view reservations by day, create new reservations, edit existing reservations, assign a reservation to a table, cancel a reservation, and search for reservations by phone number.

<br>

#### This application was built with React, Node, Express, PostgreSQL, and Tailwind CSS. Development of this application involved turning user stories into features and tracking progress through daily stand-ups and agile project management tools -- [view the project board](https://github.com/users/lindseyindev/projects/4).

<br>

|                         <div style="width:250px"> API </div>                         |                           <div style="width:250px"> Client                            |
| :----------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| [GitHub](https://github.com/lindseyindev/restaurant-reservations/tree/main/back-end) | [GitHub](https://github.com/lindseyindev/restaurant-reservations/tree/main/front-end) |
|               [Deployed on Heroku](https://book-a-seat.herokuapp.com/)               |            [Deployed on Vercel](https://book-a-table.vercel.app/dashboard)            |

<br>

## User Guide

<br>

Pictures?
-Dashboard
-Create new form
-Create new table
-search for reservation
-seat a reservation

<br>

## API Documentation

| Route                                    | Method | Status Code | Description                                                                         |
| :--------------------------------------- | :----- | :---------- | :---------------------------------------------------------------------------------- |
| /reservations                            | POST   | 201         | Creates a new reservation                                                           |
| /reservations?date=####-##-##            | GET    | 200         | Returns a list of reservations that match the date in the query parameters          |
| /reservations?mobile_number=xxx-xxx-xxxx | GET    | 200         | Returns a list of reservations that match the mobile number in the query parameters |
| /reservations/:reservation_id            | GET    | 200         | Returns the reservation that matches the id in the parameters                       |
| /reservations/:reservation_id            | PUT    | 200         | Updates fields for the reservation that matches the ID in the parameters            |
| /reservations/:reservation_id/status     | PUT    | 200         | Updates the status of the reservation for the given ID                              |
| /tables                                  | GET    | 200         | Returns a list of tables                                                            |
| /tables                                  | POST   | 201         | Creates a new table                                                                 |
| /tables/:table_id/seat                   | PUT    | 200         | Assigns a reservation_id to the table that matches the ID in the parameters         |
| /tables/:table_id/seat                   | DELETE | 200         | Removes the reservation ID from the table and updates the status to be unoccupied   |

### /reservations example

### /tables example

<br>

## Technologies

- React
- Node.js
- Express.js
- Knex.js
- Tailwind CSS
- PostgreSQL
- JavaScript
- HTML
- CSS
- Vercel
- Heroku

## Installation

#### Backend:

1. Navigate to back-end and install dependencies using `npm install`
2. Add PostgreSQL database credentials to your environment - you

Navigate to front-end and install dependencies using `npm install`
