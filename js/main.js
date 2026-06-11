/**
 * main.js - AstroVoyage Space Tourism Agency
 * Central JSON structures and modern ES6+ vanilla JavaScript engine
 */

// 1. Centralized Data (JSON format)
const destinationsData = [
  {
    id: "moon",
    name: "The Lunar Ridge",
    tag: "Quiet Outpost",
    category: "inner",
    img: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=800&auto=format&fit=crop",
    duration: "Seven Days",
    distance: "384,000 km",
    price: 150000,
    desc: "A contemplative week-long residence overlooking the absolute silence of the lunar dunes. Spend your evenings under the soft, blue-gold glow of Earth, resting inside elegant subterranean sand domes lined with natural cedar and polished travertine."
  },
  {
    id: "mars",
    name: "The Red Dunes",
    tag: "Desert Sanctuary",
    category: "inner",
    img: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=800&auto=format&fit=crop",
    duration: "Fourteen Days",
    distance: "Near Orbit",
    price: 1200000,
    desc: "An architectural settlement set seamlessly into the ancient cliffs of Mars. Experience quiet rover excursions into iron-red mineral flats, culminating in small-group geologic study circles and local botanical glasshouse dining."
  },
  {
    id: "europa",
    name: "The Europa Shelf",
    tag: "Deep Subglacial Sanctuary",
    category: "outer",
    img: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=800&auto=format&fit=crop",
    duration: "Three Months",
    distance: "Outer Orbit",
    price: 2500000,
    desc: "A sanctuary of glass and steel anchored deep beneath the subglacial ocean shelves of Europa. Guests are treated to custom thermal suites, biological study libraries, and rare, poetic views of deep-vent marine bioluminescence."
  },
  {
    id: "titan",
    name: "The Titan Coast",
    tag: "Atmospheric Glass Port",
    category: "outer",
    img: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=800&auto=format&fit=crop",
    duration: "Five Months",
    distance: "Outer Orbit",
    price: 3800000,
    desc: "Observe the slow, colossal rings of Saturn through Titan’s soft, gold-tinted nitrogen mist. This curated journey offers soundless glider flights over liquid ethane coastal dunes, returning to warm, low-gravity spas and private observatory quarters."
  },
  {
    id: "orbital",
    name: "The Low Orbit Path",
    tag: "Suborbital Drift",
    category: "orbital",
    img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop",
    duration: "Six Hours",
    distance: "Orbital",
    price: 75000,
    desc: "A pure, minimalist escape from gravity. Float gracefully 400 kilometers above the planet for several silent orbits, sipping tea while tracing Earth's soft atmospheric blue curve through pristine quartz panoramic glass."
  }
];

const fleetData = [
  {
    id: "voyager",
    name: "The Voyager Liner",
    tag: "Long-Range Cruiser",
    img: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=800&auto=format&fit=crop",
    specSpeed: "Continuous Gentle Drift",
    specCap: "Single-berth Private cabins",
    specProp: "Titanium-Lead Core Architecture",
    specDefense: "French White Oak & Linen Trims",
    priceRange: "Inquire for Private Charter",
    desc: "The hallmark of quiet long-haul cosmic transit. Features expansive library lounges, discrete reading alcoves, and a dedicated culinary deck offering multi-course botanical courses curated by culinary masters."
  },
  {
    id: "eclipse",
    name: "The Aether Cruiser",
    tag: "Private Exploratory Vessel",
    img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop",
    specSpeed: "Solar Thermal Slipstream",
    specCap: "Twelve Guest Berths",
    specProp: "Solid-state Magnetic Isolation",
    specDefense: "Polished Walnut & Wool Interiors",
    priceRange: "Custom Charter Quotation",
    desc: "An architectural space yacht designed for private expeditions. Its double-insulated fuselage provides absolute sonic dampening, ensuring a soundless, peaceful retreat during high-altitude voyages."
  },
  {
    id: "gossamer",
    name: "The Sail Vessel",
    tag: "Starlight Propulsion Yacht",
    img: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=800&auto=format&fit=crop",
    specSpeed: "Silent Starlight Coast",
    specCap: "Four Private Suites",
    specProp: "Reflective Quartz Filament Sails",
    specDefense: "Brushed Platinum & Silk Appointments",
    priceRange: "Seasonal Charter Only",
    desc: "Experience the pure, romantic utility of radiation pressure. The starlight sail captures stellar photons with infinite grace, coasting silently without combustion, allowing passengers to hear only the soft hum of life support."
  }
];

