import { transporter } from '../config/config.js'
import userDTO from '../dto/user.dto.js'
import { UserService } from '../services/index.js'


export const getUserController = async (req, res) => {
    try {
        const result = await UserService.getAll()
        const users = result.map((user) => new userDTO(user))
        res.status(200).json({ status: 'success', payload: users })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}

export const getUserDetailController = async (req, res) => {
    try {
        const result = await UserService.getAll()
        res.status(200).json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}
export const getUserIdController = async (req, res) => {
    try {
        const id = req.params.uid
        const result = await UserService.getById(id)
        const user = new userDTO(result)
        if (result == null) {
            res.status(404).json({ status: 'error', error: 'Not found' })
        }
        res.status(200).json({ status: 'success', payload: user })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}
export const editUserIdController = async (req, res) => {
    try {
        const id = req.params.uid
        const data = req.body
        const result = await UserService.update(id, data)
        if (result == null) {
            return res.status(404), json({ status: 'error', error: 'Not found' })
        }
        res.status(200).json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}
export const deteleUserTimeController = async (req, res) => {
    try {
        let cantidadUserBorrados = 0
        const users = await UserService.getAll()
        users.map(async (user) => {
            if (user.rol = "user") {
                let resta = Date.now() - user.last_time_login
                if ((Math.round(resta / (60 * 60 * 60))) > 30) {//los borra despues de 30 minutos
                    cantidadUserBorrados = cantidadUserBorrados + 1
                    let message = {
                        from: process.env.NODEMAILER_USER,
                        to: user.email,
                        subject: 'Aviso de eliminacion de cuenta',
                        html: 'Debido a la reciente actividad de tu cuenta se ha borrado permanentemente'
                    }
                    await transporter.sendMail(message)
                    await UserService.delete(user._id)
                }
            }
        })
        res.json({ status: 'success', message: `Se han borrado ${cantidadUserBorrados}` })
    } catch (err) {
        return res.status(500).json({ status: 'error', error: err.message })
    }
}
export const deleteUserController = async (req, res) => {
    try {
        const id = req.params.uid
        const result = await UserService.delete(id)
        if (result === null) {
            return res.status(404).json({ status: 'error', error: 'not found' })
        }
        res.json({ status: 'success', payload: result })
    } catch (err) {
        return res.status(500).json({ status: 'error', error: err.message })
    }
}