import React, { useState } from 'react';

const RecommendationButton = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClick = () => {
    setIsProcessing(true);
    
    // Here you would typically call your recommendation system API
    console.log('Recommendation system activated!');
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Hide success checkmark after 1 second
      setTimeout(() => {
        setShowSuccess(false);
      }, 1000);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center  bg-gradient-to-br from-black to-black font-sans">
      <button
        onClick={handleClick}
        disabled={isProcessing}
        className={`
          relative
          px-11 py-4
          bg-gradient-to-r from-yellow-50 to-stone-800
          text-white
          border-none
          rounded-full
          text-lg font-semibold
          cursor-pointer
          shadow-lg
          overflow-hidden
          transition-all duration-300 ease-in-out
          flex items-center justify-center gap-2
          hover:-translate-y-1 hover:shadow-xl
          active:translate-y-0
          ${isProcessing ? 'scale-95 opacity-90' : ''}
          group
        `}
      >
        {/* Pulse effect */}
        {!isProcessing && !showSuccess && (
          <div className="absolute inset-0 bg-inherit rounded-full opacity-80 -z-10 animate-pulse-scale" />
        )}
        
        {/* Success checkmark */}
        {showSuccess && (
          <svg
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 text-green-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        )}
        
        {/* Default state */}
        {!isProcessing && !showSuccess && (
          <>
            <svg
              className="w-5 h-5 transition-all duration-300 ease-in-out group-hover:rotate-12"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>Recommendation System</span>
            
            {/* Tooltip */}
            <span className="
              absolute -top-10
              bg-black/80 text-white
              px-2 py-1
              rounded
              text-sm
              opacity-0
              transition-all duration-300 ease-in-out
              pointer-events-none
              whitespace-nowrap
              group-hover:opacity-100 group-hover:-top-12
            ">
              Get personalized recommendations
            </span>
          </>
        )}
        
        {/* Loading state */}
        {isProcessing && (
          <>
            <svg
              className="w-5 h-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Processing...</span>
          </>
        )}
        
        {/* Shine effect on hover */}
        <div className="
          absolute inset-0
          bg-gradient-to-r
          from-transparent via-white/20 to-transparent
          -translate-x-full
          group-hover:translate-x-full
          transition-transform duration-500 ease-in-out
        " />
      </button>
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes pulse-scale {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
        .animate-pulse-scale {
          animation: pulse-scale 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default RecommendationButton;