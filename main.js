// Small niceties only: active nav + subtle reveal animations.
(function(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(a=>{
    const href = a.getAttribute("href");
    if(href === path) a.classList.add("active");
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
