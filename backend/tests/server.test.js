const request = require('supertest');
const app = require('../server');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

beforeAll(async () => {
  // Optional: clear database before tests
  await prisma.course.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('GET /api/courses', () => {
  it('should return empty courses array initially', async () => {
    const res = await request(app).get('/api/courses');
    expect(res.statusCode).toEqual(200);
    expect(res.body.courses).toEqual([]);
  });

  it('should create and retrieve a course', async () => {
    const newCourse = {
      title: 'Test Course',
      description: 'Test Description',
      videoUri: 'http://test.com/video.mp4',
      thumbnail: 'http://test.com/thumbnail.jpg',
      duration: '10 min',
    };

    const postRes = await request(app).post('/api/courses').send(newCourse);
    expect(postRes.statusCode).toEqual(201);
    expect(postRes.body.title).toEqual(newCourse.title);

    const getRes = await request(app).get('/api/courses');
    expect(getRes.statusCode).toEqual(200);
    expect(getRes.body.courses.length).toEqual(1);
    expect(getRes.body.courses[0].title).toEqual(newCourse.title);
  });
});
