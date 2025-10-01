'use client';

interface LoadingIndicatorProps {
  dots: boolean;
}

const LoadingIndicator = ( { dots }: LoadingIndicatorProps ) => {
  return (
    <div className="mt-8 text-center">
      <div className="text-2xl mb-4">
        Loading{dots}
      </div>
      <div className="flex justify-center items-center gap-1">
        <div className="w-2 h-2 bg-green-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-green-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-green-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );

};

export default LoadingIndicator;
