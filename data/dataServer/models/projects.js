var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  projectId:{type:Number, mix:0, max: 100},
  // _id: mongoose.Schema.Types.ObjectId,
  position:String,
  image:String,
  employer:String,
  description:String,
  challenge:String,
  process:String,
  solution:String,
  results:String,
  contributions: [String]
});

var Project = mongoose.model('Project', ProjectSchema);

var p = new Project();

p.projectId = 1;
p.position = "Junior SE";
p.image = "";
p.employer = "CERN";
p.description = "Working at CERN";
p.challenge = "Monitors";
p.process = "";
p.solution = "";
p.results = "";
p.contributions = ["one", "two"];

p.save();


module.exports = mongoose.model('Project', ProjectSchema);