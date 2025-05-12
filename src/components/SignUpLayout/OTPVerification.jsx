import { useRef, useState } from "react";

const OTPVerification = ({
  email,
  onSubmit,
  resendCode,
  isVerifying = false,
  isResending = false,
}) => {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [verificationError, setVerificationError] = useState("");
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleVerificationCodeChange = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    setVerificationError("");

    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleVerificationSubmit = () => {
    const code = verificationCode.join("");
    if (code.length === 6) {
      onSubmit(code);
    } else {
      setVerificationError(
        "Please enter the complete 6-digit verification code.",
      );
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6); // Limit to 6 characters
    if (/^\d{6}$/.test(pasteData)) {
      const newCode = pasteData.split("");
      setVerificationCode(newCode);
      setVerificationError("");

      // Focus the last field
      inputRefs[newCode.length - 1]?.current.focus();
    }
  };

  return (
    <div>
      <h2 className="mb-12 text-center text-[18px] font-[500] leading-[24px] text-[#0A2A3C]">
        Please enter the OTP sent to your email
      </h2>
      <div className="mb-12">
        <div className="flex justify-center space-x-2" onPaste={handlePaste}>
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) =>
                handleVerificationCodeChange(
                  index,
                  e.target.value.replace(/\D/g, ""),
                )
              }
              className="h-[40px] w-[40px] rounded-[10px] border border-[#868686] bg-[#F3F3F3] text-center text-[36px] text-[#006988] sm:h-[80px] sm:w-[80px]"
              inputMode="numeric"
              disabled={isVerifying}
            />
          ))}
        </div>
        {verificationError && (
          <p className="mt-2 text-center text-xs text-red-500">
            {verificationError}
          </p>
        )}
      </div>
      <div className="flex flex-row items-center justify-around">
        <button
          onClick={handleVerificationSubmit}
          disabled={
            verificationCode.some((digit) => digit === "") || isVerifying
          }
          className={`h-[50px] w-[160px] rounded-[5px] px-4 py-2 text-[12px] font-[500] leading-[17px] text-white ${
            verificationCode.some((digit) => digit === "") || isVerifying
              ? "cursor-not-allowed bg-gray-300"
              : "bg-[#006988] hover:bg-[#004960]"
          }`}
        >
          {isVerifying ? "Verifying..." : "Verify Account"}
        </button>
        <button
          onClick={resendCode}
          disabled={isResending}
          className="text-[14px] font-[700] leading-[20px] text-[#3A52E7] underline disabled:opacity-50"
        >
          {isResending ? "Resending..." : "Resend Code"}
        </button>
      </div>
      <div className="flex justify-center">
        <p className="mt-2 text-[12px] text-gray-500">
          A 6-digit code has been sent to {email}
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;
