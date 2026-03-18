import Cart from "../models/cartModel.js";

export const getCart = async (req, res) => {
  const items = await Cart.find();
  res.json(items);
};

export const addToCart = async (req, res) => {
  try {
    const { id, title, price, imageUrl, brand } = req.body;

    let item = await Cart.findOne({ productId: id });

    if (item) {
      item.qty += 1;
      await item.save();
      return res.json({ message: "Quantity updated" });
    }

    item = await Cart.create({
      productId: id,
      title,
      price,
      imageUrl,
      brand,
      qty: 1
    });

    res.json({ message: "Product added", item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const incQty = async (req, res) => {
  const { id } = req.params;

  await Cart.findOneAndUpdate(
    { productId: id },
    { $inc: { qty: 1 } }
  );

  res.json("Quantity increased");
};

export const decQty = async (req, res) => {
  const { id } = req.params;

  const item = await Cart.findOne({ productId: id });

  if (!item) return res.json("Item not found");

  if (item.qty > 1) {
    item.qty -= 1;
    await item.save();
  } else {
    await Cart.deleteOne({ productId: id });
  }

  res.json("Updated");
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;

  await Cart.deleteOne({ productId: id });
  res.json("Deleted");
};