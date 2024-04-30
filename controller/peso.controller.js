const PesoModel = require("../model/peso.model")
class PesoController
{
    static async readTipoPesoActiveController(){
        return await PesoModel.readTipoPesoActiveModel()
    }
}

module.exports = PesoController