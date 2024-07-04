const express = require("express");
const router = express.Router();
const projectController = require("../controller/projectController");

router.post("/projects", projectController.createProject);
router.get("/getProjects", projectController.getProject);

module.exports = router;
