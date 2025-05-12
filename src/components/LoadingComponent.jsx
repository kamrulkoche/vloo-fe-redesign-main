"use client";

const LoadingComponent = () => {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden">
      <img
        src="/assets/loading-animation.svg"
        alt="Loading animation"
        className="h-w-20 w-20"
      />
    </div>
  );
};

export default LoadingComponent;
