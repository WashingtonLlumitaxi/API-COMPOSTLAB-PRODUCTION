const NotificationModel = require("../model/notification.model")
class NotificationController
{
    static async readNotificacionController(usuario){
        return await NotificationModel.readNotificacionModal(usuario)
    }
}

module.exports = NotificationController