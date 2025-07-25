import api from './api';

// Description: Get dashboard overview data
// Endpoint: GET /api/dashboard/overview
// Request: {}
// Response: { flockSize: number, healthStatus: string, pendingTasks: number, alerts: number, weather: object }
export const getDashboardOverview = () => {
  console.log("Fetching dashboard overview data");
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        flockSize: 150,
        healthStatus: 'Good',
        pendingTasks: 5,
        alerts: 3,
        weather: {
          temperature: 28,
          condition: 'Sunny',
          humidity: 65
        },
        recentActivities: [
          { id: 1, type: 'feeding', description: 'Morning feeding completed', time: '2 hours ago' },
          { id: 2, type: 'health', description: 'Vaccination reminder', time: '4 hours ago' },
          { id: 3, type: 'production', description: '45 eggs collected', time: '6 hours ago' }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/dashboard/overview');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Get quick stats for dashboard
// Endpoint: GET /api/dashboard/stats
// Request: {}
// Response: { eggProduction: object, feedConsumption: object, mortality: object, revenue: object }
export const getDashboardStats = () => {
  console.log("Fetching dashboard stats");
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        eggProduction: {
          today: 45,
          thisWeek: 315,
          thisMonth: 1350,
          trend: '+5%'
        },
        feedConsumption: {
          today: 25,
          thisWeek: 175,
          thisMonth: 750,
          trend: '-2%'
        },
        mortality: {
          today: 0,
          thisWeek: 2,
          thisMonth: 8,
          trend: '-10%'
        },
        revenue: {
          today: 450,
          thisWeek: 3150,
          thisMonth: 13500,
          trend: '+8%'
        }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/dashboard/stats');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}