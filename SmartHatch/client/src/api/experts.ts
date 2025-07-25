import api from './api';

// Description: Get available experts for consultation
// Endpoint: GET /api/experts
// Request: {}
// Response: { experts: Array<{ _id: string, name: string, specialization: string, rating: number, availability: string, pricePerHour: number }> }
export const getExperts = () => {
  console.log("Fetching available experts");
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        experts: [
          {
            _id: '1',
            name: 'Dr. Emmanuel Koffi',
            specialization: 'Poultry Veterinarian',
            rating: 4.8,
            availability: 'Available',
            pricePerHour: 5000,
            avatar: '/placeholder-avatar.jpg',
            experience: '10 years',
            languages: ['French', 'Fon']
          },
          {
            _id: '2',
            name: 'Marie Adjovi',
            specialization: 'Nutrition Expert',
            rating: 4.6,
            availability: 'Busy',
            pricePerHour: 3500,
            avatar: '/placeholder-avatar.jpg',
            experience: '7 years',
            languages: ['French', 'English']
          },
          {
            _id: '3',
            name: 'Joseph Dossou',
            specialization: 'Business Consultant',
            rating: 4.9,
            availability: 'Available',
            pricePerHour: 4000,
            avatar: '/placeholder-avatar.jpg',
            experience: '12 years',
            languages: ['French', 'Fon', 'English']
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/experts');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Request expert consultation
// Endpoint: POST /api/experts/consultation
// Request: { expertId: string, message: string, urgency: string, consultationType: string }
// Response: { success: boolean, message: string, consultationId: string }
export const requestConsultation = (consultationData: { expertId: string; message: string; urgency: string; consultationType: string }) => {
  console.log("Requesting consultation:", consultationData);
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Consultation request sent successfully',
        consultationId: Date.now().toString()
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/experts/consultation', consultationData);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Get user's consultation history
// Endpoint: GET /api/experts/consultations
// Request: {}
// Response: { consultations: Array<{ _id: string, expert: object, status: string, createdAt: string, message: string }> }
export const getConsultations = () => {
  console.log("Fetching consultation history");
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        consultations: [
          {
            _id: '1',
            expert: {
              name: 'Dr. Emmanuel Koffi',
              specialization: 'Poultry Veterinarian'
            },
            status: 'Completed',
            createdAt: '2024-01-10T14:30:00Z',
            message: 'Need help with sick chickens showing respiratory symptoms'
          },
          {
            _id: '2',
            expert: {
              name: 'Marie Adjovi',
              specialization: 'Nutrition Expert'
            },
            status: 'Pending',
            createdAt: '2024-01-14T09:15:00Z',
            message: 'Questions about feed formulation for laying hens'
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/experts/consultations');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}