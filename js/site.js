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
    { lines: ["Eco", "Friendly", "Gifts"], primary: "Explore Gifts Sets", secondary: "Request Custom Quote" },
    { lines: ["Corporate", "Gift", "Sets"], primary: "View Products", secondary: "Get a Quote" },
    { lines: ["Custom", "Branded", "Merchandise"], primary: "Explore Products", secondary: "Start Enquiry" }
  ];
  let heroIndex = 0;
  const applyHero = () => {
    const slide = heroSlides[heroIndex];
    document.querySelectorAll("[data-hero-line]").forEach((line, index) => {
      line.textContent = slide.lines[index];
      line.classList.toggle("green", index < 2);
      line.classList.toggle("black", index === 2);
    });
    const primary = document.querySelector("[data-hero-primary]");
    const secondary = document.querySelector("[data-hero-secondary]");
    if (primary) primary.textContent = slide.primary;
    if (secondary) secondary.textContent = slide.secondary;
  };
  document.querySelector(".hero__arrow--prev")?.addEventListener("click", () => {
    heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
    applyHero();
  });
  document.querySelector(".hero__arrow--next")?.addEventListener("click", () => {
    heroIndex = (heroIndex + 1) % heroSlides.length;
    applyHero();
  });

  const createCarousel = (sectionSelector, itemSelector) => {
    const section = document.querySelector(sectionSelector);
    if (!section) return;
    const items = Array.from(section.querySelectorAll(itemSelector));
    if (items.length < 2) return;
    const positions = items.map((item) => ({ left: item.style.left, top: item.style.top, zIndex: item.style.zIndex || "" }));
    let order = items.map((_, index) => index);
    const render = () => {
      order.forEach((itemIndex, slot) => {
        const item = items[itemIndex];
        item.style.left = positions[slot].left;
        item.style.top = positions[slot].top;
        item.style.zIndex = positions[slot].zIndex;
      });
    };
    const move = (direction) => {
      if (direction > 0) order.unshift(order.pop());
      else order.push(order.shift());
      render();
    };
    section.querySelector(".arrow--prev")?.addEventListener("click", () => move(-1));
    section.querySelector(".arrow--next")?.addEventListener("click", () => move(1));
  };

  createCarousel(".deals", ".deal-card");
  createCarousel(".season", ".season-card");
  createCarousel(".testi", ".testi-card");
  createCarousel(".brand", ".brand-card");

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
