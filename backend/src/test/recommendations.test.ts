import request from 'supertest';
import app from '../app';
import { closeDatabase, initializeDatabase } from '../utils/database';

/**
 * 
 * 1. Test that the POST /recommendations route creates a recommendation for a user.
 * 2. Test that the route returns a 400 error if the user_id is missing.
 * 3. Test that the route returns a 400 error if the preferences are missing.
 * 
 * TODO: Write the tests for the POST /recommendations route.
 * 
 * Open the db connection before the tests and close it after the tests.
 */

beforeAll(async () => {
  // open the db connection before the tests
  initializeDatabase();
})

describe('POST /recommendations', () => {
  it('should create recommendation for user', async () => {
    const res = await request(app)
      .post('/recommendations')
      .send({
        user_id:"123",
         preferences: ["science fiction", "artificial intelligence", "space exploration"]
    })
      .expect(201);

    expect(res.body.message).toBe('Recommendations saved successfully');

  }, 10000);

  it('should return 400 if user_id is missing', async () => {
    const res = await request(app)
      .post('/recommendations')
      .send({
        preferences: ["science fiction", "artificial intelligence", "space exploration"]
    })
      .expect(400);


    expect(res.body.errors.length).toBeGreaterThan(0);
    expect(res.body.errors[1].msg).toBe('user_id is required and must be a non-empty string');
  });

  it('should return 400 if preferences is missing', async () => {
    const res = await request(app)
      .post('/recommendations')
      .send({
        user_id:"123"
    })
      .expect(400);

    expect(res.body.errors.length).toBeGreaterThan(0);
    expect(res.body.errors[0].msg).toBe('Preferences must be a non-empty array');
  });

  
});



afterAll(async () => {
  // close the db connection after the tests
  await closeDatabase();
})
