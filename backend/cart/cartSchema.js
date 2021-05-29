const mongoose = require("mongoose");

mongoose.model("Cart", {
	ProductId: {
		type: mongoose.SchemaTypes.ObjectId,
		require: true,
	},
});
