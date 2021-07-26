require('dotenv/config');

const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({
      auth: false, message: 'No token provided.' });
    const [ prefix, token ] = auth.split(' ');
    if (prefix !== 'Bearer') return res.status(401).json({ 
      auth: false, message:'Invalid token format.' });

    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(500).json({
          auth: false, message: 'Session token expired.' });
      }
      if (err) return res.status(500).json({ 
        auth: false, message: 'Failed to authenticate token.' });
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      req.profileId = decoded.profileId;
      req.token = token
      next();
    });
}

module.exports = verifyJWT;
