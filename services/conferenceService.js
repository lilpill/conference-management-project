const { Conference, User } = require('../models');

// Δημιουργία διάσκεψης
exports.createConference = async (data) => {
  const { name, description, userId } = data;

  // Έλεγχος αν υπάρχει ο χρήστης
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Δημιουργία της διάσκεψης
  const conference = await Conference.create({ name, description });

  // Εισαγωγή του χρήστη ως PC Chair
  await PcChair.create({
    userId: user.id,
    conferenceId: conference.id,
  });

  return conference;
};

// Λήψη όλων των διασκέψεων
exports.getConferences = async () => {
  return await Conference.findAll();
};

// Λήψη διάσκεψης με βάση το ID
exports.getConferenceById = async (conferenceId) => {
  const conference = await Conference.findByPk(conferenceId);
  if (!conference) {
    throw new Error('Conference not found');
  }
  return conference;
};

// Ενημέρωση διάσκεψης
exports.updateConference = async (conferenceId, data) => {
  const conference = await Conference.findByPk(conferenceId);
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
  const conference = await Conference.findByPk(conferenceId);
  if (!conference) {
    throw new Error('Conference not found');
  }

  for (const userId of userIds) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    await PcChair.findOrCreate({
      where: { userId, conferenceId },
    });
  }

  return conference;
};

// Προσθήκη μελών PC σε μια διάσκεψη
exports.addPcMembers = async (conferenceId, userIds) => {
  const conference = await Conference.findByPk(conferenceId);
  if (!conference) {
    throw new Error('Conference not found');
  }

  for (const userId of userIds) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    await PcMember.findOrCreate({
      where: { userId, conferenceId },
    });
  }

  return conference;
};

// Αναζήτηση διάσκεψης
exports.searchConferences = async (criteria) => {
  const query = {};

  if (criteria.name) {
    query.name = { [Op.like]: `%${criteria.name}%` };
  }
  if (criteria.description) {
    query.description = { [Op.like]: `%${criteria.description}%` };
  }

  return await Conference.findAll({
    where: query,
    order: [['name', 'ASC']],
  });
};

// Προβολή διάσκεψης
exports.viewConference = async (conferenceId) => {
  return await this.getConferenceById(conferenceId);
};

// Διαγραφή διάσκεψης
exports.deleteConference = async (conferenceId) => {
  const conference = await Conference.findByPk(conferenceId);
  if (!conference) {
    throw new Error('Conference not found');
  }

  await conference.destroy();
};

// Ενημέρωση κατάστασης διάσκεψης
exports.updateConferenceState = async (conferenceId, state) => {
  const conference = await Conference.findByPk(conferenceId);
  if (!conference) {
    throw new Error('Conference not found');
  }

  conference.state = state;
  await conference.save();
  return conference;
};
