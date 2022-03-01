This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
yarn run next dev -p 3001
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Start new project

```
npx create-next-app your-awesome-project --example https://github.com/metheglin/cna-reivo-admin
```

`.env.local`

```
NEXT_PUBLIC_API_PREFIX=http://localhost:3000/admin_api/v1
```

#### Choose Editor if you need it

```
# Tiny MCE
# You need `apiKey` to use TinyMCE. Please modify the key in `newTinyMceEditor/index.js`
yarn add @tinymce/tinymce-react

# Draft JS
yarn add draft-js
```

## Plop Example

```
yarn run plop pages blog
# ✔  ++ /components/blogs/index.js
# ✔  ++ /components/blogs/Form.js
# ✔  ++ /components/blogs/MainDashBar.js
# ✔  ++ /components/blogs/SubDashBar.js
# ✔  ++ /pages/blogs/index.js
# ✔  ++ /pages/blogs/new.js
# ✔  ++ /pages/blogs/[id].js

yarn run plop pages blog /admin/blogs /api/v1/blogs
```