async function cargaPeliculas(page) {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "inline-block";

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?page=${page}&language=es-AR`,
      {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTdhNGZhMzIyN2RhZDE0MTIyNDQ4ODMzNWEwZjU0OCIsInN1YiI6IjY0YWEwYWE4YjY4NmI5MDBhZjlkYzlmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tS3ip2z1Sv9mLjbk8F9NY4Rb9pYsgEerzNpg2_0AqFY",
        },
      }
    );
    const movies = await response.json();

    const contenedorPeliculas = document.getElementById("contenedorPeliculas");
    contenedorPeliculas.innerHTML = "";

    spinner.style.display = "none";

    movies.results.map(function (movie) {
      // destructuring
      const {
        poster_path,
        title,
        id,
        original_title,
        original_language,
        release_date,
      } = movie;
      const poster = `
    <div class="contenedorPoster">
      <img src="https://image.tmdb.org/t/p/w500/${poster_path}">
      <h3 class="titulo">${title}</h3>
      <div class="datosPelicula">
        <p><b>Código:</b> ${id}<br>
        <b>Título original:</b> ${original_title}<br>
        <b>Idioma original:</b> ${original_language}<br>
        <b>Año:</b> ${release_date}<br></br>
      </div>
      <button class="button radius" onclick="agregarFavorito(event, ${id})">
        <span>Agregar a Favoritos</span>
      </button>
    </div>`;

      contenedorPeliculas.innerHTML += poster;
    });
  } catch (error) {
    console.log(error);
  }
}

async function buscarPelicula(idPelicula, peliculasFavoritas) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${idPelicula}?language=es-AR`,
      {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTdhNGZhMzIyN2RhZDE0MTIyNDQ4ODMzNWEwZjU0OCIsInN1YiI6IjY0YWEwYWE4YjY4NmI5MDBhZjlkYzlmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tS3ip2z1Sv9mLjbk8F9NY4Rb9pYsgEerzNpg2_0AqFY",
        },
      }
    );

    const movie = await response.json();

    const { id } = movie;

    if (id) {
      peliculasFavoritas.push(id);
      localStorage.setItem(
        "PeliculasFavoritas",
        JSON.stringify(peliculasFavoritas)
      );
      const mensajeExito = document.getElementById("mensajeExito");
      mensajeExito.style.display = "block";
      const mensajeAdvertencia = document.getElementById("mensajeAdvertencia");
      mensajeAdvertencia.style.display = "none";
      const mensajeError = document.getElementById("mensajeError");
      mensajeError.style.display = "none";
    } else {
      const mensajeExito = document.getElementById("mensajeExito");
      mensajeExito.style.display = "none";
      const mensajeAdvertencia = document.getElementById("mensajeAdvertencia");
      mensajeAdvertencia.style.display = "none";
      const mensajeError = document.getElementById("mensajeError");
      mensajeError.style.display = "block";
    }
  } catch (error) {
    console.log(error);
  }
}

function agregarPeliculaFavorita(codigo) {
  let peliculasGuardadas = JSON.parse(
    localStorage.getItem("PeliculasFavoritas")
  );
  let peliculasFavoritas = peliculasGuardadas ? peliculasGuardadas : [];

  if (!peliculasFavoritas.includes(parseInt(codigo))) {
    buscarPelicula(codigo, peliculasFavoritas);
  } else {
    const mensajeExito = document.getElementById("mensajeExito");
    mensajeExito.style.display = "none";
    const mensajeAdvertencia = document.getElementById("mensajeAdvertencia");
    mensajeAdvertencia.style.display = "block";
    const mensajeError = document.getElementById("mensajeError");
    mensajeError.style.display = "none";
  }
}

function agregarPorCodigo(event) {
  event.preventDefault();
  const codigo = document.getElementById("codigo").value;
  agregarPeliculaFavorita(codigo);
}

function agregarFavorito(event, peliculaId) {
  event.preventDefault();
  agregarPeliculaFavorita(peliculaId);
}

function paginaSiguiente() {
  if (pageNumber < 1000) {
    pageNumber += 1;
    cargaPeliculas(pageNumber);
  }
}

function paginaAnterior() {
  if (pageNumber > 1) {
    pageNumber -= 1;
    cargaPeliculas(pageNumber);
  }
}

let pageNumber = 1;

cargaPeliculas(pageNumber);
