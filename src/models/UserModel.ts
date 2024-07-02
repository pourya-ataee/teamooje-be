import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

export interface IPomodoro {
	counting: boolean;
	duration: number;
	remaining: number;
	state: "work" | "rest";
}

export interface IUser extends Document {
	email: string;
	image?: string;
	username: string;
	password: string;
	pomodoro?: IPomodoro;
}

export const UserSchema = new Schema(
	{
		image: String,
		password: {
			type: String,
			required: [true, "وارد کردن رمزعبور الزامیست"],
			minLength: [6, "رمز عبور باید حداقل 6 کاراکتر باشد"],
			maxLength: [50, "رمز عبور نمی‌تواند بیشتر از 50 کاراکتر باشد"],
		},
		email: {
			type: String,
			unique: true,
			required: [true, "وارد کردن ایمیل الزامیست"],
			validate: {
				validator: (v: string) => {
					return validator.isEmail(v);
				},
				message: `ایمیل وارد شده معتبر نیست`,
			},
		},
		username: {
			type: String,
			unique: true,
			required: [true, "وارد کردن نام‌کاربری الزامیست"],
			minLength: [5, "نام کاربری باید حداقل 5 کاراکتر باشد"],
			maxLength: [20, "نام کاربری نمی‌تواند بیشتر از 20 کاراکتر باشد"],
		},
		pomodoro: {
			duration: { type: Number },
			counting: { type: Boolean },
			remaining: { type: Number },
			state: { type: String, enum: ["work", "rest"] },
		},
	},
	{ timestamps: true }
);

UserSchema.pre("save", async function (next) {
	try {
		const password = this.password as string;
		this.password = await bcrypt.hash(password, 10);
		return next();
	} catch (err: any) {
		return next(err);
	}
});

const UserModel: Model<IUser> = mongoose.model<IUser>("user", UserSchema);

export default UserModel;
