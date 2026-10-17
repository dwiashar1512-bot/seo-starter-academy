document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (!detail.open) return;
    document.querySelectorAll('details[open]').forEach((other) => {
      if (other !== detail) other.removeAttribute('open');
    });
  });
});

const featureCards = document.querySelectorAll('.feature-card');
const featureKicker = document.getElementById('feature-detail-kicker');
const featureTitle = document.getElementById('feature-detail-title');
const featureDescription = document.getElementById('feature-detail-description');

featureCards.forEach((card) => {
  card.addEventListener('click', () => {
    featureCards.forEach((item) => item.classList.remove('active'));
    card.classList.add('active');
    featureKicker.textContent = card.dataset.kicker;
    featureTitle.textContent = card.dataset.title;
    featureDescription.textContent = card.dataset.description;
  });
});

document.querySelectorAll('.module-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const module = button.closest('.module');
    const willOpen = !module.classList.contains('open');

    document.querySelectorAll('.module.open').forEach((item) => {
      item.classList.remove('open');
      item.querySelector('.module-toggle').setAttribute('aria-expanded', 'false');
    });

    if (willOpen) {
      module.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

document.addEventListener('click', (event) => {
  const button = event.target.closest('.module-toggle');
  if (!button) return;
  event.preventDefault();
  const module = button.closest('.module');
  const wasOpen = module.classList.contains('open');
  document.querySelectorAll('.curriculum-list .module.open').forEach((item) => {
    item.classList.remove('open');
    item.querySelector('.module-toggle')?.setAttribute('aria-expanded', 'false');
  });
  if (!wasOpen) {
    module.classList.add('open');
    button.setAttribute('aria-expanded', 'true');
  }
});
