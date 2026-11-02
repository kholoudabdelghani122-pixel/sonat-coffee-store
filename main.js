const menuToggle = document.querySelector(".menu-toggle");
const siteHeader = document.querySelector(".site-header");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  siteHeader.classList.toggle("menu-open", !isOpen);
});

document.querySelectorAll(".site-header nav a").forEach((link) => link.addEventListener("click", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  siteHeader.classList.remove("menu-open");
}));

document.querySelectorAll(".faq-question").forEach((button) => button.addEventListener("click", () => {
  const expanded = button.getAttribute("aria-expanded") === "true";
  const answer = document.getElementById(button.getAttribute("aria-controls"));
  button.setAttribute("aria-expanded", String(!expanded));
  answer.hidden = expanded;
  button.closest(".faq-item").classList.toggle("is-open", !expanded);
}));

document.querySelector(".footer-newsletter").addEventListener("submit", (event) => {
  event.preventDefault();
  const toast = document.querySelector(".toast");
  toast.textContent = "Thanks for your interest. Newsletter sign-up is coming soon.";
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
  event.currentTarget.reset();
});

document.querySelector(".wholesale-form:not(.contact-form)")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const toast = document.querySelector(".toast");
  toast.textContent = "Thanks for your interest. Our wholesale team will be in touch soon.";
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
  event.currentTarget.reset();
});

document.querySelector(".contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const toast = document.querySelector(".toast");
  toast.textContent = "Thanks for reaching out. Our team will be in touch soon.";
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
  event.currentTarget.reset();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".cafe-register-button")) return;
  const toast = document.querySelector(".toast");
  toast.textContent = "Café registrations are coming soon.";
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
});

document.querySelectorAll(".pdp-deal input").forEach((input) => input.addEventListener("change", () => {
  document.querySelectorAll(".pdp-deal").forEach((deal) => deal.classList.toggle("is-selected", deal.contains(input) && input.checked));
}));

const pdpProducts = {
  signature: {
    title: "SONAT Signature",
    name: "Signature",
    origin: "Source of Nature",
    image: "/assets/pdp-4b67e.png",
    imageAlt: "SONAT Signature 250g coffee bag",
    description: "A tribute to nature's perfection, balanced, smooth, and elegantly crafted from 100% Arabica beans sourced from the high-altitude farms of Brazil, Colombia, and Ethiopia.",
    notes: ["Milk Chocolate", "Caramel", "Almond"],
  },
  intenso: {
    title: "SONAT Intenso",
    name: "Intenso",
    origin: "Engineered Coffee Excellence",
    image: "/assets/intenso.png",
    imageAlt: "SONAT Intenso coffee bag",
    description: "Engineered for coffee lovers who seek intensity, depth, and uncompromising quality. Arabica meets selected Robusta for bold body, rich crema, and a refined dark chocolate finish.",
    notes: ["Dark Chocolate", "Toffee", "Roasted Hazelnut"],
  },
  cinnaspice: {
    title: "SONAT Cinnaspice",
    name: "Cinnaspice",
    origin: "A New Ritual of Flavor",
    image: "/assets/cinnaspice.png",
    imageAlt: "SONAT Cinnaspice coffee bag",
    description: "A smooth Arabica-forward blend infused with premium cinnamon flavor, balanced sweetness, gentle spice, and a comforting finish. A warm and aromatic ritual in every cup.",
    notes: ["Cinnamon", "Balanced Sweetness", "Comforting Finish"],
  },
  turkish: {
    title: "SONAT Turkish Coffee",
    name: "Turkish Coffee",
    origin: "Rich Foam · Smooth Strength",
    image: "/assets/turkish.png",
    imageAlt: "SONAT Turkish Coffee bag",
    description: "Inspired by centuries of tradition. Extra-fine ground premium Arabica crafted to create a rich foam, smooth strength, and full-bodied authentic Turkish coffee experience.",
    notes: ["Rich Foam", "Full Body", "Smooth Strength"],
  },
  nocciola: {
    title: "SONAT Nocciola",
    name: "Nocciola",
    origin: "Rich Aroma Experience",
    image: "/assets/nocciola.png",
    imageAlt: "SONAT Nocciola coffee bag",
    description: "Premium coffee blended with smooth roasted hazelnut flavor, warm, nutty, and perfectly balanced. Crafted for indulgent everyday moments with a velvety finish.",
    notes: ["Roasted Hazelnut", "Warm & Nutty", "Velvety Finish"],
  },
  arabic: {
    title: "SONAT Arabic Coffee",
    name: "Arabic Coffee",
    origin: "Heritage in Every Cup",
    image: "/assets/arabic.png",
    imageAlt: "SONAT Arabic Coffee bag",
    description: "Inspired by timeless gatherings and authentic Arabian tradition. Lightly roasted premium Arabica that delivers a smooth texture, delicate aroma, and refined finish.",
    notes: ["Delicate Floral", "Light Body", "Warm & Aromatic"],
  },
};

