const express = require("express")
const app = express()
const MercadoController = require("../controller/mercado.controller")


app.post("/create_mercado",async function (req, res)
{
    var result = await MercadoController.createMercadoModel(req.body.nombre_mercado,
        req.body.encargado_mercado, req.body.email_mercado, req.body.telefono_mercado,
        req.body.dire_mercado);

    try{
        res.status(200).json({
            status_code: result ? 200 : 300,
            msm: result ? 'Mercado creado con éxito' : 'No se ha podido crear el Mercado'
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }
})


app.put("/update_mercado",async function (req, res)
{
    var result = await MercadoController.updateMercadoController(req.body.id_mercado,req.body.nombre_mercado,
        req.body.encargado_mercado, req.body.email_mercado, req.body.telefono_mercado,
        req.body.dire_mercado,req.body.estado);

    try{
        res.status(200).json({
            status_code: result ? 200 : 300,
            msm: result ? 'Mercado actualizado con éxito' : 'No se ha podido actualizar el Mercado'
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }
})

app.get("/all_mercados",async function (req, res)
{
    var result = await MercadoController.readAllMercadoController();

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Mercados encontrados' : 'No existen Mercados',
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

app.post("/compost_mercados",async function (req,res){
    var result = await MercadoController.readCompostMercadoReportController(req.body.mercados);

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Mercados encontrados' : 'No existen Mercados',
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


app.get("/all_mercados_active",async function (req, res)
{
    var result = await MercadoController.readAllMercadoActiveController();

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Mercados encontrados' : 'No existen Mercados',
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

app.post("/r_organico_impropio_mercados",async function (req,res){
    var result = await MercadoController.readOrganicoImpropioMercadoReportController(req.body.mercado);

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Mercados encontrados' : 'No existen Mercados',
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

module.exports = app