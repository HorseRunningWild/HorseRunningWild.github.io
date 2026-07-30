(function () {
    "use strict";
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

    // Animation temporarily reduced to the hero avatar only.
    // All other reveal / hover animations are removed while the static
    // layout is tuned, and will be re-added later.
    if (typeof window.gsap === "undefined" || typeof window.ScrollTrigger === "undefined") {
        doc.classList.remove("home-anim-pending");
        return;
    }

    window.gsap.registerPlugin(window.ScrollTrigger);

    if (prefersReducedMotion) {
        doc.classList.remove("home-anim-pending");
        return;
    }

    var hero = root.querySelector(".hero");
    var heroAvatar = root.querySelector(".hero-avatar");
    var heroAvatarFigure = root.querySelector(".hero-avatar-fg");

    // The avatar is hidden via an inline style (independent of the FOUC
    // guard class). Removing the class below therefore reveals every other
    // piece of hero / page content immediately, while the avatar keeps
    // waiting for its ScrollTrigger reveal.
    if (heroAvatar) {
        window.gsap.set(heroAvatar, { opacity: 0, y: 10 });
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
            }
        });
    }
})();
