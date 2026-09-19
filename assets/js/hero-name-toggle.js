/* ============================================
   Hero name easter egg — click "Zixing Jia" to reveal "Wild Horse!",
   click again to switch back. Going wild also fires a burst in the
   neuron canvas (listens for the "wildhorse" event there).
   ============================================ */
(function () {
    var h1 = document.querySelector(".home-portfolio .hero h1");
    if (!h1) return;
    var NAME = h1.textContent;
    var ALT = "Wild Horse!";

    h1.style.cursor = "pointer";
    h1.setAttribute("title", "psst... click me");
    h1.setAttribute("role", "button");
    h1.setAttribute("tabindex", "0");

    function toggle() {
        var wild = h1.textContent !== ALT;
        h1.textContent = wild ? ALT : NAME;
        if (wild) window.dispatchEvent(new CustomEvent("wildhorse"));
    }

    h1.addEventListener("click", toggle);
    h1.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            toggle();
        }
    });
})();
