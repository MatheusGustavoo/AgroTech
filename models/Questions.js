const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Question = mongoose.model(
  "Question",
  new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      images: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        // required:true
      },
      user: Object,
      // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }],
    },
    { timestamps: true }
  )
);
module.exports = Question;
