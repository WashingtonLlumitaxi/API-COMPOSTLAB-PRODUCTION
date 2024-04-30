const  connDB = require("../config/conn")
class ResiduoModel
{
    static async readAllResiduosActivosModel()
    {
        try {
            var conn = await connDB().promise()
            var datos = await conn.query("select R.id_residuo,R.detalle_residuo from residuo as R where R.estado = 1")
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }
}

module.exports = ResiduoModel