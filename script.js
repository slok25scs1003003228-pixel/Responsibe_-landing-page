document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // MOBILE HAMBURGER MENU
  // ==============================

  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector("#site-nav");

  if (menuToggle && siteNav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = menuToggle.classList.toggle("active");

      siteNav.classList.toggle("open", isOpen);

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation"
          : "Open navigation"
      );
    });


    // Close menu after clicking a navigation link
    siteNav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        menuToggle.classList.remove("active");
        siteNav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );

      });

    });


    // Close menu when clicking outside
    document.addEventListener("click", event => {

      if (
        !siteNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {

        menuToggle.classList.remove("active");
        siteNav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );

      }

    });

  }


  // ==============================
  // ACTIVE NAVIGATION SECTION
  // ==============================

  const sections = [
    ...document.querySelectorAll("main section[id]")
  ];

  const navLinks = [
    ...document.querySelectorAll(
      '.site-nav a[href^="#"]'
    )
  ];


  const sectionObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {

          link.classList.toggle(
            "current",
            link.getAttribute("href") ===
            `#${entry.target.id}`
          );

        });

      });

    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );


  sections.forEach(section => {
    sectionObserver.observe(section);
  });


  // ==============================
  // SCROLL REVEAL ANIMATION
  // ==============================

  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.12
    }
  );


  document
    .querySelectorAll(".reveal")
    .forEach(element => {

      revealObserver.observe(element);

    });


  // ==============================
  // SIGNUP FORM
  // ==============================

  const form =
    document.querySelector("#signup-form");

  const email =
    document.querySelector("#email");

  const message =
    document.querySelector("#form-message");


  if (form) {

    form.addEventListener("submit", event => {

      event.preventDefault();


      // Check email validity
      if (!email.checkValidity()) {

        email.reportValidity();

        return;

      }


      // Success message
      message.textContent =
        `Thanks — ${email.value} is on the list.`;


      // Clear input
      form.reset();

    });

  }

});
