exports.analyzeMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Temporary response (you can add real AI logic later)
    res.json({
      originalMessage: message,
      analysis: "AI logic will go here",
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};