import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import '../css/Posts.css'
import postsData from '../data/posts.json';
import { useNavigate } from 'react-router-dom';

function Posts() {
    const { t, i18n } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPost, setSelectedPost] = useState(null);

    // Dil kodunun her zaman var olduğundan emin olalım (fallback as 'en')
    const currentLang = i18n.language || 'en';
    const navigate = useNavigate();

    // Filtreleme Algoritması - Güvenli hale getirildi
    const filteredPosts = (postsData || []).filter(post => {
        const search = searchTerm.toLowerCase();

        // post[currentLang] var mı kontrolü ve tüm alt özelliklere güvenli erişim
        const matchesSearch =
            (post?.[currentLang]?.title?.toLowerCase()?.includes(search) || false) ||
            (post?.[currentLang]?.tags?.some(tag => tag?.toLowerCase()?.includes(search)) || false) ||
            (post?.baseCategory?.toLowerCase()?.includes(search) || false);

        const matchesCategory =
            selectedCategory === 'all' || post?.baseCategory === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) setSelectedPost(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Eğer veri henüz gelmediyse veya boşsa kullanıcıya boş ekran yerine bilgi verelim
    if (!postsData || postsData.length === 0) {
        return <div className="posts-page">{t('loading') || 'Loading...'}</div>;
    }

    return (
        <div className="posts-page">
            <header className="posts-header">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {t('discoverTitle2')}
                </motion.h1>

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-group">
                    {['all', 'nutrition', 'exercise'].map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {t(cat)}
                        </button>
                    ))}
                </div>
            </header>

            <motion.div layout className="posts-masonry">
                <AnimatePresence>
                    {filteredPosts.map(post => (
                        <motion.div
                            key={post.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ y: -10 }}
                            className="post-item"
                            onClick={() => setSelectedPost(post)}
                        >
                            <img
                                src={post?.image}
                                alt={post?.[currentLang]?.title || "Post"}
                            />
                            <div className="post-info">
                                {/* currentLang kontrolü JSX içinde de zorunlu */}
                                <h3>{post?.[currentLang]?.title || t('untitled')}</h3>
                                <div className="post-tags">
                                    {post?.[currentLang]?.tags?.map(tag => (
                                        <span key={tag}>#{tag}</span>
                                    )) || null}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {selectedPost && (
                    <motion.div
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedPost(null)}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="close-btn" onClick={() => setSelectedPost(null)}>&times;</button>
                            <img src={selectedPost?.image} alt="Detail" />

                            <div className="modal-text-content">
                                <h2>{selectedPost?.[currentLang]?.title}</h2>
                                <p className="modal-subtitle">{selectedPost?.[currentLang]?.subtitle}</p>

                                <div className="modal-tags">
                                    {selectedPost?.[currentLang]?.tags?.map(tag => (
                                        <span key={tag} className="tag-pill">#{tag}</span>
                                    ))}
                                </div>

                                <p className="modal-overview-summary">
                                    {selectedPost?.[currentLang]?.overview}
                                </p>
                            </div>

                            <button
                                className="modal-detail-btn"
                                onClick={() => {
                                    const id = selectedPost.id;
                                    setSelectedPost(null);
                                    navigate(`/posts/${id}`);
                                }}
                            >
                                {t('viewMoreDetails')}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Posts