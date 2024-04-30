const  connDB = require("../config/conn")
class LoteModel
{

    static async updateLoteModel(id_lote,nombre_lote, observacion_lote, peso, fk_tipo_peso,
                                      fk_id_mercado,dia_notification,estado,residuo,fase){
        try{
            var conn = await connDB().promise()
            var sql = "update lote set nombre_lote = '"+nombre_lote+"',peso = "+peso+",fk_tipo_peso ="+fk_tipo_peso+"," +
                "fk_id_mercado = "+fk_id_mercado+",dia_notificacion = "+dia_notification+"," +
                "observacion_lote = '"+observacion_lote+"',activo = "+estado+",fk_id_residuo = "+residuo+",FkIDFase="+fase+" where id_lote = "+id_lote
            await conn.query(sql)
            console.log(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }


    static async deleteLoteModel(id_lote){
        try{
            var conn = await connDB().promise()
            await conn.query("update lote set activo = 0 where id_lote = "+id_lote)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }


    static async readLoteAllUserModel(email)
    {
        try{
            var conn = await connDB().promise()
            /*var sql = "select L.id_lote,L.nombre_lote from lote as L where L.activo = 1 " +
                "and L.fk_email_usuario = '"+email+"';"*/
            var sql = "select L.id_lote,L.nombre_lote from lote as L where L.activo = 1 "
            //console.log(sql)
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }
    static async readLoteUserModel(email)
    {
        try{
            var conn = await connDB().promise()
            /*var sql = "select R.detalle_residuo,R.id_residuo,L.dia_notificacion,L.FkIDFase,F.detalleFase,L.id_lote,L.nombre_lote,convert(L.fechaIngreso,char(150)) fechaIngreso,L.observacion_lote,L.peso,TP.*,U.email_usuario," +
                "M.id_mercado,M.nombre_mercado,concat(U.nombres,' ',U.apellido) UsuarioNombres from lote as L " +
                "inner join usuario as U on L.fk_email_usuario = U.email_usuario " +
                "inner join tipo_peso as TP on L.fk_tipo_peso = TP.id_tipo_peso " +
                "inner join mercado as M on L.fk_id_mercado = M.id_mercado " +
                "inner join fases as F on F.idFase = L.FkIDFase inner join residuo as R on L.fk_id_residuo = R.id_residuo " +
                "where ISNULL(L.fechaDespacho) and ISNULL(L.fechaSalida) and L.activo = 1 and " +
                "L.fk_email_usuario = '"+email+"' order by L.fechaIngreso desc"*/

            var sql = "select R.detalle_residuo,R.id_residuo,L.dia_notificacion,L.FkIDFase,F.detalleFase,L.id_lote," +
                "L.nombre_lote,convert(L.fechaIngreso,char(150)) fechaIngreso,L.observacion_lote," +
                "L.peso,TP.*,U.email_usuario,M.id_mercado,M.nombre_mercado,concat(U.nombres,' ',U.apellido) UsuarioNombres," +
                "A.detalle_actividad,A.id_actividad from lote as L left join usuario as U on " +
                "L.fk_email_usuario = U.email_usuario left join tipo_peso as TP on L.fk_tipo_peso = TP.id_tipo_peso " +
                "left join mercado as M on L.fk_id_mercado = M.id_mercado inner join " +
                "fases as F on F.idFase = L.FkIDFase left join residuo as R on L.fk_id_residuo = R.id_residuo " +
                "left join actividad as A on L.fk_id_ultima_actividad = A.id_actividad where " +
                "ISNULL(L.fechaDespacho) and ISNULL(L.fechaSalida) and L.activo = 1  order by L.fechaIngreso desc"

            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async insertLoteUserModel(nombre_lote, observacion_lote, peso, fk_tipo_peso,email,fk_id_mercado,dia_notification,residuo){
        try{
            var conn = await connDB().promise()
            await conn.query("INSERT INTO lote ( nombre_lote, observacion_lote, peso, fk_tipo_peso," +
                "fk_email_usuario, fk_id_mercado,dia_notificacion,fk_id_residuo) VALUES ('"+nombre_lote+"','"+observacion_lote+"', "+peso+", "+fk_tipo_peso+"," +
                " '"+email+"', "+fk_id_mercado+","+dia_notification+","+residuo+")")
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    /**ENVIA EL LOTE A DESPACHO**/
    static async sendLoteDespachoModel(idLote){
        try{
            var sql = "update lote set fechaDespacho = now() where id_lote = "+idLote
            var conn = await connDB().promise()
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    /**ADD HISTORIAL LOTE**/
    static async addHistorialLoteModel(vTemperatura, vHumedad, vPh, vOxigeno, detalleHistorial, lote,actividad)
    {
        try {
            var conn = await connDB().promise()
            var sql = "insert into historial_lote(vTemperatura, vHumedad, vPh, vOxigeno, detalleHistorial, FK_lote,fk_id_actividad) " +
                "VALUES ("+vTemperatura+","+vHumedad+","+vPh+","+vOxigeno+",'"+detalleHistorial+"',"+lote+","+actividad+")"
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    /**READ HISTORIAL**/
    static async readHistorialDetalleLoteModel(lote)
    {
        try{
            var sql = "select A.id_actividad,A.detalle_actividad,HL.id_historial_lote,HL.vTemperatura,HL.vHumedad,HL.vPh,HL.vOxigeno,HL.detalleHistorial," +
                "convert(HL.fechaHistorial,char(150)) fechaHistorial from historial_lote as HL " +
                "inner join actividad as A on HL.fk_id_actividad = A.id_actividad where HL.FK_lote = "+lote
            var conn = await connDB().promise()
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    /**READ LOTE DEPACHO**/
    static async readLoteDespachoUserModel(email)
    {
        try{
            var conn = await connDB().promise()
            /*var sql = "select L.id_lote,L.nombre_lote,convert(L.fechaIngreso,char(150)) fechaIngreso," +
                "convert(L.fechaDespacho,char(150)) fechaDespacho,L.observacion_lote,L.peso,TP.*," +
                "U.email_usuario,M.id_mercado,M.nombre_mercado,concat(U.nombres,' ',U.apellido) UsuarioNombres," +
                "ROUND(avg(HL.vOxigeno),2) vOxigeno,ROUND(AVG(HL.vPh),2) vPh,ROUND(avg(HL.vHumedad),2) vHumedad," +
                "ROUND(AVG(HL.vTemperatura),2) vTemperatura from lote as L left join usuario as U on " +
                "L.fk_email_usuario = U.email_usuario left join tipo_peso as TP on " +
                "L.fk_tipo_peso = TP.id_tipo_peso left join mercado as M on L.fk_id_mercado = M.id_mercado " +
                "left join historial_lote as HL on L.id_lote = HL.FK_lote " +
                "where !ISNULL(L.fechaDespacho) and !ISNULL(L.fechaIngreso) and ISNULL(L.fechaSalida) and L.activo = 1 and " +
                "L.fk_email_usuario = '"+email+"' group by L.id_lote order by L.fechaIngreso,L.fechaDespacho desc"*/
            //console.log(sql)

            /*var sql = "select L.id_lote,L.nombre_lote,convert(L.fechaIngreso,char(150)) fechaIngreso," +
                "convert(L.fechaDespacho,char(150)) fechaDespacho,L.observacion_lote,L.peso,TP.*," +
                "U.email_usuario,M.id_mercado,M.nombre_mercado,concat(U.nombres,' ',U.apellido) UsuarioNombres," +
                "ROUND(avg(HL.vOxigeno),2) vOxigeno,ROUND(AVG(HL.vPh),2) vPh,ROUND(avg(HL.vHumedad),2) vHumedad," +
                "ROUND(AVG(HL.vTemperatura),2) vTemperatura from lote as L left join usuario as U on " +
                "L.fk_email_usuario = U.email_usuario left join tipo_peso as TP on " +
                "L.fk_tipo_peso = TP.id_tipo_peso left join mercado as M on L.fk_id_mercado = M.id_mercado " +
                "left join historial_lote as HL on L.id_lote = HL.FK_lote " +
                "where !ISNULL(L.fechaIngreso) and ISNULL(L.fechaSalida) and L.activo = 1 " +
                "group by L.id_lote order by L.fechaIngreso,L.fechaDespacho desc"*/

            var sql = "select table1.*,LS.destino,LS.telefono_destino,LS.correo_destino from (select L.id_lote,L.nombre_lote," +
                "convert(L.fechaIngreso,char(150)) fechaIngreso,convert(L.fechaDespacho,char(150)) fechaDespacho," +
                "L.observacion_lote,L.peso,TP.*,U.email_usuario,M.id_mercado,M.nombre_mercado,concat(U.nombres,' ',U.apellido) UsuarioNombres," +
                "ROUND(avg(HL.vOxigeno),2) vOxigeno,ROUND(AVG(HL.vPh),2) vPh,ROUND(avg(HL.vHumedad),2) vHumedad," +
                "ROUND(AVG(HL.vTemperatura),2) vTemperatura  from lote as L left join usuario as U on L.fk_email_usuario = U.email_usuario " +
                "left join tipo_peso as TP on L.fk_tipo_peso = TP.id_tipo_peso left join mercado as M on L.fk_id_mercado = M.id_mercado " +
                "left join historial_lote as HL on L.id_lote = HL.FK_lote where !ISNULL(L.fechaIngreso) and L.activo = 1 " +
                "group by L.id_lote) as  table1 left join lote_salida as LS on table1.id_lote = LS.FK_Lote " +
                "order by table1.fechaIngreso,table1.fechaDespacho desc;"

            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    /** AUTH SALIDA **/
    static async authLoteModel(idLote,email,destinoSalida,correoSalida,telefonoSalida){
        try{
            destinoSalida,correoSalida,telefonoSalida
            var sql = "call addLoteSalida("+idLote+",'"+email+"','"+destinoSalida+"','"+correoSalida+"','"+telefonoSalida+"')"
            var conn = await connDB().promise()
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0][0][0].estado
        }catch (e) {
            console.log(e)
            return 400
        }
    }


    /** EDIT LOTE DESTINO**/
    static async updateLoteDestinoModel(id_lote,email,destino,telefono)
    {
        var sql = "update lote_salida set destino = '"+destino+"',correo_destino = '"+email+"',telefono_destino = '"+telefono+"' where  FK_Lote = "+id_lote
        console.log(sql)
        try {
            var conn = await connDB().promise()
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    /** ALL INSUMO POR LOTE REPORTE **/

    static async readReportInsumosLoteModel(lotes,email)
    {
        var oSqlLotes = ""
        if(Array.isArray(lotes))
        {
            oSqlLotes = " and L.id_lote in ("+lotes+")"
        }

        /*var sql = "select L.nombre_lote,M.nombre_mercado,I.nombre_insumo,IL.cantidad," +
            "convert(IL.fecha_ingreso,char(150)) fecha_ingresoInsumo " +
            "from lote as L inner join mercado as M on M.id_mercado = L.fk_id_mercado " +
            "inner join insumo_lote as IL on IL.fk_id_lote = L.id_lote " +
            "inner join insumo as I on IL.fk_id_insumo = I.id_insumo " +
            "where L.activo = 1 and L.fk_email_usuario = '"+email+"'"+oSqlLotes*/

        var sql = "select L.nombre_lote,M.nombre_mercado,TP.detalle_tipo_peso,I.nombre_insumo,IL.cantidad," +
            "convert(IL.fecha_ingreso,char(150)) fecha_ingresoInsumo " +
            "from lote as L inner join mercado as M on M.id_mercado = L.fk_id_mercado " +
            "inner join insumo_lote as IL on IL.fk_id_lote = L.id_lote " +
            "inner join insumo as I on IL.fk_id_insumo = I.id_insumo " +
            "inner join tipo_peso as TP on I.fk_tipo_peso = TP.id_tipo_peso where L.activo = 1 "+oSqlLotes

        console.log(sql)

        try {
            var conn = await connDB().promise()
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    /** HISTORIAL VOLTEOS POT LOTE REPORTE **/
    static async readReportSalidasLoteModel(lotes,email,fechaI,fechaF)
    {
        var oSqlLotes = ""
        var oSqlFechas = ""
        if(Array.isArray(lotes))
        {
            oSqlLotes = " and L.id_lote in ("+lotes+")"
        }

        if (fechaI != null && fechaF != null)
        {
            oSqlFechas = " and date(HL.fechaHistorial) between '"+fechaI+"' and '"+fechaF+"' "
        }

        /*var sql = "select L.nombre_lote,M.nombre_mercado,convert(HL.fechaHistorial,char(150)) fechaHistorial," +
            "HL.vTemperatura,HL.vHumedad,HL.vPh,HL.vOxigeno,HL.detalleHistorial from lote as L " +
            "inner join historial_lote as HL on L.id_lote = HL.FK_lote " +
            "inner join mercado as M on M.id_mercado = L.fk_id_mercado " +
            "where L.activo = 1 and L.fk_email_usuario = '"+email+"' " +oSqlLotes+oSqlFechas+
            " order by L.fechaIngreso,HL.fechaHistorial asc"*/

        /*var sql = "select L.nombre_lote,M.nombre_mercado,convert(HL.fechaHistorial,char(150)) fechaHistorial," +
            "HL.vTemperatura,HL.vHumedad,HL.vPh,HL.vOxigeno,HL.detalleHistorial from lote as L " +
            "inner join historial_lote as HL on L.id_lote = HL.FK_lote " +
            "inner join mercado as M on M.id_mercado = L.fk_id_mercado " +
            "where L.activo = 1 " +oSqlLotes+oSqlFechas+
            " order by L.fechaIngreso,HL.fechaHistorial asc"*/

        var sql = "select L.nombre_lote,M.nombre_mercado,convert(HL.fechaHistorial,char(150)) fechaHistorial," +
            "HL.vTemperatura,HL.vHumedad,HL.vPh,HL.vOxigeno,HL.detalleHistorial,A.id_actividad,A.detalle_actividad " +
            "from lote as L inner join historial_lote as HL on L.id_lote = HL.FK_lote inner join mercado as M on " +
            "M.id_mercado = L.fk_id_mercado inner join actividad as A on HL.fk_id_actividad = A.id_actividad " +
            "where L.activo = 1 "  +oSqlLotes+oSqlFechas+" order by L.id_lote,HL.fechaHistorial asc"

        console.log(sql)

        try {
            var conn = await connDB().promise()
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async readReporteSalidasLoteModel(mercado,fechaI,fechaF)
    {
        var oSqlFechas = ""
        var oSqlMercado = ""


        if(Array.isArray(mercado)){
            oSqlMercado = " and L.fk_id_mercado in ("+mercado+") "
        }

        if(fechaI != null && fechaF != null){
            oSqlFechas = " and date(L.fechaSalida) between '"+fechaI+"' and '"+fechaF+"'"
        }

        try {
            var sql = "select LS.destino,LS.correo_destino,LS.telefono_destino,R.id_residuo,R.detalle_residuo,L.nombre_lote,L.peso,TP.detalle_tipo_peso,M.nombre_mercado," +
                "convert(L.fechaIngreso,char(150)) fechaIngreso,convert(L.fechaDespacho,char(150)) fechaDespacho," +
                "convert(L.fechaSalida,char(150)) fechaSalida,concat(U.nombres,' ',U.apellido) UserSalida " +
                "from lote as L inner join lote_salida as LS on LS.FK_Lote = L.id_lote " +
                "inner join mercado as M on L.fk_id_mercado = M.id_mercado " +
                "inner join usuario as U on U.email_usuario = LS.FK_Email_Usuario_Salida " +
                "inner join tipo_peso as TP on L.fk_tipo_peso = TP.id_tipo_peso " +
                "inner join residuo as R on R.id_residuo = L.fk_id_residuo " +
                "where !ISNULL(L.fechaSalida) "+oSqlFechas+oSqlMercado+ " group by L.id_lote"
            var conn = await connDB().promise()
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
        }
        return []
    }


    static async deleteItemHistorialLoteModel(idHistorialLote)
    {
        try {
            var conn = await connDB().promise()
            await conn.query("delete from historial_lote where  id_historial_lote = "+idHistorialLote)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    static async readReportActividadLoteModel(lotes)
    {
        var oSqlLotes = ""

        if(Array.isArray(lotes))
        {
            oSqlLotes = " and L.id_lote in ("+lotes+")"
        }


        /*var sql = "select L.nombre_lote,M.nombre_mercado,convert(HL.fechaHistorial,char(150)) fechaHistorial," +
            "HL.vTemperatura,HL.vHumedad,HL.vPh,HL.vOxigeno,HL.detalleHistorial from lote as L " +
            "inner join historial_lote as HL on L.id_lote = HL.FK_lote " +
            "inner join mercado as M on M.id_mercado = L.fk_id_mercado " +
            "where L.activo = 1 and L.fk_email_usuario = '"+email+"' " +oSqlLotes+oSqlFechas+
            " order by L.fechaIngreso,HL.fechaHistorial asc"*/

        var sql = "select L.id_lote,L.nombre_lote,M.nombre_mercado,count(HL.fk_id_actividad) contador," +
            "HL.fk_id_actividad,A.detalle_actividad  from historial_lote as HL " +
            "inner join lote as L on L.id_lote = HL.FK_lote inner join mercado as M on L.fk_id_mercado = M.id_mercado " +
            "inner join actividad A on A.id_actividad = HL.fk_id_actividad " +
            "where L.activo = 1 "+oSqlLotes+" group by HL.fk_id_actividad,L.id_lote;"

        try {
            var conn = await connDB().promise()
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }


    static async readEstadiscicoDetalleLoteModel(lote)
    {
        try{
            var sql = "select convert(date(HL.fechaHistorial),char(150)) as fechaHistorial,HL.vHumedad,HL.vPh,HL.vTemperatura from historial_lote as HL where FK_lote =  "+lote
            var conn = await connDB().promise()
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

}

module.exports = LoteModel