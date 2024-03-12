import { useState } from "react";

function Formulario({crearColor}) {
  let [textoTemporal, setTextoTemporal] = useState("");
  let [error, setError] = useState(false);
  let [mensajeError, setMensajeError] = useState("");

  const handleSubmit = (evento) => {
    evento.preventDefault();
    setError(false);

    let valido = /^([0-9]{1,3},){2}[0-9]{1,3}$/;

    if (valido) {
      let [r, g, b] = textoTemporal.split(",").map((n) => Number(n));

      [r, g, b].forEach((n) => (valido = valido && n <= 255));

      if (valido) {
        return fetch("https://api-colores-full-p436.onrender.com/colores/nuevo/", {
          method: "POST",
          body: JSON.stringify({ r, g, b }),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((respuesta) => respuesta.json())
          .then(({error, id})=> {
            if(!error){
                crearColor({id,r,g,b})
                return setTextoTemporal("")
            }
            console.log("No se ha podido crear el color")
          });
      }

      setMensajeError("Deben ser 3 números entre 0 y 255");
      return setError(true);
    }

    setMensajeError("formato inválido");
    setError(true);
  };

  /*const validarTexto = (texto) => {
    setError(false)
    const regex = /^([0-9]{1,3},){2}[0-9]{1,3}$/ //Tendrá entre 1 y 3 caracteres entre 0 y 9
    return regex.test(texto);
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    if (!validarTexto(textoTemporal)) {
      let [r,g,b] = textoTemporal.split(",").map(n => Number(n));

      [r,g,b].forEach( n => validarTexto(textoTemporal) = validarTexto(textoTemporal) && n <= 255)
      
      return console.log("bien")
    }

    console.log("error")
   setMensajeError("formato inválido")
   setError(true)
  };*/

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="rrr,ggg,bbb"
        value={textoTemporal}
        onChange={(evento) => setTextoTemporal(evento.target.value)}
      />
      <p className={`error ${error ? "visible" : ""}`}>{mensajeError}</p>
      <input type="submit" value="crear color" />
    </form>
  );
}

export default Formulario;
