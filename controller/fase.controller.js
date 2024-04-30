const FaseModel = require("../model/fase.model")
class FaseController
{
    static async readFasesAllController(){
        return await FaseModel.readFasesAllModel()
    }
}

module.exports = FaseController