// 2. Global DOM Content Loaded Handler
document.addEventListener("DOMContentLoaded", () => {
  initGlobalNavigation();
  initDestinationsGallery();
  initFleetGallery();
  initBookingSystem();
  initScrollReveal();
});

// A. Global Layout and Accessibility: Mobile Hamburger & Active Active Paths
function initGlobalNavigation() {
  const toggleBtn = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
      toggleBtn.setAttribute("aria-expanded", !isExpanded);
      toggleBtn.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Sub-menus close on Esc key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        toggleBtn.classList.remove("active");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.focus();
      }
    });
  }

  // Active navigation tab high-contrast styling
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");
  
  // Remove "active" from all links to start clean
  navLinks.forEach(link => link.classList.remove("active"));
  
  let matched = false;
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    
    // Normalize path comparison (remove leading/trailing slashes, and .html extensions)
    const cleanHref = href.replace(/^\.?\//, "").replace(/\.html$/, "");
    const cleanPath = currentPath.replace(/^\.?\//, "").replace(/\.html$/, "").replace(/\/$/, "");
    
    if (cleanHref && (cleanPath === cleanHref || cleanPath.endsWith(cleanHref))) {
      link.classList.add("active");
      matched = true;
    }
  });
  
  // Fallback to Home if we are at root, index.html, or no link was matched
  if (!matched || currentPath === "/" || currentPath.endsWith("/index.html") || currentPath.endsWith("/index") || currentPath === "") {
    const homeLink = document.getElementById("nav-home");
    if (homeLink) {
      navLinks.forEach(link => link.classList.remove("active"));
      homeLink.classList.add("active");
    }
  }
}

// B. Dynamic planetary trips injection & high-contrast filtering
function initDestinationsGallery() {
  const destGrid = document.getElementById("destinations-grid");
  const filterContainer = document.getElementById("destinations-filters");
  
  // Element Guard Clause
  if (!destGrid) return;

  function renderDestinations(categoryFilter = "all") {
    destGrid.innerHTML = ""; // Clear existing grid
    
    const filteredData = categoryFilter === "all" 
      ? destinationsData 
      : destinationsData.filter(d => d.category === categoryFilter);

    if (filteredData.length === 0) {
      destGrid.innerHTML = `
        <div style="grid-column: span 3; text-align:center; padding:3rem;">
          <p>No космический flight itineraries match this coordinate.</p>
        </div>
      `;
      return;
    }

    filteredData.forEach((dest, index) => {
      const formattedPrice = dest.price.toLocaleString('en-US');
      const cardHtml = `
        <article class="card" id="dest-card-${dest.id}" style="animation: fadeInUp 0.3s ease-out forwards; animation-delay: ${index * 0.05}s;">
          <div class="card-image-box">
            <img 
              src="${dest.img}" 
              alt="Spectacular landscape vista of ${dest.name}" 
              class="card-img" 
              referrerpolicy="no-referrer"
              id="dest-img-${dest.id}"
            />
            <span class="card-badge" id="dest-badge-${dest.id}">${dest.tag}</span>
          </div>
          <div class="card-body">
            <h3 id="dest-title-${dest.id}">${dest.name}</h3>
            <p style="margin-bottom: 1.25rem; font-size: 0.88rem; line-height: 1.6;">${dest.desc}</p>
            <div class="card-meta" style="font-size: 0.8rem; color: var(--text-secondary); display: flex; gap: 1rem; margin-bottom: 1.25rem;">
              <span>Duration: <strong>${dest.duration}</strong></span>
              <span>Distance: <strong>${dest.distance}</strong></span>
            </div>
            <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; border-top: 1px solid var(--border-light); padding-top: 1rem; flex-wrap: wrap;">
              <div style="flex-shrink: 0;">
                <span style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-secondary); display: block; letter-spacing: 0.05em;">Base Consideration</span>
                <span style="font-family: var(--font-display); font-size: 1.15rem; font-weight: 400; color: var(--accent-cyan);">$${formattedPrice}</span>
              </div>
              <a href="book.html?destination=${dest.id}" class="btn btn-outline btn-sm" style="flex-shrink: 0;" id="btn-book-dest-${dest.id}">Book Voyage</a>
            </div>
          </div>
        </article>
      `;
      destGrid.insertAdjacentHTML("beforeend", cardHtml);
    });
  }

  // Render all initially
  renderDestinations();

  // Attach event filters
  if (filterContainer) {
    const filterButtons = filterContainer.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        // Toggle Active Styling Class and Ingress Pressed Attribute
        filterButtons.forEach(b => {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");

        const targetCategory = btn.dataset.filter;
        renderDestinations(targetCategory);
      });
    });
  }
}

