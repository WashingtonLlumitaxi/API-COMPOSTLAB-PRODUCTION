const  connDB = require("../config/conn")
class PesoModel
{
    static async readTipoPesoActiveModel()
    {
        try {
            var conn = await connDB().promise()
            var sql = "select TP.id_tipo_peso,TP.detalle_tipo_peso from tipo_peso as TP where TP.activo = 1"
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }
}

module.exports = PesoModel