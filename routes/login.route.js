const bcrypt = require("bcryptjs");

// Models
const UserModel = require("../models/user.model");

const loginUserController = async (req, res) => {
    const { username, password, email } = req.body;

    if (!password || (!email && !username)) {
        return res.status(500).json({success : false , message: 'Please provide complete details' });
    }

    try {
        const user = await UserModel.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            return res.status(404).json({success : false , message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success : false ,message: 'Invalid password. If you have forgotten your password, please use the "Forgot Password" option to reset it.' });
        }
        
        res.status(200).json({ success : true ,message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({success : false , message: 'Internal Server Error' });
    }
}

module.exports = loginUserController;