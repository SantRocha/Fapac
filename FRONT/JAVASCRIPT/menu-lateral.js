const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-btn');
const menuIcon = document.getElementById('menu-icon');
const mainContent = document.getElementById('main-content');

// Função para ajustar a altura da sidebar de acordo com o main
function adjustSidebarHeight() {
    const mainHeight = mainContent.offsetHeight;
    sidebar.style.height = `${mainHeight}px`;
}

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('expanded');
    if (sidebar.classList.contains('expanded')) {
        menuIcon.src = "../IMAGENS/seta-esquerda.png"; // Troca para imagem de recolher
    } else {
        menuIcon.src = "../IMAGENS/seta-direita.png"; // Troca para imagem de expandir
    }
    setTimeout(adjustSidebarHeight, 500);
});

const menuItems = document.querySelectorAll('.has-submenu');

menuItems.forEach(item => {
    const toggleSubmenu = item.querySelector('.toggle-submenu img');
    item.addEventListener('click', () => {
        item.classList.toggle('expanded');
        if (item.classList.contains('expanded')) {
            toggleSubmenu.src = "../IMAGENS/sinal-de-seta-para-cima-para-navegar.png"; // Troca para seta para cima
        } else {
            toggleSubmenu.src = "../IMAGENS/sinal-de-seta-para-baixo-para-navegar.png"; // Troca para seta para baixo
        }
    });
});

// Ajustar altura da sidebar ao redimensionar a janela
window.addEventListener('resize', adjustSidebarHeight);
// Ajustar a altura ao carregar a página
adjustSidebarHeight();
