exports.placeOrder = async (req, res) => {
    res.json({ message: 'Order placed successfully' });
  };
  
  exports.cancelOrder = async (req, res) => {
    res.json({ message: `Order ${req.params.id} cancelled` });
  };
  
  exports.getOrders = async (req, res) => {
    res.json({ message: 'Orders fetched successfully' });
  };
  