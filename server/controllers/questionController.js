import express from "express";
const router = express.Router();
import Question from "../mongodb/models/question-Model.js";
import authMiddleware from "../middleware/middleware.js";
import User from "../mongodb/models/user-Model.js";

// Get all questions
router.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find().select("-correctAnswer");
    res.status(200).json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add a new question
router.post("/questions", async (req, res) => {
  try {
    console.log(req.body);
    const { text, options, correctAnswer, marks } = req.body;
    // const createdBy = req.user.userId;

    const newQuestion = new Question({
      text,
      options,
      correctAnswer,
    //   createdBy,
      marks,
    });
    await newQuestion.save();

    res.status(201).json({ message: "Question added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update a question
router.put("/questions/:id", async (req, res) => {
  try {
    const { text, options, correctAnswer, marks } = req.body;
    const questionId = req.params.id;

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { text, options, correctAnswer, marks },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ message: "Question updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
