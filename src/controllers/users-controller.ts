// src/controllers/usersController.ts

import { Request, Response } from 'express';
import { RecommendationModel } from '../models/recommendation';
// import { PromotionModel } from '../models/Promotion';

/**
   * TODO: Implement this controller function.
   *
   * Steps:
   * 1. Extract `user_id` from `req.params`.
   * 2. Retrieve the promotions for the given `user_id` from the database.
   * 3. If recommendations exist, return them in the response.
   * 4. If not, return a 404 error with an appropriate message.
   *
   * Handle exceptions and errors appropriately.
   *
   * Hints:
   * - Use `RecommendationModel` to query the database.
   * - Use try-catch blocks to handle exceptions.
   */
export const getUserRecommendations = async (req: Request, res: Response) => {
  const { user_id } = req.params ;
  try {
    const recommendations =  await RecommendationModel.find({ user_id });
    if (!recommendations || recommendations.length === 0) {
       res.status(404).json({
        error: `No recommendations found for user ${user_id}.`,
      });
      return
    }


    //sanitize the recommendations
    const recommendationsArr = recommendations.map((recommendation) => {
      return  recommendation.suggestion
    })

    const finalRes = {
      user_id,
      recommendations: recommendationsArr,
    }

    return res.status(200).json(finalRes);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return res.status(500).json({
      error: 'Unable to fetch recommendations at this time. Please try again later.',
    });
  }
}
