// script.js — BlueFoxGames Logic
document.addEventListener('DOMContentLoaded', () => {
  // DATA: Web Games
  const webGames = [
    {
      id: "flappyfox",
      title: "Flappy Fox",
      folder: "Flappy Fox",
      description: "Navigate the fox through obstacles. Simple but addictive.",
      image: "Flappy Fox.png"
    }
  ];

  // DATA: Exe Games
  const exeGames = [
    { filename: "Fox Clicker.exe", title: "Fox Clicker", image: "Fox Clicker.png" },
    { filename: "Nebula Blitz.exe", title: "Nebula Blitz", image: "Nebula Blitz.png" },
    { filename: "Focus Game.exe", title: "Focus Game", image: "Focus Game.png" },
    { filename: "Falling Objects Dodge.exe", title: "Falling Objects Dodge", image: "Falling Objects Dodge.png" },
    { filename: "Fox Arena.exe", title: "Fox Arena", image: "Fox Arena.png" },
    { filename: "Knight Adventure.exe", title: "Knight Adventure", image: "Knight Adventure.png" },
    { filename: "Plattformer Pro.exe", title: "Plattformer Pro", image: "Plattformer Pro.png" },
    { filename: "Bomb Escape.exe", title: "Bomb Escape", image: "Bomb escape.png" },
    { filename: "Snake.exe", title: "Snake", image: "Snake.png" },
    { filename: "Sneaker Resell Game.exe", title: "Sneaker Resell Game", image: "Sneaker resell Game.png" },
    { filename: "Garden Game.exe", title: "Garden Game", image: "Garden Game.png" },
    { filename: "Ping Pong.exe", title: "Ping Pong", image: "Ping Pong.png" },
    // GEÄNDERT: Pfad angepasst auf assets/Mingolf Simulator.png
    { filename: "Minigolf Simulator.exe", title: "Minigolf Simulator", image: "Mingolf Simulator.png" }, 
    { filename: "Tic Tac Toe.exe", title: "Tic Tac Toe", image: "Tic Tac Toe.png" }
  ];

  // ELEMENTS
  const webGrid = document.getElementById('webGrid');
  const exeList = document.getElementById('exeList');
  const search = document.getElementById('search');
  const filter = document.getElementById('filter');
  
  const webSection = document.getElementById('webSection');
  const exeSection = document.getElementById('exeSection');

  const modal = document.getElementById('playerModal');
  const gameFrame = document.getElementById('gameFrame');
  const closeModal = document.getElementById('closeModal');
  const modalDownload = document.getElementById('modalDownload');
  const modalTitle = document.getElementById('modalTitle');
  const openNewTab = document.getElementById('openNewTab');

  // PATH HELPERS
  const enc = (str) => encodeURI(str);
  const getWebPath = (folder) => enc(`web/${folder}/index.html`);
  const getZipPath = (folder) => enc(`downloads/${folder.replace(/\s+/g, '')}_Web.zip`);
  const getExePath = (file) => enc(`exe/${file}`);
  const getAssetPath = (img) => enc(`assets/${img}`);

  // RENDER WEB GAMES
  function renderWebGames(list) {
    webGrid.innerHTML = '';
    if (!list.length) {
      webGrid.innerHTML = '<div class="muted">No web games found for this query.</div>';
      return;
    }
    list.forEach(g => {
      const card = document.createElement('div');
      card.className = 'card';
      const img = getAssetPath(g.image);
      
      card.innerHTML = `
        <div class="thumb-wrapper">
          <img class="thumb" src="${img}" alt="${g.title}" onerror="this.src='assets/brandlogo.png'"/>
          <div class="play-overlay">
            <button class="play-btn-large play-trigger" data-folder="${g.folder}" data-title="${g.title}">
              <i class="fa-solid fa-play"></i>
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="card-title">${g.title}</div>
          <div class="card-desc">${g.description || 'Browser based game.'}</div>
          <div class="card-actions">
            <a href="${getWebPath(g.folder)}" target="_blank" class="btn-sm btn-outline"><i class="fa-solid fa-up-right-from-square"></i> Open</a>
            <a href="${getZipPath(g.folder)}" download class="btn-sm btn-primary-sm"><i class="fa-solid fa-download"></i> ZIP</a>
          </div>
        </div>
      `;
      webGrid.appendChild(card);
    });
  }

  // RENDER EXE GAMES
  function renderExeGames(list) {
    exeList.innerHTML = '';
    if (!list.length) {
      exeList.innerHTML = '<div class="muted">No downloads found.</div>';
      return;
    }
    list.forEach(item => {
      const el = document.createElement('div');
      el.className = 'exe-card';
      const img = getAssetPath(item.image);
      const fileLink = getExePath(item.filename);

      el.innerHTML = `
        <img class="exe-thumb" src="${img}" alt="icon" onerror="this.src='assets/brandlogo.png'"/>
        <div class="exe-info">
          <div class="exe-title">${item.title}</div>
          <div class="exe-filename">${item.filename}</div>
        </div>
        <a href="${fileLink}" download class="exe-btn" title="Download">
          <i class="fa-solid fa-download"></i>
        </a>
      `;
      exeList.appendChild(el);
    });
  }

  // FILTER LOGIC
  function applyFilter() {
    const q = search.value.toLowerCase().trim();
    const type = filter.value;

    const webResult = webGames.filter(g => g.title.toLowerCase().includes(q));
    const exeResult = exeGames.filter(e => e.title.toLowerCase().includes(q));

    renderWebGames(webResult);
    renderExeGames(exeResult);

    if (type === 'web') {
      webSection.style.display = 'block';
      exeSection.style.display = 'none';
    } else if (type === 'exe') {
      webSection.style.display = 'none';
      exeSection.style.display = 'block';
    } else {
      webSection.style.display = 'block';
      exeSection.style.display = 'block';
    }
  }

  // MODAL LOGIC
  function openGame(folder, title) {
    gameFrame.src = getWebPath(folder);
    modalTitle.textContent = title || 'Playing Game';
    modalDownload.href = getZipPath(folder);
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeGame() {
    modal.setAttribute('aria-hidden', 'true');
    gameFrame.src = 'about:blank';
    document.body.style.overflow = '';
  }

  // LISTENERS
  document.addEventListener('click', e => {
    if (e.target.closest('.play-trigger')) {
      const btn = e.target.closest('.play-trigger');
      openGame(btn.dataset.folder, btn.dataset.title);
    }
    if (e.target.classList.contains('modal-backdrop')) {
      closeGame();
    }
  });

  closeModal.addEventListener('click', closeGame);
  
  openNewTab.addEventListener('click', () => {
    if (gameFrame.src) window.open(gameFrame.src, '_blank');
  });

  search.addEventListener('input', applyFilter);
  filter.addEventListener('change', applyFilter);

  // INIT
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
  renderWebGames(webGames);
  renderExeGames(exeGames);
});