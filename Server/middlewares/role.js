const checkPermission = (permission) => {
  return (req, res, next) => {
    const permissions = req.user.permissions;

    if (
      permissions.includes('*') ||
      permissions.includes(permission)
    ) {
      return next();
    }

    return res.status(403).json({ message: 'Access Denied' });
  };
};

  module.export =checkPermission;