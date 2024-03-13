
# setting Next.js 

- create next.js project based on [Official Installation Document](https://nextjs.org/docs/getting-started/installation)
```bash
npm install next@latest react@latest react-dom@latest
```

install tailwindcss and its dependencies
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

change content detail in tailwind.config.js
```
content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
```


# setting prisma

```
npx prisma init
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
```

Generate schema in schema.prisma
```
npx prisma db pull
```

Generate script in prisma script in node_modules
```
npx prisma generate
```

Create src\app directory 
```
mkdir src
cd src
mkdir app
```

Test prisma studio
```
npx prisma studio
```

create app directory
write this code on app/pages.tsx
```
export default function Page() {
    return <h1>Hello, Next.js!</h1>
}
```

run next.js as dev to auto generate layout.tsx and ready to run
```
npm run dev
```

npm install @prisma/client
npx prisma generate

- Open [http://localhost:3000](http://localhost:3000)