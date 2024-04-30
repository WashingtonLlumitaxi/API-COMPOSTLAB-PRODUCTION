const oResiduoModel = require("../model/residuo.model")
class ResiduoController
{
    static async readAllResiduosActivosController(){
        return await oResiduoModel.readAllResiduosActivosModel()
    }
}

module.exports = ResiduoController