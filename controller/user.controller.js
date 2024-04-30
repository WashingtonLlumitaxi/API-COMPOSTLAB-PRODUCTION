const UserModel = require('../model/user.model')
class UserController
{
    static async createUsuarioController(email_usuario, nombres, apellido, cedula, telefono, contrasenia){
        return await UserModel.createUsuarioModel(email_usuario, nombres, apellido, cedula, telefono, contrasenia)
    }

    static async loginUsuarioModel(email,password){
        return await UserModel.loginUsuarioModel(email,password)
    }

    static async readAllUsuarioController(){
        return await UserModel.readAllUsuarioModel()
    }

    static async updatePasswordModel(email,pass){
        return await UserModel.updatePasswordModel(email,pass)
    }

    static async updateInfoUsuarioModel(nombres,apellido,cedula,telefono,estado,email_usuario){
        return await UserModel.updateInfoUsuarioModel(nombres,apellido,cedula,telefono,estado,email_usuario)
    }

    static async updatePermisosUsuarioController(activeMercado,activeLote, activeHistorial, activeDespacho,
                                            activeReporte, activeNotificacion, activeRecordatorio,
                                                 activeUsuarios,activeInsumo,email,
                                                 btn_tabla_mercados,btn_tabla_lotes,
                                                 btn_tabla_insumos,btn_tabla_h_lotes,
                                                 btn_tabla_despacho,active_estadistico_lote,
                                                 active_entrada,active_tabla_entrada){
        return await UserModel.updatePermisosUsuarioModel(activeMercado,activeLote, activeHistorial, activeDespacho,
            activeReporte, activeNotificacion, activeRecordatorio, activeUsuarios,activeInsumo,email,btn_tabla_mercados,btn_tabla_lotes,
            btn_tabla_insumos,btn_tabla_h_lotes,
            btn_tabla_despacho,active_estadistico_lote,active_entrada,active_tabla_entrada)
    }
}

module.exports = UserController