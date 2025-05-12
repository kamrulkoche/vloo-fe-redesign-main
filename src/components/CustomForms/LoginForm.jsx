"use client";

import { useModalStore } from "@/store/zStore";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
// import { setUserTypeAndData } from "../HelperFunctions/GetUserTypeFunction";
import { DialogTitle } from "../ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
// import { handleSocialLogin } from "@/utils/auth";
// import { signIn, getSession } from "next-auth/react";

// Loading component
const LoadingSpinner = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="flex flex-col items-center rounded-lg bg-white p-6">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#006988] border-t-transparent"></div>
      <p className="mt-4 text-[#0A2A3C]">Loading...</p>
    </div>
  </div>
);

const LoginForm = ({ currentRoute }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isLinkedInLoading, setIsLinkedInLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { toggleModal } = useModalStore();
  const router = useRouter();
  const { setUserTypeAndData } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isFormValid = email !== "" && password !== "" && validateEmail(email);

  const handleRedirect = async (userData) => {
    setIsRedirecting(true);
    const userType = userData?.user_type?.toLowerCase();
    const path =
      userType === "user"
        ? "/portal"
        : userType === "host"
          ? "/pro/portal"
          : null;

    if (path) {
      // Pre-fetch the next route before redirecting
      await router.prefetch(currentRoute ? currentRoute : path);

      if (currentRoute) {
        router.refresh(currentRoute);
      } else {
        router.push(path);
      }
    }
  };

  const handleLinkedInLogin = async () => {
    setIsLinkedInLoading(true);
    try {
      const result = await signIn("linkedin", { redirect: false });

      if (result?.error) {
        toast.error("LinkedIn login failed");
        return;
      }

      const session = await getSession();

      if (!session?.user?.email) return;

      // Check if email exists
      const emailCheckResponse = await fetch(
        `https://vloo.lamptechs.com/api/v1/public/sign-up/searchEmail?email=${session.user.email}`,
      );
      const emailCheckData = await emailCheckResponse.json();

      if (emailCheckData.status) {
        // Email not found (status: true) - new user, redirect to complete profile
        router.push("/complete-profile");
      } else {
        // Email exists (status: false) - attempt login
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
          // Create session-like object matching the structure expected by setUserTypeAndData
          const sessionDataForStorage = {
            userData: loginData.data,
            accessToken: loginData.access_token,
          };

          setUserTypeAndData(sessionDataForStorage);
          toast.success(loginData?.message || "Login successful!");
          toggleModal();
          await handleRedirect(loginData.data);
        } else {
          toast.error(loginData.message || "Login failed");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLinkedInLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    let setIsLoading;
    if (provider === "linkedin") {
      setIsLoading = setIsLinkedInLoading;
    } else {
      setIsLoading = setIsGoogleLoading;
    }

    setIsLoading(true);

    try {
      // Sign in with the provider
      const result = await signIn(provider, {
        callbackUrl: "/login-processing",
      });

      if (result?.error) {
        toast.error(
          `${provider.charAt(0).toUpperCase() + provider.slice(1)} login failed`,
        );
        return;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormLoading(true);

    try {
      const response = await fetch(
        "https://vloo.lamptechs.com/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!data.status) {
        toast.error(data.message);
        return;
      }

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error("Login failed");
        return;
      }

      // Get session data
      const session = await getSession();

      // Store user data in sessionStorage
      if (session) {
        setUserTypeAndData(session);
        toast.success("Login successful!");

        // Close login modal
        toggleModal();
        await handleRedirect(session.userData);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <>
      {(isRedirecting || isFormLoading || isLinkedInLoading) && (
        <LoadingSpinner />
      )}

      <div className="flex flex-col justify-center sm:ml-12 sm:flex-col">
        <img
          src="/assets/VLOO-logo.png"
          alt="vloo logo"
          className="ml-[80px] h-[20px] w-[112px] sm:mb-4"
        />
        <DialogTitle className="ml-[120px] text-[16px] font-[600] leading-[22.4px] text-[#0A2A3C] sm:mb-2">
          Login
        </DialogTitle>
      </div>

      <hr className="mx-[-25px] flex-grow border-[#DEDEDE]" />

      <div className="mt-[20px] flex justify-center gap-x-6 sm:justify-between sm:gap-x-0">
        <button
          className="flex h-[50px] w-[50px] items-center justify-center rounded-[8px] border border-[#447483] sm:w-[190px]"
          onClick={() => handleSocialLogin("google")}
          disabled={isGoogleLoading}
        >
          <img
            src="/assets/icons/google.png"
            alt="google icon"
            className="mr-2 h-[20px] w-[20px]"
          />
          <p className="hidden text-[12px] font-[500] leading-[17px] text-[#0A2A3C] sm:block">
            {isGoogleLoading ? "Signing In..." : "Sign In With Google"}
          </p>
        </button>

        <button
          onClick={() => handleSocialLogin("linkedin")}
          disabled={isLinkedInLoading}
          className="flex h-[50px] w-[50px] items-center justify-center rounded-[8px] border border-[#447483] bg-[#447483] sm:w-[190px]"
        >
          <img
            src="/assets/icons/linkedin.png"
            alt="linkedin icon"
            className="mr-2 h-[20px] w-[20px]"
          />
          <p className="hidden text-[12px] font-[500] leading-[17px] text-white sm:block">
            {isLinkedInLoading ? "Signing In..." : "Sign In With LinkedIn"}
          </p>
        </button>
      </div>

      <div className="mb-[10px] mt-[10px] flex items-center sm:mb-[20px]">
        <hr className="hidden flex-grow border-[#DEDEDE] sm:block" />
        <span className="mx-2 ml-24 text-[14px] font-[500] leading-[20px] text-[#13293A99] sm:ml-0">
          or login using
        </span>
        <hr className="hidden flex-grow border-[#DEDEDE] sm:block" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-[10px] sm:mb-2">
          <label className="mb-[5px] block text-[14px] font-[500] leading-[20px] text-[#868686] sm:mb-[10px]">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="eg: yourname@gmail.com"
            className="border-black-100 mb-[5px] h-[44px] w-full rounded-[10px] border-[1px] p-2 px-4 placeholder:text-[13px] placeholder:font-[500] placeholder:leading-[18px] sm:mb-[20px]"
          />
        </div>

        <div className="relative mb-0">
          <label className="mb-[5px] block text-[14px] font-[500] leading-[20px] text-[#868686] sm:mb-[10px]">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password"
            className="border-black-100 mb-[15px] h-[44px] w-full rounded-[10px] border-[1px] p-2 px-4 placeholder:text-[13px] placeholder:font-[500] placeholder:leading-[18px]"
          />
          <button
            type="button"
            className="absolute right-3 top-[55%] -translate-y-1/2 transform"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <img
                src="/assets/icons/Icon-Password-Hide.png"
                alt="Icon-Password-Hide"
              />
            ) : (
              <img
                src="/assets/icons/Icon-Password-Hide.png"
                alt="Icon-Password-Open"
              />
            )}
          </button>
        </div>
        <div className="group relative mb-4 mt-2">
          <button
            className={`h-[50px] w-full rounded-[5px] text-[12px] font-[500] leading-[17px] text-white sm:w-[390px] ${
              isFormValid
                ? "bg-[#006988] hover:bg-[#0C4C60]"
                : "cursor-not-allowed bg-gray-400"
            }`}
            disabled={!isFormValid || isFormLoading}
            type="submit"
          >
            {isFormLoading ? "Logging in..." : "Login"}
          </button>
        </div>
        <p className="mt-[30px] cursor-pointer text-center text-[13px] font-[400] leading-[15.6px] text-[#007AFF] underline">
          Forget Password?
        </p>
      </form>
    </>
  );
};

export default LoginForm;
