const express = require("express")
const app = express()
const ActividadController = require("../controller/actividad.controller")
const Jwt = require("../config/jwt")

app.get("/read_actividad",async function(req,res){
    var result = await ActividadController.readActividadController()

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Actividad encontrados' : 'No existen Actividad',
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