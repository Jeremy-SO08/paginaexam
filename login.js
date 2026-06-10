document.getElementById("loginForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const usuario = document.getElementById("email").value;
    const contraseña = document.getElementById("password").value;

    console.log(usuario, contraseña);

    const respuesta = await fetch("http://localhost:3001/login", {
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

    console.log(data);

    if (data.success) {
        window.location.href = "examen.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }

}); 