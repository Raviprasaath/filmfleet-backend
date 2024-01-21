const mongoose = require("mongoose");
const watchListModel = require("../models/watchLaterModel");
const userModel = require("../models/userModel");


const gettingWatchList = async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userWatchList = await watchListModel.find({ user: userId });

    if (!userWatchList || userWatchList.length === 0) {
      return res.status(404).json({ error: 'WatchList not found for the user' });
    }

    res.status(200).json(userWatchList);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};



const addingToWatchList = async (req, res) => {
  const { emailString, details } = req.body;
  const { userId } = req.query;
  try {
    const user = await userModel.findOne({ email: emailString });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const watchList = await watchListModel.create({ user: user._id, details });
    const userWatchList = await watchListModel.find({ user: userId });
    res.status(200).json(userWatchList);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};


const updatingToWatchList = async (req, res) => {
  const { id } = req.params;
  const { emailString, details } = req.body;
  try {
    const user = await userModel.findOne({ email: emailString });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: "Not Found"})
    }
    const watchList = await watchListModel.findByIdAndUpdate({ _id: id },{ details },{ new: true, runValidators: true });
    if (!watchList) {
      return res.status(404).json({ error: 'Watch list not found' });
    }

    res.status(200).json(watchList);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}


const deletingFromWatchList = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.query;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "Task Not Found"});
  }
  try {
    const taskDelete = await watchListModel.findByIdAndDelete(id);
    const userWatchList = await watchListModel.find({ user: userId });
    res.status(200).json(userWatchList);
  } catch (e) {
    res.status(400).json({errors: e.message})
  }
};

module.exports = { gettingWatchList, addingToWatchList, updatingToWatchList, deletingFromWatchList };