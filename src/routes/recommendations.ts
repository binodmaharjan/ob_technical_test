// src/routes/recommendations.ts

import { Router } from 'express';
import { postRecommendations } from '../controllers/recommendations-controller';
import { formValidate } from '../middleware/formvalidate';
import { createRecommendationScheme } from '../validators/recommendations.validator';
// import { generateRecommendations } from '../controllers/recommendationsController';
// import { validateRecommendations } from '../utils/schemas';
// import { validationResult } from 'express-validator';

const router = Router();

/**
 * TODO: Set up the `/recommendations` POST route.
 *
 * Steps:
 * 1. Apply validation middleware to validate the request body.
 * 2. Use the `generateRecommendations` controller to handle the request.
 * 3. Handle validation errors appropriately.
 *
 * Hints:
 * - Use `express-validator` for input validation.
 * - Use `validationResult` to check for validation errors.
 */


 router.post('/', createRecommendationScheme, formValidate, postRecommendations)

export default router;
