document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.querySelector(".menu-toggle");
  const navWrap = document.querySelector(".nav-wrap");
  const navLinks = document.querySelectorAll(".nav-link");

  const year = document.getElementById("current-year");
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const backTop = document.getElementById("back-top");


  /* ================= YEAR ================= */

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* ================= MOBILE MENU ================= */

  function setMenu(open) {

    if (!navWrap || !menuToggle) return;

    navWrap.classList.toggle("open", open);

    document.body.classList.toggle(
      "menu-open",
      open
    );

    menuToggle.setAttribute(
      "aria-expanded",
      String(open)
    );

    menuToggle.setAttribute(
      "aria-label",
      open
        ? "Close navigation menu"
        : "Open navigation menu"
    );
  }


  menuToggle?.addEventListener("click", () => {

    const isOpen =
      navWrap.classList.contains("open");

    setMenu(!isOpen);

  });


  navLinks.forEach(link => {

    link.addEventListener("click", () => {
      setMenu(false);
    });

  });


  document.addEventListener("click", event => {

    if (
      navWrap &&
      menuToggle &&
      navWrap.classList.contains("open") &&
      !navWrap.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      setMenu(false);
    }

  });


  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      setMenu(false);
    }

  });


  /* ================= SCROLL REVEAL ================= */

  const revealItems =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealItems.forEach(item => {

      revealObserver.observe(item);

    });

  } else {

    revealItems.forEach(item => {

      item.classList.add("visible");

    });

  }


  /* ================= ACTIVE NAV ================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navMap = new Map(
    [...navLinks].map(link => [

      link
        .getAttribute("href")
        .replace("#", ""),

      link

    ])
  );


  if ("IntersectionObserver" in window) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting)
              return;

            navLinks.forEach(link => {

              link.classList.remove(
                "active"
              );

            });


            const active =
              navMap.get(
                entry.target.id
              );


            if (active) {

              active.classList.add(
                "active"
              );

            }

          });

        },
        {
          rootMargin:
            "-40% 0px -50% 0px",

          threshold: 0
        }
      );


    sections.forEach(section => {

      sectionObserver.observe(section);

    });

  }


  /* ================= BACK TO TOP ================= */

  window.addEventListener(
    "scroll",
    () => {

      if (!backTop) return;

      backTop.classList.toggle(
        "show",
        window.scrollY > 650
      );

    },
    {
      passive: true
    }
  );


  backTop?.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


  /* ================= PROJECT LINKS ================= */

  document
    .querySelectorAll(".project-link")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          const project =
            link.dataset.project ||
            "your project";

          const select =
            document.getElementById(
              "project"
            );


          if (!select) return;


          [...select.options].forEach(
            option => {

              option.selected =
                option.textContent ===
                project;

            }
          );

        }
      );

    });


  /* ================= CONTACT FORM ================= */

  form?.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      if (!form.checkValidity()) {

        form.reportValidity();

        return;

      }


      const formData =
        new FormData(form);


      const name =
        String(
          formData.get("name") || ""
        ).trim();


      const email =
        String(
          formData.get("email") || ""
        ).trim();


      const phone =
        String(
          formData.get("phone") || ""
        ).trim();


      const project =
        String(
          formData.get("project") || ""
        ).trim();


      const message =
        String(
          formData.get("message") || ""
        ).trim();


      if (
        !name ||
        !email ||
        !project ||
        !message
      ) {

        if (status) {

          status.textContent =
            "Please complete the required fields.";

        }

        return;

      }


      const subject =
        `Project Enquiry — ${project}`;


      const body = [

        "Hello MR K SOLUTIONS,",

        "",

        `Name: ${name}`,

        `Email: ${email}`,

        `Phone: ${
          phone || "Not provided"
        }`,

        `Project Type: ${project}`,

        "",

        "Message:",

        message,

        "",

        "Sent from the MR K SOLUTIONS website."

      ].join("\n");


      const mailto =
        `mailto:chandrakantaj50@gmail.com` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;


      if (status) {

        status.textContent =
          "Opening your email application...";

      }


      window.location.href = mailto;


      setTimeout(() => {

        if (status) {

          status.textContent =
            "If your email app did not open, please email chandrakantaj50@gmail.com directly.";

        }

      }, 2200);

    }
  );

});
