"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { signOut } from "next-auth/react";

// Create the context
const AuthContext = createContext(null);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userType, setUserType] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize state from localStorage with retry mechanism
  useEffect(() => {
    if (typeof window !== "undefined" && !isInitialized) {
      let retryCount = 0;
      const maxRetries = 4;
      let retryInterval = null;

      const attemptDataRetrieval = () => {
        try {
          // Get user data directly
          const userDataStr = localStorage.getItem("userData");
          const token = localStorage.getItem("access_token");

          // If we have both userData and token, or we've reached max retries
          if ((userDataStr && token) || retryCount >= maxRetries) {
            if (userDataStr) {
              const parsedUserData = JSON.parse(userDataStr);
              setUserData(parsedUserData);
              if (parsedUserData?.user_type) {
                setUserType(parsedUserData.user_type.toLowerCase());
              }
            }

            if (token) {
              setAccessToken(token);
            }

            // Clear interval and mark as initialized
            if (retryInterval) clearInterval(retryInterval);
            setIsLoaded(true);
            setIsInitialized(true);
            console.log(`Auth data loaded after ${retryCount} retries`);
          } else {
            // Increment retry count
            retryCount++;
            console.log(
              `Retry ${retryCount}/${maxRetries} to get auth data...`,
            );
          }
        } catch (error) {
          console.error(
            `Error initializing auth data (retry ${retryCount}/${maxRetries}):`,
            error,
          );

          // If we've reached max retries, stop trying
          if (retryCount >= maxRetries) {
            if (retryInterval) clearInterval(retryInterval);
            setIsLoaded(true);
            setIsInitialized(true);
          }
        }
      };

      // Try immediately first
      attemptDataRetrieval();

      // Then set up interval for retries (every 500ms)
      if (!userData || !accessToken) {
        retryInterval = setInterval(attemptDataRetrieval, 500);
      }

      // Clean up interval on unmount
      return () => {
        if (retryInterval) clearInterval(retryInterval);
      };
    }
  }, [isInitialized, userData, accessToken]);

  /**
   * Set user data and access token
   * @param {Object} sessionData - Object containing userData and accessToken
   */
  const setUserTypeAndData = async (sessionData) => {
    if (typeof window !== "undefined" && sessionData?.userData) {
      try {
        // Update state
        setUserData(sessionData.userData);
        setAccessToken(sessionData.accessToken);
        if (sessionData.userData?.user_type) {
          setUserType(sessionData.userData.user_type.toLowerCase());
        }

        // Store in localStorage - use consistent key names
        localStorage.setItem("userData", JSON.stringify(sessionData.userData));
        localStorage.setItem("access_token", sessionData.accessToken);

        // Also store in sessionStorage for redundancy
        sessionStorage.setItem(
          "userData",
          JSON.stringify(sessionData.userData),
        );
        sessionStorage.setItem("access_token", sessionData.accessToken);
        return true;

        // Update NextAuth session and WAIT for it to complete
        // try {
        //   const response = await fetch("/api/user/session", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //       userType: sessionData.userData.user_type,
        //       accessToken: sessionData.accessToken,
        //       userData: sessionData.userData,
        //     }),
        //   });

        //   if (!response.ok) {
        //     throw new Error(`Failed to update session: ${response.status}`);
        //   }

        //   console.log("NextAuth session updated successfully");
        //   return true; // Indicate success
        // } catch (err) {
        //   console.error("Failed to update session:", err);
        //   return false; // Indicate failure
        // }
      } catch (error) {
        console.error("Error setting user data:", error);
        return false;
      }
    }
    return false;
  };

  /**
   * Clear all user data
   */
  const clearUserData = () => {
    if (typeof window !== "undefined") {
      try {
        // Clear state
        setUserData(null);
        setAccessToken(null);
        setUserType("");

        // Clear localStorage
        localStorage.removeItem("userData");
        localStorage.removeItem("access_token");

        // Clear sessionStorage
        sessionStorage.removeItem("userData");
        sessionStorage.removeItem("access_token");
      } catch (error) {
        console.error("Error clearing user data:", error);
      }
    }
  };

  /**
   * Determine user type based on URL
   * @returns {string} 'Host' if URL contains '/pro', otherwise 'User'
   */
  const getRoleFromUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.pathname.includes("/pro") ? "Host" : "User";
    }
    return "User"; // Default to 'User' during SSR
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = !!userData && !!accessToken;

  const handleLogout = async () => {
    try {
      // Clear session storage before signing out
      clearUserData();
      await signOut({
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleLogoutServer = async () => {
    try {
      // Clear session storage before signing out
      clearUserData();
      await fetch("/api/user/logout");
      await signOut({
        redirect: false,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Create the context value object
  const value = {
    userData,
    accessToken,
    userType,
    isLoaded,
    isAuthenticated,
    setUserTypeAndData,
    clearUserData,
    getRoleFromUrl,
    handleLogout,
    handleLogoutServer,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
