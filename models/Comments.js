const mongoose = require("mongoose");
const { Schema } = mongoose;

const Comments = mongoose.model(
  "Comments",
  new Schema(
    {
      user: Object,
      question: Object,
      content: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);
module.exports = Comments;
