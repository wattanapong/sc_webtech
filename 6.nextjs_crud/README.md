#TLDR:
this project based on 
https://github.com/MBrunoS/prisma-next-crud-generator

# SETUP
```
npx create-next-app@latest
```

# setting prisma

```
npx prisma init
npm i -D prisma-next-crud-generator
```

- Create .env contains
```
DATABASE_URL="mysql://username:password@localhost:3306/employee?schema=public"
```

Update database type in schema.prisma to mysql
```
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator next_crud {
  provider = "npx prisma-next-crud-generator"
  output   = "../src"
}
```

Generate schema in schema.prisma
```
npx prisma db pull
```

Generate script in prisma script in node_modules
```
npx prisma generate
```