const  connDB = require("../config/conn")
class MercadoModel
{
    static async createMercadoModel(nombre_mercado, encargado_mercado, email_mercado, telefono_mercado, dire_mercado)
    {
        try {
            var conn = await connDB().promise()
            var sql = "insert into mercado(nombre_mercado, encargado_mercado, email_mercado, telefono_mercado, dire_mercado) VALUES " +
                "('"+nombre_mercado+"','"+encargado_mercado+"','"+email_mercado+"','"+telefono_mercado+"','"+dire_mercado+"')"
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            return false
        }
    }


    static async updateMercadoModel(id_mercado,nombre_mercado, encargado_mercado, email_mercado, telefono_mercado, dire_mercado,estado)
    {
        try {
            var conn = await connDB().promise()
            var sql = "update mercado set nombre_mercado = '"+nombre_mercado+"',encargado_mercado = '"+encargado_mercado+"'," +
                "email_mercado = '"+email_mercado+"',telefono_mercado = '"+telefono_mercado+"'," +
                "dire_mercado = '"+dire_mercado+"',estado = "+estado+" where id_mercado = "+id_mercado
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    static async readAllMercadoModel()
    {
        try {
            var conn = await connDB().promise()
            var datos = await conn.query("select * from mercado where estado = 1")
            await conn.end()
            return datos[0];
        }catch (e) {
            return []
        }
    }

    static async readAllMercadoActiveModel()
    {
        try {
            var conn = await connDB().promise()
            var datos = await conn.query("select * from mercado where estado = 1")
            await conn.end()
            return datos[0];
        }catch (e) {
            return []
        }
    }

    static async readCompostMercadoReportModel(mercados)
    {
        var oSqlMercado = ""
        if(Array.isArray(mercados)){
            oSqlMercado = "and M.id_mercado in ("+mercados+") "
        }

        var sql = "select table2.nombre_mercado,if(table2.cant_organica_mercado<0,0,table2.cant_organica_mercado) cant_organica_mercado,count(table2.id_lote) totLotes,sum(table2.PesoKL) totalPeso from " +
            "(select L.id_lote,M.cant_organica_mercado,M.nombre_mercado,ROUND(if(L.fk_tipo_peso = 1,L.peso * 1000," +
            "if(L.fk_tipo_peso = 2,L.peso *  0.45359237,L.peso)),2) PesoKL," +
            "L.fk_id_mercado,fk_tipo_peso from lote as L " +
            "inner join mercado as M on M.id_mercado = L.fk_id_mercado " +
            "where L.activo = 1 "+oSqlMercado+") as table2 group by table2.fk_id_mercado;"

        //console.log(sql)

        try{
            var conn = connDB().promise()
            var datos = await conn.query(sql)
            await conn.end()
            return  datos[0]
        }catch (e) {
            return []
        }
    }


    static async readOrganicoImpropioMercadoReportModel(mercados)
    {
        var oSqlMercado = ""
        if(Array.isArray(mercados)){
            oSqlMercado = "and M.id_mercado in ("+mercados+") "
        }

        var sql = "select M.nombre_mercado,M.cant_impropio_mercado,M.cant_organica_mercado from mercado as M " +
            "where M.estado = 1 "+oSqlMercado
        try{
            var conn = connDB().promise()
            var datos = await conn.query(sql)
            await conn.end()
            return  datos[0]
        }catch (e) {
            return []
        }
    }


}

module.exports = MercadoModel