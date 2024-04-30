const  connDB = require("../config/conn")
class EntradaModel
{
    static async readAllEntradaModel(mercado)
    {
        var oSQlMercado = ""
        if(Array.isArray(mercado))
        {
            oSQlMercado = " and E.fk_id_mercado in ("+mercado+")  "
        }

        try {
            var conn = await connDB().promise()
            var datos = await conn.query("select E.*,convert(E.fecha_hora_entrada,char(150)) fecha_hora_entrada_,R.detalle_residuo,M.nombre_mercado from entrada as E " +
                "inner join residuo as R on E.fk_tipo_residuo = R.id_residuo " +
                "inner join mercado as M on E.fk_id_mercado = M.id_mercado where E.estado_entrada = 1 " +oSQlMercado+
                " order by E.fecha_hora_entrada desc")
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }

    static async insertEntradaModel(fk_id_mercado, cant_organica, cant_impropia,name_encargado,
                                    fk_tipo_residuo, detalle_entrada)
    {
        try {
            var conn = await connDB().promise()
            var sql = "INSERT INTO compostlab.entrada (fk_id_mercado, cant_organica, cant_impropia," +
                "name_encargado, fk_tipo_residuo, detalle_entrada) VALUES ("+fk_id_mercado+", "+cant_organica+"," +
                " "+cant_impropia+", '"+name_encargado+"', "+fk_tipo_residuo+", '"+detalle_entrada+"')"
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }


    static async deleteEntradaModel(id_entrada)
    {
        try {
            var conn = await connDB().promise()
            var sql = "delete from entrada where id_entrada = "+id_entrada
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }
}

module.exports = EntradaModel