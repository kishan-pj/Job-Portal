import ConnectDB from '@/DB/connectDB';
import User from '@/models/User';
import Joi from 'joi';
import { hash } from 'bcryptjs';

const schema = Joi.object({
    name: Joi.string().required(),
    newPassword: Joi.string().min(8).required(),
    newEmail: Joi.string().email().required(),
});

export default async (req, res) => {
    await ConnectDB();

    const { name, newPassword, newEmail } = req.body;
    const { error } = schema.validate({ name, newPassword, newEmail });

    if (error) {
        return res.status(401).json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });
    }

    try {
        const user = await User.findOne({ email: newEmail });
        if (user) {
            return res.status(400).json({ success: false, message: 'The new email is already in use.' });
        }

        const ifExist = await User.findOne({ email: req.body.email });
        if (!ifExist) {
            return res.status(404).json({ success: false, message: "Email Not Found" });
        }

        const hashedPassword = await hash(newPassword, 12);
        const updatePassword = await User.findOneAndUpdate(
            { email: req.body.email },
            { password: hashedPassword, name, email: newEmail },
            { new: true }
        );

        return res.status(201).json({ success: true, message: "Profile Updated Successfully" });
    } catch (error) {
        console.log('Error in forget Password (server) => ', error);
        return res.status(500).json({ success: false, message: "Something Went Wrong. Please Retry Later!" });
    }
};
