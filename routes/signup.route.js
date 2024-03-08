const bcrypt = require("bcryptjs");

// Models
const UserModel = require("../models/user.model");

const registerUserController = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({ email, username, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = registerUserController;
