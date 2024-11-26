import { body, ValidationChain } from 'express-validator';

/**
 * Validation scheme from new Recommendation.
 * @example
 * user_id is required and must be a non-empty string
 * preferences must be a non-empty array
 * 
 */

export const createRecommendationScheme: ValidationChain[] = [
  body('user_id')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('user_id is required and must be a non-empty string'),
  body('preferences')
    .isArray({ min: 1 })
    .withMessage('Preferences must be a non-empty array'),

];