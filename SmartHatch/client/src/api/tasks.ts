import api from './api';

// Description: Get user tasks and reminders
// Endpoint: GET /api/tasks
// Request: {}
// Response: { tasks: Array<{ _id: string, title: string, description: string, dueDate: string, priority: string, completed: boolean, category: string }> }
export const getTasks = () => {
  console.log("Fetching user tasks");
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        tasks: [
          {
            _id: '1',
            title: 'Morning Feeding',
            description: 'Feed the chickens with layer feed',
            dueDate: '2024-01-15T06:00:00Z',
            priority: 'high',
            completed: false,
            category: 'feeding'
          },
          {
            _id: '2',
            title: 'Vaccination Schedule',
            description: 'Administer Newcastle disease vaccine',
            dueDate: '2024-01-15T10:00:00Z',
            priority: 'high',
            completed: false,
            category: 'health'
          },
          {
            _id: '3',
            title: 'Coop Cleaning',
            description: 'Clean and disinfect the chicken coop',
            dueDate: '2024-01-15T14:00:00Z',
            priority: 'medium',
            completed: true,
            category: 'maintenance'
          },
          {
            _id: '4',
            title: 'Egg Collection',
            description: 'Collect eggs from nesting boxes',
            dueDate: '2024-01-15T16:00:00Z',
            priority: 'medium',
            completed: false,
            category: 'production'
          },
          {
            _id: '5',
            title: 'Feed Inventory Check',
            description: 'Check feed levels and order if needed',
            dueDate: '2024-01-16T09:00:00Z',
            priority: 'low',
            completed: false,
            category: 'inventory'
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/tasks');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Update task completion status
// Endpoint: PUT /api/tasks/:id
// Request: { completed: boolean }
// Response: { success: boolean, message: string }
export const updateTask = (taskId: string, completed: boolean) => {
  console.log("Updating task:", taskId, "completed:", completed);
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Task updated successfully'
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.put(`/api/tasks/${taskId}`, { completed });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Create a new task
// Endpoint: POST /api/tasks
// Request: { title: string, description: string, dueDate: string, priority: string, category: string }
// Response: { success: boolean, message: string, task: object }
export const createTask = (taskData: { title: string; description: string; dueDate: string; priority: string; category: string }) => {
  console.log("Creating new task:", taskData);
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Task created successfully',
        task: {
          _id: Date.now().toString(),
          ...taskData,
          completed: false
        }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/tasks', taskData);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}