const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const menuData = {
  viandes: [
    ['Romazava Royal', 'Une interprétation généreuse d’un classique malgache.', '59 000 Ar'],
    ['Cuisse de poulet farcie', 'Foie gras, champignons et accompagnement du chef.', '60 000 Ar'],
    ['Sauté de volaille', 'Pleurotes, petits légumes et pommes sautées.', '68 000 Ar'],
    ['Médaillons de zébu', 'Morilles, légumes, purée de carottes et riz sauté.', '150 000 Ar'],
    ['Cuisse de canard mijotée', 'Cèpes séchés et légumes paysans aux herbes.', '75 000 Ar']
  ],
  poissons: [
    ['Mérou façon meunière', 'Sauce vierge et citrons confits.', '73 000 Ar'],
    ['Camarons poêlés', 'Beurre d’ail et persil.', '120 000 Ar'],
    ['Crevettes en persillade', 'Petits légumes et riz sauté.', '110 000 Ar']
  ],
  vegan: [
    ['Dahl de lentilles', 'Curry doux et petits légumes.', '40 000 Ar'],
    ['Légumes au coco', 'Coriandre fraîche et légumes de saison.', '45 000 Ar']
  ],
  desserts: [
    ['Café gourmand', 'Une sélection de petites douceurs.', '40 000 Ar'],
    ['Soufflé chaud à la passion', 'Dessert aérien aux fruits de la passion.', '40 000 Ar'],
    ['Coulant au chocolat', 'Servi avec une glace maison.', '75 000 Ar'],
    ['Nougat glacé au miel', 'Texture légère et parfum délicat.', '40 000 Ar'],
    ['Tarte au citron meringuée', 'Équilibre entre acidité et douceur.', '38 000 Ar']
  ]
};

const menuList = document.querySelector('#menu-list');
const tabs = document.querySelectorAll('.menu-tab');

function renderMenu(category) {
  menuList.innerHTML = menuData[category].map(([name, description, price]) => `
    <article class="menu-item">
      <div><h3>${name}</h3><p>${description}</p></div>
      <span class="price">${price}</span>
    </article>
  `).join('');
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(item => item.classList.remove('active'));
    tab.classList.add('active');
    renderMenu(tab.dataset.category);
  });
});
renderMenu('viandes');

const dateInput = document.querySelector('#date');
const today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
dateInput.min = today.toISOString().split('T')[0];

const form = document.querySelector('#reservation-form');
const message = document.querySelector('#form-message');

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    message.textContent = 'Veuillez compléter correctement tous les champs.';
    return;
  }

  const name = document.querySelector('#name').value.trim();
  const date = document.querySelector('#date').value;
  const time = document.querySelector('#time').value;
  const guests = document.querySelector('#guests').value;
  const formattedDate = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(`${date}T12:00:00`));

  message.textContent = `Merci ${name} ! Demande enregistrée pour ${guests} personne(s), le ${formattedDate} à ${time}.`;
  form.reset();
  dateInput.min = today.toISOString().split('T')[0];
});

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.dataset.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeLightbox();
});

document.querySelector('#year').textContent = new Date().getFullYear();
