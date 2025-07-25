import api from './api';

// Description: Get community forum posts
// Endpoint: GET /api/community/posts
// Request: {}
// Response: { posts: Array<{ _id: string, title: string, content: string, author: object, category: string, replies: number, likes: number, createdAt: string }> }
export const getCommunityPosts = () => {
  console.log("Fetching community posts");
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        posts: [
          {
            _id: '1',
            title: 'Best practices for winter feeding?',
            content: 'I\'m looking for advice on how to adjust feeding during the winter months. Any suggestions?',
            author: {
              name: 'John Farmer',
              avatar: '/placeholder-avatar.jpg',
              reputation: 150
            },
            category: 'Feeding',
            replies: 12,
            likes: 8,
            createdAt: '2024-01-14T10:30:00Z'
          },
          {
            _id: '2',
            title: 'Dealing with Newcastle disease outbreak',
            content: 'We had a Newcastle disease outbreak last month. Here\'s what we learned and how we managed it.',
            author: {
              name: 'Sarah Johnson',
              avatar: '/placeholder-avatar.jpg',
              reputation: 280
            },
            category: 'Health',
            replies: 25,
            likes: 45,
            createdAt: '2024-01-13T15:45:00Z'
          },
          {
            _id: '3',
            title: 'Egg production suddenly dropped',
            content: 'My hens were laying 40 eggs per day, now it\'s down to 25. What could be the cause?',
            author: {
              name: 'Mike Peters',
              avatar: '/placeholder-avatar.jpg',
              reputation: 95
            },
            category: 'Production',
            replies: 18,
            likes: 12,
            createdAt: '2024-01-12T08:20:00Z'
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/community/posts');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Create a new community post
// Endpoint: POST /api/community/posts
// Request: { title: string, content: string, category: string }
// Response: { success: boolean, message: string, post: object }
export const createPost = (postData: { title: string; content: string; category: string }) => {
  console.log("Creating new post:", postData);
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Post created successfully',
        post: {
          _id: Date.now().toString(),
          ...postData,
          author: {
            name: 'Current User',
            avatar: '/placeholder-avatar.jpg',
            reputation: 120
          },
          replies: 0,
          likes: 0,
          createdAt: new Date().toISOString()
        }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/community/posts', postData);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}