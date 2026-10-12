"use strict";

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
matchMedia('(min-width: 681px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

// Keep one service expanded at a time; native details also work without JS.
const services = [...document.querySelectorAll('.service')];
services.forEach(service => service.addEventListener('toggle', () => {
  if (service.open) services.forEach(other => {
    if (other !== service) other.open = false;
  });
}));

const photos = [
  {id:'pergola-finished', caption:'La pergola et l’espace barbecue terminés', alt:'Vue d’ensemble de la pergola en bois et du barbecue réalisés par Ultra Renova'},
  {id:'pergola-wide', caption:'La structure en bois et l’espace barbecue', alt:'Structure de la pergola en bois, barbecue et aménagement du jardin'},
  {id:'barbecue-detail', caption:'Le barbecue maçonné, en détail', alt:'Vue rapprochée du barbecue maçonné sous la pergola'},
  {id:'wood-detail', caption:'Un détail de la menuiserie extérieure', alt:'Détail de la porte et du bardage en bois de l’aménagement extérieur'},
  {id:'work-structure', caption:'Le chantier — installation de la structure', alt:'Installation des poteaux et de la structure en bois pendant les travaux'},
  {id:'work-masonry', caption:'Le chantier — construction du barbecue', alt:'Maçonnerie du barbecue en cours, avec briques et outils de chantier'},
  {id:'work-ground', caption:'Le chantier — préparation du sol', alt:'Préparation de l’espace extérieur et du sol devant la pergola'},
  {id:'work-pergola', caption:'Le chantier — mise en place de la pergola', alt:'Construction de la pergola et aménagement de l’espace barbecue'},
  {id:'work-shelter', caption:'Le chantier — aménagement de l’espace extérieur', alt:'Vue de l’abri et de la pergola pendant les travaux d’aménagement'},
];
let selectedPhoto = 0;
let dialogOrigin = null;
const thumbs = [...document.querySelectorAll('.gallery-thumb')];
const featuredImage = document.querySelector('#featured-image');
const featuredButton = document.querySelector('.project-main-image');
const galleryDialog = document.querySelector('#gallery-dialog');
const lightboxImage = document.querySelector('#lightbox-image');
function photoCount(index) { return `${String(index + 1).padStart(2,'0')} / ${String(photos.length).padStart(2,'0')}`; }
function selectPhoto(index) {
  selectedPhoto = (index + photos.length) % photos.length;
  const photo = photos[selectedPhoto];
  featuredImage.src = `assets/${photo.id}.webp`;
  featuredImage.alt = photo.alt;
  featuredButton.dataset.photo = photo.id;
  featuredButton.setAttribute('aria-label', `Agrandir : ${photo.caption}`);
  document.querySelector('#featured-caption').textContent = photo.caption;
  document.querySelector('#featured-count').textContent = photoCount(selectedPhoto);
  thumbs.forEach(thumb => {
    const selected = thumb.dataset.photo === photo.id;
    thumb.classList.toggle('selected', selected);
    thumb.setAttribute('aria-pressed', String(selected));
  });
  lightboxImage.src = `assets/${photo.id}.webp`;
  lightboxImage.alt = photo.alt;
  document.querySelector('#lightbox-caption').textContent = photo.caption;
  document.querySelector('#lightbox-count').textContent = photoCount(selectedPhoto);
}
thumbs.forEach(thumb => thumb.addEventListener('click', () => selectPhoto(photos.findIndex(photo => photo.id === thumb.dataset.photo))));
document.querySelectorAll('.gallery-filter').forEach(filter => filter.addEventListener('click', () => {
  const category = filter.dataset.filter;
  document.querySelectorAll('.gallery-filter').forEach(button => {
    const active = button === filter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  thumbs.forEach(thumb => { thumb.hidden = category !== 'all' && thumb.dataset.category !== category; });
  if (thumbs[selectedPhoto].hidden) selectPhoto(photos.findIndex(photo => photo.id === thumbs.find(thumb => !thumb.hidden).dataset.photo));
}));
function openDialog(dialog, origin) {
  dialogOrigin = origin;
  dialog.showModal();
  document.body.classList.add('modal-open');
}
function registerDialog(dialog, closeButton) {
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open');
    dialogOrigin?.focus();
  });
}
featuredButton.addEventListener('click', () => {
  selectPhoto(selectedPhoto);
  openDialog(galleryDialog, featuredButton);
});
registerDialog(galleryDialog, document.querySelector('.lightbox-close'));
document.querySelector('.lightbox-prev').addEventListener('click', () => selectPhoto(selectedPhoto - 1));
document.querySelector('.lightbox-next').addEventListener('click', () => selectPhoto(selectedPhoto + 1));
galleryDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); selectPhoto(selectedPhoto - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); selectPhoto(selectedPhoto + 1); }
});

const form = document.querySelector('#project-form');
const messageDialog = document.querySelector('#message-dialog');
const preparedMessage = document.querySelector('#prepared-message');
const copyStatus = document.querySelector('#copy-status');
form.querySelectorAll('[required]').forEach(field => field.addEventListener('input', () => {
  field.setCustomValidity('');
  field.removeAttribute('aria-invalid');
}));
form.addEventListener('submit', event => {
  event.preventDefault();
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      field.setCustomValidity('Merci de renseigner ce champ.');
      field.setAttribute('aria-invalid','true');
      valid = false;
    }
  });
  if (!valid || !form.reportValidity()) { form.reportValidity(); return; }
  const data = new FormData(form);
  const name = data.get('name').trim();
  const city = data.get('city').trim();
  const type = data.get('type');
  const description = data.get('message').trim();
  const subject = `Demande de projet — ${type} à ${city}`;
  const body = `Bonjour,\n\nJe souhaite vous contacter pour un projet de ${type.toLowerCase()}.\n\nNom : ${name}\nVille du projet : ${city}\n\n${description}\n\nMerci,\n${name}`;
  preparedMessage.value = body;
  document.querySelector('#open-email').href = `mailto:admin@ultrarenova.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  copyStatus.textContent = '';
  openDialog(messageDialog, form.querySelector('[type=submit]'));
});
registerDialog(messageDialog, document.querySelector('.message-close'));
document.querySelector('#copy-message').addEventListener('click', async () => {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(preparedMessage.value);
    copyStatus.textContent = 'Message copié. Vous pouvez le coller dans votre e-mail.';
  } catch {
    preparedMessage.focus();
    preparedMessage.select();
    copyStatus.textContent = 'Sélectionnez le message puis copiez-le pour le coller dans votre e-mail.';
  }
});
