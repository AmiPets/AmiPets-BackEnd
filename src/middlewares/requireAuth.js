import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) => {
  if (process.env.IS_DEV) {
    next(); 
  } else {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Acesso não autorizado' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(400).json({ message: 'Token inválido' });
    }
  }
};


export default requireAuth;
