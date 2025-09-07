import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // receiver
    type: { type: String, enum: ["like", "comment", "message", "follow"], required: true },
    refId: { type: mongoose.Schema.Types.ObjectId }, // postId or messageId or userId
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // actor
    read: { type: Boolean, default: false },
    meta: { type: Object, default: {} }
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
