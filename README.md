# Hefesto Express Prisma

Install npm dependencies:

```
cd hefesto-express-prisma
npm install
npx prisma generate
```

</details>

### 2. Create and seed the database

```
npx prisma migrate dev --name init
```

```
npx prisma db seed --preview-feature
```

### 3. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`.
