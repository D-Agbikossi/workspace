import api from './api';

// Description: Get learning modules
// Endpoint: GET /api/learning/modules
// Request: {}
// Response: { modules: Array<{ _id: string, title: string, category: string, description: string, duration: string, difficulty: string, isDownloaded: boolean }> }
export const getLearningModules = () => {
  console.log("Fetching learning modules");
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        modules: [
          {
            _id: '1',
            title: 'Poultry Breeds Selection',
            category: 'Breeds',
            description: 'Learn about different poultry breeds and their characteristics',
            duration: '15 min',
            difficulty: 'Beginner',
            isDownloaded: true
          },
          {
            _id: '2',
            title: 'Feeding and Nutrition Basics',
            category: 'Nutrition',
            description: 'Essential guide to proper poultry feeding and nutrition',
            duration: '20 min',
            difficulty: 'Beginner',
            isDownloaded: false
          },
          {
            _id: '3',
            title: 'Disease Prevention Strategies',
            category: 'Health',
            description: 'Comprehensive guide to preventing common poultry diseases',
            duration: '25 min',
            difficulty: 'Intermediate',
            isDownloaded: true
          },
          {
            _id: '4',
            title: 'Housing and Environment Setup',
            category: 'Housing',
            description: 'Best practices for poultry housing and environmental management',
            duration: '30 min',
            difficulty: 'Intermediate',
            isDownloaded: false
          },
          {
            _id: '5',
            title: 'Business Management for Farmers',
            category: 'Business',
            description: 'Financial planning and business management for poultry farming',
            duration: '35 min',
            difficulty: 'Advanced',
            isDownloaded: false
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/learning/modules');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Download learning module for offline access
// Endpoint: POST /api/learning/download
// Request: { moduleId: string }
// Response: { success: boolean, message: string }
export const downloadModule = (moduleId: string) => {
  console.log("Downloading module:", moduleId);
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Module downloaded successfully'
      });
    }, 1000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/learning/download', { moduleId });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}