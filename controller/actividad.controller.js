const ActividadModel = require("../model/actividad.model")
class ActividadController
{
    static async readActividadController()
    {
        return await ActividadModel.readActividadModel()
    }
}

module.exports = ActividadController