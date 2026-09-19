/* ============================================
   Neuron background — homepage hero canvas
   Neuron positions trace a galloping horse (facing left) plus a "VV"
   mark; synapses connect nearby neurons; slow OU drift around anchors;
   ~3 spontaneous activations/s in soft pastels; pulses travel locally.
   ============================================ */
(function () {
    var canvas = document.getElementById("neuron-bg");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");

    /* ----- palette ----- */
    var LIGHT = {
        ink: [26, 26, 46],
        teal: [44, 95, 124]
    };
    var DARK = {
        ink: [236, 233, 228],
        teal: [106, 171, 207]
    };
    var PASTELS = [
        [110, 168, 192],
        [217, 154, 138],
        [148, 179, 148],
        [169, 154, 196],
        [207, 180, 135]
    ];

    /* ----- design space: 12 x 7 units, y up ----- */
    var DW = 12, DH = 7;
    var LINK_R = 2.4;
    var FIRE_RATE = 3.0;   // activations per second across the canvas
    var SPEED = 3.2;       // pulse travel speed (units/s)
    var THETA = 0.7;       // OU pull-back rate (1/s)
    var SIGMA = 0.098;     // OU noise (units/sqrt(s))
    var AMP = 0.16;        // drift clamp (units)

    /* ----- galloping horse outline (photo frame, x right, y down) ----- */
    var HORSE_DOWN = [
        [0.255, 0.040], [0.210, 0.090], [0.185, 0.180], [0.190, 0.260],
        [0.205, 0.295], [0.235, 0.285], [0.270, 0.270], [0.310, 0.300],
        [0.360, 0.400], [0.385, 0.480], [0.345, 0.600], [0.330, 0.680],
        [0.350, 0.800], [0.365, 0.885], [0.378, 0.860], [0.356, 0.700],
        [0.376, 0.580], [0.400, 0.520], [0.420, 0.620], [0.435, 0.700],
        [0.495, 0.755], [0.475, 0.720], [0.450, 0.580], [0.550, 0.560],
        [0.650, 0.530], [0.680, 0.500], [0.660, 0.700], [0.640, 0.880],
        [0.635, 0.940], [0.655, 0.910], [0.685, 0.700], [0.710, 0.520],
        [0.800, 0.450], [0.770, 0.580], [0.850, 0.520], [0.855, 0.480],
        [0.845, 0.380], [0.860, 0.300], [0.875, 0.235], [0.930, 0.240],
        [0.995, 0.280], [0.970, 0.380], [0.885, 0.300], [0.840, 0.215],
        [0.650, 0.200], [0.460, 0.180], [0.430, 0.100], [0.385, 0.090],
        [0.335, 0.060], [0.290, 0.050]
    ];
    var N_HORSE = 50;
    var VV_PATH = [
        [1.7, 6.65], [2.1, 5.75], [2.5, 6.65],
        [2.9, 6.65], [3.3, 5.75], [3.7, 6.65]
    ];
    var N_VV = 12;

    function samplePath(pts, n, closed) {
        var cum = [0], i, total = 0;
        var count = closed ? pts.length : pts.length - 1;
        for (i = 0; i < count; i++) {
            var a = pts[i], b = pts[(i + 1) % pts.length];
            total += Math.hypot(b[0] - a[0], b[1] - a[1]);
            cum.push(total);
        }
        var out = [];
        for (i = 0; i < n; i++) {
            var d = closed ? (total * i) / n : (total * i) / (n - 1);
            var k = 0;
            while (k < cum.length - 2 && cum[k + 1] < d) k++;
            var segLen = cum[k + 1] - cum[k] || 1e-6;
            var u = (d - cum[k]) / segLen;
            var p = pts[k], q = pts[(k + 1) % pts.length];
            out.push([p[0] + u * (q[0] - p[0]), p[1] + u * (q[1] - p[1])]);
        }
        return out;
    }

    /* ----- anchors ----- */
    var horsePts = samplePath(HORSE_DOWN, N_HORSE, true).map(function (p) {
        return [0.4 + p[0] * 11.2, 0.15 + (1 - p[1]) * 5.2];
    });
    var vvPts = samplePath(VV_PATH, N_VV, false);
    var anchors = horsePts.concat(vvPts);
    var N = anchors.length;
    var groups = [];
    var gi;
    var horseGroup = [], vvGroup = [];
    for (gi = 0; gi < N_HORSE; gi++) horseGroup.push(gi);
    for (gi = 0; gi < N_VV; gi++) vvGroup.push(N_HORSE + gi);
    groups.push(horseGroup, vvGroup);

    /* ----- proximity synapses within each group ----- */
    var edges = [];
    var edgeSet = {};
    groups.forEach(function (g) {
        g.forEach(function (i) {
            var dists = g.map(function (j) {
                return {
                    j: j,
                    d: Math.hypot(anchors[j][0] - anchors[i][0], anchors[j][1] - anchors[i][1])
                };
            }).sort(function (a, b) { return a.d - b.d; });
            var added = 0;
            for (var k = 1; k < dists.length && added < 3; k++) {
                var j = dists[k].j;
                if (dists[k].d >= LINK_R) break;
                var key = Math.min(i, j) + "-" + Math.max(i, j);
                if (!edgeSet[key]) {
                    edgeSet[key] = true;
                    edges.push([i, j]);
                    added++;
                }
            }
        });
    });

    /* ----- state ----- */
    var offsets = new Float32Array(N * 2);
    var glow = new Float32Array(N);
    var glowColor = [];
    var i2;
    for (i2 = 0; i2 < N; i2++) glowColor.push(LIGHT.teal.slice());
    var pulses = [];   // {e: edgeIdx, t0: seconds, c: [r,g,b]}

    function gauss() {
        var u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    }

    /* ----- viewport mapping (cover-fit the 12x7 design space) ----- */
    var scale = 1, ox = 0, oy = 0, dpr = 1;
    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        var w = window.innerWidth, h = window.innerHeight;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        scale = Math.max(w / DW, h / DH);
        ox = (w - DW * scale) / 2;
        oy = (h - DH * scale) / 2;
    }
    window.addEventListener("resize", resize);
    resize();

    function toX(x) { return ox + x * scale; }
    function toY(yUp) { return oy + (DH - yUp) * scale; }

    function isDark() {
        return document.documentElement.getAttribute("data-theme") === "dark";
    }

    function rgba(c, a) {
        return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")";
    }

    function mix(a, b, u) {
        return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u];
    }

    var last = null;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function ignite(i, t) {
        glow[i] = 1;
        var c = PASTELS[(Math.random() * PASTELS.length) | 0];
        glowColor[i] = c;
        for (var e = 0; e < edges.length; e++) {
            if (edges[e][0] === i && Math.random() < 0.65) {
                pulses.push({ e: e, t0: t, c: c });
            }
        }
    }

    /* Easter egg: clicking the hero name fires a small burst of activations */
    window.addEventListener("wildhorse", function () {
        var t = performance.now() / 1000;
        for (var k = 0; k < 14; k++) {
            ignite((Math.random() * N) | 0, t + Math.random() * 0.4);
        }
    });

    function frame(ts) {
        if (last === null) last = ts;
        var dt = Math.min((ts - last) / 1000, 0.1);
        last = ts;
        var t = ts / 1000;

        var pal = isDark() ? DARK : LIGHT;
        var edgeAlpha = isDark() ? 0.14 : 0.12;
        var restAlpha = isDark() ? 0.32 : 0.38;

        /* drift */
        var sqrtDt = Math.sqrt(dt);
        for (var i = 0; i < N; i++) {
            var ix = i * 2;
            offsets[ix] += -THETA * offsets[ix] * dt + SIGMA * sqrtDt * gauss();
            offsets[ix + 1] += -THETA * offsets[ix + 1] * dt + SIGMA * sqrtDt * gauss();
            offsets[ix] = Math.max(-AMP, Math.min(AMP, offsets[ix]));
            offsets[ix + 1] = Math.max(-AMP, Math.min(AMP, offsets[ix + 1]));
        }

        /* positions */
        var px = new Float32Array(N), py = new Float32Array(N);
        for (i = 0; i < N; i++) {
            px[i] = toX(anchors[i][0] + offsets[i * 2]);
            py[i] = toY(anchors[i][1] + offsets[i * 2 + 1]);
        }

        /* spontaneous firing */
        var pFire = FIRE_RATE * dt / N;
        for (i = 0; i < N; i++) {
            if (Math.random() < pFire) ignite(i, t);
        }

        /* clear */
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
        ctx.lineCap = "round";

        /* resting synapses */
        ctx.strokeStyle = rgba(pal.teal, edgeAlpha);
        ctx.lineWidth = Math.max(1, 0.012 * scale);
        ctx.beginPath();
        for (e = 0; e < edges.length; e++) {
            var a = edges[e][0], b = edges[e][1];
            ctx.moveTo(px[a], py[a]);
            ctx.lineTo(px[b], py[b]);
        }
        ctx.stroke();

        /* pulses */
        var still = [];
        for (i = 0; i < pulses.length; i++) {
            var p = pulses[i];
            var ea = edges[p.e][0], eb = edges[p.e][1];
            var L = Math.hypot(px[eb] - px[ea], py[eb] - py[ea]) + 1e-6;
            var travel = SPEED * scale;
            var u = Math.max(0, (t - p.t0) * travel / L);
            if (u >= 1.15) {
                if (glow[eb] < 0.85) {
                    glow[eb] = 0.85;
                    glowColor[eb] = p.c;
                }
                continue;
            }
            still.push(p);
            var uTip = Math.min(u, 1), uTail = Math.max(u - 0.25, 0);
            ctx.strokeStyle = rgba(p.c, 0.55 * (1 - u * 0.4));
            ctx.lineWidth = Math.max(1.4, 0.026 * scale);
            ctx.beginPath();
            ctx.moveTo(px[ea] + uTail * (px[eb] - px[ea]), py[ea] + uTail * (py[eb] - py[ea]));
            ctx.lineTo(px[ea] + uTip * (px[eb] - px[ea]), py[ea] + uTip * (py[eb] - py[ea]));
            ctx.stroke();
        }
        pulses = still;

        /* glow decay (0.965 per frame at 20fps) */
        var decay = Math.pow(0.965, dt * 20);
        for (i = 0; i < N; i++) glow[i] *= decay;

        /* neurons: halo then body */
        var baseR = 0.045 * scale;
        for (i = 0; i < N; i++) {
            var g = glow[i];
            if (g > 0.02) {
                ctx.fillStyle = rgba(glowColor[i], 0.18 * g);
                ctx.beginPath();
                ctx.arc(px[i], py[i], baseR * (1 + 3.4 * g), 0, 6.2832);
                ctx.fill();
            }
        }
        for (i = 0; i < N; i++) {
            g = glow[i];
            var col = mix(pal.ink, glowColor[i], g);
            ctx.fillStyle = rgba(col, Math.min(1, restAlpha + 0.55 * g));
            ctx.beginPath();
            ctx.arc(px[i], py[i], baseR * (1 + 1.7 * g), 0, 6.2832);
            ctx.fill();
        }

        if (!reduced) requestAnimationFrame(frame);
    }

    /* pause when tab hidden to save power */
    document.addEventListener("visibilitychange", function () {
        if (!document.hidden && !reduced) {
            last = null;
            requestAnimationFrame(frame);
        }
    });

    requestAnimationFrame(frame);
})();
