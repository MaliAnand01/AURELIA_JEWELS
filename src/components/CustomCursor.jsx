import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [cursorType, setCursorType] = useState('default');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target;
      const isInput = target.closest('input, textarea, select');
      
      if (isInput) {
        setCursorType('default');
      } else if (target.closest('.group')) {
        setCursorType('lens');
      } else if (target.closest('button, a')) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: '#c9a36b',
      mixBlendMode: 'difference'
    },
    pointer: {
      width: 40,
      height: 40,
      backgroundColor: 'transparent',
      border: '1px solid #c9a36b',
      mixBlendMode: 'normal'
    },
    lens: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(201, 163, 107, 0.1)',
      border: '1px solid #c9a36b',
      mixBlendMode: 'normal'
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center overflow-hidden"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={variants[cursorType]}
      transition={{ layout: { duration: 0.3 } }}
    >
      {cursorType === 'lens' && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] text-[#c9a36b] font-bold tracking-widest uppercase"
        >
          View
        </motion.span>
      )}
    </motion.div>
  );
};

export default CustomCursor;
