// VEHICULES avec images locales (à adapter)
const vehicles = [
  { id: 1, name: "Renault Clio 5", pricePerDay: 280, img: "./image.jpeg", type: "small", category: { fr: "Citadine", ar: "مدينة", en: "City" } },
  { id: 2, name: "Volkswagen Golf 8", pricePerDay: 420, img: "./image1.jpeg", type: "medium", category: { fr: "Compacte", ar: "مدمجة", en: "Compact" } },
  { id: 3, name: "Dacia Duster", pricePerDay: 350, img: "./image2.jpeg", type: "medium", category: { fr: "SUV", ar: "رياضي", en: "SUV" } },
  { id: 4, name: "Toyota Land Cruiser Prado", pricePerDay: 1100, img: "./image3.jpeg", type: "big", category: { fr: "4x4 Luxe", ar: "دفع رباعي فاخر", en: "Luxury 4x4" } },
  { id: 5, name: "Dacia Logan", pricePerDay: 220, img: "./image4.jpeg", type: "small", category: { fr: "Éco+", ar: "اقتصادي", en: "Eco+" } },
  { id: 6, name: "Volkswagen Touareg", pricePerDay: 980, img: "./image5.jpeg", type: "big", category: { fr: "SUV Premium", ar: "SUV فاخر", en: "Premium SUV" } },
  { id: 7, name: "Opel Corsa", pricePerDay: 240, img: "./image6.jpeg", type: "small", category: { fr: "Citadine", ar: "مدينة", en: "City" } },
  { id: 8, name: "Renault Clio 4", pricePerDay: 250, img: "./image7.jpeg", type: "small", category: { fr: "Citadine", ar: "مدينة", en: "City" } },
  { id: 9, name: "Peugeot 208", pricePerDay: 270, img: "./image8.jpeg", type: "small", category: { fr: "Citadine", ar: "مدينة", en: "City" } }
];

let currentLang = "fr";
let currentCurrency = "mad";
let selectedVehicle = null;
let currentFilter = "all";

const translations = {
  fr: {
    heroSubtitle: "Location de véhicules premium au Maroc",
    exploreBtn: "Explorer nos véhicules",
    reservationTitle: "Réservation",
    fullNameLabel: "Nom complet",
    emailLabel: "Email",
    phoneLabel: "WhatsApp",
    startDateLabel: "Date de début",
    endDateLabel: "Date de fin",
    days: "Jours",
    total: "Total",
    confirmBtn: "Confirmer via WhatsApp",
    backBtn: "Retour",
    filterAll: "Tous",
    filterSmall: "Économique",
    filterMedium: "Confort",
    filterBig: "SUV & Premium",
    selectVehicle: "Veuillez sélectionner un véhicule",
    selectDates: "Veuillez choisir des dates valides",
    fillName: "Veuillez entrer votre nom",
    fillEmail: "Veuillez entrer votre email",
    fillPhone: "Veuillez entrer votre numéro de téléphone",
    fillDates: "Veuillez choisir les dates de location",
    dateError: "La date de fin doit être postérieure à la date de début",
    perDay: "/ jour"
  },
  ar: {
    heroSubtitle: "تأجير سيارات فاخرة في المغرب",
    exploreBtn: "استكشف سياراتنا",
    reservationTitle: "الحجز",
    fullNameLabel: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني",
    phoneLabel: "واتساب",
    startDateLabel: "تاريخ البداية",
    endDateLabel: "تاريخ النهاية",
    days: "أيام",
    total: "المجموع",
    confirmBtn: "تأكيد عبر واتساب",
    backBtn: "رجوع",
    filterAll: "الكل",
    filterSmall: "اقتصادي",
    filterMedium: "متوسط",
    filterBig: "SUV وفاخر",
    selectVehicle: "الرجاء اختيار سيارة",
    selectDates: "الرجاء اختيار تواريخ صالحة",
    fillName: "الرجاء إدخال اسمك",
    fillEmail: "الرجاء إدخال بريدك الإلكتروني",
    fillPhone: "الرجاء إدخال رقم هاتفك",
    fillDates: "الرجاء اختيار تواريخ الحجز",
    dateError: "تاريخ النهاية يجب أن يكون بعد تاريخ البداية",
    perDay: "/ يوم"
  },
  en: {
    heroSubtitle: "Premium vehicle rental in Morocco",
    exploreBtn: "Explore our vehicles",
    reservationTitle: "Reservation",
    fullNameLabel: "Full name",
    emailLabel: "Email",
    phoneLabel: "WhatsApp",
    startDateLabel: "Start date",
    endDateLabel: "End date",
    days: "Days",
    total: "Total",
    confirmBtn: "Confirm via WhatsApp",
    backBtn: "Back",
    filterAll: "All",
    filterSmall: "Economy",
    filterMedium: "Comfort",
    filterBig: "SUV & Premium",
    selectVehicle: "Please select a vehicle",
    selectDates: "Please select valid dates",
    fillName: "Please enter your name",
    fillEmail: "Please enter your email",
    fillPhone: "Please enter your phone number",
    fillDates: "Please select rental dates",
    dateError: "End date must be after start date",
    perDay: "/ day"
  }
};

