import express from 'express'
import { json } from 'express'
import mongoose from 'mongoose'
import REQUEST_VIEWER from './utils/customMiddlewares/request_viewer.mjs'
import productRouter from './routers/productRouter.mjs'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import authRouter from './routers/authRouter.mjs'
import session  from 'express-session'
import usersRouter from './routers/usersRouter.mjs'

const app = express()


//Middlewares
app.use(json())
app.use(REQUEST_VIEWER)
app.use(session({
  secret: 'dev',
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 60000 * 3}
}))
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use(productRouter)
app.use(authRouter)
app.use(usersRouter)




app.get('/', (req, res) => {
    res.status(200).send("hello")
})


const PORT = process.env.PORT || 3000;

mongoose
.connect("mongodb+srv://Admin:o9kRC99EwBjK0gqT@cluster-proj.1m91v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-proj")
.then(() => console.log("Connected"))
.catch((err) => console.log(err));


app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});