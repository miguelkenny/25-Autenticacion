const express = require('express')
const engine = require('ejs-mate')
const routes = require('./routes/index')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')

//Inicializaciones
const app = express()
require('./database')
require('./passport/local-auth')

//Congiguracion
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine)
app.set('view engine', 'ejs')

//Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(session({
	secret: 'coderhouse',
	resave: false,
	saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
	app.locals.signupMessage = req.flash('signupMessage')
	app.locals.signinMessage = req.flash('signinMessage')
	app.locals.user = req.user
	next()
})

//Rutas
app.use('/', routes)

//Inicializar Servidor
app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
	console.log('Servidor escuchando puerto', app.get('port'))
})