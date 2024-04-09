import jwt from 'jsonwebtoken';


function verifyToken(req, res, next) {
  const token = req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied, token missing' });
  } else {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = payload.id;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Access denied, token invalid' });
    }
  }
}

export default verifyToken