const exchangeRates = { mad: 1, eur: 0.089, usd: 0.097 };

function convertPrice(priceMAD) {
  let converted = priceMAD * exchangeRates[currentCurrency];
  let symbol = currentCurrency === "mad" ? " MAD" : (currentCurrency === "eur" ? " €" : " $");
  return Math.round(converted) + symbol;
}

function getCurrencySymbol() {
  if (currentCurrency === "mad") return "MAD";
  if (currentCurrency === "eur") return "€";
  return "$";
}

function updateLanguage() {
  const t = translations[currentLang];
  document.getElementById('heroSubtitle').innerText = t.heroSubtitle;
  document.getElementById('exploreBtn').innerHTML = `<i class="fas fa-arrow-right me-2"></i> ${t.exploreBtn}`;
  document.getElementById('reservationTitle').innerHTML = `<i class="fas fa-clipboard-list me-2 text-gold"></i> ${t.reservationTitle}`;
  document.getElementById('fullNameLabel').innerHTML = `${t.fullNameLabel} <span class="text-danger">*</span>`;
  document.getElementById('emailLabel').innerHTML = `${t.emailLabel} <span class="text-danger">*</span>`;
  document.getElementById('phoneLabel').innerHTML = `${t.phoneLabel} <span class="text-danger">*</span>`;
  document.getElementById('startDateLabel').innerText = t.startDateLabel;
  document.getElementById('endDateLabel').innerText = t.endDateLabel;
  document.getElementById('confirmBtnText').innerText = t.confirmBtn;
  document.getElementById('backBtnText').innerText = t.backBtn;
  document.getElementById('filterAllBtn').innerHTML = `<i class="fas fa-car me-1"></i> ${t.filterAll}`;
  document.getElementById('filterSmallBtn').innerHTML = `<i class="fas fa-car-side me-1"></i> ${t.filterSmall}`;
  document.getElementById('filterMediumBtn').innerHTML = `<i class="fas fa-caravan me-1"></i> ${t.filterMedium}`;
  document.getElementById('filterBigBtn').innerHTML = `<i class="fas fa-truck-pickup me-1"></i> ${t.filterBig}`;
  
  document.getElementById('fullName').placeholder = t.fullNameLabel;
  document.getElementById('optionalEmail').placeholder = t.emailLabel;
  document.getElementById('optionalPhone').placeholder = t.phoneLabel;
  
  if (currentLang === 'ar') {
    document.body.setAttribute('dir', 'rtl');
  } else {
    document.body.setAttribute('dir', 'ltr');
  }
  
  renderCars();
  updateTotalAndDays();
}

