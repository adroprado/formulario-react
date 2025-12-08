const ValidacionesDeFormulario = () => {
  return (
    <main>
      <a href="https://github.com/adroprado/formulario-react" target="_blank">
        <img src="/src/assets/github.svg" alt="Github" />
      </a>
      <h2>Validaciones de Formulario</h2>
      <form className="formulario-contacto" autoComplete="off">
        <legend>Envianos tus comentarios</legend>
        <input
          type="text"
          name="nombre"
          placeholder="Escribe tu nombre"
          title="Nombre sólo acepta letras y espacios en blanco"
          pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
          required
        />
        {/* Podemos trabajar expresiones regulares desde html, para ello usamos el atributo "pattern" */}
        <input
          type="email"
          name="correo"
          placeholder="Escribe tu email"
          title="Email incorrecto"
          pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
          required
        />
        <input
          type="text"
          name="asunto"
          placeholder="Asunto a tratar"
          title="El asunto es requerido"
          required
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
        ></textarea>
        <input type="submit" value="Enviar" />
        <div className="formulario-contacto-cargador none">
          <img src="assets/oval.svg" alt="Cargando" />
        </div>
        <div className="formulario-contacto-respuesta none">
          <p>Los datos han sido enviados</p>
        </div>
      </form>
    </main>
  );
};

export default ValidacionesDeFormulario;
