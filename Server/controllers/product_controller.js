exports.getProducts = async (req, res) => {
res.json({ message: 'Products fetched successfully' });
};

exports.createProduct = async (req, res) => {
res.json({ message: 'Product created successfully' });
};

exports.updateProduct = async (req, res) => {
res.json({ message: `Product ${req.params.id} updated` });
};

exports.deleteProduct = async (req, res) => {
res.json({ message: `Product ${req.params.id} deleted` });
};
  