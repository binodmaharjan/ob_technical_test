// src/models/Recommendation.ts

/**
TODO: Define the Mongoose schema and model for storing recommendations.

Hints:
- Define a schema that includes:
  - `user_id`: string
  - `suggestion`: string
- Create a TypeScript interface for type safety (without using the 'I' prefix).
- Export the Mongoose model to be used in other parts of your application.
- Use the `mongoose.model` method to create the model.
-  User_id is required and must be a non-empty string
-  recommendations must be a non-empty string connected to the user_id, The table structure should be as follows:
    - user_id: number
    - suggestion: string
    - Can make easy to query by user_id and easy for searching based on recommendations string
-  Can use suggestion as an array of strings
*/


import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the document
export interface RecommendationDocument extends Document {
  user_id: number;
  suggestion: string;
}

// Create the schema
const RecommendationSchema: Schema = new Schema({
  user_id: { type: Number, required: true },
  suggestion: { type: String, required: true }
});

// Export the model
export const RecommendationModel = mongoose.model<RecommendationDocument>('Recommendations', RecommendationSchema);


// Apply this pattern to create your `Recommendation` model.
