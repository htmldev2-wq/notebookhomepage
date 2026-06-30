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
  let heroIndex = 0;
  const applyHero = (animate = false) => {
    const slide = heroSlides[heroIndex];
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
  document.querySelector(".hero__arrow--prev")?.addEventListener("click", () => {
    heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
    applyHero(true);
  });
  document.querySelector(".hero__arrow--next")?.addEventListener("click", () => {
    heroIndex = (heroIndex + 1) % heroSlides.length;
    applyHero(true);
  });

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

  const createCarousel = (sectionSelector, itemSelector, options = {}) => {
    const section = document.querySelector(sectionSelector);
    if (!section) return;
    const items = Array.from(section.querySelectorAll(itemSelector));
    if (items.length < 2) return;
    const positions = items.map((item) => ({
      left: item.style.left,
      top: item.style.top,
      width: item.style.width,
      height: item.style.height,
      zIndex: item.style.zIndex || ""
    }));
    let order = items.map((_, index) => index);
    const render = () => {
      order.forEach((itemIndex, slot) => {
        const item = items[itemIndex];
        item.classList.add("desktop-carousel-card");
        item.style.left = positions[slot].left;
        item.style.top = positions[slot].top;
        item.style.width = positions[slot].width;
        item.style.height = positions[slot].height;
        item.style.zIndex = positions[slot].zIndex;
        options.onRenderItem?.(item, slot);
      });
    };
    const move = (direction) => {
      if (direction > 0) order.unshift(order.pop());
      else order.push(order.shift());
      render();
    };
    section.querySelector(".arrow--prev")?.addEventListener("click", () => move(-1));
    section.querySelector(".arrow--next")?.addEventListener("click", () => move(1));
    render();
  };

  createCarousel(".deals", ".deal-card");
  createCarousel(".season", ".season-card");
  createCarousel(".testi", ".testi-card");
  createCarousel(".brand", ".brand-card", {
    onRenderItem: (item, slot) => setBrandCardState(item, slot === 2)
  });

  const setupMobileAutoSlider = (sectionSelector, itemSelector, options = {}) => {
    const section = document.querySelector(sectionSelector);
    if (!section) return;
    const items = Array.from(section.querySelectorAll(itemSelector));
    if (items.length < 2) return;
    const track = document.createElement("div");
    track.className = "mobile-auto-track";
    section.insertBefore(track, items[0]);
    items.forEach((item) => track.appendChild(item));
    let index = options.startIndex || 0;
    let timer = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let isDragging = false;
    const render = () => {
      if (window.innerWidth > 767) {
        track.style.transform = "";
        options.onSlide?.(items, -1);
        return;
      }
      track.style.transform = `translateX(-${index * 100}%)`;
      options.onSlide?.(items, index);
    };
    const start = () => {
      clearInterval(timer);
      render();
      if (window.innerWidth > 767) return;
      timer = setInterval(() => {
        index = (index + 1) % items.length;
        render();
      }, options.delay || 2800);
    };
    const moveTo = (direction) => {
      if (window.innerWidth > 767) return;
      index = (index + direction + items.length) % items.length;
      render();
      start();
    };
    track.addEventListener("touchstart", (event) => {
      if (window.innerWidth > 767) return;
      clearInterval(timer);
      const touch = event.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      isDragging = true;
      track.style.transition = "none";
    }, { passive: true });
    track.addEventListener("touchmove", (event) => {
      if (window.innerWidth > 767 || !touchStartX || !isDragging) return;
      const touch = event.touches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
        event.preventDefault();
        const width = track.getBoundingClientRect().width || 1;
        const dragPercent = (deltaX / width) * 100;
        track.style.transform = `translateX(${(-index * 100) + dragPercent}%)`;
      }
    }, { passive: false });
    track.addEventListener("touchend", (event) => {
      if (window.innerWidth > 767 || !touchStartX) return;
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStartX;
      touchStartX = 0;
      touchStartY = 0;
      isDragging = false;
      track.style.transition = "";
      if (Math.abs(deltaX) > 42) {
        moveTo(deltaX < 0 ? 1 : -1);
      } else {
        start();
      }
    });
    track.addEventListener("touchcancel", () => {
      touchStartX = 0;
      touchStartY = 0;
      isDragging = false;
      track.style.transition = "";
      start();
    });
    window.addEventListener("resize", start);
    start();
  };

  setupMobileAutoSlider(".deals", ".deal-card", { delay: 2600 });
  setupMobileAutoSlider(".season", ".season-card", { delay: 2800 });
  setupMobileAutoSlider(".testi", ".testi-card", { delay: 3200 });
  setupMobileAutoSlider(".brand", ".brand-card", {
    delay: 3000,
    startIndex: 2,
    onSlide: (items, activeIndex) => {
      if (activeIndex < 0) return;
      items.forEach((item, itemIndex) => setBrandCardState(item, itemIndex === activeIndex));
    }
  });

  const brandsSection = document.querySelector(".brands");
  const brandsRow = brandsSection?.querySelector(".brands__row");
  const brandLogos = brandsRow ? Array.from(brandsRow.querySelectorAll(".brand-logo")) : [];
  let brandLogoIndex = 0;
  let brandLogoTimer = 0;
  let brandTouchStartX = 0;
  let brandTouchStartY = 0;
  let brandIsDragging = false;
  const renderBrandLogoSlider = () => {
    if (!brandsRow) return;
    if (window.innerWidth > 767) {
      brandsRow.style.transform = "";
      return;
    }
    brandsRow.style.transform = `translateX(-${brandLogoIndex * 100}%)`;
  };
  brandsSection?.querySelector(".brands__carousel .arrow--prev")?.addEventListener("click", () => {
    if (!brandLogos.length) return;
    brandLogoIndex = (brandLogoIndex - 1 + brandLogos.length) % brandLogos.length;
    renderBrandLogoSlider();
  });
  brandsSection?.querySelector(".brands__carousel .arrow--next")?.addEventListener("click", () => {
    if (!brandLogos.length) return;
    brandLogoIndex = (brandLogoIndex + 1) % brandLogos.length;
    renderBrandLogoSlider();
  });
  const startBrandLogoAutoSlide = () => {
    clearInterval(brandLogoTimer);
    if (window.innerWidth > 767 || brandLogos.length < 2) {
      renderBrandLogoSlider();
      return;
    }
    brandLogoTimer = setInterval(() => {
      brandLogoIndex = (brandLogoIndex + 1) % brandLogos.length;
      renderBrandLogoSlider();
    }, 2600);
  };
  const moveBrandLogo = (direction) => {
    if (window.innerWidth > 767 || !brandLogos.length) return;
    brandLogoIndex = (brandLogoIndex + direction + brandLogos.length) % brandLogos.length;
    renderBrandLogoSlider();
    startBrandLogoAutoSlide();
  };
  brandsRow?.addEventListener("touchstart", (event) => {
    if (window.innerWidth > 767) return;
    clearInterval(brandLogoTimer);
    const touch = event.touches[0];
    brandTouchStartX = touch.clientX;
    brandTouchStartY = touch.clientY;
    brandIsDragging = true;
    brandsRow.style.transition = "none";
  }, { passive: true });
  brandsRow?.addEventListener("touchmove", (event) => {
    if (window.innerWidth > 767 || !brandTouchStartX || !brandIsDragging) return;
    const touch = event.touches[0];
    const deltaX = touch.clientX - brandTouchStartX;
    const deltaY = touch.clientY - brandTouchStartY;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
      event.preventDefault();
      const width = brandsRow.getBoundingClientRect().width || 1;
      const dragPercent = (deltaX / width) * 100;
      brandsRow.style.transform = `translateX(${(-brandLogoIndex * 100) + dragPercent}%)`;
    }
  }, { passive: false });
  brandsRow?.addEventListener("touchend", (event) => {
    if (window.innerWidth > 767 || !brandTouchStartX) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - brandTouchStartX;
    brandTouchStartX = 0;
    brandTouchStartY = 0;
    brandIsDragging = false;
    brandsRow.style.transition = "";
    if (Math.abs(deltaX) > 42) {
      moveBrandLogo(deltaX < 0 ? 1 : -1);
    } else {
      startBrandLogoAutoSlide();
    }
  });
  brandsRow?.addEventListener("touchcancel", () => {
    brandTouchStartX = 0;
    brandTouchStartY = 0;
    brandIsDragging = false;
    brandsRow.style.transition = "";
    startBrandLogoAutoSlide();
  });
  window.addEventListener("resize", startBrandLogoAutoSlide);
  renderBrandLogoSlider();
  startBrandLogoAutoSlide();

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
