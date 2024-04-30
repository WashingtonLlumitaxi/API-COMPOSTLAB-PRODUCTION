const express = require("express")
const app = express()
const NotificationController = require("../controller/notification.controller")
const Jwt = require("../config/jwt")

app.post("/notification",Jwt.veriJwt,async function(req,res)
{
    var result = await NotificationController.readNotificacionController(req.body.decoded.datosJWT.email_usuario);

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Notificaciones encontrados' : 'No existen Notificaciones',
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