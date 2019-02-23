Banana - Trading
========================================
[![Build Status](https://travis-ci.com/mahw17/trading-backend.svg?branch=master)](https://travis-ci.com/mahw17/trading-backend)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/mahw17/trading-backend/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/mahw17/trading-backend/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/mahw17/trading-backend/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/mahw17/trading-backend/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/mahw17/trading-backend/badges/build.png?b=master)](https://scrutinizer-ci.com/g/mahw17/trading-backend/build-status/master)

# Krav 1: Backend
Applikationen snurrar på en nginx-server som är installerad på en droplet på Digital Ocean. Jag har valt ett node-js baserat ramverk - Express för att bygga applikationen på. Valet föll på denna typ av lösning då jag dels hade en hel del kod som kunde återanvändas men även pågrund av att Express verkar vara det mest populära ramverket inom node-js för denna typ av ändamål.
Jag har för detta backend-api tagit ut ett subdomännamn 'trading-api.holmersson.se'.

Nedan finns en beskrivning på API:et som är kopplat. Samtliga tjänster förutom registreringen kan även göras via en frontend del som finns tillgängligt på http://trading.holmersson.se.

# Krav 4: Tester backend (optionell)
Jag har skrivit enhetstester/funktionstester för att kontrollera det mest grundläggande i varje route. Detta repo är även kopplat till en CI-kedja som består av byggkontroll i Travis och kodtäcknings- och kodkomplexitetsanalys i Scrutinizer. Kodtäckningen är cirka 70% och detta är jag nöjd med då jag valt att inte göra några tester som kräver åtkomst till databasen då jag vet att det kan vara svårt att dölja dessa inloggningsuppgifter i Travis/Scrutinizer. För att nå denna nivå av kodtäckning krävdes en begränsad insats. Överst på denna sida finns 'badges' som är kopplade till de olika tjänsterna, dessa fungerar även som länkar till respektive tjänst.

Då testerna i sig inte är så omfattande säger denna typ av tjänster bara till om jag gjort något riktigt dumt. Det finns säkerligen en hel del felaktigheter som ej fångas av de tester jag gjort.

I filen 'coverage/index.html' kan kodtäckning ses lokalt annars kan den även visas via Scrutinizer.

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
