"use client";
import React, { useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ForgetPasswordModal = ({ isOpen, onClose }) => {
  const [stage, setStage] = useState("email"); 
  const [email, setEmail] = useState("");  
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = () => {
    if (validateEmail(email)) {
      setStage("verification");
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email address.");
    }
  };

const handleVerificationCodeChange = (index, value) => {
  const newCode = [...verificationCode];
  newCode[index] = value;
  setVerificationCode(newCode);
  setVerificationError("");

  if (value && index < 3) {
    inputRefs[index + 1].current.focus();
  }
};

const handleVerificationSubmit = () => {
  const code = verificationCode.join("");
  if (code.length === 4) {
    setStage("reset");
    setVerificationError("");
  } else {
    setVerificationError(
      "Please enter the complete 4-digit verification code.",
    );
  }
};

  const handlePasswordReset = () => {
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setStage("email");
    onClose();
  };

  const renderEmailStage = () => (
    <>
      <h2 className="sm:mb-[40px] text-center text-[18px] font-[500] leading-[24px] text-[#0A2A3C]">
        Enter your account email to send code
      </h2>
      <div className="mb-[10px] sm:mb-[45px]">
        <label className="mb-[5px] block text-[14px] font-[400] leading-[20px] text-[#868686] sm:mb-[15px]">
          Email
        </label>
        <input
          type="email"
          placeholder="eg: yourname@email.com"
          className="mb-[5px] h-[44px] w-full rounded-[10px] border-[1px] border-[#868686] p-2 px-4 placeholder:text-[11px] placeholder:font-[400] placeholder:leading-[13.2px] sm:mb-[20px]"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
        />
        {emailError && <p className="text-xs text-red-500">{emailError}</p>}
      </div>

      <div className="flex justify-center space-x-[40px]">
        <button
          className="h-[50px] w-[70px] sm:w-[135px] rounded-[5px] border-[1px] border-[#8A8A8A] bg-blue-50 px-[10px] py-[10px] text-[12px] font-[500] leading-[17px]"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          onClick={handleEmailSubmit}
          disabled={!email}
          className={`h-[50px] w-[70px] sm:w-[135px] rounded-[5px] sm:px-[10px] py-[10px] text-[12px] font-[500] leading-[17px] text-white sm:py-[16px] ${email ? "bg-[#006988]" : "cursor-not-allowed bg-gray-300"}`}
        >
          Send Code
        </button>
      </div>
    </>
  );

const renderVerificationStage = () => (
  <>
    <h2 className="sm:mb-[30px] text-center text-[18px] font-[500] leading-[24px] text-[#0A2A3C]">
      Please enter the OTP sent to your Email
    </h2>
    <div className="mb-[10px] sm:mb-[45px]">
      <div className="flex justify-center space-x-2">
        {verificationCode.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) =>
              handleVerificationCodeChange(
                index,
                e.target.value.replace(/\D/g, ""),
              )
            }
            className="h-[30px] w-[30px] sm:h-[80px] sm:w-[80px] rounded-[16px] border border-[#868686] text-center text-[18px] text-[#006988]"
            pattern="\d*"
            inputMode="numeric"
          />
        ))}
      </div>
      {verificationError && (
        <p className="mt-2 text-center text-xs text-red-500">
          {verificationError}
        </p>
      )}
      {/* <p className="mt-2 text-center text-xs text-gray-500">
        A 4-digit code has been sent to {email}
      </p> */}
    </div>

    <div className="flex justify-around space-x-[40px]">
      <button
        onClick={handleVerificationSubmit}
        disabled={verificationCode.some((digit) => digit === "")}
        className={`h-[50px] w-[135px] rounded-[5px] px-[10px] py-[10px] text-[12px] font-[500] leading-[17px] text-white sm:py-[16px] ${!verificationCode.some((digit) => digit === "") ? "bg-[#006988]" : "cursor-not-allowed bg-gray-300"}`}
      >
        Verify Account
      </button>
      <p className="mt-[10px] cursor-pointer text-center text-[14px] font-[700] leading-[20px] text-[#3A52E7] underline">
        Resend code
      </p>
    </div>
  </>
);

  const renderResetPasswordStage = () => (
    <>
      <h2 className="sm:mb-[40px] text-center text-[16px] font-[300] leading-[22.4px] text-[#0A2A3C]">
        Reset Password
      </h2>
      <div className="space-y-4">
        <div className="relative">
          <label className="mb-[12px] block text-[14px] font-[500] leading-[20px] text-[#868686]">
            Password
          </label>
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            className="border-black-200 mb-[5px] h-[44px] rounded-[10px] border-[1px] p-2 px-4 placeholder:text-[11px] placeholder:font-[400] placeholder:leading-[13.2px] w-full"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setPasswordError("");
            }}
          />
          <button
            type="button"
            className="absolute right-[10px] top-[65%] -translate-y-1/2 transform sm:right-3"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            <img
              src="/assets/icons/Icon-Password-Hide.png"
              alt={showNewPassword ? "Hide Password" : "Show Password"}
            />
          </button>
        </div>

        <div className="relative">
          <label className="mb-[12px] block text-[14px] font-[500] leading-[20px] text-[#868686]">
            Password Confirmation
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            className="border-black-200 mb-[5px] h-[44px] rounded-[10px] border-[1px] p-2 px-4 placeholder:text-[11px] placeholder:font-[400] placeholder:leading-[13.2px] w-full"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordError("");
            }}
          />
          <button
            type="button"
            className="absolute right-[10px] top-[65%] -translate-y-1/2 transform sm:right-3"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <img
              src="/assets/icons/Icon-Password-Hide.png"
              alt={showConfirmPassword ? "Hide Password" : "Show Password"}
            />
          </button>
        </div>

        {passwordError && (
          <p className="text-xs text-red-500">{passwordError}</p>
        )}
      </div>

      <div className="mt-6 flex justify-center space-x-[40px]">
        {/* <button
          className="rounded-[10px] border-[1px] border-[#8A8A8A] bg-blue-50 px-[10px] py-[10px] text-[24px] font-[400] leading-[28.8px] sm:px-[40px] sm:py-[20px]"
          onClick={() => setStage("verification")}
        >
          Back
        </button> */}
        <button
          onClick={handlePasswordReset}
          disabled={!newPassword || !confirmPassword}
          className={`h-[50px] w-full sm:w-[390px] rounded-[5px] px-[10px] text-[12px] font-[500] leading-[17px] text-white sm:px-[40px] ${newPassword && confirmPassword ? "bg-[#006988]" : "cursor-not-allowed bg-gray-300"}`}
        >
          Submit
        </button>
      </div>
    </>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto max-w-[440px] p-6">
        {stage === "email" && renderEmailStage()}
        {stage === "verification" && renderVerificationStage()}
        {stage === "reset" && renderResetPasswordStage()}
      </DialogContent>
    </Dialog>
  );
};

export default ForgetPasswordModal;
