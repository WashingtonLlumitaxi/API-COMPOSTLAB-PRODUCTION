const LoteModel =  require("../model/lote.model")
class LoteController
{
    static async updateLoteController(id_lote,nombre_lote, observacion_lote, peso, fk_tipo_peso,
                                      fk_id_mercado,dia_notification,estado,residuo,fase)
    {
        return await LoteModel.updateLoteModel(id_lote,nombre_lote, observacion_lote, peso, fk_tipo_peso,
            fk_id_mercado,dia_notification,estado,residuo,fase)
    }
    static async readLoteUserController(email){
        return await LoteModel.readLoteUserModel(email)
    }

    static async insertLoteUserController(nombre_lote, observacion_lote, peso, fk_tipo_peso,email,fk_id_mercado,dia_notification,residuo){
        return await LoteModel.insertLoteUserModel(nombre_lote, observacion_lote, peso, fk_tipo_peso,email,fk_id_mercado,dia_notification,residuo)
    }

    static async sendLoteDespachoController(idLote){
        return await LoteModel.sendLoteDespachoModel(idLote)
    }

    static async addHistorialLoteController(vTemperatura, vHumedad, vPh, vOxigeno, detalleHistorial, lote,actividad){
        return await LoteModel.addHistorialLoteModel(vTemperatura, vHumedad, vPh, vOxigeno, detalleHistorial, lote,actividad)
    }

    static async readHistorialDetalleLoteController(lote){
        return await LoteModel.readHistorialDetalleLoteModel(lote)
    }

    static async readLoteDespachoUserController(email){
        return await LoteModel.readLoteDespachoUserModel(email)
    }

    static async authLoteController(idLote,email,destinoSalida,correoSalida,telefonoSalida){
        return await LoteModel.authLoteModel(idLote,email,destinoSalida,correoSalida,telefonoSalida)
    }

    static async readLoteAllUserController(email){
        return await LoteModel.readLoteAllUserModel(email)
    }

    static async readReportInsumosLoteController(lotes,email){
        return await LoteModel.readReportInsumosLoteModel(lotes,email)
    }

    static async readReportSalidasLoteController(lotes,email,fechaI,fechaF){
        return await LoteModel.readReportSalidasLoteModel(lotes,email,fechaI,fechaF)
    }

    static async readReporteSalidasLoteController(mercado,fechaI,fechaF){
        return await LoteModel.readReporteSalidasLoteModel(mercado,fechaI,fechaF)
    }

    static async deleteItemHistorialLoteController(idHistorialLote){
        return await LoteModel.deleteItemHistorialLoteModel(idHistorialLote)
    }
    static async readReportActividadLoteController(lotes){
        return await LoteModel.readReportActividadLoteModel(lotes)
    }

    static async readEstadiscicoDetalleLoteController(lote){
        return await LoteModel.readEstadiscicoDetalleLoteModel(lote)
    }

    static async updateLoteDestinoController(id_lote,email,destino,telefono){
        return await LoteModel.updateLoteDestinoModel(id_lote,email,destino,telefono)
    }

    static async deleteLoteController(id_lote){
        return await LoteModel.deleteLoteModel(id_lote)
    }
}

module.exports = LoteController