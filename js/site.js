(function () {
  const PHONE_DISPLAY = "+971565233224";
  const WHATSAPP_NUMBER = "971565233224";
  const scale = () => Math.min(1, window.innerWidth / 1920);

  const toast = document.querySelector(".site-toast");
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("site-toast--show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("site-toast--show"), 2800);
  };

  const scrollToTarget = (target) => {
    const el = typeof target === "string" ? document.getElementById(target) : target;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top - 24 * scale();
    window.scrollTo({ top, behavior: "smooth" });
  };

  const mobileToggle = document.querySelector(".top-nav__toggle");
  const mobileMenu = document.querySelector(".top-nav__menu");
  const setMobileMenu = (open) => {
    mobileToggle?.classList.toggle("top-nav__toggle--open", open);
    mobileMenu?.classList.toggle("top-nav__menu--open", open);
    mobileToggle?.setAttribute("aria-expanded", String(open));
    mobileToggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  mobileMenu?.setAttribute("id", "mobile-menu");
  mobileToggle?.addEventListener("click", () => {
    setMobileMenu(!mobileMenu?.classList.contains("top-nav__menu--open"));
  });

  document.querySelectorAll("[data-scroll-target]").forEach((control) => {
    control.addEventListener("click", (event) => {
      event.preventDefault();
      setMobileMenu(false);
      scrollToTarget(control.dataset.scrollTarget);
    });
  });

  document.querySelectorAll("[data-action='brochure']").forEach((control) => {
    control.addEventListener("click", () => showToast("Brochure download will be available soon."));
  });

  const openWhatsApp = (message) => {
    const text = encodeURIComponent(message || "Hello NoteBook, I would like to know more about your corporate gifting products.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener");
  };

  document.querySelectorAll(".deal-card__wa, .pill--wa").forEach((control) => {
    control.setAttribute("href", `https://wa.me/${WHATSAPP_NUMBER}`);
    control.addEventListener("click", (event) => {
      event.preventDefault();
      const card = control.closest("article");
      const title = card?.querySelector("h3, .product-card__title")?.textContent?.trim();
      openWhatsApp(title ? `Hello NoteBook, I am interested in ${title}.` : undefined);
    });
  });

  document.querySelectorAll(".pill--enq, .season-card__btn, .brand-card__more").forEach((control) => {
    control.setAttribute("href", "#contact");
    control.addEventListener("click", (event) => {
      event.preventDefault();
      showToast("Request form is ready for your enquiry.");
      scrollToTarget("contact");
    });
  });

  document.querySelectorAll(".cat-card__btn").forEach((control) => {
    control.setAttribute("href", "#featured");
    control.addEventListener("click", (event) => {
      event.preventDefault();
      const name = control.closest(".cat-card")?.querySelector(".cat-card__name")?.textContent?.trim();
      showToast(name ? `Showing featured products for ${name}.` : "Showing featured products.");
      scrollToTarget("featured");
    });
  });

  document.querySelector(".categories__viewall")?.addEventListener("click", (event) => {
    event.preventDefault();
    showToast("Showing all promotional gift categories.");
    scrollToTarget("featured");
  });

  document.querySelector(".deals__btn")?.addEventListener("click", (event) => {
    event.preventDefault();
    showToast("Offer details are ready in the enquiry form.");
    scrollToTarget("contact");
  });

  document.querySelectorAll(".ftr-social a[href='#']").forEach((control) => {
    control.addEventListener("click", (event) => {
      event.preventDefault();
      showToast(`${control.querySelector("img")?.alt || "Social"} link will be connected soon.`);
    });
  });

  document.querySelectorAll(".project-card__more").forEach((control) => {
    control.setAttribute("href", "#contact");
    control.addEventListener("click", (event) => {
      event.preventDefault();
      const project = control.closest(".project-card")?.querySelector(".project-card__name")?.textContent?.trim();
      showToast(project ? `Tell us about your ${project} project.` : "Tell us about your branding project.");
      scrollToTarget("contact");
    });
  });

  document.querySelectorAll(".sector-card").forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    const activate = () => {
      const sector = card.querySelector(".sector-card__label")?.textContent?.trim();
      showToast(sector ? `Corporate gifting support for ${sector}.` : "Sector enquiry selected.");
      scrollToTarget("contact");
    };
    card.addEventListener("click", activate);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });
  });

  document.querySelector(".testi__write")?.addEventListener("click", (event) => {
    event.preventDefault();
    showToast("Google review link will be connected soon.");
  });

  const heroSlides = [
    { lines: ["Eco", "Friendly", "Gifts"], primary: "Explore Gifts Sets", secondary: "Request Custom Quote", image: "assets/images/hero.png" },
    { lines: ["Corporate", "Gift", "Sets"], primary: "View Products", secondary: "Get a Quote", image: "assets/images/hero-slide-2.png" },
    { lines: ["Custom", "Branded", "Merchandise"], primary: "Explore Products", secondary: "Start Enquiry", image: "assets/images/hero-slide-3.png" }
  ];
  const applyHero = (slide, animate = false) => {
    const heroImage = document.querySelector(".hero__image");
    const heroContent = document.querySelector(".hero__title");
    const update = () => {
      document.querySelectorAll("[data-hero-line]").forEach((line, index) => {
        line.textContent = slide.lines[index];
        line.classList.toggle("green", index < 2);
        line.classList.toggle("black", index === 2);
      });
      const primary = document.querySelector("[data-hero-primary]");
      const secondary = document.querySelector("[data-hero-secondary]");
      if (primary) primary.textContent = slide.primary;
      if (secondary) secondary.textContent = slide.secondary;
      if (heroImage) heroImage.style.backgroundImage = `url("${slide.image}")`;
    };
    if (!animate) {
      update();
      return;
    }
    heroImage?.classList.add("hero__image--switching");
    heroContent?.classList.add("hero__title--switching");
    window.setTimeout(() => {
      update();
      window.requestAnimationFrame(() => {
        heroImage?.classList.remove("hero__image--switching");
        heroContent?.classList.remove("hero__title--switching");
      });
    }, 150);
  };

  const setBrandCardState = (card, isActive) => {
    const label = card.querySelector(".brand-card__label");
    if (!label) return;
    const title = card.dataset.title || label.textContent.trim();
    const desc = card.dataset.desc || "Custom branding service details will be added soon.";
    label.classList.toggle("brand-card__label--active", isActive);
    if (isActive) {
      label.innerHTML = `
        <p class="brand-card__name">${title}</p>
        <p class="brand-card__sub">${desc}</p>
        <a class="brand-card__more" href="#contact">View More</a>
      `;
      const more = label.querySelector(".brand-card__more");
      more?.addEventListener("click", (event) => {
        event.preventDefault();
        showToast("Request form is ready for your enquiry.");
        scrollToTarget("contact");
      });
    } else {
      label.innerHTML = `<span>${title}</span>`;
    }
  };

  const hasSwiper = typeof window.Swiper === "function";

  const makeSwiper = (sectionSelector, itemSelector, options = {}) => {
    if (!hasSwiper) return null;
    const section = document.querySelector(sectionSelector);
    if (!section || section.querySelector(".site-swiper")) return null;
    const source = options.sourceSelector ? section.querySelector(options.sourceSelector) : section;
    if (!source) return null;
    const items = Array.from(source.querySelectorAll(`:scope > ${itemSelector}`));
    if (items.length < 2) return null;

    const swiperEl = document.createElement("div");
    swiperEl.className = `swiper site-swiper ${options.className || ""}`.trim();
    const wrapper = document.createElement("div");
    wrapper.className = "swiper-wrapper";
    swiperEl.appendChild(wrapper);
    section.insertBefore(swiperEl, options.sourceSelector ? source : items[0]);
    if (options.sourceSelector) source.remove();

    items.forEach((item) => {
      item.classList.add("swiper-slide");
      item.removeAttribute("style");
      wrapper.appendChild(item);
    });

    const nav = options.navSelector ? section.querySelector(options.navSelector) : null;
    const config = {
      loop: items.length > 2,
      speed: options.speed || 650,
      grabCursor: true,
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,
      allowTouchMove: true,
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 18,
      autoplay: options.autoplay ? {
        delay: options.delay || 2800,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      } : false,
      breakpoints: options.breakpoints || {},
      on: {
        init(swiper) {
          options.onActive?.(items, swiper.realIndex, swiper);
        },
        slideChange(swiper) {
          options.onActive?.(items, swiper.realIndex, swiper);
        }
      }
    };
    if (nav) {
      config.navigation = {
        prevEl: nav.querySelector(".arrow--prev"),
        nextEl: nav.querySelector(".arrow--next")
      };
    }
    return new window.Swiper(swiperEl, config);
  };

  if (hasSwiper) {
    const hero = document.querySelector(".hero");
    const heroImage = document.querySelector(".hero__image");
    if (hero && heroImage && !hero.querySelector(".hero__swiper")) {
      const heroSwiperEl = document.createElement("div");
      heroSwiperEl.className = "swiper hero__swiper";
      heroSwiperEl.innerHTML = `
        <div class="swiper-wrapper">
          ${heroSlides.map((slide) => `<div class="swiper-slide"><span class="hero__slide-bg" style="background-image:url('${slide.image}')"></span></div>`).join("")}
        </div>
      `;
      hero.insertBefore(heroSwiperEl, heroImage);
      heroImage.setAttribute("aria-hidden", "true");
      new window.Swiper(heroSwiperEl, {
        loop: true,
        speed: 700,
        effect: "fade",
        fadeEffect: { crossFade: true },
        allowTouchMove: true,
        autoplay: {
          delay: 3800,
          disableOnInteraction: false
        },
        navigation: {
          prevEl: ".hero__arrow--prev",
          nextEl: ".hero__arrow--next"
        },
        on: {
          init(swiper) {
            applyHero(heroSlides[swiper.realIndex], false);
          },
          slideChange(swiper) {
            applyHero(heroSlides[swiper.realIndex], true);
          }
        }
      });
    } else {
      applyHero(heroSlides[0], false);
    }

    makeSwiper(".deals", ".deal-card", {
      className: "deals__swiper",
      navSelector: ".deals__carousel",
      autoplay: true,
      delay: 2600,
      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 0, centeredSlides: false },
        768: { slidesPerView: 1, spaceBetween: 0, centeredSlides: false },
        1024: { slidesPerView: 3, spaceBetween: 21, centeredSlides: false }
      }
    });

    makeSwiper(".season", ".season-card", {
      className: "season__swiper",
      navSelector: ".season__carousel",
      autoplay: true,
      delay: 2800,
      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 0, centeredSlides: false },
        768: { slidesPerView: 1, spaceBetween: 0, centeredSlides: false },
        1024: { slidesPerView: 4, spaceBetween: 27, centeredSlides: false }
      }
    });

    makeSwiper(".testi", ".testi-card", {
      className: "testi__swiper",
      navSelector: ".testi__carousel",
      autoplay: true,
      delay: 3300,
      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 0, centeredSlides: false },
        768: { slidesPerView: 1, spaceBetween: 0, centeredSlides: false },
        1024: { slidesPerView: 2.35, spaceBetween: 38, centeredSlides: true }
      }
    });

    makeSwiper(".brand", ".brand-card", {
      className: "brand__swiper",
      navSelector: ".brand__carousel",
      autoplay: true,
      delay: 3000,
      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 0, centeredSlides: false },
        768: { slidesPerView: 1, spaceBetween: 0, centeredSlides: false },
        1024: { slidesPerView: 5, spaceBetween: 20, centeredSlides: true }
      },
      onActive: (items, activeIndex) => {
        items.forEach((item, itemIndex) => setBrandCardState(item, itemIndex === activeIndex));
      }
    });

    makeSwiper(".brands", ".brand-logo", {
      className: "brands__swiper",
      sourceSelector: ".brands__row",
      navSelector: ".brands__carousel",
      autoplay: true,
      delay: 2400,
      speed: 720,
      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 0, centeredSlides: false },
        768: { slidesPerView: 1, spaceBetween: 0, centeredSlides: false },
        1024: { slidesPerView: 7, spaceBetween: 48, centeredSlides: false }
      }
    });
  } else {
    applyHero(heroSlides[0], false);
  }

  const faqItems = Array.from(document.querySelectorAll(".faq-item"));
  const setFaqOpen = (activeIndex) => {
    let top = 83;
    faqItems.forEach((item, index) => {
      const isOpen = index === activeIndex;
      item.classList.toggle("faq-item--open", isOpen);
      item.setAttribute("aria-expanded", String(isOpen));
      item.style.top = `${top}px`;
      const icon = item.querySelector(".faq-item__icon img");
      if (icon) icon.src = isOpen ? "assets/images/ic-minus.svg" : "assets/images/ic-plus.svg";
      top += (isOpen ? 223 : 80) + 20;
    });
  };
  faqItems.forEach((item, index) => {
    item.addEventListener("click", () => setFaqOpen(index));
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setFaqOpen(index);
      }
    });
  });
  setFaqOpen(faqItems.findIndex((item) => item.classList.contains("faq-item--open")) || 0);

  const form = document.querySelector(".contact__form");
  if (form instanceof HTMLFormElement) {
    const status = form.querySelector(".contact__status");
    form.querySelectorAll("input, textarea").forEach((field) => {
      const updateFilled = () => field.closest(".field")?.classList.toggle("field--filled", Boolean(field.value.trim()));
      field.addEventListener("input", updateFilled);
      field.addEventListener("blur", updateFilled);
      updateFilled();
    });
    const setStatus = (message, type) => {
      if (!status) return;
      status.textContent = message;
      status.className = `contact__status contact__status--${type}`;
    };
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const fields = Array.from(form.querySelectorAll("input, textarea"));
      fields.forEach((field) => field.closest(".field")?.classList.remove("field--invalid"));
      const empty = fields.filter((field) => !field.value.trim());
      const email = form.elements.email;
      const invalidEmail = email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      [...empty, ...(invalidEmail ? [email] : [])].forEach((field) => field.closest(".field")?.classList.add("field--invalid"));
      if (empty.length || invalidEmail) {
        setStatus("Please complete all fields with a valid email address.", "error");
        return;
      }
      setStatus(`Thank you. We will contact you soon at ${PHONE_DISPLAY}.`, "success");
      form.reset();
      fields.forEach((field) => field.closest(".field")?.classList.remove("field--filled"));
    });
  }

  const searchPanel = document.querySelector(".search-panel");
  const searchInput = document.querySelector(".search-panel__input");
  document.querySelector(".top-nav__search")?.addEventListener("click", () => {
    searchPanel?.classList.add("search-panel--open");
    searchPanel?.setAttribute("aria-hidden", "false");
    searchInput?.focus();
  });
  document.querySelector(".search-panel__close")?.addEventListener("click", () => {
    searchPanel?.classList.remove("search-panel--open");
    searchPanel?.setAttribute("aria-hidden", "true");
  });
  document.querySelector(".search-panel__form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput?.value.trim().toLowerCase();
    if (!query) return;
    const candidates = Array.from(document.querySelectorAll("section, article, .faq-item"));
    const found = candidates.find((node) => node.textContent.toLowerCase().includes(query));
    if (!found) {
      showToast("No matching section found.");
      return;
    }
    const faqIndex = faqItems.indexOf(found);
    if (faqIndex >= 0) setFaqOpen(faqIndex);
    searchPanel?.classList.remove("search-panel--open");
    searchPanel?.setAttribute("aria-hidden", "true");
    showToast("Search result found.");
    scrollToTarget(found);
  });
})();
