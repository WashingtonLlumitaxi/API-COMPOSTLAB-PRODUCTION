const express = require("express")
const app = express()
const Jwt = require("../config/jwt")
const UserController = require("../controller/user.controller")

app.post("/create_user",async function (req, res)
{
    var result = await UserController.createUsuarioController(req.body.email_usuario,
        req.body.nombres, req.body.apellido, req.body.cedula,
        req.body.telefono, req.body.contrasenia);

    try{
        res.status(200).json({
            status_code: result,
            msm: result == 400 ? "ERROR EN MYSQL INSERT" : result == 200 ? 'Usuario creado con éxito' : 'EMAIL NO DISPONIBLE'
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }
})

app.post("/login_user",async function (req, res)
{
    var result = await UserController.loginUsuarioModel(req.body.email,
        req.body.password);

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Login OK' : 'Credenciales erroneas',
            token: result.length > 0 ? Jwt.createJwt(result[0]) : "S/N"
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString(),
            token: "S/N"
        })
    }
})

app.post("/read_usuarios",async function (req, res)
{
    var result = await UserController.readAllUsuarioController();

    try{
        res.status(200).json({
            status_code: result ? 200 : 300,
            msm: result ? 'Usuario Lista' : 'No se ha podido listar usuarios',
            datos:result
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString(),
            datos:[]
        })
    }
})

app.put("/update_password",Jwt.veriJwt,async function(req,res)
{
    var result = await UserController.updatePasswordModel(req.body.email,req.body.pass)

    try{
        res.status(200).json({
            status_code: result ? 200 : 400,
            msm: result ? 'Password actualizado con éxito' : 'Password no actualizado',
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString(),
        })
    }
})

app.put("/update_info_usuario",Jwt.veriJwt,async function(req,res)
{
    //nombres,apellido,cedula,telefono,estado,email_usuario

    var result = await UserController.updateInfoUsuarioModel(req.body.nombres,req.body.apellido,req.body.cedula,req.body.telefono,req.body.estado,req.body.email)

    try{
        res.status(200).json({
            status_code: result ? 200 : 400,
            msm: result ? 'Usuario actualizado con éxito' : 'Usuario no actualizado',
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString(),
        })
    }
})


app.put("/update_permisos_usuario",Jwt.veriJwt,async function(req,res)
{

    var result = await UserController.updatePermisosUsuarioController(req.body.activeMercado,req.body.activeLote,
        req.body.activeHistorial, req.body.activeDespacho,
        req.body.activeReporte, req.body.activeNotificacion,
        req.body.activeRecordatorio, req.body.activeUsuarios,req.body.activeInsumo,req.body.email,
        req.body.btn_tabla_mercados,
        req.body.btn_tabla_lotes,
        req.body.btn_tabla_insumos,
        req.body.btn_tabla_h_lotes,
        req.body.btn_tabla_despacho,
        req.body.active_estadistico_lote,
        req.body.active_entrada,
        req.body.active_tabla_entrada)

    try{
        res.status(200).json({
            status_code: result ? 200 : 400,
            msm: result ? 'Permisos actualizado con éxito' : 'Permisos no actualizado',
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString(),
        })
    }
})

module.exports = app