const containerVideos = document.querySelector('.videos__container')


async function buscarEMostrarVideos() {
    try {
        const busca = await fetch("https://raw.githubusercontent.com/NickProfessor/videos-do-nick/main/backend/videos.json");
        if (!busca.ok) {
            throw new Error("Erro ao carregar os vídeos: " + busca.status);
        }

        const data = await busca.json();
        let videos;
        // Verifica se a resposta é um objeto com uma chave de vídeos
        if (data && data.videos && Array.isArray(data.videos)) {
            videos = data.videos;
        } else if (Array.isArray(data)) { // Verifica se a resposta é diretamente uma matriz
            videos = data;
        } else {
            throw new Error("Os vídeos não estão em um formato válido.");
        }

        videos.forEach((video) => {
            if (!video.categoria) {
                throw new Error("Vídeo sem categoria.");
            }
            containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="Logo do canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                </div>
            </li>
            `;
        });
    } catch(error) {
        containerVideos.innerHTML += `<p style="background-color: red;">Houve um erro ao carregar os vídeos: ${error.message}</p>`;
    } finally {
        alert("Esta página ainda está na fase de testes! Muitos recursos ainda estão desabilitados...");
    }
}

buscarEMostrarVideos();
