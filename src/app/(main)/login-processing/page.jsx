"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import LoadingComponent from "@/components/LoadingComponent";

const LoginProcessing = () => {
  const router = useRouter();
  const { setUserTypeAndData, handleLogoutServer } = useAuth();
  

  useEffect(() => {
    let isMounted = true;

    const handleSession = async () => {
      try {
        // Get the session after login
        const session = await getSession();
        // console.log({ session });

        if (!isMounted) return;

        if (!session?.user?.email) {
          toast.error("Session not found");
          router.push("/"); // Redirect to login if session not found
          return;
        }

        // Check if the user is new or existing
        const emailCheckResponse = await fetch(
          `https://vloo.lamptechs.com/api/v1/public/sign-up/searchEmail?email=${session.user.email}`,
        );
        const emailCheckData = await emailCheckResponse.json();
        // console.log({ emailCheckData });

        if (!isMounted) return;

        if (emailCheckData.status) {
          // New user - redirect to complete profile
          router.push("/complete-profile");
          return;
        }

        // Existing user - login via backend
        const loginResponse = await fetch(
          "https://vloo.lamptechs.com/api/v1/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: session.user.email,
              provider_id: session.user.provider_id,
            }),
          },
        );

        const loginData = await loginResponse.json();

        if (!isMounted) return;

        if (loginData.status) {
          // Update the session on the client side
          setUserTypeAndData({
            userData: loginData.data,
            accessToken: loginData.access_token,
          });

          const userType = loginData.data?.user_type?.toLowerCase();
          const path =
            userType === "user"
              ? "/portal"
              : userType === "host"
                ? "/pro/portal"
                : "/";

          // Redirect to the correct portal
          router.push(path);
        } else {
          // setTimeout(() => console.log("calling"), 2000);

          if (!isMounted) return;
          toast.error(loginData.message || "Login failed");
          handleLogoutServer();
          window.location.href = "/";
          // router.push("/"); // Redirect to login if the backend login fails
        }
      } catch (error) {
        if (!isMounted) return;
        console.error("Error during login processing:", error);
        toast.error("An error occurred during login processing.");
        handleLogoutServer();
        window.location.href = "/";

        // router.push("/"); // Redirect to login if an error occurs
      }
    };

    handleSession();

    // Cleanup function to prevent actions if the component unmounts
    return () => {
      isMounted = false;
    };
  }, [router, setUserTypeAndData]); // Add dependencies here

  return <LoadingComponent />;
};

export default LoginProcessing;
