import React, { useState } from 'react';

const Home = () => {
  const [user, setUser] = useState(null);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff1f2 0%, #ffffff 50%, #faf5ff 100%)',
    },
    hero: {
      position: 'relative',
      overflow: 'hidden',
      padding: '80px 20px 120px',
    },
    heroOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to right, rgba(225, 29, 72, 0.1), rgba(147, 51, 234, 0.1))',
    },
    heroContent: {
      position: 'relative',
      maxWidth: '1280px',
      margin: '0 auto',
      textAlign: 'center',
    },
    heroTitle: {
      fontSize: 'clamp(2.5rem, 8vw, 5rem)',
      fontWeight: 'bold',
      background: 'linear-gradient(to right, #e11d48, #9333ea)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '24px',
      lineHeight: '1.2',
    },
    heroSubtitle: {
      fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
      color: '#4b5563',
      marginBottom: '48px',
      maxWidth: '900px',
      margin: '0 auto 48px',
      lineHeight: '1.6',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonPrimary: {
      padding: '16px 32px',
      background: 'linear-gradient(to right, #e11d48, #9333ea)',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      fontWeight: '600',
      fontSize: '1.125rem',
      cursor: 'pointer',
      width: '256px',
      boxShadow: '0 10px 25px rgba(225, 29, 72, 0.3)',
      transition: 'all 0.3s ease',
    },
    buttonSecondary: {
      padding: '16px 32px',
      background: 'white',
      color: '#e11d48',
      border: '2px solid #e11d48',
      borderRadius: '50px',
      fontWeight: '600',
      fontSize: '1.125rem',
      cursor: 'pointer',
      width: '256px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
    },
    decorativeBlob1: {
      position: 'absolute',
      top: '80px',
      left: '40px',
      width: '80px',
      height: '80px',
      background: '#fecdd3',
      borderRadius: '50%',
      filter: 'blur(60px)',
      opacity: 0.5,
    },
    decorativeBlob2: {
      position: 'absolute',
      bottom: '80px',
      right: '40px',
      width: '128px',
      height: '128px',
      background: '#e9d5ff',
      borderRadius: '50%',
      filter: 'blur(60px)',
      opacity: 0.5,
    },
    featuresSection: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '80px 20px',
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '64px',
    },
    sectionTitle: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '16px',
    },
    titleUnderline: {
      width: '96px',
      height: '4px',
      background: 'linear-gradient(to right, #e11d48, #9333ea)',
      margin: '0 auto',
      borderRadius: '2px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '32px',
    },
    featureCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f3f4f6',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    iconWrapper: {
      width: '64px',
      height: '64px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      marginBottom: '24px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
      transition: 'transform 0.3s ease',
    },
    featureTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '16px',
    },
    featureDescription: {
      color: '#4b5563',
      lineHeight: '1.6',
    },
    ctaSection: {
      background: 'linear-gradient(to right, #e11d48, #9333ea)',
      padding: '80px 20px',
      textAlign: 'center',
    },
    ctaContent: {
      maxWidth: '1024px',
      margin: '0 auto',
    },
    ctaTitle: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '24px',
    },
    ctaSubtitle: {
      fontSize: '1.25rem',
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '40px',
    },
    ctaButton: {
      padding: '20px 40px',
      background: 'white',
      color: '#e11d48',
      border: 'none',
      borderRadius: '50px',
      fontWeight: 'bold',
      fontSize: '1.125rem',
      cursor: 'pointer',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s ease',
    },
  };

  const features = [
    {
      icon: '🎯',
      title: 'Browse Destinations',
      description: 'Explore beautiful wedding destinations with detailed information about venues, packages, and pricing.',
      gradient: 'linear-gradient(135deg, #f43f5e, #e11d48)',
    },
    {
      icon: '📦',
      title: 'Custom Packages',
      description: 'Choose from pre-designed packages or customize your own wedding package with our expert planners.',
      gradient: 'linear-gradient(135deg, #a855f7, #9333ea)',
    },
    {
      icon: '👥',
      title: 'Expert Vendors',
      description: 'Connect with verified vendors for photography, decoration, catering, and more.',
      gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
    },
    {
      icon: '📋',
      title: 'Track Progress',
      description: 'Monitor your wedding planning progress in real-time with our intuitive dashboard.',
      gradient: 'linear-gradient(135deg, #f43f5e, #ec4899)',
    },
    {
      icon: '⭐',
      title: 'Reviews & Ratings',
      description: 'Read reviews from other couples and rate your experience with vendors and planners.',
      gradient: 'linear-gradient(135deg, #a855f7, #e11d48)',
    },
    {
      icon: '💬',
      title: 'Easy Communication',
      description: 'Chat with planners and vendors directly through our platform for seamless coordination.',
      gradient: 'linear-gradient(135deg, #ec4899, #9333ea)',
    },
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Your Dream Wedding Awaits
          </h1>
          <p style={styles.heroSubtitle}>
            Plan your perfect wedding with our comprehensive platform. From stunning venues to expert vendors, we've got everything covered.
          </p>
          {!user && (
            <div style={styles.buttonContainer}>
              <button 
                style={styles.buttonPrimary}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-4px)';
                  e.target.style.boxShadow = '0 15px 35px rgba(225, 29, 72, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 25px rgba(225, 29, 72, 0.3)';
                }}
              >
                Get Started Free
              </button>
              <button 
                style={styles.buttonSecondary}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-4px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }}
              >
                Login
              </button>
            </div>
          )}
        </div>
        <div style={styles.decorativeBlob1}></div>
        <div style={styles.decorativeBlob2}></div>
      </div>

      {/* Features Section */}
      <div style={styles.featuresSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
          <div style={styles.titleUnderline}></div>
        </div>

        <div style={styles.grid}>
          {features.map((feature, index) => (
            <div 
              key={index}
              style={styles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                const icon = e.currentTarget.querySelector('.icon-wrapper');
                if (icon) icon.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                const icon = e.currentTarget.querySelector('.icon-wrapper');
                if (icon) icon.style.transform = 'scale(1)';
              }}
            >
              <div 
                className="icon-wrapper"
                style={{...styles.iconWrapper, background: feature.gradient}}
              >
                {feature.icon}
              </div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Start Planning?</h2>
          <p style={styles.ctaSubtitle}>
            Join thousands of couples who have planned their dream wedding with us
          </p>
          {!user && (
            <button 
              style={styles.ctaButton}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
              }}
            >
              Start Your Journey
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;