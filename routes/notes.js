const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

/** Get ALL Notes */
router.get("/", async (req, res) => {
  try {
    const Notes = await Note.find();
    res.send({ success: true, data: Notes });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error,
    });
  }
});

/** get note by ID */

router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.send({ success: true, data: note });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error,
    });
  }
});

// add a new note

router.post("/", async (req, res) => {
  const note = new Note({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const newNote = await note.save();
    res.send({ success: true, data: newNote });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
});

// update a note

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedNote = await Note.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedNote) {
      return res.status(500).send({ success: false, error: "Note not found" });
    }

    res.send({ success: true, data: updatedNote });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

// delete a note

router.delete("/:id", async (req, res) => {
  const { id } = req.params.id;

  try {
    await Note.findByIdAndDelete(id);
    res.send({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

module.exports = router;
