const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HeadlineSchema = new Schema ({
	headline: {
		type: String,
		unique: true
	},
	summary: {
		type: String
	},
	link: {
		type: String
	},
	photo: {
		type: String
	},
	saved: {
		type: Boolean,
		default: false
	},
	notes: [
		{
			type: Schema.Types.ObjectId,
			ref: "Note"
		}
	]
});

const Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;