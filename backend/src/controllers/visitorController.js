import Visitor from "../models/visitorModel.js";

// CREATE Visitor
export const createVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.create(req.body);
    res.status(201).json(visitor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET All Visitors
export const getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Visitor by ID
export const getVisitorById = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }
    res.json(visitor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Visitor
export const updateVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(visitor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE Visitor
export const deleteVisitor = async (req, res) => {
  try {
    await Visitor.findByIdAndDelete(req.params.id);
    res.json({ message: "Visitor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
