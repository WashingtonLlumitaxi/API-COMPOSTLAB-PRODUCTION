const express = require("express")
const app = express()
const ResiduoController = require("../controller/residuo.controller")

app.get("/read_residuos_all",async function (req,res){
    var result = await ResiduoController.readAllResiduosActivosController();

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Residuos encontrados' : 'No existen Residuos',
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