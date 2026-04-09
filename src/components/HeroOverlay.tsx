import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles } from 'lucide-react';

export default function HeroOverlay() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  return (
    <div className="hero-overlay">
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="hero-title" variants={itemVariants}>
          Unleash the Power of<br />Antigravity
        </motion.h1>
        
        <motion.p className="hero-subtitle" variants={itemVariants}>
          Elevate your development workflow with intelligent agents. Break the limits of gravity and build complex systems faster than the speed of thought.
        </motion.p>
        
        <motion.div className="hero-actions" variants={itemVariants}>
          <button className="btn btn-primary">
            <Rocket size={20} />
            Get Started
          </button>
          <button className="btn btn-secondary">
            <Sparkles size={20} />
            View Demos
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
