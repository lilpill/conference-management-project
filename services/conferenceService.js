const { Conference } = require('../models');

exports.createConference = async (data) => {
  try {
    const conference = await Conference.create(data);
    return conference;
  } catch (error) {
    throw new Error('Error creating conference');
  }
};

exports.getConferences = async () => {
  try {
    const conferences = await Conference.findAll();
    return conferences;
  } catch (error) {
    throw new Error('Error fetching conferences');
  }
};

