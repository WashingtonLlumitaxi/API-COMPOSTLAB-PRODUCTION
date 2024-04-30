const EntradaModel = require("../model/entrada.model")
class EntradaController
{
    static async readAllEntradaController(mercado){
        return await EntradaModel.readAllEntradaModel(mercado)
    }

    static async insertEntradaModel(fk_id_mercado, cant_organica, cant_impropia,name_encargado,
                                    fk_tipo_residuo, detalle_entrada){
        return await EntradaModel.insertEntradaModel(fk_id_mercado, cant_organica, cant_impropia,name_encargado,
            fk_tipo_residuo, detalle_entrada)
    }

    static async deleteEntradaController(id_entrada){
        return await EntradaModel.deleteEntradaModel(id_entrada)
    }
}

module.exports = EntradaController