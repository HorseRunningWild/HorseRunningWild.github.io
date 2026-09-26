/* ============================================
   Publication card galleries — click a figure (or the hint) to cycle
   through a card's figures with a fade.
   ============================================ */
(function () {
    document.querySelectorAll("[data-gallery]").forEach(function (gallery) {
        var figures = Array.prototype.slice.call(gallery.querySelectorAll(".pub-figure"));
        var hint = gallery.querySelector("[data-gallery-hint]");
        if (figures.length < 2) {
            if (hint) hint.style.display = "none";
            return;
        }
        var current = 0;

        function show(next) {
            figures[current].classList.remove("active");
            current = next;
            figures[current].classList.add("active");
            if (hint) {
                hint.textContent = (current + 1) + " / " + figures.length + " · click image to switch";
            }
        }

        gallery.addEventListener("click", function () {
            show((current + 1) % figures.length);
        });
    });
})();
