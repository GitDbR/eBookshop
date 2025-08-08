const jwt = require('jsonwebtoken')

const aunthenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');

if(!authHeader)
    return res.status(401).json({message: 'unauthorized: Missing token'});

const [bearer, token] = authHeader.split(' ');
if (bearer !== "Bearer" || !token)
    return res.status(401).json({message: 'Unauthorized: Invalid token format'});

jwt.verify(token, process.env.JWT_SECRETE, (err, user) => {
    if(err) {
        console.error(`Token verification eror: ${err}`);
        return res.status(403).json({message: 'Forbidden: Invalid token'});
    }
    req.user = user;
    next();
})
};
const authorizeRole = (role) =>{
    return (req, res, next) => {
        if(req.user.role !== role)
            return res.status(403).json({message: 'Access forbidden: Tou do not have the correct role.'});
        next();
    }
};

module.exports = {aunthenticateJWT, authorizeRole}