const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const startDatePick = document.getElementById('startDatePick');
const endDatePick = document.getElementById('endDatePick');
const summaryStart = document.getElementById('summaryStart');
const summaryEnd = document.getElementById('summaryEnd');
const fullNameInput = document.getElementById('fullName');
const optionalEmail = document.getElementById('optionalEmail');
const optionalPhone = document.getElementById('optionalPhone');
const daysCountSpan = document.getElementById('daysCount');
const totalPriceDisplay = document.getElementById('totalPriceDisplay');
const confirmBtn = document.getElementById('confirmWhatsappBtn');
const carsContainer = document.getElementById('carsContainer');

function checkCompletion() {
  const nameOk = fullNameInput.value.trim() !== "";
  const emailOk = optionalEmail.value.trim() !== "";
  const phoneOk = optionalPhone.value.trim() !== "";
  const vehicleOk = selectedVehicle !== null;
  const startOk = summaryStart.value !== "";
  const endOk = summaryEnd.value !== "";
  let datesOk = false;
  if (startOk && endOk) {
    datesOk = new Date(summaryEnd.value) > new Date(summaryStart.value);
  }
  const isValid = nameOk && emailOk && phoneOk && vehicleOk && startOk && endOk && datesOk;
  confirmBtn.disabled = !isValid;
}

function updateTotalAndDays() {
  if (!selectedVehicle) {
    daysCountSpan.innerHTML = `<i class="fas fa-calendar-week me-2"></i> ${translations[currentLang].days}: 0`;
    totalPriceDisplay.innerHTML = `${translations[currentLang].total}: 0 ${getCurrencySymbol()}`;
    checkCompletion();
    return;
  }
  const start = new Date(summaryStart.value);
  const end = new Date(summaryEnd.value);
  if (isNaN(start) || isNaN(end) || end <= start) {
    daysCountSpan.innerHTML = `<i class="fas fa-calendar-week me-2"></i> ${translations[currentLang].days}: 0`;
    totalPriceDisplay.innerHTML = `${translations[currentLang].total}: 0 ${getCurrencySymbol()}`;
    checkCompletion();
    return;
  }
  const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  const totalRaw = selectedVehicle.pricePerDay * diffDays;
  const totalConverted = totalRaw * exchangeRates[currentCurrency];
  daysCountSpan.innerHTML = `<i class="fas fa-calendar-week me-2"></i> ${translations[currentLang].days}: ${diffDays}`;
  totalPriceDisplay.innerHTML = `${translations[currentLang].total}: ${Math.round(totalConverted)} ${getCurrencySymbol()}`;
  checkCompletion();
}

function renderCars() {
  let filtered = vehicles;
  if (currentFilter !== "all") {
    filtered = vehicles.filter(v => v.type === currentFilter);
  }
  carsContainer.innerHTML = "";
  filtered.forEach(car => {
    const col = document.createElement('div');
    col.className = "col-md-6 col-xl-4";
    const isSelected = (selectedVehicle && selectedVehicle.id === car.id);
    const categoryText = car.category[currentLang] || car.category.fr;
    col.innerHTML = `
      <div class="car-card ${isSelected ? 'selected' : ''}" data-id="${car.id}">
        <img class="car-img" src="${car.img}" alt="${car.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/600x400?text=Image+manquante'">
        <div class="car-info">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="fw-bold mb-0">${car.name}</h5>
            <span class="badge-category">${categoryText}</span>
          </div>
          <p class="mb-0"><i class="fas fa-tag text-gold me-1"></i> ${convertPrice(car.pricePerDay)} ${translations[currentLang].perDay}</p>
          <button class="btn btn-sm w-100 mt-3 select-car-btn" style="background:#d4af37; color:#0a0c12; font-weight:600; border-radius:40px;">${translations[currentLang].filterAll === 'Tous' ? 'Sélectionner' : (currentLang === 'ar' ? 'اختر' : 'Select')}</button>
        </div>
      </div>
    `;
    const cardDiv = col.querySelector('.car-card');
    const btnSelect = col.querySelector('.select-car-btn');
    const selectText = currentLang === 'fr' ? 'Sélectionner' : (currentLang === 'ar' ? 'اختر' : 'Select');
    btnSelect.innerText = selectText;
    btnSelect.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(cardDiv.getAttribute('data-id'));
      selectedVehicle = vehicles.find(v => v.id === id);
      document.querySelectorAll('.car-card').forEach(c => c.classList.remove('selected'));
      cardDiv.classList.add('selected');
      updateTotalAndDays();
    });
    carsContainer.appendChild(col);
  });
}

