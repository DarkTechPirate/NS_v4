import React from 'react';

const IMAGES = [
    { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&w=800&q=80', span: 'col-span-1 md:col-span-2 row-span-2' },
    { src: 'https://images.unsplash.com/photo-1533158388470-9a216a5dbe80?ixlib=rb-4.0.3&w=800&q=80', span: 'col-span-1' },
    { src: 'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?ixlib=rb-4.0.3&w=800&q=80', span: 'col-span-1' },
    { src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&w=800&q=80', span: 'col-span-1 md:col-span-2' },
    { src: 'https://images.unsplash.com/photo-1519225468359-2996515c9dc4?ixlib=rb-4.0.3&w=800&q=80', span: 'col-span-1' },
];

const ProfilePortfolio = () => {
    return (
        <section className="py-24 bg-lux-rough/5">
            <div className="max-w-7xl mx-auto px-6">
                <h3 className="text-3xl font-serif text-white mb-12">Selected Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {IMAGES.map((img, i) => (
                        <div key={i} className={`relative group overflow-hidden rounded-sm cursor-pointer ${img.span}`}>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                            <img
                                src={img.src}
                                alt={`Portfolio ${i}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProfilePortfolio;
