import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    members: {
        type: Array,
    },
    isDelete:{
      type: Boolean
    }
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchema);
