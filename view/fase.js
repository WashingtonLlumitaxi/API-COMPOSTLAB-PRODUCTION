const express = require("express")
const app = express()
const FaseController = require("../controller/fase.controller")
const Jwt = require("../config/jwt")

app.get("/read_fase",async function(req,res){
    var result = await FaseController.readFasesAllController()

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Tipo Pesos encontrados' : 'No existen Tipo Pesos',
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