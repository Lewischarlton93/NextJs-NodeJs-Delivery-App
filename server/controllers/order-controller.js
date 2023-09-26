import Order from "../models/order";

// Create
export const createOrder = async (req, res) => {
  try {
    const { orderId, restaurantName, items, status } = req.body;

    const newOrder = await Order.create({
      orderId,
      restaurantName,
      items,
      status,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating the order" });
  }
};

// Get
// Retrieve all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving orders" });
  }
};

// Retrieve an order by ID
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving order by ID" });
  }
};

// Update
// Update order by ID
export const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating order" });
  }
};

// Update order status by ID
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating order status" });
  }
};

// Delete
// Delete order by ID
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    await order.destroy();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting order" });
  }
};
