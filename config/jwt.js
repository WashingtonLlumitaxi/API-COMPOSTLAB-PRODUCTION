const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = require("../config/env");
class Jwt {
    static createJwt(data)
    {
        try{
            var token = jwt.sign({ datosJWT: data}, JWT_SECRET_KEY(),{expiresIn:'7d'});
            return token
        }catch (e) {
            console.log(e)
            return null
        }
    }

    static  veriJwt(req,res,next)
    {

        const tokenApi =
            req.body.token ||
            req.query.token ||
            req.headers["x-access-token"] ||
            req.params.token;
        if (tokenApi) {

            try {
                var decoded_ = jwt.verify(tokenApi,JWT_SECRET_KEY())
                req.body.decoded = decoded_
                return next()
            }catch (e) {
                return res.status(401).json({
                    status_code: 401,
                    msg: "Token no es válido: " + e,
                    data: null,
                })
            }
        } else {
            console.log("ERR")
            return res.status(401).json({
                status_code: 401,
                msg: "Token está vacio",
                data: null,
            });
        }
    }

}

module.exports = Jwt