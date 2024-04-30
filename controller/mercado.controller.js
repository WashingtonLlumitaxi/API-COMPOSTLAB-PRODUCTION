const MercadoModel = require("../model/mercado.model")
class MercadoController
{
    static async readAllMercadoController(){
        return await MercadoModel.readAllMercadoModel()
    }

    static async readAllMercadoActiveController(){
        return await MercadoModel.readAllMercadoActiveModel()
    }

    static async createMercadoModel(nombre_mercado, encargado_mercado, email_mercado, telefono_mercado, dire_mercado){
        return await MercadoModel.createMercadoModel(nombre_mercado, encargado_mercado, email_mercado, telefono_mercado, dire_mercado)
    }


    static async readCompostMercadoReportController(mercados){
        return await MercadoModel.readCompostMercadoReportModel(mercados)
    }

    static async readOrganicoImpropioMercadoReportController(mercados){
        return await MercadoModel.readOrganicoImpropioMercadoReportModel(mercados)
    }


    static async updateMercadoController(id_mercado,nombre_mercado, encargado_mercado, email_mercado, telefono_mercado, dire_mercado,estado){
       return await MercadoModel.updateMercadoModel(id_mercado,nombre_mercado, encargado_mercado, email_mercado, telefono_mercado, dire_mercado,estado)
    }

}

module.exports = MercadoController