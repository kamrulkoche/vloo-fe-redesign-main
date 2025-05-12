import { signOut } from "next-auth/react";
import { clearUserData, getUserType } from "./GetUserTypeFunction";

const handleLogout = async () => {
  const userType = getUserType();

  try {
    // Clear session storage before signing out
    clearUserData();

    await signOut({
      redirect: true,
      callbackUrl: userType === "user" ? "/" : "/pro",
    });
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export default handleLogout;
