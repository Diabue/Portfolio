import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CursorGlow = () => {
    const [isVisible, setIsVisible] = useState(false);
    
    // Position of the mouse
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth damping effect
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 100); // 100 is half the width of the glow
            mouseY.set(e.clientY - 100);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseenter', handleMouseEnter);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [mouseX, mouseY, isVisible]);

    // Only show on devices with a mouse/hover capability
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
        return null;
    }

    return (
        <motion.div
            className="fixed top-0 left-0 w-[200px] h-[200px] rounded-full pointer-events-none z-[99999] opacity-0 mix-blend-screen"
            style={{
                x: springX,
                y: springY,
                background: 'radial-gradient(circle, rgba(195,155,87,0.15) 0%, rgba(195,155,87,0) 70%)',
                opacity: isVisible ? 1 : 0,
            }}
            transition={{ opacity: { duration: 0.5 } }}
        />
    );
};

export default CursorGlow;
