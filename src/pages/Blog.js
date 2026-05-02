import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import blogData from '../data/blog.json';
import '../css/Blog.css';

function Blog() {
    const { t } = useTranslation();

    return (
        <div className="blog-container">
            <header className="blog-header">
                <h1>{t('blog.pageTitle')}</h1>
                <p>{t('blog.pageSubtitle')}</p>
            </header>

            <div className="blog-list">
                {blogData.map((post) => (
                    <div key={post.id} className="blog-horizontal-card">
                        <div className="blog-card-image">
                            <img src={post.image} alt={post.title} />
                        </div>
                        <div className="blog-card-content">
                            <div className="blog-card-meta">
                                <span className="blog-card-category">{post.category}</span>
                                <span className="blog-card-date">{post.date}</span>
                            </div>
                            <h2>{post.title}</h2>
                            <p>{post.summary}</p>
                            <Link to={`/blog/${post.id}`} className="read-more">
                                {t('blog.readMore')} →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Blog;