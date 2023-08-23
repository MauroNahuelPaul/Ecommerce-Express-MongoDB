export const renderProductsController = async (req, res) => {

    if (req.user.email === 'adminCoder@coder.com' && req.user.password === "adminCod3r123")
        req.user.rol = 'Admin'
    else
        req.user.rol = 'User'
    res.render('products', {
        id: req.user._id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        rol: req.user.rol
    });
}

export const renderChatController = async(req,res)=>{
    res.render('chat', {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
    });
}

export const renderCartController = async (req, res) => {

    res.render('cart', {
        id: req.user._id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
    });
}

export const renderLoginController = (req, res) => {
    res.render('login')
}

export const renderFailLoginController = (req, res) => {
    res.send({ error: 'Fail login' })
}

export const renderRegisterController = (req, res) => {
    res.render('register')
}

export const renderFailRegisterController = (req, res) => {
    res.send({ error: 'Fail register' })
}