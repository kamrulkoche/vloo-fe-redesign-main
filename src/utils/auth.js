// /src/utils/auth.js
import { signIn, getSession } from "next-auth/react";
// import { toast } from "react-toastify";

export const handleSocialLogin = async (provider, router) => {
  //   // Set loading state (you can set a state in your component to handle loading UI)
  //   let setIsLoading;
  //   if (provider === "linkedin") {
  //     setIsLoading = setIsLinkedInLoading; // Your state handler for LinkedIn loading
  //   } else {
  //     setIsLoading = setIsGoogleLoading; // Your state handler for Google loading
  //   }

  //   setIsLoading(true);
  //   // For routing after login

  try {
    // Sign in via the selected provider (opens the popup)
    const result = await signIn(provider, { redirect: false });

    if (result?.error) {
      console.log(
        `${provider.charAt(0).toUpperCase() + provider.slice(1)} login failed`,
      );
      return;
    }

    // Get session info (user data)
    const session = await getSession();

    if (!session?.user?.email) {
      console.log("Email not found");
      return;
    }

    // Check if email exists in your system
    const emailCheckResponse = await fetch(
      `https://vloo.lamptechs.com/api/v1/public/sign-up/searchEmail?email=${session.user.email}`,
    );
    const emailCheckData = await emailCheckResponse.json();

    if (emailCheckData.status) {
      // Email not found (status: true) - New user, redirect to complete profile
      router.push("/complete-profile");
    } else {
      // Email exists (status: false) - Attempt login
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

      if (loginData.status) {
        // Create session-like object for storage
        const sessionDataForStorage = {
          userData: loginData.data,
          accessToken: loginData.access_token,
        };

        setUserTypeAndData(sessionDataForStorage);
        toast.success(loginData?.message || "Login successful!");

        // Trigger any modal toggle if needed
        // toggleModal();

        // After login, redirect to the portal
        router.push("/portal");
      } else {
        console.log(loginData.message || "Login failed");
      }
    }
  } catch (error) {
    console.error("Login error:", error);
    console.log("An unexpected error occurred");
  } finally {
    setIsLoading(false);
  }
};
