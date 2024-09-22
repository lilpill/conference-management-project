const { Conference, User, PcChair, PcMember } = require('../models');

// Δημιουργία διάσκεψης
exports.createConference = async (data) => {
  const { name, description, userId } = data;

  // Έλεγχος αν υπάρχει ο χρήστης
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Δημιουργία της διάσκεψης
  const conference = new Conference({ name, description });
  await conference.save();

  // Εισαγωγή του χρήστη ως PC Chair
  const pcChair = new PcChair({
    user: user._id,
    conference: conference._id,
  });
  await pcChair.save();

  return conference;
};

// Λήψη όλων των διασκέψεων
exports.getConferences = async () => {
  return await Conference.find().populate('pcChairs pcMembers');
};

// Λήψη διάσκεψης με βάση το ID
exports.getConferenceById = async (conferenceId) => {
  const conference = await Conference.findById(conferenceId).populate('pcChairs pcMembers');
  if (!conference) {
    throw new Error('Conference not found');
  }
  return conference;
};

// Ενημέρωση διάσκεψης
exports.updateConference = async (conferenceId, data) => {
  const conference = await Conference.findById(conferenceId);
  if (!conference) {
    throw new Error('Conference not found');
  }

  const { name, description, state } = data;
  conference.name = name || conference.name;
  conference.description = description || conference.description;
  conference.state = state || conference.state;

  await conference.save();
  return conference;
};

// Προσθήκη μελών PC Chairs
exports.addPcChairs = async (conferenceId, userIds) => {
  const conference = await Conference.findById(conferenceId);
  if (!conference) {
    throw new Error('Conference not found');
  }

  for (const userId of userIds) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    const existingPcChair = await PcChair.findOne({ user: user._id, conference: conference._id });
    if (!existingPcChair) {
      const pcChair = new PcChair({ user: user._id, conference: conference._id });
      await pcChair.save();
    }
  }

  return conference;
};

// Προσθήκη μελών PC σε μια διάσκεψη
exports.addPcMembers = async (conferenceId, userIds) => {
  const conference = await Conference.findById(conferenceId);
  if (!conference) {
    throw new Error('Conference not found');
  }

  for (const userId of userIds) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    const existingPcMember = await PcMember.findOne({ user: user._id, conference: conference._id });
    if (!existingPcMember) {
      const pcMember = new PcMember({ user: user._id, conference: conference._id });
      await pcMember.save();
    }
  }

  return conference;
};

// Αναζήτηση διάσκεψης
exports.searchConferences = async (criteria) => {
  const query = {};

  if (criteria.name) {
    query.name = { $regex: criteria.name, $options: 'i' };
  }
  if (criteria.description) {
    query.description = { $regex: criteria.description, $options: 'i' };
  }

  return await Conference.find(query).sort('name');
};

// Προβολή διάσκεψης
exports.viewConference = async (conferenceId) => {
  return await this.getConferenceById(conferenceId);
};

// Διαγραφή διάσκεψης
exports.deleteConference = async (conferenceId) => {
  const conference = await Conference.findById(conferenceId);
  if (!conference) {
    throw new Error('Conference not found');
  }

  await conference.deleteOne();
};

// Ενημέρωση κατάστασης διάσκεψης
exports.updateConferenceState = async (conferenceId, state) => {
  const conference = await Conference.findById(conferenceId);
  if (!conference) {
    throw new Error('Conference not found');
  }

  conference.state = state;
  await conference.save();
  return conference;
};
