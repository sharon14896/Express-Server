import usersRouter from './Users.js'
import IndexRouter from './Index.js'
import CakeRouter from './Cake.js'


export const routesInit=(app)=>{
    app.use('/',IndexRouter)
    app.use('/user',usersRouter)
    app.use('/Cake',CakeRouter)

} 