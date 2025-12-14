exports.getAllUsers = async (req, res) => {
res.json({ message: 'All users fetched (admin)' });
};

exports.createRole = async (req, res) => {
res.json({ message: 'Role created successfully (admin)' });
};
  