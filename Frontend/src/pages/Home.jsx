import React, { useState } from 'react';

const Home = () => {
  const [user, setUser] = useState(null);

const styles = {

container:{
minHeight:"100vh",
background:"linear-gradient(120deg,#f8fafc 0%,#e0e7ff 50%,#f9fafb 100%)",
fontFamily:"Inter, system-ui, sans-serif",
color:"#111827"
},

hero:{
padding:"140px 20px",
background:"linear-gradient(120deg,#f8fafc 0%,#e0e7ff 50%,#f9fafb 100%)",
fontFamily:"Inter, system-ui, sans-serif",
color:"#111827",
textAlign:"center"
},

heroTitle:{
fontSize:"clamp(3rem,7vw,4.3rem)",
fontWeight:"800",
color:"#111827",
marginBottom:"22px",
letterSpacing:"-1px"
},

heroSubtitle:{
fontSize:"1.25rem",
color:"#6b7280",
maxWidth:"760px",
margin:"0 auto 45px",
lineHeight:"1.7"
},

buttonContainer:{
display:"flex",
gap:"18px",
justifyContent:"center",
flexWrap:"wrap"
},

buttonPrimary:{
padding:"15px 34px",
background:"linear-gradient(135deg,#2563eb,#6366f1)",
color:"white",
border:"none",
borderRadius:"10px",
fontWeight:"600",
cursor:"pointer",
boxShadow:"0 10px 28px rgba(37,99,235,.25)",
transition:"all .25s ease"
},

buttonSecondary:{
padding:"15px 34px",
background:"#ffffff",
color:"#111827",
border:"1px solid #e5e7eb",
borderRadius:"10px",
fontWeight:"600",
cursor:"pointer",
boxShadow:"0 6px 16px rgba(0,0,0,.05)",
transition:"all .25s ease"
},

featuresSection:{
maxWidth:"1150px",
margin:"0 auto",
padding:"110px 20px"
},

sectionHeader:{
textAlign:"center",
marginBottom:"65px"
},

sectionTitle:{
fontSize:"2.4rem",
fontWeight:"700",
color:"#111827"
},

titleUnderline:{
width:"80px",
height:"3px",
background:"linear-gradient(90deg,#2563eb,#6366f1)",
margin:"16px auto 0",
borderRadius:"2px"
},

grid:{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
gap:"28px"
},

featureCard:{
background:"linear-gradient(180deg,#ffffff,#f9fafb)",
padding:"34px",
borderRadius:"14px",
border:"1px solid #e5e7eb",
boxShadow:"0 8px 24px rgba(0,0,0,.06)",
transition:"all .25s ease"
},

iconWrapper:{
width:"60px",
height:"60px",
borderRadius:"12px",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"1.8rem",
marginBottom:"20px",
background:"linear-gradient(135deg,#eef2ff,#f9fafb)",
border:"1px solid #e5e7eb"
},

featureTitle:{
fontSize:"1.28rem",
fontWeight:"600",
marginBottom:"12px",
color:"#111827"
},

featureDescription:{
color:"#6b7280",
lineHeight:"1.65"
},

ctaSection:{
background:"linear-gradient(135deg,#111827,#1f2937)",
padding:"120px 20px",
textAlign:"center",
marginTop:"90px"
},

ctaContent:{
maxWidth:"720px",
margin:"auto"
},

ctaTitle:{
fontSize:"2.5rem",
fontWeight:"700",
color:"white",
marginBottom:"22px"
},

ctaSubtitle:{
fontSize:"1.2rem",
color:"#d1d5db",
marginBottom:"42px",
lineHeight:"1.6"
},

ctaButton:{
padding:"17px 38px",
background:"linear-gradient(135deg,#2563eb,#6366f1)",
color:"white",
border:"none",
borderRadius:"10px",
fontWeight:"600",
cursor:"pointer",
boxShadow:"0 14px 40px rgba(37,99,235,.35)",
transition:"all .25s ease"
}

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