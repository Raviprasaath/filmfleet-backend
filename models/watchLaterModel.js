const mongoose = require('mongoose');

const watchListUserSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MovieDeckUserInfo',
        required: true,
    },
    details: [{ type: mongoose.Schema.Types.Mixed }],
});

module.exports = mongoose.model("MovieDeckWatchLists", watchListUserSchema);
