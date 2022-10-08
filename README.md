# testDans

#Running

first, yarn install

second, yarn seed for get data to database

third, yarn start to running app

#Body

Register = {"email": "", "password": "","retypepassword": ""} -> http://localhost:3000/users/register

Login = {"email": "", "password": ""} -> http://localhost:3000/users/login

Get List = http://localhost:3000/api/recruitment/positions.json

Get Job Detail = http://localhost:3000/api/recruitment/positions/{ID}
