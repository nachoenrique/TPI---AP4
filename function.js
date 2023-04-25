$(document).ready(function () {
  const formulario = document.getElementById("contacto-form");
  const inputs = document.querySelectorAll("#contacto-form input");

  const validarForm = (e) => {
    switch (e.target.name) {
      case "nombre":
        validarCampo(validaciones.nombre(e.target.value), e.target);
        break;

      case "email":
        validarCampo(validaciones.email(e.target.value), e.target);
        break;

      case "telefono":
        validarCampo(validaciones.telefono(e.target.value), e.target);
        break;

      case "mensaje":
        validarCampo(validaciones.mensaje(e.target.value), e.target);
        break;
    }
  };

  //Reutilizo código
  const validarCampo = (expresion, input) => {
    if (expresion) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    }
  };

  //*Aplico Validate.JS
  //un array de funciones
  const validaciones = {
    nombre: function (valor) {
      return (
        validate.single(valor, {
          presence: true,
          format: { pattern: "^[a-zA-Z\\s]+$" },
          length: { maximum: 50 },
        }) == undefined
      );
    },
    email: function (valor) {
      return (
        validate.single(valor, {
          presence: true,
          email: true,
          length: { maximum: 50 },
        }) == undefined
      );
    },
    telefono: function (valor) {
      return (
        validate.single(valor, {
          presence: true,
          numericality: { onlyInteger: true, greaterThan: 0 },
          length: { maximum: 20 },
        }) == undefined
      );
    },
    mensaje: function (valor) {
      return (
        validate.single(valor, {
          presence: true,
          length: { minimum: 1, maximum: 600 },
        }) == undefined
      );
    },
  };

  //Para cuando ocurre el evento keyuo o blur en los inputs o textarea valida el campo
  inputs.forEach((input) => {
    input.addEventListener("keyup", validarForm);
    input.addEventListener("blur", validarForm);
  });

  document.getElementById("mensaje").addEventListener("keyup", validarForm);
  document.getElementById("mensaje").addEventListener("blur", validarForm);

  //Submit
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if (
      Array.from(inputs).every((i) => i.classList.contains("is-valid")) &
      document.getElementById("mensaje").classList.contains("is-valid")
    ) {
      postMensaje();
      $("#contacto-modal").modal("hide");
    }
  });

//! En el git bash ejecutar el comando "npx json-server -p 3000 --watch db.json"
  function postMensaje() {
    $.ajax({
      url: "http://localhost:3000/mensajes",
      type: "POST",
      data: {
        "nombre": document.getElementById("nombre").value,
        "email": document.getElementById("email").value,
        "telefono": document.getElementById("telefono").value,
        "mensaje": document.getElementById("mensaje").value,
      },
      success: function (response) {
        console.log(response);
        formulario.reset();
        inputs.forEach((input) => {
          input.classList.remove("is-valid");
        });
        document.getElementById("mensaje").classList.remove("is-valid");
      },
    });
  }
});


