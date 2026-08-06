// Use localhost if running on emulator, or computer's IP for physical device
const API_URL = 'http://10.0.2.2:3000/api';

export const fetchCourses = async () => {
  const response = await fetch(`${API_URL}/courses`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.courses;
};
