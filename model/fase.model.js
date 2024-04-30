const  connDB = require("../config/conn")
class FaseModel
{
    static async readFasesAllModel()
    {
        try {
            var conn = await connDB().promise()
            var datos = await conn.query("select F.idFase,F.detalleFase from fases as F where F.estado = 1")
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }
}

module.exports = FaseModel