export const registerUserController = async (req, res) => {
    res.redirect('/session/login')
}

export const loginUserController = async (req, res) => {

    res.redirect('/products')
}

export const deleteSessionController = async (req, res) => {

    req.session.destroy(err => {
        if (err) {
            return res.json({ status: 'error', message: 'Ocurrio un error' })
        }
        return res.redirect('/session/login')

    })

}
export const githubController = async (req, res) => {

}
export const githubcallbackController = async (req, res) => {

    res.redirect('/products')
}