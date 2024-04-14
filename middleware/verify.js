const verifyRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        code: 403,
        message: "Forbidden",
      });
    }

    next();
  };
};

module.exports = verifyRole;
