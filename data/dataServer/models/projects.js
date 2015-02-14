var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  _id:{type:Number, mix:0, max: 100},
  // _id: mongoose.Schema.Types.ObjectId,
  position:String,
  image:String,
  banner:String,
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

p._id = 1;
p.position = "Junior SE";
p.image = "enlighten-front.jpg";
p.banner = "";
p.employer = "CERN";
p.description = "Working at CERN";
p.challenge = "Monitors";
p.process = "";
p.solution = "";
p.results = "";
p.contributions = ["one", "two"];

p.save();

var d = new Project();
d._id = 2;
d.position = "UX Designer Intern";
d.image = "deep-field-diagram.png";
d.banner = "deep-file-banner.jpg";
d.employer = "DeepField Networks";
d.description = "";p.challenge = "Monitors";
p.process = "";
p.solution = "";
p.results = "";

d.save()



module.exports = mongoose.model('Project', ProjectSchema);