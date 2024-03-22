const barraDePesquisa = document.querySelector('.pesquisar__input')
const botoesCategoria = document.querySelectorAll('.superior__item')

barraDePesquisa.addEventListener('input', filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item');
    const valorFiltro = barraDePesquisa.value.toLowerCase();
  
    videos.forEach((video) => {
      const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
  
      video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
    });
  }
  
botoesCategoria.forEach((botao) => {
    let nomeDaCategoria = botao.getAttribute("name");
    botao.addEventListener('click', () => filtrarPorCategorias(nomeDaCategoria));
})

function filtrarPorCategorias(filtro) {
    const videos = document.querySelectorAll('.videos__item');
    videos.forEach ((video) => {
        const categoriaVideo = video.querySelector('.categoria').textContent.toLowerCase();
        const valorFiltroCategoria = filtro.toLowerCase();
        video.style.display = !categoriaVideo.includes(valorFiltroCategoria) && valorFiltroCategoria != "tudo" ? 'none' : 'block';
    })
}