// Dark Mode com suporte a toggle manual e automático por horário
// Ativa automaticamente entre 18h e 6h se não houver preferência manual

function applyDarkMode(isDark) {
  const body = document.body;
  const btns = document.querySelectorAll('#dark-mode-toggle');
  
  if (isDark) {
    body.classList.add('dark-mode');
    btns.forEach(btn => {
      btn.innerHTML = '☀️'; // Sol quando está escuro
      btn.style.color = '#FFD700';
    });
  } else {
    body.classList.remove('dark-mode');
    btns.forEach(btn => {
      btn.innerHTML = '🌙'; // Lua quando está claro
      btn.style.color = '#1e3a8a';
    });
  }
}

function checkAndApplyDarkMode() {
  const override = localStorage.getItem('darkModeOverride');
  
  if (override !== null) {
    applyDarkMode(override === 'true');
    return;
  }

  const now = new Date();
  const currentHour = now.getHours();
  // Dark mode ativo entre 18h (18:00) e 6h (06:00)
  const isDarkModeTime = currentHour >= 18 || currentHour < 6;
  applyDarkMode(isDarkModeTime);
}

function toggleDarkMode() {
  const isDark = document.body.classList.contains('dark-mode');
  const newState = !isDark;
  applyDarkMode(newState);
  localStorage.setItem('darkModeOverride', newState.toString());
}

// Aplicar dark mode ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  checkAndApplyDarkMode();
  
  // Adicionar evento a todos os botões
  const btns = document.querySelectorAll('#dark-mode-toggle');
  btns.forEach(btn => {
    btn.addEventListener('click', toggleDarkMode);
  });

  // Verificar a cada minuto se o horário mudou (apenas se não houver override)
  setInterval(() => {
    if (localStorage.getItem('darkModeOverride') === null) {
      checkAndApplyDarkMode();
    }
  }, 60000);
});

// Verificar também quando a página fica visível novamente
document.addEventListener('visibilitychange', function() {
  if (!document.hidden && localStorage.getItem('darkModeOverride') === null) {
    checkAndApplyDarkMode();
  }
});
