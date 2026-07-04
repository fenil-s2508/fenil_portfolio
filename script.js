(() => {
  // Role readout cycling
  const roles = [
    "Instrumentation & Embedded Systems Engineer",
    "Industrial Maintenance & Automation Trainee",
    "Applied AI/ML & Computer Vision Developer",
    "Electronics & Communication Engineer"
  ];

  const roleEl = document.getElementById("roleText");
  if (roleEl) {
    let ri = 0;
    roleEl.style.transition = "opacity .28s ease";

    setInterval(() => {
      ri = (ri + 1) % roles.length;
      roleEl.style.opacity = "0";
      setTimeout(() => {
        roleEl.textContent = roles[ri];
        roleEl.style.opacity = "1";
      }, 280);
    }, 3000);
  }

  // Generic reveal animation
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in");
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => revealObserver.observe(el));

  // Timeline progress + node lighting
  const timeline = document.getElementById("timeline");
  const traceFill = document.getElementById("traceFill");
  const nodes = document.querySelectorAll(".node");

  function updateTrace() {
    if (!timeline || !traceFill) return;

    const rect = timeline.getBoundingClientRect();
    const vh = window.innerHeight;
    let progress = (vh * 0.75 - rect.top) / rect.height;
    progress = Math.max(0, Math.min(1, progress));

    traceFill.style.height = `${progress * 100}%`;

    nodes.forEach((node) => {
      const nRect = node.getBoundingClientRect();
      if (nRect.top < vh * 0.8) node.classList.add("lit");
    });
  }

  window.addEventListener("scroll", updateTrace, { passive: true });
  window.addEventListener("resize", updateTrace);
  updateTrace();

  // Skill panels light-on effect
  const skillPanels = document.querySelectorAll(".skill-panel");
  const panelObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("lit"), idx * 75);
      }
    });
  }, { threshold: 0.4 });

  skillPanels.forEach((panel) => panelObserver.observe(panel));

  // Optional: active nav link on scroll
  const sections = document.querySelectorAll("section[id], footer[id]");
  const navLinks = document.querySelectorAll("nav .links a");

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${id}`;
        link.style.color = active ? "var(--accent-amber)" : "";
      });
    });
  }, { threshold: 0.5 });

  sections.forEach((sec) => sectionObserver.observe(sec));
})();