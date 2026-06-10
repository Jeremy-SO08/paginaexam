document.getElementById("btnRegistro").addEventListener("click", async () => {

    const usuario = document.getElementById("user").value;
    const contraseña = document.getElementById("pass").value;

    try {

        const respuesta = await fetch("http://localhost:3001/registro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario,
                contraseña
            })
        });

        const data = await respuesta.json();

        if (data.success) {

            alert("Usuario registrado correctamente");
            window.location.href = "logim.html";

        } else {

            alert("Error al registrar");

        }

    } catch (error) {

        console.error(error);
        alert("No se pudo conectar con el servidor");

    }

});