// src/routes/users.ts

import { Router } from 'express';
import { getUserRecommendations } from '../controllers/users-controller';
// import { getUserRecommendations } from '../controllers/usersController';

const router = Router();

/**
 * TODO: Set up the `/users/:user_id/recommendations` GET route.
 *
 * Steps:
 * 1. Use the `getUserRecommendations` controller to handle the request.
 * 2. Ensure the `user_id` parameter is extracted correctly.
 * 3. Handle any errors appropriately.
 *
 * Hints:
 * - No additional validation middleware is required unless you want to validate `user_id`.
 */

 // Example (from a different context):

 
 router.get('/:user_id/recommendations', getUserRecommendations);
 

export default router;
