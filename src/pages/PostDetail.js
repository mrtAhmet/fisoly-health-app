import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import postsData from '../data/posts.json';
import '../css/PostDetail.css';

function PostDetail() {
    const { id } = useParams();
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const currentLang = i18n.language;

    const post = postsData.find(p => p.id === parseInt(id));

    if (!post) return <div className="not-found">Post not found!</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="post-detail-wrapper"
        >
            <div className="bg-blur" style={{ backgroundImage: `url(${post.image})` }}></div>

            <div className="detail-container">
                <header className="detail-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <span className="icon">←</span> {t('back')}
                    </button>
                    <div className="category-tag">{t(post.baseCategory)}</div>
                </header>

                <main className="detail-main">
                    <section className="image-section">
                        <motion.img
                            layoutId={`post-img-${post.id}`}
                            src={post.image}
                            alt={post[currentLang]?.title}
                        />

                        {/* Ortak Highlights Alanı */}
                        {post.highlights && (
                            <div className="highlights-grid">
                                <div className="h-item">
                                    <span>{t(post.highlights.label1?.toLowerCase())} : </span>
                                    {/* Değeri de t() içine alıyoruz, toLowerCase() ile eşleşmeyi garantiliyoruz */}
                                    <strong>{t(post.highlights.value1?.toLowerCase())}</strong>
                                </div>
                                <div className="h-item">
                                    <span>{t(post.highlights.label2?.toLowerCase())} : </span>
                                    <strong>{t(post.highlights.value2?.toLowerCase())}</strong>
                                </div>
                                <div className="h-item">
                                    <span>{t(post.highlights.label3?.toLowerCase())} : </span>
                                    {/* Eğer değer "1 min" gibi bir şeyse ve çevirisi yoksa ham halini basar */}
                                    <strong>{t(post.highlights.value3?.toLowerCase())}</strong>
                                </div>
                                <div className="h-item">
                                    <span>{t(post.highlights.label4?.toLowerCase())} : </span>
                                    <strong>{t(post.highlights.value4?.toLowerCase())}</strong>
                                </div>
                            </div>
                        )}
                    </section>

                    <section className="content-section">
                        <h1>{post[currentLang]?.title}</h1>
                        <p className="subtitle">{post[currentLang]?.subtitle}</p>

                        <div className="info-box">
                            <h3>🌟 {t('overview')}</h3>
                            <p>{post[currentLang]?.overview}</p>
                        </div>

                        {post[currentLang]?.steps && (
                            <div className="info-box">
                                <h3>📝 {t('steps')}</h3>
                                <ol className="instructions-list">
                                    {post[currentLang].steps.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        )}

                        {post[currentLang]?.tips && (
                            <div className="tips-box">
                                <strong>💡 {t('proTip')}:</strong> {post[currentLang].tips}
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </motion.div>
    );
}

export default PostDetail;