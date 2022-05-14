const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
    gameId: mongoose.Types.ObjectId,
    title: String,
    assigneeName: String,
    gender:String,
    easyToUseForParents: Boolean,
    easyToUseForKids: Boolean,
    informative: String,
    fun: String,
    independentUsage: String,
    inappropriateLanguage: String,
    engagingContent: String,
    languageRequired: String,
    price: Number,
    addFree: String,
    attentionSpan: String,
    appropriateMusic: String,
    techPitFalls: String,
    memory: String,
    processingSpeed: Number,
    problemSolving:String,
    arithemticReasoning: String,
    attentionToDetails: String,
    flexibility: String,
    word:String,
    diversityFriendly:String,
    LGBTFriendly:String,
    plantFriendly:String,
    enviromentFriendly:String,
    animalFriendly:String, 
    exttraNotes:String

});

module.exports = mongoose.model("AppModel", appSchema); 