function refreshAll() {
  renderCars();
  updateTotalAndDays();
}

function openCatalogue() {
  const startVal = startDatePick.value;
  const endVal = endDatePick.value;
  if (!startVal || !endVal) {
    alert(translations[currentLang].fillDates);
    return false;
  }
  if (new Date(endVal) <= new Date(startVal)) {
    alert(translations[currentLang].dateError);
    return false;
  }
  summaryStart.value = startVal;
  summaryEnd.value = endVal;
  selectedVehicle = null;
  fullNameInput.value = "";
  optionalEmail.value = "";
  optionalPhone.value = "";
  renderCars();
  updateTotalAndDays();
  page1.style.display = "none";
  page2.style.display = "block";
  document.body.style.overflow = "hidden";
  return true;
}

function closePage2() {
  page2.style.display = "none";
  page1.style.display = "flex";
  document.body.style.overflow = "auto";
}

function sendWhatsApp() {
  const name = fullNameInput.value.trim();
  const email = optionalEmail.value.trim();
  const phone = optionalPhone.value.trim();
  if (!name) { alert(translations[currentLang].fillName); return; }
  if (!email) { alert(translations[currentLang].fillEmail); return; }
  if (!phone) { alert(translations[currentLang].fillPhone); return; }
  if (!selectedVehicle) { alert(translations[currentLang].selectVehicle); return; }
  const startDate = summaryStart.value;
  const endDate = summaryEnd.value;
  if (!startDate || !endDate || new Date(endDate) <= new Date(startDate)) {
    alert(translations[currentLang].selectDates);
    return;
  }
  const diffDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
  const totalRaw = selectedVehicle.pricePerDay * diffDays;
  const totalConverted = totalRaw * exchangeRates[currentCurrency];
  const langMsg = currentLang === 'fr' ? 'Je confirme cette réservation' : (currentLang === 'ar' ? 'أؤكد هذا الحجز' : 'I confirm this reservation');
  const message = `🔹 *DRIVEELITE RENTAL* 🔹\n\n👤 ${translations[currentLang].fullNameLabel}: ${name}\n📧 ${translations[currentLang].emailLabel}: ${email}\n📞 ${translations[currentLang].phoneLabel}: ${phone}\n🚗 Véhicule : ${selectedVehicle.name}\n📅 ${translations[currentLang].startDateLabel}: ${startDate}\n📆 ${translations[currentLang].endDateLabel}: ${endDate}\n📆 ${translations[currentLang].days}: ${diffDays}\n💰 ${translations[currentLang].total}: ${Math.round(totalConverted)} ${getCurrencySymbol()}\n\n✅ ${langMsg}.`;
  window.open(`https://wa.me/212658693453?text=${encodeURIComponent(message)}`, '_blank');
}

document.getElementById('bookingForm').addEventListener('submit', (e) => {
  e.preventDefault();
  openCatalogue();
});
document.getElementById('closePage2Btn').addEventListener('click', closePage2);
document.getElementById('closeCatalogueBtn').addEventListener('click', closePage2);
confirmBtn.addEventListener('click', sendWhatsApp);
summaryStart.addEventListener('change', updateTotalAndDays);
summaryEnd.addEventListener('change', updateTotalAndDays);
fullNameInput.addEventListener('input', checkCompletion);
optionalEmail.addEventListener('input', checkCompletion);
optionalPhone.addEventListener('input', checkCompletion);

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    currentFilter = this.getAttribute('data-filter');
    renderCars();
  });
});

document.getElementById('langSelect').addEventListener('change', (e) => {
  currentLang = e.target.value;
  updateLanguage();
});

document.getElementById('currencySelect').addEventListener('change', (e) => {
  currentCurrency = e.target.value;
  refreshAll();
});

updateLanguage();
renderCars();