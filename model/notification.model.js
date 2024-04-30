const  connDB = require("../config/conn")
class NotificationModel
{
    static async readNotificacionModal(usuario)
    {
        var sql = "select A.idAlerta,A.FK_Lote,A.isVisto,L.nombre_lote,M.nombre_mercado," +
            "F.detalleFase,A2.id_actividad,A2.detalle_actividad from alertas as A left join lote as L on A.FK_Lote = L.id_lote " +
            "left join mercado as M on M.id_mercado = L.fk_id_mercado left join fases as F on F.idFase = L.FkIDFase " +
            "left join actividad A2 on A2.id_actividad = L.fk_id_ultima_actividad " +
            "where L.activo = 1 and L.fk_email_usuario = '"+usuario+"'"

        //console.log(sql)
        try{
            var conn = await connDB().promise()
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }
}

module.exports = NotificationModel