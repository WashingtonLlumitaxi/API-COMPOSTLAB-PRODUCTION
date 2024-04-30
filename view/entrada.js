const express = require("express")
const app = express()
const EntradaController = require("../controller/entrada.controller")
const Jwt = require("../config/jwt")

app.post("/read_entradas_all",Jwt.veriJwt,async function(req,res)
{
    var result = await EntradaController.readAllEntradaController(req.body.mercado)

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Entradas encontrados' : 'No existen entradas',
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

app.post("/create_entrada",Jwt.veriJwt,async function(req,res)
{
    var result = await EntradaController.insertEntradaModel(req.body.fk_id_mercado, req.body.cant_organica,
        req.body.cant_impropia,req.body.name_encargado,req.body.fk_tipo_residuo,req.body.detalle_entrada)

    try{
        res.status(200).json({
            status_code: result ? 200 : 300,
            msm: result ? 'Entradas registradas' : 'No se registro la entrada',
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }
})


app.delete("/delete_entrada",Jwt.veriJwt,async function(req,res)
{
    var result = await EntradaController.deleteEntradaController(req.body.id_entrada)

    try{
        res.status(200).json({
            status_code: result ? 200 : 300,
            msm: result ? 'Entradas eliminada' : 'No se elimino la entrada',
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }
})

module.exports = app