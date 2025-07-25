import api from './api';

// Description: Get marketplace products
// Endpoint: GET /api/marketplace/products
// Request: {}
// Response: { products: Array<{ _id: string, name: string, category: string, price: number, seller: object, image: string, description: string }> }
export const getMarketplaceProducts = () => {
  console.log("Fetching marketplace products");
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        products: [
          {
            _id: '1',
            name: 'Layer Feed Premium',
            category: 'Feed',
            price: 15000,
            seller: {
              name: 'AgriSupply Benin',
              rating: 4.5,
              location: 'Cotonou'
            },
            image: '/placeholder-product.jpg',
            description: 'High-quality layer feed for optimal egg production',
            inStock: true
          },
          {
            _id: '2',
            name: 'Newcastle Vaccine',
            category: 'Medicine',
            price: 2500,
            seller: {
              name: 'VetCare Solutions',
              rating: 4.8,
              location: 'Porto-Novo'
            },
            image: '/placeholder-product.jpg',
            description: 'Newcastle disease vaccine for poultry protection',
            inStock: true
          },
          {
            _id: '3',
            name: 'Fresh Eggs (30 pieces)',
            category: 'Products',
            price: 3000,
            seller: {
              name: 'Marie\'s Farm',
              rating: 4.6,
              location: 'Parakou'
            },
            image: '/placeholder-product.jpg',
            description: 'Fresh farm eggs from free-range chickens',
            inStock: true
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/marketplace/products');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Create product listing
// Endpoint: POST /api/marketplace/products
// Request: { name: string, category: string, price: number, description: string, image: string }
// Response: { success: boolean, message: string, product: object }
export const createProductListing = (productData: { name: string; category: string; price: number; description: string; image?: string }) => {
  console.log("Creating product listing:", productData);
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Product listed successfully',
        product: {
          _id: Date.now().toString(),
          ...productData,
          seller: {
            name: 'Current User',
            rating: 4.2,
            location: 'Cotonou'
          },
          inStock: true
        }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/marketplace/products', productData);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}