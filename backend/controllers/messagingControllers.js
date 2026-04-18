const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

exports.getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            participants: req.user._id,
        })
            .populate("participants", "fullname email profilePicture role")
            .sort({ "lastMessage.createdAt": -1 });

        res.status(200).json(conversations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;

        const conversation = await Conversation.findOne({
            _id: conversationId,
            participants: req.user._id,
        });

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        const messages = await Message.find({ conversation: conversationId })
            .populate("sender", "fullname profilePicture role")
            .sort({ createdAt: 1 });

        // Mark unread messages as read
        await Message.updateMany(
            { conversation: conversationId, sender: { $ne: req.user._id }, read: false },
            { $set: { read: true } }
        );

        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { text } = req.body;

        const conversation = await Conversation.findOne({
            _id: conversationId,
            participants: req.user._id,
        });

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        const newMessage = new Message({
            conversation: conversationId,
            sender: req.user._id,
            text,
        });

        await newMessage.save();
        await newMessage.populate("sender", "fullname profilePicture role");

        conversation.lastMessage = {
            text,
            sender: req.user._id,
            createdAt: newMessage.createdAt,
        };
        await conversation.save();

        const io = req.app.get("io");
        conversation.participants.forEach((participantId) => {
            if (participantId.toString() !== req.user._id.toString()) {
                io.to(participantId.toString()).emit("newMessage", newMessage);
            }
        });

        res.status(201).json(newMessage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.createConversation = async (req, res) => {
    try {
        const { targetId } = req.body;

        if (targetId === req.user._id.toString()) {
            return res.status(400).json({ message: "Cannot create conversation with yourself" });
        }

        const targetUser = await User.findById(targetId);
        if (!targetUser) {
            return res.status(404).json({ message: "Target user not found" });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [req.user._id, targetId], $size: 2 },
        });

        if (!conversation) {
            conversation = new Conversation({
                participants: [req.user._id, targetId],
            });
            await conversation.save();
        }

        await conversation.populate("participants", "fullname email profilePicture role");

        res.status(201).json(conversation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getUnreadCount = async (req, res) => {
    try {
        const conversations = await Conversation.find({ participants: req.user._id }, '_id');
        const conversationIds = conversations.map(c => c._id);
        
        const unreadCount = await Message.countDocuments({
            conversation: { $in: conversationIds },
            sender: { $ne: req.user._id },
            read: false
        });

        res.status(200).json({ unreadCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};
