// src/utils/database.ts

// TODO: Set up the database connection.

// Hints:
// - Use Mongoose to connect to your MongoDB instance.
// - Create a function to initialize the connection.
// - Use environment variables or a configuration file for the connection URI.

// Example (from a different context):


import mongoose from 'mongoose';

const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/myDb';

export const initializeDatabase = async () => {
  try {
    await mongoose.connect(DATABASE_URI, {
      // Mongoose connection options can be specified here
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

export const closeDatabase = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error('Database disconnection error:', error);
  }
};


// Note:
// - Remember to call this initialization function before your application starts listening for requests.
