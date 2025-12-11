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

const Formulario = () => {
  const [formulario, setFormulario] = useState(contactoInicial);

  const validaciones = (e) => {
    const { name, value } = e.target; // Destructurando nuestro objeto
    let error; // Variable que controla el mensaje del atributo title de los inputs

    const patron = e.target.pattern || e.target.dataset.pattern; // Obteniendo el patron de los inputs o del data-pattern

    // Validación de input con patrón y que tienen contenido
    if (patron && value !== "") {
      let regex = new RegExp(patron);
      !regex.exec(value) // Si la expresión regular valida que el valor de nuestros inpust no es correcto
        ? (error = e.target.title) // debe mostrar el mensaje personalizado del atributo title de HTML de los Inputs
        : (error = null); // De lo contario, que no haga nada, es decir, el valor que ingresa el usuario es correcto.
    }

    // Validación de input sin patrón para el textarea o campos vacíos
    if (!patron) {
      value === "" ? (error = e.target.title) : (error = null);
    }

    // Actualizando el estado de errores de forma inmutable
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      errores: {
        ...prevFormulario.errores, // Copia los errores de los otros campos
        [name]: error, // Actuliza solo el error del campo actual
      },
    }));
  };

  // --- Manejando datos de estado ---
  const manejarCambios = (e) => {
    setFormulario({
      ...formulario, // 1. Copia inmutable del estado actual
      [e.target.name]: e.target.value, // 2. Actualiza SOLO el campo que disparó el evento (usando el atributo 'name')
    });

    validaciones(e);
  };

  // --- Manejando el envio de datos ---
  const manejarEnvio = (e) => {
    e.preventDefault();

    // Verifica si AL MENOS UN elemento en el array de errores es diferente de null (es decir, es una cadena de error)
    if (Object.values(formulario.errores).some((error) => error !== null)) {
      return; // Si encontramos algún error, detenemos el envío
    }

    // Verifica que los campos del formulario no se encuentren vacíos
    if (Object.values(formulario).some((campo) => campo === "")) {
      return; // Si encontarmos un campo vacío, detenemos el envío
    }

    setFormulario({ ...formulario, carga: true }); // Indica que el componente CargadorDeespera debe cargar.

    setTimeout(() => {
      // 1. Ocultar Carga y Mostrar Mensaje de Éxito, y Limpiar Formulario
      setFormulario({
        ...contactoInicial, // Limia los campos del formulario
        carga: false, // Ocultamos el cargador
        mensaje: "Los datos han sido enviados con éxito", //Mostramos al usuario el mensaje
      });

      // Ocultar Mensaje después de 3000 ms
      setTimeout(
        () => setFormulario((prev) => ({ ...prev, mensaje: null })),
        3000
      );
    }, 3000);
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
        <span
          className={`formulario-contacto-error ${
            formulario.errores.nombre ? "is-active" : "none"
          }`}
        >
          {formulario.errores.nombre}
        </span>
        <input
          type="email"
          name="correo"
          placeholder="Escribe tu email"
          title="El correo es incorrecto"
          pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
          required
          value={formulario.correo}
          onChange={manejarCambios}
        />
        <span
          className={`formulario-contacto-error ${
            formulario.errores.correo ? "is-active" : "none"
          }`}
        >
          {formulario.errores.correo}
        </span>
        <input
          type="text"
          name="asunto"
          placeholder="Asunto a tratar"
          title="El asunto es requerido"
          required
          value={formulario.asunto}
          onChange={manejarCambios}
        />
        <span
          className={`formulario-contacto-error ${
            formulario.errores.asunto ? "is-active" : "none"
          }`}
        >
          {formulario.errores.asunto}
        </span>
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
        <span
          className={`formulario-contacto-error ${
            formulario.errores.comentarios ? "is-active" : "none"
          }`}
        >
          {formulario.errores.comentarios}
        </span>
        <input type="submit" value="Enviar" />
        {/* Conexión del Cargador: Muestra si formulario.carga es true
         */}
        {formulario.carga && (
          <div className="formulario-contacto-cargador ">
            <img src="/src/assets/oval.svg" alt="Cargando" />
          </div>
        )}
        {/* Conexión del Mensaje: Muestra si formulario.mensaje es una cadena */}
        {formulario.mensaje && (
          <div className="formulario-contacto-respuesta ">
            <p>{formulario.mensaje}</p>
          </div>
        )}
      </form>
    </main>
  );
};

export default Formulario;
