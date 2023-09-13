const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  // User Information
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  profileName: {
    type: String,
    required: true,
  },

  // Real Estate Requirements
  requirements: [
    {
      community: {
        type: String,
      },
      weight: {
        type: Number,
      },
    },
    {
      bedrooms: {
        type: Number,
      },
      weight: {
        type: Number,
      },
    },
    {
      bathrooms: {
        type: Number,
      },
      weight: {
        type: Number,
      },
    },
    {
      minPrice: {
        type: Number,
      },
      weight: {
        type: Number,
      },
    },
    {
      maxPrice: {
        type: Number,
      },
      weight: {
        type: Number,
      },
    },
    {
      propertyType: {
        type: String,
        enum: [
          'Residential',
          'Condo/Strata',
          'Vacant Land',
          'Recreational',
          'Multi Family',
          'Agriculture',
          'Parking',
        ],
      },
      weight: {
        type: Number,
      },
    },
    {
      buildingType: {
        type: String,
      },
      weight: {
        type: Number,
      },
    },
    // Add more requirements here
  ],

  // Results
  results: [
    {
      property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property', // Reference to the Property model
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
});

// A method to calculate the scores and store the top 20 results
profileSchema.methods.calculateAndStoreResults = async function() {
  // TODO: Calculate the scores

  await this.save();
};

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
