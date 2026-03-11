import React from 'react';
import { motion } from 'framer-motion';
import styles from './ArtisanGrid.module.css';

const ARTISANS = [
    {
        id: 1,
        name: 'Eliana Moore',
        category: 'Photography',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 2,
        name: 'Sweet Artistry',
        category: 'Patisserie',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 3,
        name: 'Lumina Events',
        category: 'Floral & Decor',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
];

const ArtisanGrid = () => {
    return (
        <div className={styles.section}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h2 className={styles.heading}>Curated Artisans</h2>
                    <p className={styles.subheading}>Hand-picked professionals who understand the nuance of luxury.</p>
                </div>
                <button className={styles.viewAllButton}># FULL VENDORS</button>
            </div>

            <div className={styles.grid}>
                {ARTISANS.map((artisan, index) => (
                    <motion.div
                        key={artisan.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        className={styles.card}
                    >
                        <div className={styles.imageWrapper}>
                            <img src={artisan.image} alt={artisan.name} className={styles.image} />
                            <div className={styles.overlay}></div>
                        </div>
                        <div className={styles.details}>
                            <span className={styles.category}>{artisan.category}</span>
                            <h3 className={styles.name}>{artisan.name}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ArtisanGrid;
