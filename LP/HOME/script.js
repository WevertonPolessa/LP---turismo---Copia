/*estrutura API*/
async function buscar() {
    const cidade = document.getElementById("cidade").value;
    const key = '52e4534a21f2350b6198fd187e80bba7'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade},BR&appid=${key}&units=metric&lang=pt`;
  
    try {
      const resp = await fetch(url);
      const dados = await resp.json();
  
      if (dados.cod === 200) {
        document.getElementById("resposta").innerHTML =
          `${dados.name}: ${parseInt(dados.main.temp)}°C - ${dados.weather[0].description}`;
      } else {
        document.getElementById("resposta").innerText = "Cidade não encontrada.";
      }
    } catch (error) {
      document.getElementById("resposta").innerText = "Erro ao buscar dados.";
      console.error(error);
    }
  }


/*estutura FAVORITO*/
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []; 


function atualizarListaFavoritos() {
  const listaFavoritos = document.getElementById('lista-favoritos');
  listaFavoritos.innerHTML = '';
  favoritos.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    listaFavoritos.appendChild(li);
  });
}


function alternarFavorito(botao, nomeItem) {
  const icone = botao.querySelector('i');
  if (favoritos.includes(nomeItem)) {
    favoritos = favoritos.filter(item => item !== nomeItem);
    icone.classList.remove('fa-solid');
    icone.classList.add('fa-regular');
  } else {
    favoritos.push(nomeItem);
    icone.classList.remove('fa-regular');
    icone.classList.add('fa-solid');
  }
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  atualizarListaFavoritos();
}


document.querySelectorAll('.favorite-button').forEach((botao, indice) => {
  const nomeItem = `Lugar ${indice + 1}`;
  if (favoritos.includes(nomeItem)) {
    botao.querySelector('i').classList.remove('fa-regular');
    botao.querySelector('i').classList.add('fa-solid');
  }

  botao.addEventListener('click', () => alternarFavorito(botao, nomeItem));
});

atualizarListaFavoritos();