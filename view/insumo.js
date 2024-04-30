const express = require("express")
const app = express()
const InsumoController = require("../controller/insumo.controller")


app.post("/create_insumo",async function (req, res)
{
    var result = await InsumoController.createInsumoController(req.body.nombre_insumo,
        req.body.origin_insumo, req.body.id_tipo_insumo, req.body.cantidad_insumo,
        req.body.precio_insumo,req.body.decrip_insumo,req.body.tipo_peso);

    try{
        res.status(200).json({
            status_code: result ? 200 : 300,
            msm: result ? 'Insumo creado con éxito' : 'No se ha podido crear el Insumo'
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }
})

app.put("/update_insumo",async function (req, res)
{
    var result = await InsumoController.updateInsumoController(req.body.id_insumo,req.body.nombre_insumo,
        req.body.origin_insumo, req.body.id_tipo_insumo, req.body.cantidad_insumo,
        req.body.precio_insumo,req.body.decrip_insumo,req.body.tipo_peso);

    try{
        res.status(200).json({
            status_code: result ? 200 : 300,
            msm: result ? 'Insumo actualizado con éxito' : 'No se ha podido actualizar el Insumo'
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }
})

app.get("/all_insumos",async function (req, res)
{
    var result = await InsumoController.readAllInsumosController();

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Insumos encontrados' : 'No existen Insumos',
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


app.get("/all_tipo_insumos",async function (req, res)
{
    var result = await InsumoController.readAllTipoInsumoContreller();

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Insumos encontrados' : 'No existen Insumos',
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


app.get("/all_insumos_active",async function (req, res)
{
    var result = await InsumoController.readAllInsumosActivoController();

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Insumos encontrados' : 'No existen Insumos',
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


app.get("/all_insumo_lote/:id_lote",async function (req, res)
{
    var result = await InsumoController.readInsumoLoteController(req.params.id_lote);

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Insumos encontrados' : 'No existen Insumos',
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

app.post("/add_insumo_lote",async function (req, res)
{
    var result = await InsumoController.addInsumoLoteController(req.body.id_lote,
        req.body.id_insumo, req.body.cantidad,req.body.fk_id_peso);

    try{
        res.status(200).json({
            status_code: result ? 200 : 300,
            msm: result ? 'Insumo agregado con éxito' : 'No se ha podido agregado el Insumo'
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }
})


app.delete("/delete_insumo_lote",async function (req, res)
{
    var result = await InsumoController.delteInsumoLoteController(req.body.id_insumo_lote)

    try{
        res.status(200).json({
            status_code: result ? 200 : 300,
            msm: result ? 'Insumo eliminado con éxito' : 'No se ha podido eliminar el Insumo'
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }
})

module.exports = app