import { Router } from "express";
// Custom Route
const rtGetFrames = Router();

rtGetFrames.get('/', function(req, res) {
  res.status(404).json({error:'Not allowed'});
});

export default rtGetFrames;