import { Schema, Types, model, type Document } from 'mongoose';



interface IReaction extends Document {
  reactionId: Schema.Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: IReaction[];
}

// Define reaction schema
const reactionSchema = new Schema<IReaction>({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()  // Sets default to a new ObjectId
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280  // 280 character maximum
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Default value to the current timestamp
    // Getter method to format the timestamp on query
    get: (timestamp: any) => timestamp.toLocaleString()
  }
}, {
  toJSON: {
    getters: true  // Ensure the getter is used when the document is serialized
  },
  _id: false  // Disable the virtual `id` field, as `reactionId` will serve as the identifier
});


// Define thought schema
const thoughtSchema = new Schema<IThought>({
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Getter method to format the timestamp on query
      get: (timestamp: any) => timestamp.toLocaleString()
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]  // Array of nested reaction documents
  }, {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id:false

  });

const Thought = model('Thought', thoughtSchema);

export default Thought;
