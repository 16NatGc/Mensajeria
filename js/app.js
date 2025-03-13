document.addEventListener('DOMContentLoaded', () => {
     const formulario = document.querySelector('#formulario');
     const listaTweets = document.querySelector('#lista-tweets tbody');
 
     formulario.addEventListener('submit', agregarTweet);
     listaTweets.addEventListener('click', manejarAcciones);
 
     cargarMensajesDesdeLocalStorage();
 
     function agregarTweet(e) {
         e.preventDefault();
         const tweet = document.querySelector('#tweet').value;
         if (tweet === '') {
             alert('El mensaje no puede estar vacío');
             return;
         }
         const row = document.createElement('tr');
         row.innerHTML = `
             <td>${tweet}</td>
             <td>
                 <span class="borrar-tweet"><i class="fas fa-trash-alt"></i></span>
             </td>
         `;
         listaTweets.appendChild(row);
         document.querySelector('#tweet').value = '';
         guardarMensajesEnLocalStorage();
     }
 
     function manejarAcciones(e) {
         // Corrección: Comprobamos si el elemento clicado o su padre tiene la clase 'borrar-tweet'
         const borrarElement = e.target.closest('.borrar-tweet');
         if (borrarElement) {
             borrarElement.parentElement.parentElement.remove();
             guardarMensajesEnLocalStorage();
         }
     }
 
     function guardarMensajesEnLocalStorage() {
         const mensajes = [];
         const filas = document.querySelectorAll('#lista-tweets tbody tr');
         filas.forEach(fila => {
             mensajes.push(fila.querySelector('td:first-child').textContent);
         });
         localStorage.setItem('mensajes', JSON.stringify(mensajes));
     }
 
     function cargarMensajesDesdeLocalStorage() {
         const mensajesGuardados = localStorage.getItem('mensajes');
         if (mensajesGuardados) {
             const mensajes = JSON.parse(mensajesGuardados);
             mensajes.forEach(mensaje => {
                 const row = document.createElement('tr');
                 row.innerHTML = `
                     <td>${mensaje}</td>
                     <td>
                         <span class="borrar-tweet"><i class="fas fa-trash-alt"></i></span>
                     </td>
                 `;
                 listaTweets.appendChild(row);
             });
         }
     }
 });