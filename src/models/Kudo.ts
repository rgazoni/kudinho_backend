import mongoose from "mongoose";

// An interface that describes the properties
// that are required to create a new Kudo
// Making TS and mongoose to work together
interface KudoAttrs {
  team_id: string;
  timestamp: number;
  to: string;
  from: string;
  message: string;
}

// An interface that describes the properties
// that a Kudo model has
interface KudoModel extends mongoose.Model<KudoDoc> {
  build(attrs: KudoAttrs): KudoDoc;
}

// An interface that describes the properties
// that a Kudo Documents has
interface KudoDoc extends mongoose.Document {
  team_id: string;
  timestamp: number;
  to: string;
  from: string;
  message: string;
  isKudoReaded: boolean;
}

const kudoSchema = new mongoose.Schema({
  team_id: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isKudoReaded: {
    type: Boolean,
    required: false,
  },
});

kudoSchema.pre("save", async function (done) {
  if (this.isNew) {
    this.set("isKudoReaded", false);
  }
});

kudoSchema.statics.build = (attrs: KudoAttrs) => {
  return new Kudo(attrs);
};

const Kudo = mongoose.model<KudoDoc, KudoModel>("Kudo", kudoSchema);

export { Kudo };
