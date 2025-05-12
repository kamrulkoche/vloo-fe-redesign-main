"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuthSession = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkSession();
    // Check session every minute
    const interval = setInterval(checkSession, 60000);
    return () => clearInterval(interval);
  }, []);

  const checkSession = () => {
    const sessionData = localStorage.getItem("sessionData");

    if (!sessionData) {
      handleSessionExpired();
      return;
    }

    const { expiryTime, accessToken, user } = JSON.parse(sessionData);

    if (new Date().getTime() > expiryTime) {
      handleSessionExpired();
      return;
    }

    setIsAuthenticated(true);
  };

  const setSession = (accessToken, user) => {
    const expiryTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour from now
    const sessionData = {
      accessToken,
      user,
      expiryTime,
    };

    localStorage.setItem("sessionData", JSON.stringify(sessionData));
    setIsAuthenticated(true);
  };

  const handleSessionExpired = () => {
    localStorage.removeItem("sessionData");
    setIsAuthenticated(false);
    router.push("/");
  };

  const getSessionData = () => {
    const sessionData = localStorage.getItem("sessionData");
    if (!sessionData) return null;

    const parsed = JSON.parse(sessionData);
    if (new Date().getTime() > parsed.expiryTime) {
      handleSessionExpired();
      return null;
    }

    return {
      accessToken: parsed.accessToken,
      user: parsed.user,
    };
  };

  return {
    isAuthenticated,
    setSession,
    getSessionData,
    clearSession: handleSessionExpired,
  };
};
