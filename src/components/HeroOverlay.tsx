
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
          Conheça o poder de<br />Henrich
        </motion.h1>

        <motion.p className="hero-subtitle" variants={itemVariants}>
          Chora Maggoo. Pode chorar e espernear. Pode fazer mimimi e choramingar. Mas a verdade é uma só: o Henrich é o melhor programador do mundo.
        </motion.p>

        <motion.div className="hero-actions" variants={itemVariants}>
          <button className="btn btn-primary">
            <Rocket size={20} />
            Chorar
          </button>
          <button className="btn btn-secondary">
            <Sparkles size={20} />
            Espernear
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
