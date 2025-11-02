// __tests__/app.test.js
const request = require('supertest');
const { createApp } = require('../server');

describe('Express Application Tests', () => {
  let app;
  
  beforeEach(() => {
    app = createApp();
  });

  // Test 1: Homepage works
  test('should respond with 200 on GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  // Test 2: Returns HTML
  test('should serve HTML content', async () => {
    const response = await request(app).get('/');
    expect(response.type).toContain('html');
  });

  // Test 3: 404 for bad routes
  test('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/nonexistent-page');
    expect(response.status).toBe(404);
  });

  // Test 4: Static files work
  test('should serve static files', async () => {
    const response = await request(app).get('/index.html');
    expect(response.status).toBe(200);
  });

  // Test 5: App is defined
  test('should create valid express app', () => {
    expect(app).toBeDefined();
    expect(typeof app.listen).toBe('function');
  });

  // Test 6: Exported function works
  test('should export createApp function', () => {
    expect(typeof createApp).toBe('function');
  });
});