const pdpTitle = document.querySelector("[data-pdp-title]");
if (pdpTitle) {
  const requestedProduct = new URLSearchParams(window.location.search).get("product")?.toLowerCase();
  const product = pdpProducts[requestedProduct] || pdpProducts.signature;
  const image = document.querySelector("[data-pdp-image]");
  const origin = document.querySelector("[data-pdp-origin]");
  const description = document.querySelector("[data-pdp-description]");
  const tags = document.querySelector("[data-pdp-tags]");
  pdpTitle.textContent = product.title;
  document.title = `${product.title} — SONAT Coffee`;
  document.querySelector("[data-pdp-meta-description]")?.setAttribute("content", `Meet ${product.title}, ${product.description}`);
  if (image) {
    image.src = product.image;
    image.alt = product.imageAlt;
  }
  if (origin) origin.textContent = product.origin;
  if (description) description.textContent = product.description;
  if (tags) {
    tags.replaceChildren(...product.notes.map((note) => {
      const tag = document.createElement("li");
      tag.textContent = note;
      return tag;
    }));
  }
}

document.querySelectorAll("[data-pdp-action]").forEach((button) => button.addEventListener("click", () => {
  const toast = document.querySelector(".toast");
  const cartCount = document.querySelector(".cart-count");
  const productName = document.querySelector("[data-pdp-title]")?.textContent.replace(/^SONAT\s+/, "") || "Signature";
  if (button.dataset.pdpAction === "add") {
    if (cartCount) cartCount.textContent = String(Number(cartCount.textContent || 0) + 1);
    toast.textContent = `SONAT ${productName} added to your bag.`;
  } else {
    toast.textContent = "Your selected deal is ready. Checkout is coming soon.";
  }
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}));

const accountPage = document.querySelector(".account-page");
if (accountPage) {
  const authView = accountPage.querySelector('[data-account-screen="auth"]');
  const dashboard = accountPage.querySelector('[data-account-screen="dashboard"]');
  const authTitle = accountPage.querySelector("[data-auth-title]");
  const authCopy = accountPage.querySelector("[data-auth-copy]");
  const toast = document.querySelector(".toast");
  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.setTimeout(() => toast.classList.remove("is-visible"), 3000);
  };
  const setMode = (mode) => {
    authView.classList.toggle("is-reset", mode === "forgot");
    authView.querySelectorAll("[data-account-form]").forEach((form) => {
      form.hidden = form.dataset.accountForm !== mode;
    });
    authView.querySelectorAll("[data-account-mode]").forEach((button) => {
      const active = button.dataset.accountMode === mode;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    if (mode === "forgot") {
      authTitle.textContent = "Reset your password";
      authCopy.textContent = "Enter the email associated with your account and we’ll send a reset link.";
    } else if (mode === "register") {
      authTitle.textContent = "Create your account";
      authCopy.textContent = "A few details now, and your SONAT orders all in one place.";
    } else {
      authTitle.textContent = "Sign in to your account";
      authCopy.textContent = "Pick up where your next great cup begins.";
    }
  };
  const setDashboardSection = (section) => {
    dashboard.querySelectorAll("[data-dashboard-section]").forEach((panel) => {
      panel.hidden = panel.dataset.dashboardSection !== section;
    });
    dashboard.querySelectorAll("[data-dashboard-tab]").forEach((button) => {
      const active = button.dataset.dashboardTab === section;
      button.classList.toggle("is-active", active);
      if (button.getAttribute("role") === "tab") button.setAttribute("aria-selected", String(active));
    });
  };

  accountPage.querySelectorAll("[data-account-mode]").forEach((button) => button.addEventListener("click", () => setMode(button.dataset.accountMode)));
  accountPage.querySelectorAll("[data-account-view]").forEach((button) => button.addEventListener("click", () => setMode(button.dataset.accountView)));
  accountPage.querySelectorAll("[data-dashboard-tab]").forEach((button) => button.addEventListener("click", () => setDashboardSection(button.dataset.dashboardTab)));
  accountPage.querySelector("[data-open-dashboard]").addEventListener("click", () => {
    authView.hidden = true;
    dashboard.hidden = false;
    setDashboardSection("overview");
  });
  accountPage.querySelectorAll('[data-account-view="login"]').forEach((button) => button.addEventListener("click", () => {
    dashboard.hidden = true;
    authView.hidden = false;
    setMode("login");
  }));
  accountPage.querySelectorAll("[data-password-toggle]").forEach((button) => button.addEventListener("click", () => {
    const input = button.parentElement.querySelector("input");
    const reveal = input.type === "password";
    input.type = reveal ? "text" : "password";
    button.textContent = reveal ? "Hide" : "Show";
    button.setAttribute("aria-label", `${reveal ? "Hide" : "Show"} password`);
  }));
  accountPage.querySelectorAll("[data-account-form]").forEach((form) => form.addEventListener("submit", (event) => {
    event.preventDefault();
    const messages = {
      login: "Sign-in will be enabled when the store account service is connected.",
      register: "Registration will be enabled when the store account service is connected.",
      forgot: "Password reset will be enabled when the store account service is connected.",
    };
    showToast(messages[form.dataset.accountForm]);
  }));
  accountPage.querySelector("[data-toggle-password-form]").addEventListener("click", (event) => {
    const form = accountPage.querySelector(".account-change-password");
    form.hidden = !form.hidden;
    event.currentTarget.textContent = form.hidden ? "Change password" : "Cancel";
  });
  accountPage.querySelector(".account-change-password").addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Password updates will be available after secure account setup.");
  });
  accountPage.querySelectorAll("[data-account-message]").forEach((button) => button.addEventListener("click", () => showToast("Profile updates will be available when the account service is connected.")));
}
