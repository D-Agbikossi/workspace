import api from './api';

// Description: Get farm analytics data
// Endpoint: GET /api/reports/analytics
// Request: {}
// Response: { analytics: object }
export const getFarmAnalytics = () => {
  console.log("Fetching farm analytics");
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        analytics: {
          eggProduction: {
            daily: [
              { date: '2024-01-08', eggs: 42 },
              { date: '2024-01-09', eggs: 45 },
              { date: '2024-01-10', eggs: 38 },
              { date: '2024-01-11', eggs: 47 },
              { date: '2024-01-12', eggs: 44 },
              { date: '2024-01-13', eggs: 46 },
              { date: '2024-01-14', eggs: 43 }
            ],
            total: 305,
            average: 43.6
          },
          feedConsumption: {
            daily: [
              { date: '2024-01-08', amount: 24 },
              { date: '2024-01-09', amount: 26 },
              { date: '2024-01-10', amount: 23 },
              { date: '2024-01-11', amount: 25 },
              { date: '2024-01-12', amount: 24 },
              { date: '2024-01-13', amount: 27 },
              { date: '2024-01-14', amount: 25 }
            ],
            total: 174,
            average: 24.9
          },
          mortality: {
            weekly: [
              { week: 'Week 1', deaths: 2 },
              { week: 'Week 2', deaths: 1 },
              { week: 'Week 3', deaths: 3 },
              { week: 'Week 4', deaths: 0 }
            ],
            total: 6,
            rate: 4.0
          },
          financial: {
            revenue: 13500,
            expenses: 8200,
            profit: 5300,
            profitMargin: 39.3
          }
        }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/reports/analytics');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Generate farm report
// Endpoint: POST /api/reports/generate
// Request: { reportType: string, dateRange: object }
// Response: { success: boolean, reportUrl: string }
export const generateReport = (reportData: { reportType: string; dateRange: { start: string; end: string } }) => {
  console.log("Generating report:", reportData);
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        reportUrl: '/reports/farm-report-2024-01.pdf'
      });
    }, 2000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/reports/generate', reportData);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}