<script>
/* ============================
   ALCHEMIST V81.35 CORE LOGIC
   ============================ */

/* DATA */
var DB = [
    {
        q: "Signs of ΔH and ΔS for spontaneity at all temps?",
        b: ["ΔH < 0 (Exothermic)", "ΔS > 0 (Increased Disorder)"],
        j: "Nature favors energy release and chaos."
    },
    {
        q: "Predict spontaneity: ΔH = -120 kJ, ΔS = -150 J/K at 298 K.",
        b: ["ΔG = ΔH - TΔS", "Negative ΔG = Spontaneous"],
        j: "Exothermic release can overcome entropy loss."
    }
];

/* STATE */
var POOL = DB.slice();
var sy = 0;
var isLocked = false;

/* INIT */
function init() {
    setTimeout(function () {
        var loader = document.getElementById('loader');
        if (loader) loader.remove();
        render();
    }, 1200);
}

/* RENDER CARD */
function render() {
    var stack = document.getElementById('stack');
    var existing = stack.querySelector('.card');
    if (existing) existing.remove();

    if (!POOL.length) {
        stack.innerHTML =
            '<div class="card"><div class="card-q" style="color:#ffd600">THINKING COMPLETE</div></div>';
        return;
    }

    var d = POOL[0];
    var card = document.createElement('div');
    card.className = "card";
    card.innerHTML = '<div class="card-q">' + d.q + '</div>';
    stack.appendChild(card);

    document.getElementById('bullet-mount').innerHTML =
        d.b.map(function (i) {
            return '<div class="bullet-item">' + i + '</div>';
        }).join('');

    document.getElementById('judgement-text').innerText = d.j;
    document.getElementById('study-drawer').classList.remove('active');
    isLocked = false;

    bindPhysics(card);
}

/* PHYSICAL RIFT ENGINE */
function bindPhysics(el) {
    el.ontouchstart = function (e) {
        sy = e.touches[0].clientY;
        el.style.transition = "none";
    };

    el.ontouchmove = function (e) {
        var dy = e.touches[0].clientY - sy;

        /* OPEN COGNITIVE RIFT */
        if (!isLocked && dy > 130) {
            isLocked = true;
            document.getElementById('study-drawer').classList.add('active');
            el.classList.add('study-active');
        }

        /* RESISTED DRAG */
        if (!isLocked && dy > 0) {
            el.style.transform =
                "translateY(" + (dy * 0.25) + "px) rotate(" + (dy / 75) + "deg)";
        }
    };

    el.ontouchend = function (e) {
        var dy = e.changedTouches[0].clientY - sy;

        /* ADVANCE TO NEXT CARD */
        if (isLocked && dy < -70) {
            el.style.transition =
                "transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s";
            el.style.transform = "translateY(-800px) scale(1.1)";
            el.style.opacity = "0";

            setTimeout(function () {
                POOL.shift();
                render();
            }, 400);
        } 
        /* SNAP BACK */
        else {
            el.style.transition =
                "transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)";
            el.style.transform = "translateY(0) rotate(0deg) scale(1)";
        }
    };
}

/* BOOT */
window.onload = init;
</script>
