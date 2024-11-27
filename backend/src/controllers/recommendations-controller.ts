// src/controllers/recommendationsController.ts

import { Request, Response } from 'express';
import { RecommendationPost } from '../types/recommendation';
import { RecommendationModel } from '../models/recommendation';
import axios from 'axios';
import { LLM_API_URL } from '../utils/helpers';
// import axios from 'axios';
// import { OfferModel } from '../models/Offer';

export const generateOffers = async (req: Request, res: Response) => {
  /**
   * TODO: Implement this controller function.
   *
   * Steps:
   * 1. Extract `user_id` and `preferences` from the request body.
   * 2. Validate the input data.
   *    - Ensure `user_id` is a non-empty string.
   *    - Ensure `preferences` is a non-empty array of non-empty strings.
   * 3. Interact with an external API to get tailored recommendations.
   *    - Send a POST request to the external promotions API.
   *    - Include the `preferences` in the request payload.
   * 4. Save the promotions in the database.
   *    - Use the `RecommendationModel` to store data.
   * 5. Return the recommendations in the response.
   *
   * Handle exceptions and errors appropriately.
   *
   * Hints:
   * - Use an HTTP client like `axios` or `node-fetch` for external requests.
   * - Anticipate possible errors from the external service and the database.
   * - Use try-catch blocks for error handling.
   */

  // Extract the user_id and preferences from the request body
};


export const postRecommendations = async (req: Request, res: Response) => {

  const { user_id, preferences } = req.body as RecommendationPost;

  // check if LLM_API_URL is defined in the environment variables
  if (!process.env.LLM_API_URL) {
    res.status(500).json({ error: 'LLM_API_URL is not defined in the environment variables' });
    return;
  }

  try {
    const response = await axios.post(process.env.LLM_API_URL, { preferences });
    const recommendations: string[] = response?.data?.recommendations || [];

    //check existing recommendations
    const existingRecommendations = await RecommendationModel.find({ user_id });
    if (existingRecommendations.length > 0) {
      //delete existing recommendations
      await RecommendationModel.deleteMany({ user_id });
    }

    // Save each recommendation
    const recommendationPromises = recommendations.map((preference: string) => {
      const recommendation = new RecommendationModel({
        user_id,
        suggestion: preference,
      });
      return recommendation.save();
    });

    // Wait for all recommendations to be saved
    await Promise.all(recommendationPromises);
    res.status(201).json({ message: 'Recommendations saved successfully' });
    return;

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to saved recommendations. Only preferences accepting right now by wiremock: ["science fiction", "artificial intelligence", "space exploration"]' });

  }


}


