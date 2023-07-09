function quitarPelicula(event, peliculaId) {
  event.preventDefault();
  let peliculasGuardadas = JSON.parse(
    localStorage.getItem("PeliculasFavoritas")
  );
  peliculasGuardadas.splice(peliculasGuardadas.indexOf(peliculaId), 1);
  localStorage.setItem(
    "PeliculasFavoritas",
    JSON.stringify(peliculasGuardadas)
  );
  cargaPeliculas();
}

async function buscarPelicula(idPelicula) {
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

  const {
    poster_path,
    title,
    id,
    original_title,
    original_language,
    release_date,
  } = movie;

  const contenedorPeliculas = document.getElementById(
    "contenedorPeliculasFavoritas"
  );

  contenedorPeliculas.innerHTML += `
    <div class="contenedorPosterFav">
        <div class="contenedorImg">
            <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}">
        </div>
        <h3>${title}</h3>
        <p><b>Codigo:</b> ${id}</p>
        <br>
        <p><b>Título original:</b> ${original_title}</p>
        <p><b>Idioma original:</b> ${original_language}</p>
        <p><b>Resumen:</b>${release_date}</p>
        <button class="button radius" onclick="quitarPelicula(event, ${id})">
            <span>Quitar de Favoritos</span>
        </button>
    </div>`;
}

function cargaPeliculas() {
  const peliculasFavoritas = JSON.parse(
    localStorage.getItem("PeliculasFavoritas")
  );

  const contenedorPeliculas = document.getElementById(
    "contenedorPeliculasFavoritas"
  );
  contenedorPeliculas.innerHTML = "";

  if (peliculasFavoritas.length > 0) {
    peliculasFavoritas.map(function (codigoPelicula) {
      buscarPelicula(codigoPelicula);
    });
  } else {
    const mensajeAdvertencia = document.getElementById("mensajeAdvertencia");
    mensajeAdvertencia.style.display = "block";
  }
}

cargaPeliculas();
