import usersRouter from './users.js'
import indexRouter from './index.js'
import CakesRouter from './Cake.js'

export const routesInit = (app) => {
    app.use('/', indexRouter)
    app.use('/users', usersRouter)
    app.use('/Cakes', CakesRouter)

    app.use((req,res)=>{
        res.status(404).json({msg:"not Found 404"})
    })
}