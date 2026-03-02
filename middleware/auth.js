// Authentication middleware - bypassed for stateless/serverless operation.
// All users are treated as a single guest user with a fixed ID.
const protect = (req, res, next) => {
    req.user = { _id: '000000000000000000000000', name: 'Guest User' };
    next();
};

module.exports = { protect };
