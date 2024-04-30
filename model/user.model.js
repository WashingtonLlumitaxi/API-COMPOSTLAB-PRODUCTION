const  connDB = require("../config/conn")
class UserModel
{
    static async checkEmail(email){
        try {
            var conn = await connDB().promise()
            var sql = "select count(*) bandera from usuario where email_usuario = '"+email+"'"
            var datos = await conn.query(sql)
            await conn.end()
            //console.log(datos[0][0])
            if(datos[0][0].bandera > 0){
                return true
            }else{
                return false
            }
        }catch (e) {
            return false
        }
    }
    static async createUsuarioModel(email_usuario, nombres, apellido, cedula, telefono, contrasenia)
    {
        if(await this.checkEmail(email_usuario) == false)
        {
            // EMAIL DISPONIBLE
            try {
                var conn = await connDB().promise()
                var sql = "insert into usuario(email_usuario, nombres, apellido, cedula, telefono, contrasenia) " +
                    "VALUES ('"+email_usuario+"','"+nombres+"','"+apellido+"','"+cedula+"','"+telefono+"',MD5('"+contrasenia+"'))"
                await conn.query(sql)
                await conn.end()
                return 200
            }catch (e) {
                return 400
            }
        }else{
            return 300
        }
    }

    static async loginUsuarioModel(email,password)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select U.email_usuario,concat(U.nombres,' ',U.apellido) NombresApellidos," +
                "U.activeMercado,U.activeLote,U.activeHistorial,U.activeDespacho,U.activeReporte," +
                "U.activeNotificacion,U.activeRecordatorio,U.activeUsuarios,U.activeInsumo," +
                "U.active_options_mercado,U.active_options_insumo,U.active_options_lote," +
                "U.active_options_historial_lote,U.active_options_despacho," +
                "U.active_estadistico_lote,U.activeEntrada,U.active_options_Entrada from usuario as U where " +
                "U.email_usuario = '"+email+"' and U.contrasenia = MD5('"+password+"') and U.estado = 1"
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }

    static async readAllUsuarioModel(){
        try {
            var conn = await connDB().promise()
            var sql = "select U.email_usuario,U.nombres,U.apellido,U.cedula,U.telefono,U.estado,activeMercado, activeInsumo," +
                "activeLote, activeHistorial, activeDespacho, activeReporte, activeNotificacion, activeRecordatorio, " +
                "activeUsuarios,active_options_mercado,active_options_insumo,active_options_lote," +
                "active_options_historial_lote,active_options_despacho,active_estadistico_lote,activeEntrada," +
                "active_options_Entrada from usuario as U"
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }

    static async updatePasswordModel(email,pass){
        try {
            var conn = await connDB().promise()
            await conn.query("update usuario set contrasenia = MD5('"+pass+"') where email_usuario = '"+email+"'")
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    static async updateInfoUsuarioModel(nombres,apellido,cedula,telefono,estado,email_usuario){
        try {
            var conn = await connDB().promise()
            await conn.query("update usuario set nombres = '"+nombres+"',apellido = '"+apellido+"'," +
                "cedula = '"+cedula+"',telefono = '"+telefono+"',estado = "+estado+" where email_usuario = '"+email_usuario+"'")
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    static async updatePermisosUsuarioModel(activeMercado,activeLote, activeHistorial, activeDespacho,
                                     activeReporte, activeNotificacion, activeRecordatorio, activeUsuarios,
                                            activeInsumo,email,btn_tabla_mercados,btn_tabla_lotes,
                                            btn_tabla_insumos,btn_tabla_h_lotes,
                                            btn_tabla_despacho,active_estadistico_lote,active_entrada,active_tabla_entrada)
    {
        try {
            var conn = await connDB().promise()
            await conn.query("update usuario set activeMercado = "+activeMercado+", activeLote = "+activeLote+", " +
                "activeHistorial = "+activeHistorial+",activeDespacho = "+activeDespacho+"," +
                "activeReporte = "+activeReporte+", activeNotificacion = "+activeNotificacion+", " +
                "activeRecordatorio = "+activeRecordatorio+",activeUsuarios = "+activeUsuarios+"," +
                "activeInsumo = "+activeInsumo+"," +
                "active_options_mercado = "+btn_tabla_mercados+"," +
                "active_options_insumo = "+btn_tabla_insumos+"," +
                "active_options_lote = "+btn_tabla_lotes+"," +
                "active_options_historial_lote = "+btn_tabla_h_lotes+"," +
                "active_options_despacho = "+btn_tabla_despacho+"," +
                "active_estadistico_lote = "+active_estadistico_lote+"," +
                "activeEntrada = "+active_entrada+"," +
                "active_options_Entrada = "+active_tabla_entrada+" where email_usuario = '"+email+"'")
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }
}

module.exports = UserModel