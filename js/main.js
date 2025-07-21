  document.addEventListener('DOMContentLoaded', () => {

    // Handle active nav link on click
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(nav => nav.classList.remove('active'));
      link.classList.add('active');
    });
  });

    // === Load HTML sections dynamically ===
    const sections = [
      { id: "about-section", file: "about" },
      { id: "skills-section", file: "skills" },
      { id: "projects-section", file: "projects" },
      { id: "contact-section", file: "contact" },
      { id: "footer-section", file: "footer" },
    ];

    sections.forEach(({ id, file }) => {
      const container = document.getElementById(id);
      fetch(`pages/${file}.html`)
        .then((res) => {
          if (!res.ok) throw new Error(`${file}.html not found`);
          return res.text();
        })
        .then((html) => {
          container.innerHTML = html;

          // Initialize logic after content loads
          if (file === 'about') initReadMoreToggle();
          if (file === 'skills') initSkillBars();
          if (file === 'contact') {
            import('/js/form.js')
              .then(module => {
                module.initContactForm();  // call the exported function
              })
              .catch(err => {
                console.error("Failed to load form.js", err);
              });
          }                       
          
        })
        .catch((err) => {
          console.error(err);
          container.innerHTML = `<p style="color:red;">Failed to load ${file}.html</p>`;
        });
    });

    // === Dark Mode Toggle ===
    const toggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');

    const setIcon = (theme) => {
      moonIcon.style.display = theme === 'dark' ? 'none' : 'inline-block';
      sunIcon.style.display = theme === 'dark' ? 'inline-block' : 'none';
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark');
      setIcon('dark');
    } else {
      setIcon('light');
    }

    toggle.addEventListener('click', () => {
      const isDark = body.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      setIcon(isDark ? 'dark' : 'light');
    });

    // === Typing Effect ===
    const typing = document.getElementById('typing');
    const roles = ["Full Stack Developer", "Web Developer", "UI/UX Designer"];
    let index = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
      const current = roles[index];
      if (deleting) {
        typing.textContent = current.substring(0, charIndex--);
        if (charIndex < 0) {
          deleting = false;
          index = (index + 1) % roles.length;
          setTimeout(typeEffect, 500);
        } else {
          setTimeout(typeEffect, 50);
        }
      } else {
        typing.textContent = current.substring(0, charIndex++);
        if (charIndex > current.length) {
          deleting = true;
          setTimeout(typeEffect, 1000);
        } else {
          setTimeout(typeEffect, 100);
        }
      }
    }

    if (typing) typeEffect();

    // === Read More Toggle ===
    function initReadMoreToggle() {
      const moreContent = document.getElementById('moreContent');
      const readMoreBtn = document.getElementById('readMoreBtn');

      if (!moreContent || !readMoreBtn) return;

      // Apply transition
      moreContent.style.overflow = 'hidden';
      moreContent.style.transition = 'max-height 0.5s ease';
      moreContent.style.maxHeight = '0px';

      readMoreBtn.addEventListener('click', () => {
        const isExpanded = moreContent.classList.toggle('expanded');

        if (isExpanded) {
          moreContent.style.maxHeight = moreContent.scrollHeight + "px";
          readMoreBtn.textContent = "Read Less";
        } else {
          moreContent.style.maxHeight = "0px";
          readMoreBtn.textContent = "Read More";
        }
      });
    }

    // === Skills Bar Animation ===
    function initSkillBars() {
      const skillSpans = document.querySelectorAll(".bar span");

      skillSpans.forEach((bar) => {
        const width = bar.getAttribute("data-width");
        bar.style.width = "0";
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      });
    }
    
  });
