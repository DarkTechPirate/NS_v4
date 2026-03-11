import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './FeatureSection.module.css';

const FeatureSection = () => {
    return (
        <div className={styles.section}>
            <div className={styles.container}>
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className={styles.content}
                >
                    <span className={styles.tagline}>THE EDIT</span>
                    <h2 className={styles.heading}>
                        Timeless Elegance in <br />
                        <span className={styles.italic}>Southern France</span>
                    </h2>
                    <p className={styles.description}>
                        Discover the Chateau Saint-Martin, where history meets modern luxury. An exclusive look into one of the world's most coveted wedding destinations, featuring floral designs that defy gravity and culinary experiences that tantalize the senses.
                    </p>
                    <a href="#" className={styles.link}>
                        READ THE STORY <ArrowRight size={16} />
                    </a>
                </motion.div>

                {/* Image Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className={styles.imageWrapper}
                >
                    <div className={styles.imageCard}>
                        <img
                            src="https://images.unsplash.com/photo-1519225468359-2996515c9dc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Elegant Table Setting"
                            className={styles.image}
                        />
                        <div className={styles.imageOverlay}>
                            <span className={styles.overlayTag}>FEATURED VENUE</span>
                            <h3 className={styles.overlayTitle}>Fleur de Luxe</h3>
                            <p className={styles.overlaySubtitle}>Paris, France</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FeatureSection;
