const Meetings = require('../../model/schema/meeting');

const add = async (req, res) => {
  try {
    const meeting = new Meetings(req.body);
    await meeting.save();
    res.status(201).json({ success: true, data: meeting });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const index = async (req, res) => {
  try {
    const meetings = await Meetings.find({ deleted: false });
    res.status(200).json({ success: true, data: meetings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const view = async (req, res) => {
  try {
    const meeting = await Meetings.findById(req.params.id);
    if (!meeting) return res.status(404).json({ success: false, message: 'Meeting not found' });
    res.status(200).json({ success: true, data: meeting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteData = async (req, res) => {
  try {
    const meeting = await Meetings.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
    if (!meeting) return res.status(404).json({ success: false, message: 'Meeting not found' });
    res.status(200).json({ success: true, message: 'Meeting deleted', data: meeting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteMany = async (req, res) => {
  try {
    const meeting = await Meetings.updateMany({ _id: { $in: req.body } }, { $set: { deleted: true } });
    res.status(200).json({ message: "done", meeting })
  } catch (err) {
    res.status(404).json({ message: "error", err })
  }
}

module.exports = { add, index, view, deleteData, deleteMany }
