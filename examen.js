const nombre = localStorage.getItem("nombre");
const profesion = localStorage.getItem("profesion");
const descripcion = localStorage.getItem("descripcion");
const titulo = localStorage.getItem("titulo");
const subtitulo = localStorage.getItem("subtitulo");

if(nombre){
    document.getElementById("nombrePerfil").textContent = nombre;
}

if(profesion){
    document.getElementById("profesionPerfil").textContent = profesion;
}

if(descripcion){
    document.getElementById("descripcionPerfil").textContent = descripcion;
}

if(titulo){
    document.getElementById("tituloHeader").textContent = titulo;
}

if(subtitulo){
    document.getElementById("subtituloHeader").textContent = subtitulo;
}