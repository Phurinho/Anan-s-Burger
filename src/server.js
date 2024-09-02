require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const connectDB = require('./config/connectDB');
const userRouter = require('./routes/user.route');
const adminRouter = require('./routes/admin.route');
const { checkAdmin } = require('./middleware/auth');

const app = express();

connectDB(process.env.MONGODB_CONNECT_URI);

app.set('view engine', 'ejs');
app.set('views', (path.join(__dirname, 'views')));

app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000 }
}));

app.use(flash());
app.use(checkAdmin);

app.use("/", userRouter);
app.use('/admin', adminRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});