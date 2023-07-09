function enviarMail(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre");
  const mensaje = document.getElementById("mensaje");

  const body = {
    service_id: "service_nj1kooi",
    template_id: "template_h5dw3dg",
    user_id: "ZijjFIKqs_je0J2Iw",
    template_params: {
      name: nombre,
      message: mensaje,
    },
  };

  try {
    fetch("https://api.emailjs.com/api/v1.0/email/send", {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const mensajeExito = document.getElementById("mensajeExito");
    mensajeExito.style.display = "block";
    limpiar(event);
  } catch (error) {
    console.log(error);
  }
}

function limpiar(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const mensaje = document.getElementById("mensaje");
  const mensajeExito = document.getElementById("mensajeExito");
  nombre.value = "";
  email.value = "";
  mensaje.value = "";
  mensajeExito.style.display = "none";
}
