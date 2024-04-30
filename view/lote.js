const express = require("express")
const app = express()
const LoteController = require("../controller/lote.controller")
const Jwt = require("../config/jwt")


app.put("/update_lote",Jwt.veriJwt,async function(req,res)
{
    var result = await LoteController.updateLoteController(req.body.id_lote,req.body.nombre_lote,
        req.body.observacion_lote,req.body.peso, req.body.tipo_peso,
        req.body.id_mercado,req.body.dia_notification,req.body.estado,
        req.body.residuo,req.body.fase)
    //console.log(req.body)
    try{
        res.status(200).json({
            status_code: result > 0 ? 200 : 300,
            msm: result > 0 ? 'Lote actualizado' : 'No se pudo actualizar el Lote',
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }

})

app.post("/lote_all_user",Jwt.veriJwt,async function(req,res)
{
    var result = await LoteController.readLoteAllUserController(req.body.decoded.datosJWT.email_usuario)

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Lotes encontrados' : 'No existen Lotes',
            datos: result
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString(),
            datos: []
        })
    }

})

app.post("/lote_usuer",Jwt.veriJwt,async function(req,res)
{
    var result = await LoteController.readLoteUserController(req.body.decoded.datosJWT.email_usuario)

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Lotes encontrados' : 'No existen Lotes',
            datos: result
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString(),
            datos: []
        })
    }

})


app.post("/add_lote_usuer",Jwt.veriJwt,async function(req,res)
{
    var result = await LoteController.insertLoteUserController(req.body.nombre_lote,req.body.observacion_lote,req.body.peso,
        req.body.tipo_peso,req.body.decoded.datosJWT.email_usuario,req.body.id_mercado,req.body.dia_notification,
        req.body.residuo)

    try{
        res.status(200).json({
            status_code: result > 0 ? 200 : 300,
            msm: result > 0 ? 'Lote creado' : 'No se pudo crear el Lote',
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }

})


app.put("/sendLoteDespacho",Jwt.veriJwt,async function(req,res)
{

    var result = await LoteController.sendLoteDespachoController(req.body.lote)

    try{
        res.status(200).json({
            status_code: result  ? 200 : 300,
            msm: result  ? 'Lote en Despacho' : 'No se pudo enviar lote',
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }
})


app.post("/add_historial_lote",Jwt.veriJwt,async function(req,res)
{
    var result = await LoteController.addHistorialLoteController(req.body.vTemperatura, req.body.vHumedad,
        req.body.vPh, req.body.vOxigeno, req.body.detalleHistorial, req.body.lote,req.body.actividad)

    try{
        res.status(200).json({
            status_code: result  ? 200 : 300,
            msm: result  ? 'Historial agregado' : 'No se pudo agregar el historial',
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }

})

app.get("/readDetalleLote/:lote",async function(req, res)
{

    try{
        var result = await LoteController.readHistorialDetalleLoteController(req.params.lote)
        res.status(200).json({
            status_code:result.length > 0 ? 200 :300,
            msm: result.length > 0 ? 'Datos consultados con éxito' : 'No existen datos disponibles',
            datos:  result
        })
    }catch (e) {
        res.status(200).json({
            status_code: 400,
            msm: e.toString(),
            datos:  []
        })
    }

})


app.post("/despacho_lote_usuer",Jwt.veriJwt,async function(req,res)
{
    var result = await LoteController.readLoteDespachoUserController(req.body.decoded.datosJWT.email_usuario)

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Lotes encontrados' : 'No existen Lotes',
            datos: result
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString(),
            datos: []
        })
    }

})


app.post("/authLoteSalida",Jwt.veriJwt,async function(req,res)
{

    var result = await LoteController.authLoteController(req.body.lote,
        req.body.decoded.datosJWT.email_usuario,
        req.body.destinoSalida,
        req.body.correoSalida,
        req.body.telefonoSalida)

    try{
        res.status(200).json({
            status_code: result,
            msm: result == 200  ? 'Salida Autorizada' : 'No se pudo enviar autorizar la salida',
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }
})

app.post("/insumos_lotes_all",Jwt.veriJwt,async function(req,res)
{
    var result = await LoteController.readReportInsumosLoteController(req.body.lotes,req.body.decoded.datosJWT.email_usuario)

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Lotes encontrados' : 'No existen Lotes',
            datos: result
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString(),
            datos: []
        })
    }

})



app.post("/Rhistorial_lotes_all",Jwt.veriJwt,async function(req,res)
{
    var result = await LoteController.readReportSalidasLoteController(req.body.lotes,req.body.decoded.datosJWT.email_usuario,
        req.body.fechaI,req.body.fechaF)

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Lotes encontrados' : 'No existen Lotes',
            datos: result
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString(),
            datos: []
        })
    }

})


app.post("/RSalidasLote",Jwt.veriJwt,async function(req,res)
{
    var result = await LoteController.readReporteSalidasLoteController(req.body.mercados,req.body.fechaI,req.body.fechaF)

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Lotes encontrados' : 'No existen Lotes',
            datos: result
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString(),
            datos: []
        })
    }

})



app.delete("/deleteItemHistorialLote",Jwt.veriJwt,async function(req,res)
{
    //console.log(req.body)
    try{

        var data = await LoteController.deleteItemHistorialLoteController(req.body.itemHLote)

        res.status(200).json({
            status_code: data ? 200 : 400,
            msm: data ? 'Item eliminado con éxito' : 'Erro al eliminar item'
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:e.toString()
        })
    }
})


app.post("/RActividadLote",Jwt.veriJwt,async function(req,res)
{
    var result = await LoteController.readReportActividadLoteController(req.body.mercados)

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Lotes encontrados' : 'No existen Lotes',
            datos: result
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString(),
            datos: []
        })
    }

})



app.get("/readEstadisticoLote/:lote",async function(req, res)
{

    try{
        var result = await LoteController.readEstadiscicoDetalleLoteController(req.params.lote)
        res.status(200).json({
            status_code:result.length > 0 ? 200 :300,
            msm: result.length > 0 ? 'Datos consultados con éxito' : 'No existen datos disponibles',
            datos:  result
        })
    }catch (e) {
        res.status(200).json({
            status_code: 400,
            msm: e.toString(),
            datos:  []
        })
    }

})


app.put("/update_lote_salida",Jwt.veriJwt,async function(req,res)
{
    var result = await LoteController.updateLoteDestinoController(req.body.id_lote,req.body.email,req.body.destino,
        req.body.telefono)
    //console.log(req.body)
    try{
        res.status(200).json({
            status_code: result > 0 ? 200 : 300,
            msm: result > 0 ? 'Lote Salida actualizado' : 'No se pudo actualizar el Lote',
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }

})

app.delete("/eliminar_lote",Jwt.veriJwt,async function(req,res)
{
    var result = await LoteController.deleteLoteController(req.body.id_lote)
    //console.log(req.body)
    try{
        res.status(200).json({
            status_code: result > 0 ? 200 : 300,
            msm: result > 0 ? 'Lote eliminado' : 'No se pudo eliminar el Lote',
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }

})

module.exports = app
