const jwt = require('jsonwebtoken');

// Με την authenticate, ελέγχουμε αν ο χρήστης είναι συνδεδεμένος και αν έχει στείλει το token του.
function authenticate(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Invalid token' });
  }
}

//  Με την authorize, ελέγχουμε αν ο ρόλος του χρήστη είναι εξουσιοδοτημένος να κάνει κάποια ενέργεια.
function authorize(allowedRoles) {
  return (req, res, next) => {
    const { role } = req.user;
    if (!allowedRoles.includes(role)) {
      return res.status(403).send({ error: 'Access denied' });
    }
    next();
  };
}

module.exports = { authenticate, authorize };
  