(function () {
    var doc = document.documentElement;
    var root = document.getElementById("home-portfolio");
    if (!root) {
        doc.classList.remove("home-anim-pending");
        return;
    }

    var aboutSection = root.querySelector(".js-about-section");
    var scrollCue = root.querySelector(".scroll-cue");
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (scrollCue && aboutSection) {
        scrollCue.addEventListener("click", function () {
            aboutSection.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });
        });

    }

    if (typeof window.gsap === "undefined" || typeof window.ScrollTrigger === "undefined") {
        doc.classList.remove("home-anim-pending");
        return;
    }

    var hero = root.querySelector(".hero");
    var heroAvatar = root.querySelector(".hero-avatar");
    var heroAvatarFigure = root.querySelector(".hero-avatar-fg");
    var heroTitle = root.querySelector(".hero h1");
    var heroSubtitle = root.querySelector(".subtitle");
    var heroAffiliations = root.querySelectorAll(".affiliations span");
    var heroLinks = root.querySelectorAll(".hero-links .contact-link");
    var aboutHeader = root.querySelector(".js-about-header");
    var aboutCard = root.querySelector(".js-about-card");
    var interestsSection = root.querySelector(".js-interests-section");
    var publicationsSection = root.querySelector(".js-publications-section");
    var patentsSection = root.querySelector(".js-patents-section");
    var interestItems = root.querySelectorAll(".interest-item");
    var pubCards = root.querySelectorAll(".pub-card");
    var patentCard = root.querySelector(".patent-card");

    function attachHoverLift(elements) {
        Array.prototype.forEach.call(elements, function (element) {
            element.addEventListener("mouseenter", function () {
                window.gsap.to(element, {
                    y: -6,
                    duration: 0.22,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            });

            element.addEventListener("mouseleave", function () {
                window.gsap.to(element, {
                    y: 0,
                    duration: 0.22,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            });
        });
    }

    function setMany(elements, vars) {
        if (elements.length) {
            window.gsap.set(elements, vars);
        }
    }

    window.gsap.registerPlugin(window.ScrollTrigger);

    if (prefersReducedMotion) {
        doc.classList.remove("home-anim-pending");
        return;
    }

    if (heroAvatar) {
        window.gsap.set(heroAvatar, { opacity: 0, y: 18 });
    }
    if (heroTitle) {
        window.gsap.set(heroTitle, { opacity: 0, y: 30 });
    }
    if (heroSubtitle) {
        window.gsap.set(heroSubtitle, { opacity: 0, y: 20 });
    }
    setMany(heroAffiliations, { opacity: 0, x: -10 });
    setMany(heroLinks, { opacity: 0, y: 10 });
    if (scrollCue) {
        window.gsap.set(scrollCue, { opacity: 0, y: -12 });
    }
    if (aboutHeader) {
        window.gsap.set(aboutHeader, { opacity: 0, y: 18 });
    }
    if (aboutCard) {
        window.gsap.set(aboutCard, { opacity: 0, y: 20 });
    }
    setMany(interestItems, { opacity: 0, x: -15 });
    setMany(pubCards, { opacity: 0, y: 25 });
    if (patentCard) {
        window.gsap.set(patentCard, { opacity: 0, y: 20, scale: 0.98 });
    }

    doc.classList.remove("home-anim-pending");

    if (hero) {
        window.ScrollTrigger.create({
            trigger: hero,
            start: "top 90%",
            once: true,
            onEnter: function () {
                if (heroAvatar) {
                    window.gsap.to(heroAvatar, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power3.out"
                    });
                }
                if (heroAvatarFigure) {
                    window.gsap.fromTo(
                        heroAvatarFigure,
                        { rotation: -0.6, transformOrigin: "50% 62%" },
                        {
                            rotation: 5,
                            duration: 2.9,
                            delay: 0.72,
                            ease: "sine.inOut",
                            yoyo: true,
                            repeat: -1,
                            transformOrigin: "50% 62%"
                        }
                    );
                }
                if (heroTitle) {
                    window.gsap.to(heroTitle, {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        delay: 0.08,
                        ease: "power3.out"
                    });
                }
                if (heroSubtitle) {
                    window.gsap.to(heroSubtitle, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: 0.18,
                        ease: "power3.out"
                    });
                }
                if (heroAffiliations.length) {
                    window.gsap.to(heroAffiliations, {
                        opacity: 1,
                        x: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        delay: 0.28,
                        ease: "power3.out"
                    });
                }
                if (heroLinks.length) {
                    window.gsap.to(heroLinks, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        delay: 0.45,
                        stagger: 0.12,
                        ease: "power3.out"
                    });
                }
                if (scrollCue) {
                    window.gsap.to(scrollCue, {
                        opacity: 1,
                        y: 0,
                        duration: 0.55,
                        delay: 0.68,
                        ease: "power3.out"
                    });
                }
            }
        });
    }

    if (aboutSection) {
        window.ScrollTrigger.create({
            trigger: aboutSection,
            start: "top 85%",
            once: true,
            onEnter: function () {
                if (aboutHeader) {
                    window.gsap.to(aboutHeader, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power3.out"
                    });
                }
                if (aboutCard) {
                    window.gsap.to(aboutCard, {
                        opacity: 1,
                        y: 0,
                        duration: 0.75,
                        delay: 0.1,
                        ease: "power3.out"
                    });
                }
            }
        });
    }

    if (interestItems.length && interestsSection) {
        window.ScrollTrigger.create({
            trigger: interestsSection,
            start: "top 82%",
            once: true,
            onEnter: function () {
                window.gsap.to(interestItems, {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 0.12
                });
            }
        });
    }

    if (pubCards.length && publicationsSection) {
        attachHoverLift(pubCards);
        window.ScrollTrigger.create({
            trigger: publicationsSection,
            start: "top 80%",
            once: true,
            onEnter: function () {
                window.gsap.to(pubCards, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power3.out",
                    delay: 0.12
                });
            }
        });
    }

    if (patentCard && patentsSection) {
        attachHoverLift([patentCard]);
        window.ScrollTrigger.create({
            trigger: patentsSection,
            start: "top 85%",
            once: true,
            onEnter: function () {
                window.gsap.to(patentCard, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power3.out",
                    delay: 0.08
                });
            }
        });
    }
})();