// C. Dynamic spaceship specs rendering
function initFleetGallery() {
  const fleetGrid = document.getElementById("fleet-grid");
  
  // Element Guard Clause
  if (!fleetGrid) return;

  fleetData.forEach((ship, index) => {
    const cardHtml = `
      <article class="card" id="fleet-card-${ship.id}" style="animation: fadeInUp 0.3s ease-out forwards; animation-delay: ${index * 0.05}s;">
        <div class="card-image-box">
          <img 
            src="${ship.img}" 
            alt="Aerodynamic flight chassis model of ${ship.name}" 
            class="card-img" 
            referrerpolicy="no-referrer"
            id="fleet-img-${ship.id}"
          />
          <span class="card-badge" id="fleet-badge-${ship.id}">${ship.tag}</span>
        </div>
        <div class="card-body">
          <h3 id="fleet-title-${ship.id}">${ship.name}</h3>
          <p style="margin-bottom: 1.25rem; font-size: 0.88rem; line-height: 1.6;">${ship.desc}</p>
          
          <!-- Detailed propulsion and hulls specs -->
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 1.5rem; font-size: 0.8rem; border-top: 1px solid var(--border-light); padding-top: 1rem;" aria-label="${ship.name} Specifications">
            <li style="display:flex; justify-content:space-between;"><span style="color:var(--text-secondary);">Propulsion:</span> <strong style="color:var(--text-pure); font-size:0.78rem; text-align:right;">${ship.specProp}</strong></li>
            <li style="display:flex; justify-content:space-between;"><span style="color:var(--text-secondary);">Maximum Speed:</span> <strong style="color:var(--text-pure); font-size:0.78rem; text-align:right;">${ship.specSpeed}</strong></li>
            <li style="display:flex; justify-content:space-between;"><span style="color:var(--text-secondary);">Shielding Cap:</span> <strong style="color:var(--text-pure); font-size:0.78rem; text-align:right;">${ship.specDefense}</strong></li>
            <li style="display:flex; justify-content:space-between;"><span style="color:var(--text-secondary);">Total Seating:</span> <strong style="color:var(--text-pure); font-size:0.78rem; text-align:right;">${ship.specCap}</strong></li>
          </ul>

          <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; border-top: 1px solid var(--border-light); padding-top: 1rem; flex-wrap: wrap;">
            <div style="flex-shrink: 0;">
              <span style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-secondary); display: block; letter-spacing: 0.05em;">Charter Range</span>
              <span style="font-family: var(--font-display); font-size: 1.15rem; font-weight: 400; color: var(--accent-cyan);">${ship.priceRange}</span>
            </div>
            <a href="book.html?vessel=${ship.id}" class="btn btn-outline btn-sm" style="flex-shrink: 0;" id="btn-charter-${ship.id}">Reserve Seat</a>
          </div>
        </div>
      </article>
    `;
    fleetGrid.insertAdjacentHTML("beforeend", cardHtml);
  });
}

