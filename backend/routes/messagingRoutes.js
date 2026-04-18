const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const messagingControllers = require("../controllers/messagingControllers");

router.get("/unread", protect(), messagingControllers.getUnreadCount);
router.get("/", protect(), messagingControllers.getConversations);
router.get("/:conversationId", protect(), messagingControllers.getMessages);
router.post("/:conversationId", protect(), messagingControllers.sendMessage);
router.post("/", protect(), messagingControllers.createConversation);

module.exports = router;
