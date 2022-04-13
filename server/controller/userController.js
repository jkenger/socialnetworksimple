const User = require('./../model/User')


// ERROR HANDLERS
const errorHandler = (err) => {
    const error = { username: '', password: '' }

    if (err.code === 11000) {
        error.username = 'Username already exist'
        return error
    }

    if (err.message === 'Invalid password') {
        error.password = 'Invalid Password.'
        return error
    }

    if(err.message === 'Invalid username'){
        error.username = 'Username does not exist.'
        return error
    }

    if(err.message.includes('users validation failed')){
         Object.values(err.errors).forEach(properties=>{
            error[properties.path] = properties.message
         })
    }
    return error
}


// RENDER
exports.registration_get = (req, res) => {
    res.render('registration')
}

exports.login_get = (req, res) => {
    res.render('login')
}



// API
exports.registration_post = async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    try {
        const user = await User.create({ username, password })
        res.status(200).send({ user })
    } catch (err) {
        const error = errorHandler(err)
        res.status(500).send({ err: error })
    }
}

exports.login_post = async (req, res) => {
    try{
        const { username, password } = req.body
        const user = await User.login(username, password)
        res.status(200).send({ user: user })
    }catch(err){
        const error = errorHandler(err)
        res.status(500).send({ err: error })
    }
}
