document.getElementById("nombre").value =
localStorage.getItem("nombre") || "";

document.getElementById("profesion").value =
localStorage.getItem("profesion") || "";

document.getElementById("descripcion").value =
localStorage.getItem("descripcion") || "";

document.getElementById("titulo").value =
localStorage.getItem("titulo") || "";

document.getElementById("subtitulo").value =
localStorage.getItem("subtitulo") || "";

function guardar(){

    localStorage.setItem("nombre", document.getElementById("nombre").value);
    localStorage.setItem("profesion", document.getElementById("profesion").value);
    localStorage.setItem("descripcion", document.getElementById("descripcion").value);
    localStorage.setItem("titulo", document.getElementById("titulo").value);
    localStorage.setItem("subtitulo", document.getElementById("subtitulo").value);

    alert("Perfil actualizado correctamente");

    window.location.href = "examen.html";
}