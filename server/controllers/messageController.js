const openAI = require('openai');
const Message = require("../models/message");
const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const user = require('../models/user');

// Initialize the OpenAI API client with your API key
const openai = new openAI();

openai.apiKey = process.env.OPENAI_API_KEY;

exports.createMessage = BigPromise(async (req, res, next) => {
    const { message, userId } = req.body;

    if (!userId) {
        return next(new CustomError("userId is a required field.", 400));
    }

    // check if the user has provided all the required fields
    if (!message) {
        return next(new CustomError("message is a required field.", 400));
    }

    // create a new message
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: message }],
    });

    const newMessage = await Message.create({
        question: message,
        answer: response,
        user: userId,
    })

    if (newMessage) {
        await User.findByIdAndUpdate(userId, { $inc: { freeToken: -1 } });
    }

    // send response
    res.status(201).json({
        success: true,
        message: "Message created successfully.",
        data: newMessage,
    });
});

exports.getAllMessages = BigPromise(async (req, res, next) => {
    const { userId } = req.body;

    if (!userId) {
        return next(new CustomError("userId is a required field.", 400));
    }

    // find the user with the given id
    const user = await User.findById(userId);

    if(!user) {
        return next(new CustomError("User not found.", 400));
    }

    const messages = await Message.find({ user: { _id: userId } }).populate({
        path: "user",
        select: "fullName email photo freeToken",
    });

    // send response
    res.status(200).json({
        success: true,
        message: "Messages fetched successfully.",
        length: messages.length,
        data: messages,
    });
});

exports.removeMessage = BigPromise(async (req, res, next) => {
    const { messageId } = req.body;

    // check if the user has provided all the required fields
    if (!messageId) {
        return next(new CustomError("messageId is a required field.", 400));
    }

    // remove the message
    await Message.findByIdAndDelete(messageId);

    // send response
    res.status(200).json({
        success: true,
        message: "Message deleted successfully.",
    });
});