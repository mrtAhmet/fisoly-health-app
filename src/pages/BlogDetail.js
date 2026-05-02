import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import blogData from '../data/blog.json';
import '../css/BlogDetail.css';

function BlogDetail() {
    const { id } = useParams(); // URL'deki id'yi alır (örn: /blog/fisoyl-hikayesi)
    const { t } = useTranslation();
    const navigate = useNavigate();

    // JSON içinden URL'deki id ile eşleşen yazıyı buluyoruz
    const post = blogData.find((item) => item.id === id);

    // Eğer yazı bulunamazsa (yanlış URL gibi durumlarda)
    if (!post) {
        return (
            <div className="blog-error">
                <h2>{t('blog.notFound')}</h2>
                <Link to="/blog" className="back-btn">← {t('blog.backToBlog')}</Link>
            </div>
        );
    }

    return (
        <div className="blog-detail-container">
            {/* Geri Dön Butonu */}
            <button onClick={() => navigate('/blog')} className="back-link">
                ← {t('blog.backToBlog')}
            </button>

            <article className="blog-post">
                <header className="post-header">
                    <div className="post-meta">
                        <span className="post-category">{post.category}</span>
                        <span className="post-date">{post.date}</span>
                    </div>
                    <h1>{post.title}</h1>
                </header>

                <div className="post-hero-image">
                    <img src={post.image} alt={post.title} />
                </div>

                <div className="post-content">
                    {/* Buradaki p etiketleri ileride content kısmını \n ile ayırarak daha zenginleştirilebilir */}
                    <p>{post.content}</p>
                </div>

                <footer className="post-footer">
                    <div className="share-section">
                        <p>{t('blog.sharePost')}</p>
                        {/* Sosyal medya ikonları buraya gelebilir */}
                    </div>
                </footer>
            </article>
        </div>
    );
}

export default BlogDetail;