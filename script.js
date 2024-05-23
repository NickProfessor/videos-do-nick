const containerVideos = document.querySelector(".videos__container");
const containerPdfs = document.querySelector(".pdfs__container");

async function buscarEMostrarVideos() {
  try {
    const busca = await fetch(
      "https://raw.githubusercontent.com/NickProfessor/videos-do-nick/main/backend/videos.json"
    );
    if (!busca.ok) {
      throw new Error("Erro ao carregar os vídeos: " + busca.status);
    }

    const data = await busca.json();
    let videos;
    // Verifica se a resposta é um objeto com uma chave de vídeos
    if (data && data.videos && Array.isArray(data.videos)) {
      videos = data.videos;
    } else if (Array.isArray(data)) {
      // Verifica se a resposta é diretamente uma matriz
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
                    <p class="titulo-canal">Upload ${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p>
                </div>
            </li>
            `;
    });
  } catch (error) {
    containerVideos.innerHTML += `<p style="background-color: red;">Houve um erro ao carregar os vídeos: ${error.message}</p>`;
  } finally {
  }
}

async function buscarEMostrarPdfs() {
  try {
    const busca = await fetch(
      "https://raw.githubusercontent.com/NickProfessor/videos-do-nick/main/backend/pdfs.json"
    );
    if (!busca.ok) {
      throw new Error("Erro ao carregar os pdfs: " + busca.status);
    }

    const data = await busca.json();
    let pdfs;
    // Verifica se a resposta é um objeto com uma chave de vídeos
    if (data && data.pdfs && Array.isArray(data.pdfs)) {
      pdfs = data.pdfs;
    } else if (Array.isArray(data)) {
      // Verifica se a resposta é diretamente uma matriz
      pdfs = data;
    } else {
      throw new Error("Os pdfs não estão em um formato válido.");
    }

    pdfs.forEach((pdf) => {
      if (!pdf.url) {
        throw new Error("Vídeo sem url.");
      }
      containerPdfs.innerHTML += `
                <a link href="${pdf.url}" target="_blank" class="pdfs__item">    
                    <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="icone de pdf">   
                        <h3 class="titulo-pdf">${pdf.titulo}</h3>
                </a>
            `;
    });
  } catch (error) {
    containerPdfs.innerHTML += `<p style="background-color: red;">Houve um erro ao carregar os pdfs: ${error.message}</p>`;
  } finally {
  }
}

// function bemVindo(){
//     let nome
//     while(nome == "" || nome == undefined){
//     nome = prompt("Olá aluno! Qual é seu nome?")
//     }
//     alert("Seja bem-vindo(a), "+ nome)
//     alert("Algumas funcionalidades estão desativadas! Bons estudos!")
// }

buscarEMostrarVideos();
buscarEMostrarPdfs();
// bemVindo()
