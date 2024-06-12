# Dev

Steps to set the app

* 1) DB

```
docker compose up -d
```


* 2) Rename env variables
* 3) Prisma:

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

* 4) Execute SEED

```
localhost:3000/api/seed
```
