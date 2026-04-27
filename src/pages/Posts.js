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

    const navigate = useNavigate();

    // 1. Dil kodunu normalize et (tr-TR -> tr)
    const currentLang = i18n.language?.split('-')[0] || 'tr';

    // 2. İçerik Getirici (Helper) - Bunu filtreleme içinde de kullanacağız
    const getPostContent = (post) => {
        if (!post) return null;
        return post[currentLang] || post['tr'] || post['en'] || Object.values(post).find(v => v?.title);
    };

    // 3. Filtreleme Algoritması
    const filteredPosts = (postsData || []).filter(post => {
        const search = searchTerm.toLowerCase();
        const content = getPostContent(post); // İşte kilit nokta burası!

        // Artık post[currentLang] yerine doğrudan güvenli 'content' üzerinden arıyoruz
        const matchesSearch =
            (content?.title?.toLowerCase()?.includes(search) || false) ||
            (content?.tags?.some(tag => tag?.toLowerCase()?.includes(search)) || false) ||
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

    // Erken Dönüş (Loading)
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
                    {filteredPosts.map(post => {
                        // Her post için içeriği bir kez burada çekelim, kod temiz kalsın
                        const content = getPostContent(post);

                        return (
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
                                    alt={content?.title || "Fisoyl"}
                                />
                                <div className="post-info">
                                    <h3>{content?.title || t('untitled')}</h3>
                                    <div className="post-tags">
                                        {content?.tags?.map(tag => (
                                            <span key={tag}>#{tag}</span>
                                        )) || null}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
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

                            {/* Modal içindeki içerikleri de getPostContent ile güvenli hale getirdik */}
                            <div className="modal-text-content">
                                <h2>{getPostContent(selectedPost)?.title}</h2>
                                <p className="modal-subtitle">{getPostContent(selectedPost)?.subtitle}</p>

                                <div className="modal-tags">
                                    {getPostContent(selectedPost)?.tags?.map(tag => (
                                        <span key={tag} className="tag-pill">#{tag}</span>
                                    ))}
                                </div>

                                <p className="modal-overview-summary">
                                    {getPostContent(selectedPost)?.overview}
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
    );
}

export default Posts