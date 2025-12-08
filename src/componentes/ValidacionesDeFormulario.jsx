import { useState } from "react";

const contactoInicial = {
  nombre: "",
  correo: "",
  asunto: "",
  comentarios: "",
  // Estado para controlar los errores
  errores: {
    nombre: null, // null (o false) si es válido, string con mensaje si es inválido
    correo: null,
    asunto: null,
    comentarios: null,
  },
  carga: false, // para el loader
  mensaje: null, // para la respuesta simulada del servidor
};

const ValidacionesDeFormulario = () => {
  const [formulario, setFormulario] = useState(contactoInicial);

  // --- Manejando datos de estado ---
  const manejarCambios = (e) => {
    setFormulario({
      ...formulario, // 1. Copia inmutable del estado actual
      [e.target.name]: e.target.value, // 2. Actualiza SOLO el campo que disparó el evento (usando el atributo 'name')
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <a href="https://github.com/adroprado/formulario-react" target="_blank">
        <img src="/src/assets/github.svg" alt="Github" />
      </a>
      <h2>Validaciones de Formulario</h2>
      <form
        className="formulario-contacto"
        autoComplete="off"
        onSubmit={manejarEnvio}
      >
        <legend>Envianos tus comentarios</legend>
        <input
          type="text"
          name="nombre"
          placeholder="Escribe tu nombre"
          title="Nombre sólo acepta letras y espacios en blanco"
          pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
          required
          value={formulario.nombre}
          onChange={manejarCambios}
        />
        {/* Podemos trabajar expresiones regulares desde html, para ello usamos el atributo "pattern" */}
        <input
          type="email"
          name="correo"
          placeholder="Escribe tu email"
          title="Email incorrecto"
          pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
          required
          value={formulario.correo}
          onChange={manejarCambios}
        />
        <input
          type="text"
          name="asunto"
          placeholder="Asunto a tratar"
          title="El asunto es requerido"
          required
          value={formulario.asunto}
          onChange={manejarCambios}
        />
        {/* Los textarea no aceptan un pattern cómo los input, pero usaremos un atributo data, y con jS validaremos este atributo */}
        <textarea
          name="comentarios"
          cols="50"
          rows="5"
          placeholder="Escribe tus comentarios"
          title="Tu comentario no debe exceder los 255 caracteres"
          data-pattern="^.{1,255}$"
          required
          value={formulario.comentarios}
          onChange={manejarCambios}
        ></textarea>
        <input type="submit" value="Enviar" />
      </form>
    </main>
  );
};

const CargadorDeEspera = () => {
  return (
    <>
      <div className="formulario-contacto-cargador none">
        <img src="assets/oval.svg" alt="Cargando" />
      </div>
    </>
  );
};

const Mensaje = () => {
  return (
    <div className="formulario-contacto-respuesta none">
      <p>Los datos han sido enviados</p>
    </div>
  );
};

export default ValidacionesDeFormulario;
