const containerVideos = document.querySelector('.videos__container')


async function buscarEMostrarVideos(){
    try{
        const busca = await fetch("https://raw.githubusercontent.com/NickProfessor/videos-do-nick/main/backend/videos.json")
        const videos = await busca.json();

            videos.forEach((video) => {
                if(video.categoria == ""){
                    throw new Error("Video não tem categoria")
                }
                containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem} alt="Logo do canal"
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                    </div>
                </li>
                `
            })
    } catch(error){
        containerVideos.innerHTML += `<p style="background-color: red;">Houve um erro ao carregar os videos: ${error}</p>`
    }finally{
        alert("Está página ainda está na fase de testes! Muitos recursos ainda estão desabilitados...")
    }
}

buscarEMostrarVideos();