const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) res.status(401)
    jwt.verify(token, process.env.SECRET_KEY, (err, username) => {
        if(err) return res.status(403)
        req.username = username  
    })

}
const auth = auth();