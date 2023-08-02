import mongoose from "mongoose";

// An interface that describes the properties
// that are required to create a new Kudo
// Making TS and mongoose to work together
interface AdministratorAttrs {
  team_id: string;
  admin_email: string;
  created_at: number;
}

// An interface that describes the properties
// that a Administrator model has
interface AdministratorModel extends mongoose.Model<AdministratorDoc> {
  build(attrs: AdministratorAttrs): AdministratorDoc;
}

// An interface that describes the properties
// that a Administrator Documents has
interface AdministratorDoc extends mongoose.Document {
  team_id: string;
  admin_email: string;
  created_at: number;
}

const administratorSchema = new mongoose.Schema({
  team_id: {
    type: String,
    required: true,
  },
  admin_email: {
    type: String,
    required: true,
  },
  created_at: {
    type: Number,
    required: true,
  },
});

administratorSchema.statics.build = (attrs: AdministratorAttrs) => {
  return new Administrator(attrs);
};

const Administrator = mongoose.model<AdministratorDoc, AdministratorModel>(
  "Administrator",
  administratorSchema,
);

export { Administrator };
