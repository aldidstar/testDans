const { Schema, model } = require("mongoose");

const positionSchema = new Schema(
  {
    id: {
      type: String,
    },
    type: {
      type: String,
    },
    url: {
      type: String,
    },
    created_at: {
      type: String,
    },
    company: {
      type: String,
    },
    company_url: {
      type: String,
    },
    location: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    how_to_apply: {
      type: String,
    },
    company_logo: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Position", positionSchema);
