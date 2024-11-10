import { Schema, model, type Document } from 'mongoose';// schema, model and document imported from mongoose
// user Interface
interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[],
    friends: Schema.Types.ObjectId[],
}
// user schema
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique:true,
            trim:true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
              validator: function (value:any) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
              },
              message: 'Invalid email address format',
            },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: false,
        id:false,
    },
);

const friendCount = userSchema.virtual('friendCount');// virtual for Friends-Count in User Model

friendCount.get(function () {
  const friendCount = this.friends.length;
  return friendCount ;
});

const User = model<IUser>('User', userSchema);

export default User;
