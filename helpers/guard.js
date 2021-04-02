const passport = require('passport');
require('../config/passport');
const { StatusCode } = require('./constants');

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    const [_bearer, token] = req.get('Authorization').split(' ');

    if (!user || err || token !== user.token) {
      return res.status(StatusCode.FORBIDDEN).json({
        status: 'error',
        code: StatusCode.FORBIDDEN,
        data: 'Forbidden',
        message: 'Access is denied',
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;