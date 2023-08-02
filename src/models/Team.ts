import mongoose from "mongoose";

// An interface that describes the properties
// that are required to create a new Kudo
// Making TS and mongoose to work together
interface TeamAttrs {
  team_id: string;
  timestamp: number;
  team_name: string;
  company_name: string;
  size_team: string;
  team_code: string;
}

// An interface that describes the properties
// that a Team model has
interface TeamModel extends mongoose.Model<TeamDoc> {
  build(attrs: TeamAttrs): TeamDoc;
}

// An interface that describes the properties
// that a Team Documents has
interface TeamDoc extends mongoose.Document {
  team_id: string;
  timestamp: number;
  team_name: string;
  company_name: string;
  size_team: string;
  team_code: string;
}

const teamSchema = new mongoose.Schema({
  team_id: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  team_name: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  size_team: {
    type: String,
    required: true,
  },
  team_code: {
    type: String,
    required: true,
  },
});

teamSchema.statics.build = (attrs: TeamAttrs) => {
  return new Team(attrs);
};

const Team = mongoose.model<TeamDoc, TeamModel>("Team", teamSchema);

export { Team };
