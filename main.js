(function(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(a=>{
    if(a.getAttribute("href") === path) a.classList.add("active");
  });
  const els = document.querySelectorAll("[data-reveal]");
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("reveal");
        obs.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});
  els.forEach(el=>obs.observe(el));
})();



// ===== HOME HERO VIDEO SEQUENCE =====
(function(){
  const left = document.getElementById("rfVidLeft");
  const right = document.getElementById("rfVidRight");
  const btn = document.getElementById("rfPlayBoth");
  if(!left || !right || !btn) return;

  btn.addEventListener("click", async () => {
    try{
      right.pause();
      right.currentTime = 0;
      await left.play();
    }catch(e){
      console.warn("Playback blocked:", e);
    }
  });

  left.addEventListener("ended", async () => {
    try{
      await right.play();
    }catch(e){
      console.warn("Second playback blocked:", e);
    }
  });
})();
// ===== END HOME HERO VIDEO SEQUENCE =====



// ===== v34 desktop autoplay (muted) =====
document.addEventListener("DOMContentLoaded", () => {
  const left = document.getElementById("rfVidLeft");
  const right = document.getElementById("rfVidRight");
  if (!left || !right) return;

  const isDesktop = window.matchMedia && window.matchMedia("(min-width: 521px)").matches;
  if (isDesktop) {
    // Autoplay is generally only allowed when muted.
    [left, right].forEach(v => {
      v.muted = true;
      v.autoplay = true;
      v.loop = true;
      v.playsInline = true;
      v.preload = "metadata";
    });
    left.play().catch(() => {});
    right.play().catch(() => {});
  }
});
// ===== END v34 desktop autoplay =====