// D. Live booking price calculator and digital tick confirmation
function initBookingSystem() {
  const form = document.getElementById("space-booking-form");
  
  // Element Guard Clause
  if (!form) return;

  const destSelect = document.getElementById("book-destination");
  const cabinSelect = document.getElementById("book-cabin");
  const travelersInput = document.getElementById("book-travelers");
  
  // Cost outputs
  const sumBase = document.getElementById("sum-base");
  const sumCabin = document.getElementById("sum-cabin");
  const sumTravelers = document.getElementById("sum-travelers");
  const sumTax = document.getElementById("sum-tax");
  const sumTotal = document.getElementById("sum-total");

  // Modal elements
  const modalOverlay = document.getElementById("booking-modal");
  const modalCloseBtn = document.getElementById("btn-close-modal");
  const modalTicketName = document.getElementById("ticket-name");
  const modalTicketDest = document.getElementById("ticket-dest");
  const modalTicketCabin = document.getElementById("ticket-cabin");
  const modalTicketShuttle = document.getElementById("ticket-shuttle");

  // Parse potential preset url values e.g. destinations.html details link -> book.html?destination=mars
  const urlParams = new URLSearchParams(window.location.search);
  const presetDest = urlParams.get("destination");
  const presetVessel = urlParams.get("vessel");

  if (presetDest && destSelect) {
    // Select option with value matching the query parameter
    Array.from(destSelect.options).forEach(opt => {
      if (opt.value === presetDest) {
        destSelect.value = opt.value;
      }
    });
  }

  if (presetVessel) {
    const vesselSelect = document.getElementById("book-vessel");
    if (vesselSelect) {
      Array.from(vesselSelect.options).forEach(opt => {
        if (opt.value === presetVessel) {
          vesselSelect.value = opt.value;
        }
      });
    }
  }

  // Active recalculation algorithm
  function calculatePricing() {
    if (!destSelect || !cabinSelect || !travelersInput) return;

    // Get selected option price attribute
    const selectedDestOpt = destSelect.options[destSelect.selectedIndex];
    const baseCost = parseInt(selectedDestOpt.getAttribute("data-price")) || 0;

    // Get selected cabin multiplier factor
    const selectedCabinOpt = cabinSelect.options[cabinSelect.selectedIndex];
    const cabinMult = parseFloat(selectedCabinOpt.getAttribute("data-mult")) || 1.0;

    // Get travelers count
    let travelers = parseInt(travelersInput.value) || 1;
    if (travelers < 1) travelers = 1;
    if (travelers > 10) travelers = 10;

    // Run absolute math
    const subtotal = baseCost * cabinMult * travelers;
    const taxRate = 0.12; // 12% space gravity and fuel tax
    const fuelTax = subtotal * taxRate;
    const finalTotal = subtotal + fuelTax;

    // Inject to sidebar
    if (sumBase) sumBase.textContent = `$${baseCost.toLocaleString()}`;
    if (sumCabin) sumCabin.textContent = `${cabinMult}x (${selectedCabinOpt.text.split(" (+")[0].split(" (Base")[0]})`;
    if (sumTravelers) sumTravelers.textContent = travelers;
    if (sumTax) sumTax.textContent = `$${Math.round(fuelTax).toLocaleString()}`;
    if (sumTotal) sumTotal.textContent = `$${Math.round(finalTotal).toLocaleString()}`;
  }

  // Wire events
  if (destSelect) destSelect.addEventListener("change", calculatePricing);
  if (cabinSelect) cabinSelect.addEventListener("change", calculatePricing);
  if (travelersInput) {
    travelersInput.addEventListener("input", calculatePricing);
    travelersInput.addEventListener("change", calculatePricing);
  }

  // Calculate once initially
  calculatePricing();

  // Form submission overlay modal
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Verify fields are present
    const passengerName = document.getElementById("book-name").value;
    const destName = destSelect.options[destSelect.selectedIndex].text.split(" -")[0];
    const cabinVal = cabinSelect.options[cabinSelect.selectedIndex].text.split(" (+")[0].split(" (Base")[0];
    const vesselVal = document.getElementById("book-vessel").options[document.getElementById("book-vessel").selectedIndex].text.split(" (")[0];

    // Populate Boarding Ticket Pass graphics
    if (modalTicketName) modalTicketName.textContent = passengerName;
    if (modalTicketDest) modalTicketDest.textContent = destName;
    if (modalTicketCabin) modalTicketCabin.textContent = cabinVal;
    if (modalTicketShuttle) modalTicketShuttle.textContent = vesselVal;

    // Save registration coordinates in browser storage
    const reservationRecord = {
      passenger: passengerName,
      email: document.getElementById("book-email").value,
      destination: destSelect.value,
      vessel: document.getElementById("book-vessel").value,
      cabin: cabinSelect.value,
      travelers: travelersInput.value,
      bookingTime: new Date().toISOString()
    };
    
    localStorage.setItem("astro_voyage_cabin", JSON.stringify(reservationRecord));

    // Show modal pass
    if (modalOverlay) {
      modalOverlay.classList.add("active");
      // Set focus to closing button for keyboard accessibility trap
      setTimeout(() => {
        modalCloseBtn?.focus();
      }, 100);
    }
  });

  // Modal Closing action
  if (modalCloseBtn && modalOverlay) {
    const closeModal = () => {
      modalOverlay.classList.remove("active");
      form.reset();
      calculatePricing();
    };

    modalCloseBtn.addEventListener("click", closeModal);
    
    // Close on overlay blur clicks
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // Close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
        closeModal();
      }
    });
  }
}

// F. Premium Editorial Scroll-Reveal System using IntersectionObserver
function initScrollReveal() {
  const elements = document.querySelectorAll("section:not(.hero-section), .feature-box");
  
  if (!elements.length) return;

  // Set initial invisible state dynamically via JavaScript
  elements.forEach((el) => {
    el.classList.add("reveal-on-scroll");
  });

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -80px 0px", // triggers slightly before entering the center of viewport
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        self.unobserve(entry.target); // Trigger only once for a premium clean load feel
      }
    });
  }, observerOptions);

  elements.forEach((el) => {
    observer.observe(el);
  });
}

