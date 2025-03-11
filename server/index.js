import express from 'express'
import { connectDB } from './config/db.js'
import { apiRouter } from './routes/index.js'
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express()
const port = 3002

connectDB()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', apiRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})