import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductSkeleton = ({ cards = 4 }) => {
  return (
    <SkeletonTheme baseColor="#1a1a1a" highlightColor="#2a2a2a">
      {Array(cards).fill(0).map((_, i) => (
        <div key={i} className="border border-white/5 bg-white/5 rounded-sm p-4">
          {/* Image Aspect Box */}
          <div className="aspect-[3/4] mb-4">
            <Skeleton height="100%" borderRadius="2px" />
          </div>
          
          {/* Title */}
          <div className="mt-4">
            <Skeleton width="80%" height={24} />
          </div>
          
          {/* Price */}
          <div className="mt-2">
            <Skeleton width="40%" height={16} />
          </div>
          
          {/* Button */}
          <div className="mt-6">
            <Skeleton height={40} borderRadius="2px" />
          </div>
        </div>
      ))}
    </SkeletonTheme>
  );
};

export default ProductSkeleton;
