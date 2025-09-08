import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/AuthPage.css';

const AuthPage = (props) => {
  const [formData, setFormData] = useState({
    email: 'testUser',
    password: '123456'
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Refs for animations
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formElementsRef = useRef([]);
  const agentCardsRef = useRef([]);
  const featureItemsRef = useRef([]);
  const brandTitleRef = useRef(null);
  const welcomeTitleRef = useRef(null);
  const welcomeSubtitleRef = useRef(null); // ADD THIS REF

  useEffect(() => {
    // Wait a bit for refs to be set
    const timer = setTimeout(() => {
      const tl = gsap.timeline();

      // Set initial states using GSAP (not inline styles)
      gsap.set(containerRef.current, { autoAlpha: 0 });
      gsap.set([leftPanelRef.current, rightPanelRef.current], { autoAlpha: 0, y: 0 });
      gsap.set([titleRef.current, subtitleRef.current, welcomeTitleRef.current, welcomeSubtitleRef.current], { autoAlpha: 0, y: 20 }); // ADD welcomeSubtitleRef HERE
      gsap.set(brandTitleRef.current, { autoAlpha: 0, scale: 0.8 });
      gsap.set(formElementsRef.current.filter(el => el), { autoAlpha: 0, y: 20 });
      gsap.set(agentCardsRef.current.filter(el => el), { autoAlpha: 0, scale: 0.8, y: 30 });
      gsap.set(featureItemsRef.current.filter(el => el), { autoAlpha: 0, x: -30 });

      // Main animation timeline
      tl.to(containerRef.current, { duration: 0.1, autoAlpha: 1 })
        .to([leftPanelRef.current, rightPanelRef.current], {
          duration: 0.3,
          autoAlpha: 1,
          y: 0,
          ease: "power2.out",
          stagger: 0.2
        })
        .to([titleRef.current, subtitleRef.current, welcomeTitleRef.current, welcomeSubtitleRef.current], { // ADD welcomeSubtitleRef HERE
          duration: 0.3,
          autoAlpha: 1,
          y: 0,
          ease: "power2.out",
          stagger: 0.1
        }, "-=0.4")
        .to(brandTitleRef.current, {
          duration: 0.8,
          autoAlpha: 1,
          scale: 1,
          ease: "back.out(1.7)"
        }, "-=0.4")
        .to(formElementsRef.current.filter(el => el), {
          duration: 0.5,
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.6")
        .to(agentCardsRef.current.filter(el => el), {
          duration: 0.6,
          autoAlpha: 1,
          scale: 1,
          y: 0,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=0.4")
        .to(featureItemsRef.current.filter(el => el), {
          duration: 0.5,
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.2");

      // Floating animation for agent cards
      gsap.to(agentCardsRef.current.filter(el => el), {
        duration: 2,
        y: "+=5",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
        delay: 2
      });

    }, 50); // Small delay to ensure refs are set

    return () => {
      clearTimeout(timer);
      gsap.killTweensOf([containerRef.current, leftPanelRef.current, rightPanelRef.current]);
    };
  }, []);

  // ... (keep all your existing handlers unchanged)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.email === 'testUser' && formData.password === '123456') {
      gsap.to('.auth-button', {
        duration: 0.2,
        scale: 0.95,
        yoyo: true,
        repeat: 1
      });
      
      props.onLoginSuccess({
        email: 'testUser',
        fullName: 'Test User',
        company: 'Demo Company'
      });
    } else {
      setErrors({
        email: 'Invalid credentials. Use testUser / 123456'
      });
      
      gsap.to('.auth-form', {
        duration: 0.1,
        x: -10,
        repeat: 6,
        yoyo: true,
        ease: "power2.out"
      });
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
    
    gsap.to('.password-toggle', {
      duration: 0.3,
      rotation: showPassword ? 0 : 360,
      scale: 1.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });
  };

  return (
    <div className="auth-container" ref={containerRef}>
      <div className="auth-wrapper login-mode">
        {/* Form Panel - Left */}
        <div className="auth-panel form-panel left-panel" ref={leftPanelRef}>
          <div className="auth-form-container">
            <div className="auth-header">
              <h1 className="auth-title" ref={titleRef}>
                Still Managing Like It's 1999?
              </h1>
              <p className="auth-subtitle" ref={subtitleRef}>
                While you're debating, smart companies are already 10x ahead
              </p>
            </div>

            <form className="auth-form login-form" onSubmit={handleSubmit}>
              {errors.email && (
                <div 
                  className="error-container"
                  ref={el => formElementsRef.current[0] = el}
                >
                  <div className="error-message">{errors.email}</div>
                </div>
              )}

              <div 
                className="input-group form-element"
                ref={el => formElementsRef.current[1] = el}
              >
                <label className="input-label">Email Address</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className={`auth-input ${errors.email ? 'error' : ''}`}
                />
              </div>

              <div 
                className="input-group form-element"
                ref={el => formElementsRef.current[2] = el}
              >
                <label className="input-label">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className={`auth-input ${errors.password ? 'error' : ''}`}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={handlePasswordToggle}
                  >
                    <span className="eye-icon">
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </span>
                  </button>
                </div>
              </div>

              <div 
                className="form-options form-element"
                ref={el => formElementsRef.current[3] = el}
              >
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>

              <button 
                type="submit" 
                className="auth-button login-submit-btn form-element"
                ref={el => formElementsRef.current[4] = el}
              >
                Unlock Truth
              </button>
            </form>
          </div>
        </div>

        {/* Welcome Panel - Right */}
        <div className="auth-panel welcome-panel right-panel" ref={rightPanelRef}>
          <div className="welcome-section">
            <div className="welcome-title" ref={welcomeTitleRef}>
              Welcome Back, Disruptor
            </div>
            <h1 className="brand-title" ref={brandTitleRef}>
              We360.ai Portal
            </h1>
            <p className="welcome-subtitle" ref={welcomeSubtitleRef}>
              Traditional Management is Dying. Evolution Starts Here.
            </p>

            <div className="illustration-container">
              <div className="ai-agents-visual">
                <div 
                  className="agent-card"
                  ref={el => agentCardsRef.current[0] = el}
                >
                  <span className="agent-icon">🎯</span>
                  <span>Talent Planning</span>
                </div>
                <div 
                  className="agent-card"
                  ref={el => agentCardsRef.current[1] = el}
                >
                  <span className="agent-icon">📊</span>
                  <span>Unbiased Reporting</span>
                </div>
                <div 
                  className="agent-card"
                  ref={el => agentCardsRef.current[2] = el}
                >
                  <span className="agent-icon">🎓</span>
                  <span>Upskilling</span>
                </div>
              </div>
            </div>

            <div className="features-list">
              <div 
                className="feature-item"
                ref={el => featureItemsRef.current[0] = el}
              >
                See Through Corporate BS With Real Data
              </div>
              <div 
                className="feature-item"
                ref={el => featureItemsRef.current[1] = el}
              >
                Kill Productivity Black Holes Before They Kill You
              </div>
              <div 
                className="feature-item"
                ref={el => featureItemsRef.current[2] = el}
              >
                Stop the Talent Bleeding (While Your Competitors Can't)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
