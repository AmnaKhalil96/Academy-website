import { database } from './firebase';
import { ref, set, get } from 'firebase/database';
import { User } from 'firebase/auth';

// User data interface
interface UserData {
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: string; // Updated format
  lastLogin: string; // Updated format
}

// Format timestamp into human-readable date/time
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Outputs in readable format, e.g., "1/12/2025, 10:45 AM"
}

// Create user profile in the real-time database
// Note: the password is NOT persisted here — Firebase Authentication already
// stores and manages it securely. Duplicating it in plain text in the
// Realtime Database would be a serious security vulnerability.
export async function createUserProfile(user: User, additionalData: {
  name: string;
  phoneNumber: string;
}) {
  if (!user) return;

  const userRef = ref(database, `users/${user.uid}`);

  const userData: UserData = {
    name: additionalData.name,
    email: user.email || '',
    phoneNumber: additionalData.phoneNumber,
    createdAt: formatTimestamp(Date.now()), // Use readable date format
    lastLogin: formatTimestamp(Date.now()),
  };

  try {
    await set(userRef, userData);
    return userData;
  } catch (error) {
    console.error("Error creating user profile: ", error);
    throw error;
  }
}

// Update the last login timestamp in the database
export async function updateUserLastLogin(userId: string) {
  const userRef = ref(database, `users/${userId}`);
  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const updatedData = {
        ...snapshot.val(),
        lastLogin: formatTimestamp(Date.now()), // Use readable date format
      };
      await set(userRef, updatedData);
    }
  } catch (error) {
    console.error("Error updating last login: ", error);
    throw error;
  }
}
