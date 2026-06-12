import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma', // Yeh humne Step 4 mein set kiya hai
  datasource: {
    url: process.env.DIRECT_URL, // .env se direct url uthayega
  },
})