const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const UserModel = require("../models/user.model");

const forgetPasswordController = async (req, res) => {
    const { email, newPassword } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const user = await UserModel.findOneAndUpdate(
            { email },
            {
                $set: {
                    "password": hashedPassword
                }
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(201).json({ message: 'password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = forgetPasswordController;
