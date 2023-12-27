const mongoose = require("mongoose");

const FavoritesSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

const Favorites = mongoose.model("Favorites", FavoritesSchema);

module.exports = Favorites;
