module.exports.getReview = async (req, res) => {
    try {
        const code = req.body.code;

        if (!code) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const response = await aiService(code);
        res.json({ review: response });

    } catch (error) {
        console.error("Error in getReview:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
