import request from 'supertest';
import app from '../app';
import { closeDatabase, initializeDatabase } from '../utils/database';

/**
 * 
 * 1. Test that the GET /users/:user_id/recommendations route returns recommendations for a user.
 * 2. Test that the route returns a 404 error if the user has no recommendations.
 * 
 * TODO: Write the tests for the GET /users/:user_id/recommendations route.
 * Open the db connection before the tests and close it after the tests.
 * 
 * 
 */

beforeAll(async () => {
  initializeDatabase();
})

describe('GET /users/:user_id/recommendations', () => {
  it('should get recommendation for user', async () => {

   // post the recommendations to database to check it is correctly saved
    await request(app)
      .post('/recommendations')
      .send({
        user_id:"123",
         preferences: ["science fiction", "artificial intelligence", "space exploration"]
    })
      .expect(201);

    // Fetch the above saved data
    const res = await request(app)
      .get('/users/123/recommendations')
      .expect(200);
    
    expect(res.body.user_id).toBe('123');
    expect(res.body.recommendations.length).toBeGreaterThan(0);  // ensure recomendations are saved in db
    
 
  }, 10000);

  it('should return 400 if no recommendations for users', async () => {
    const res = await request(app)
      .get('/users/12356/recommendations')
      .expect(404);
    expect(res.body.error).toBe('No recommendations found for user 12356.');
  });

  it('should return 404 if user has no recommendations', async () => {
    const res = await request(app)
      .get('/users/456/recommendations')
  
    console.log(res.body);
    expect(res.body.error).toBe('No recommendations found for user 456.');
  });

  
});



afterAll(async () => {
  // close the db connection after the tests
  await closeDatabase();
})
