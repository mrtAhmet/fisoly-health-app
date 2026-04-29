import React, { useState, useRef } from 'react'; // useRef eklendi
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser'; // Kütüphane dahil edildi
import '../css/Contact.css';
import { toast } from 'react-toastify'

function Contact() {
    const { t } = useTranslation();
    const form = useRef(); // Formu referans olarak tanımladık
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // .env dosyasından gelen güvenli anahtarlar
        const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
        const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

        emailjs.sendForm(serviceId, templateId, form.current, publicKey)
            .then((result) => {
                console.log("Başarılı:", result.text);

                // Şık Başarı Bildirimi
                toast.success(t('success'), {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark", // Fisoyl'un karanlık temasına uygun
                });

                // Formu temizle
                setFormData({ name: '', email: '', subject: '', message: '' });
                e.target.reset();
            }, (error) => {
                console.log("Hata:", error.text);

                // Şık Hata Bildirimi
                toast.error("Mesaj gönderilemedi, lütfen tekrar deneyin.", {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "dark",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="contact-container">
            <header className="contact-header">
                <h1>{t('title')}</h1>
                <p>{t('subtitle')}</p>
            </header>

            <div className="contact-wrapper">
                <div className="contact-info">
                    <div className="info-item">
                        <h3>{t('infoTitle')}</h3>
                        <p>{t('infoText')}</p>
                    </div>

                    <div className="info-item">
                        <h4>{t('email')}</h4>
                        <p>fisoylsupport@gmail.com</p>
                    </div>

                    <div className="info-item">
                        <h4>{t('social')}</h4>
                        <div className="social-links">
                            <span>LinkedIn</span>
                            <a href='https://www.linkedin.com/in/ahmet-murat-098666266/'>Ahmet Murat</a>
                            <span>Github</span>
                            <a href="https://github.com/mrtAhmet">mrtAhmet</a>
                        </div>
                    </div>
                </div>

                {/* ref={form} eklendi, sınıflar korundu */}
                <form className="contact-form" ref={form} onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            name="from_name" // EmailJS şablonundaki {{from_name}} ile eşleşir
                            placeholder={t('form.name')}
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            name="user_email" // EmailJS şablonundaki {{user_email}} ile eşleşir
                            placeholder={t('form.email')}
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="subject" // EmailJS şablonundaki {{subject}} ile eşleşir
                            placeholder={t('form.subject')}
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                    </div>
                    <div className="input-group">
                        <textarea
                            name="message" // EmailJS şablonundaki {{message}} ile eşleşir
                            placeholder={t('form.message')}
                            rows="5"
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "..." : t('form.send')}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Contact;