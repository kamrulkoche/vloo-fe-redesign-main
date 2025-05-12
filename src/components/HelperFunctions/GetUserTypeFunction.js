/**
 * Get user type from localStorage
 * @returns {string} User type in lowercase or empty string if not found
 */
export function getUserType() {
  if (typeof window !== "undefined") {
    try {
      const userDataStr = localStorage.getItem("userData");
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        return userData.user_type.toLowerCase();
      }
    } catch (error) {
      console.error("Error getting user type:", error);
    }
  }
  return "";
}

/**
 * Set user data and access token in localStorage
 * @param {Object} sessionData - Object containing userData and accessToken
 */
export const setUserTypeAndData = (sessionData) => {
  // Store in sessionStorage for client-side access
  if (typeof window !== "undefined") {
    sessionStorage.setItem("userData", JSON.stringify(sessionData.userData));
    sessionStorage.setItem("accessToken", sessionData.accessToken);
    localStorage.setItem("userData", JSON.stringify(sessionData.userData));
    localStorage.setItem("accessToken", sessionData.accessToken);
  }

  // Also update the NextAuth session to keep them in sync
  fetch("/api/user/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userType: sessionData.userData.user_type,
      accessToken: sessionData.accessToken,
      userData: sessionData.userData,
    }),
  }).catch((err) => console.error("Failed to update session:", err));
};

/**
 * Clear all user data from localStorage
 */
export function clearUserData() {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  }
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is authenticated
 */
export function isAuthenticated() {
  if (typeof window !== "undefined") {
    try {
      const userData = localStorage.getItem("user");
      const accessToken = localStorage.getItem("access_token");
      return !!(userData && accessToken);
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false;
    }
  }
  return false;
}

/**
 * Get user data
 * @returns {Object|null} User data object or null if not found
 */
export function getUserData() {
  if (typeof window !== "undefined") {
    try {
      const userDataStr = localStorage.getItem("user");
      return userDataStr ? JSON.parse(userDataStr) : null;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  }
  return null;
}

/**
 * Get access token
 * @returns {string|null} Access token or null if not found
 */
export function getAccessToken() {
  if (typeof window !== "undefined") {
    try {
      return localStorage.getItem("access_token");
    } catch (error) {
      console.error("Error getting access token:", error);
      return null;
    }
  }
  return null;
}

/**
 * Determine user type based on URL
 * @returns {string} 'Host' if URL contains '/pro', otherwise 'User'
 */
export function getRoleFromUrl() {
  if (typeof window !== "undefined") {
    return window.location.pathname.includes("/pro") ? "Host" : "User";
  }
  return "User"; // Default to 'User' if window is undefined (e.g., during SSR)
}

// // Helper function to get user type
// export function getUserType() {
//   if (typeof window !== "undefined") {
//     try {
//       const userDataStr = sessionStorage.getItem("user");
//       if (userDataStr) {
//         const userData = JSON.parse(userDataStr);
//         // Convert to lowercase for consistency with your existing code
//         return userData.user_type.toLowerCase();
//       }
//     } catch (error) {
//       console.error("Error getting user type:", error);
//     }
//   }
//   return ""; // Return empty string if no user type found
// }

// // Helper function to set user type
// export function setUserTypeAndData(sessionData) {
//   if (typeof window !== "undefined" && sessionData?.userData) {
//     try {
//       sessionStorage.setItem("user", JSON.stringify(sessionData.userData));
//       sessionStorage.setItem("access_token", sessionData.accessToken);
//     } catch (error) {
//       console.error("Error setting user data:", error);
//     }
//   }
// }

// // Helper function to clear user data on logout
// export function clearUserData() {
//   if (typeof window !== "undefined") {
//     try {
//       sessionStorage.removeItem("user");
//       sessionStorage.removeItem("access_token");
//     } catch (error) {
//       console.error("Error clearing user data:", error);
//     }
//   }
// }
