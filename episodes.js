const mongoose=require('mongoose');
const Schema =mongoose.Schema;

const episodeSchema = new Schema({
    season:{type:Number},
    seriesno:{type:Number},
    seasonno:{type:Number},
    title:{type:String},
    premiere:{type:Date},
    courses:{appetizer:[String],entree:[String],dessert:[String]},
    judges:[String],
    contestants:[String],
    notes:String
    },
{timestamps:true}
);


const Episode = mongoose.model('Episode',episodeSchema);
module.exports=Episode;