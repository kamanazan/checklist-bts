# Check list app

tech stack:

* nodejs v20 (chck .nvmrc)
* postgresql
* sequelize -> for managable model migration


# Usage

1. create `.env` file based on `.env.example` file, and fill the neccessary field
2. create database name according to `DB_NAME`
3. run migration `npx sequelize-cli db:migrate`
4. app will run on port 3000

# example usage in curl

## register user

```curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "user1", "password": "Test1234"}'
```


## login

```
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "user1", "password": "Test1234"}'
```

copy the token from the 'token' field


## create checklist

```
curl -X POST http://localhost:3000/checklist \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token" \
  -d '{"title": "check list harian"}'
```

## create list for the checklist

```
curl -X POST http://localhost:3000/item/add/1/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token" \
  -d '{"item": "check list 1"}'
```

# get all list for checklist with id:1

```
curl http://localhost:3000/item/getItem/1/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token"
```

# mark list with id:1 as completed

```
curl -X PUT http://localhost:3000/item/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token" \
  -d '{"completed": true}'
```
