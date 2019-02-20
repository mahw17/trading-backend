Banana - Trading
========================================
[![Build Status](https://travis-ci.com/mahw17/ramverk2.svg?branch=master)](https://travis-ci.com/mahw17/ramverk2)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/mahw17/ramverk2/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/mahw17/ramverk2/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/mahw17/ramverk2/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/mahw17/ramverk2/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/mahw17/ramverk2/badges/build.png?b=master)](https://scrutinizer-ci.com/g/mahw17/ramverk2/build-status/master)



# Banana-API documentation

## Register
### To add a new user
`POST /register`

Request header:
`Content-Type: application/json`

Request body:
`{
    "email":    ?,
    "pwd":    ?
}`

Result:
`{
    "result":true,
    "msg": "User added successfully."
}`
Errors:
`{
    "result":false,
    "err": db-error notification of some kind...
}`


## Login
### To request an API token
`POST /login`

Request header:
`Content-Type: application/json`

Request body according to:
`{
    "email":    ?,
    "pwd":    ?
}`

Result:
`{
    "result":true,
    "token": "sdfASDdfsasd464dsafsd3544sd"
}`
Errors:
`{
    "result":false,
    "err": "User does not exist."
}`
Or
`{
    "result":false,
    "err": "Password not valid."
}`


## User
### To request User Information
`POST /user`

Request header:
`Content-Type: application/json`
`x-access-token: sdfASDdfsasd464dsafsd3544sd`

Request body according to:
`{
    "email":    ?
}`

Result:
`{
    "result":true,
    "token": "sdfASDdfsasd464dsafsd3544sd"
}`
Errors:
`{
    "result":true, "user":{"email":"mahw17@student.bth.se","password":"$2a$10$08HPqRji7YqJHD9kFB1gYeNFgEgjQncz71ZMYpegiN0YjIHn3L3dS","balance":190,"stock":102,"price":8}
}`

Or
`{"result":false,"err":"User does not exist."}`


## Deposit
### To do a deposit
`Post /deposit`

Request header:
`Content-Type: application/json`
`x-access-token: sdfASDdfsasd464dsafsd3544sd`

Request body:
`{
    "email":    ?,
    "amount":    ?
}`

Result:
`{
    "result":true,
    "data": "Balance successfully updated."
}`

Errors:
`{
    "result":false,
    "err": db-error notification of some kind...
}`



## Price
Get current prices
`Get /price`

Result:
`{
    "min": 18.5,
    "max": 20.1,
    "avg": 19.3
}`

Errors:
`{
    "result":false,
    "err": db-error notification of some kind...
}`

### To update price
`Post /price`

Request header:
`Content-Type: application/json`
`x-access-token: sdfASDdfsasd464dsafsd3544sd`

Request body:
`{
    "email":    ?,
    "price":    ?
}`

Result:
`{
    "result":true,
    "data": "Price successfully updated."
}`

Errors:
`{
    "result":false,
    "err": db-error notification of some kind...
}`


## Trade
### Get trade information
`Get /trade`

Result:
`[
    {
        "email":"mahw17@student.bth.se"
        "stock": 125,
        "price": 20.1
    },
    {
        "email":"holmersson@hotmail.com"
        "stock": 65,
        "price": 19.75
    }
]`

### To do a trade
`Post /trade`

Request header:
`Content-Type: application/json`
`x-access-token: sdfASDdfsasd464dsafsd3544sd`

Request body:
`{
    "email_buyer":    ?,
    "email_seller":    ?,
    "amount":    ?
}`

Result:
`{
    "result":true,
    "data": "Trade successfully completed."
}`

Errors:
`{
    "result":false,
    "err": db-error notification of some kind...
}`
