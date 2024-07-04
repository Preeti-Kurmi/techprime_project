const Project = require("../model/projectModel");

exports.createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProject = async (req, res) => {
  try {
    const groupProjects = await Project.find();
    res.status(200).json(groupProjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
