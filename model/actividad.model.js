const  connDB = require("../config/conn")
class ActividadModel
{
    static async readActividadModel()
    {
        try {
            var conn = await connDB().promise()
            var datos = await conn.query("select A.id_actividad,A.detalle_actividad from actividad as A where A.estado = 1")
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }
}

module.exports = ActividadModel