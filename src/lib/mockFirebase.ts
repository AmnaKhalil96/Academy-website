// This is a mock implementation of Firebase Authentication
export const auth = {
    createUserWithEmailAndPassword: async (email: string) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful user creation
      return {
        user: {
          uid: 'mock-user-id',
          email: email,
        },
      };
    },
  };
  
  type User = {
    uid: string;
    email: string;
  };
  
  type AdditionalData = {
    name?: string;
    phoneNumber?: string;
    role?: string;
  };
  
  export const createUserProfile = async (user: User, additionalData: AdditionalData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('User profile created:', { user, additionalData });
  };
  
  
  