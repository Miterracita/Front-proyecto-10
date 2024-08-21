(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const L=e=>`
        <div class="event-box" id="event-${e._id}">
            <div class="event-img"><img src="${e.img}" alt="imagen del evento"/></div>
            <div class="event-info">              
                <h2 class="event-name">${e.name}</h2>
                <div id="error-message" class="error-message"></div>
                <p class="event-location">${e.location}</p>
                <p class="event-description">${e.description}</p> 
                <p class="event-date"><span>Date:</span> ${e.date}</p>
                <p class="event-hour"><span>Hour:</span> ${e.hour}</p>               
            </div>
            <div class="event-buttons">
                <button class="btn" onclick="handleViewEvent('${e._id}')">Ver Evento</button>
                <button class="btn" onclick="ConfirmarAsistencia('${e._id}')">Confirmar Asistencia</button>
                <button class="btn btn-delete" onclick="EliminarEvento('${e._id}')">Eliminar Evento</button>
            </div>
        </div>
    `;window.ConfirmarAsistencia=async e=>{await w(e)};window.EliminarEvento=async e=>{await B(e)};const q=()=>{const e=document.querySelector("body");e.className="",e.classList.add("body-newEvent");const t=document.querySelector("main"),n=`
        <section class="main-newEvent">
            <h1>New Event</h1>
            <h2 class="new-event">2024</h2>
            <h2 class="new-event">Summer Events</h2>
            <div id="error-message"></div>
            <div class="box-newEvent">
                <form id="newEventForm">
                    <div class="box-form-newEvent">
                        <div class="line-flex">
                            <label>Nombre:</label>
                            <input type="text" name="event-name" id="event-name" required>
                        </div>
                        <div class="line-flex">
                            <label>Descripción:</label>
                            <textarea rows="10" name="description" id="description">Descripción del evento</textarea>
                        </div>
                        <div class="line-flex">
                            <label>Fecha:</label>
                            <input type="date" id="date" name="date" value="2024-06-01" min="2024-06-01" max="2024-12-01" />

                            <label>Hora:</label>
                            <input type="time" id="time" name="time" min="19:00" max="05:00" required />
                        </div>
                        <div class="line-flex">
                            <label>Localización:</label>
                            <input type="text" id="location" name="location" value="location">
                        </div>
                        <div class="line-flex">
                            <label>Imagen del evento:</label>
                            <input type="file" id="event-img" name="event-img" />
                        </div>
                    </div>

                    <button type="submit" class="btn" id="btn-event-save">Guardar</button>
                </form>

            </div>
        </section>
    `;t.innerHTML=n;const s=async()=>{try{const i=await fetch(`${o}events/events`);if(!i.ok)throw new Error("Error al obtener los eventos");return await i.json()}catch(i){return console.error("Error al obtener los eventos:",i),[]}},o="https://back-proyecto-10-mu.vercel.app/",r=localStorage.getItem("token"),a=document.querySelector("#newEventForm"),c=async i=>{i.preventDefault();const[v,f,p,l,y,S]=i.target,d=new FormData;d.append("name",v.value),d.append("description",f.value),d.append("date",p.value),d.append("time",l.value),d.append("location",y.value),d.append("img",S.files[0]);try{const m=await fetch(`${o}events/nuevoEvento`,{method:"POST",headers:{Authorization:`Bearer ${r}`},body:d});if(!m.ok){console.error("Error en la respuesta del servidor:",m.statusText);return}const x=document.querySelector("#error-message"),$=await m.json();console.log("Respuesta del servidor:",$),x.textContent="El evento se ha creado correctamente.";const k=await s();setTimeout(()=>{EventList(k)},8e3)}catch(m){console.error("Error en la solicitud:",m)}};a.addEventListener("submit",c)},C=()=>{const e=document.querySelector("header");e.innerHTML=`
        <div class="header-btns">
            <button class="btn btn-header" id="new-event-link">Crear nuevo evento</button>
        </div>
    `,document.querySelector("#new-event-link").addEventListener("click",n=>{n.preventDefault(),q(),A(),j()})},P=()=>{const e=`
        <h2>Filtros</h2>
        <form id="filtro-eventos">
            <div class="form-buscar-nombre">
                <div>
                    <label class="bold" for="event-name">Buscar eventos por nombre:</label>
                    <input type="text" name="event-name" id="event-name" size="30">
                </div>
                <button type="submit" id="buscar-evento" class="btn btn-header">Buscar</button>
            </div>
        </form>
    `,t=document.querySelector(".filtros");t.innerHTML=e,document.querySelector("#filtro-eventos").addEventListener("submit",s=>{s.preventDefault();const o=document.querySelector("#event-name").value.trim();o?N(o):alert("Por favor, ingresa un nombre de evento para buscar.")})},E=e=>{const t=document.querySelector("body");t.className="",t.classList.add("body-eventList");const n=document.querySelector("main"),o=`
            <section id="eventos">
                <h1>Próximos Eventos</h1>
                <div class="filtros"></div>
                <div class="list-events">
                    ${e.map(r=>L(r)).join("")}
                </div>
            </section>
        `;n.innerHTML=o,C(),P()},u="https://back-proyecto-10-mu.vercel.app/",T=localStorage.getItem("token"),h=async(e,t)=>{document.getElementById("loading").style.display="block";const n=document.querySelector("#error-message"),o={method:"POST",body:JSON.stringify({userName:e,password:t}),headers:{"Content-Type":"application/json"}};try{const r=await fetch(`${u}users/login`,o);if(r.status===400){n.textContent="Usuario o contraseña incorrectos";return}n&&n.remove();const a=await r.json();console.log("Respuesta del servidor:",a),a.token?(localStorage.setItem("token",a.token),g()):(console.error("El token no está definido en la respuesta:",a),n.textContent="Error al iniciar sesión. Por favor, inténtalo de nuevo.")}catch(r){console.error("Error en la petición:",r),n.textContent="Error en la conexión. Por favor, inténtalo de nuevo."}finally{document.getElementById("loading").style.display="none"}},B=async e=>{document.getElementById("loading").style.display="block";try{const t=await fetch(`${u}events/${e}/borrar`,{method:"DELETE",headers:{Authorization:`Bearer ${T}`,"Content-Type":"application/json"}});if(!t.ok){console.error("Error en la respuesta del servidor:",t.statusText);const s=document.querySelector("#error-message");s.textContent=`Error: ${t.statusText}`;return}const n=await t.json();console.log("Respuesta del servidor:",n),errorMessage.textContent="El evento se ha eliminado correctamente."}catch(t){console.error("Error en la solicitud:",t);const n=document.querySelector("#error-message");n.textContent="Error al eliminar el evento. Inténtelo de nuevo."}finally{document.getElementById("loading").style.display="none"}},g=async()=>{document.getElementById("loading").style.display="block";try{const e=await fetch(`${u}events/events`);if(!e.ok)throw new Error("Error al obtener los eventos");const t=await e.json();return E(t),t}catch(e){return console.error("Error al obtener los eventos:",e),[]}finally{document.getElementById("loading").style.display="none"}},N=async e=>{document.getElementById("loading").style.display="block";try{const t=await fetch(`${u}events/${e}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(console.log("Response status:",t.status),!t.ok)throw new Error("Error al obtener el evento");const n=await t.json();return console.log("Eventos obtenidos:",n),E(n),n}catch(t){return console.error("Error al obtener los eventos:",t),[]}finally{document.getElementById("loading").style.display="none"}},I=async e=>{document.getElementById("loading").style.display="block";const t=localStorage.getItem("token"),n=document.querySelector(".asistentes"),s=document.querySelector("#error-message");if(!t){console.error("No se encontró el token de autenticación.");return}try{const o=await fetch(`${u}events/${e}/asistentes`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!o.ok)throw new Error(`Error al consultar los asistentes a este evento: ${o.statusText}`);const r=await o.json();Array.isArray(r)&&r.length>0?n.innerHTML=`
          <h3>Estos son los asistentes al evento:</h3>
          <ul>
            ${r.map(a=>`<li><strong>Usuario:</strong> ${a.userName} - ${a.email}</li>`).join(`
`)}
          </ul>
        `:s.textContent="No hay asistentes al evento.";return}catch(o){console.error("Error:",o)}finally{document.getElementById("loading").style.display="none"}},w=async e=>{document.getElementById("loading").style.display="block";const t=localStorage.getItem("token"),n=document.querySelector(`#event-${e} .error-message`);if(!t){console.error("No se encontró el token de autenticación."),n.textContent="Por favor, inicia sesión para confirmar tu asistencia.";return}try{const s=await fetch(`${u}events/${e}/confirmarAsistencia`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!s.ok)throw new Error(`Error al confirmar asistencia: ${s.statusText}`);const o=await s.json();n.textContent=o.message}catch(s){console.error("Error:",s),n.textContent="Hubo un problema al confirmar tu asistencia. Por favor, intenta de nuevo más tarde."}finally{document.getElementById("loading").style.display="none"}},j=()=>{const e='<button class="btn btn-header" id="btn-volver">Volver</button>',t=document.querySelector(".header-btns");t.innerHTML+=e,document.querySelector("#btn-volver").addEventListener("click",s=>{s.preventDefault(),g()})},A=()=>{const e=document.querySelector(".header-btns");e.innerHTML=""},H="https://back-proyecto-10-mu.vercel.app/",M=()=>{const e=document.querySelector("body");e.className="",e.classList.add("body-newRegister");const t=document.querySelector("main"),n=`
        <section class="main-newRegister">
            <h1 class="register">New User</h1>
            <h2 class="register">2024</h2>
            <h2 class="register">Summer Events</h2>
            <div id="error-message"></div>
            <div class="box-newRegister">
                <form id="newRegisterForm">
                    <div class="box-form">
                        <div>
                            <label for="userName">UserName: </label>
                            <input type="text" name="username" id="username" >
                        </div>
                        <div>
                            <label for="password">Pasword: </label>
                            <input type="password" id="password" name="password" minlength="8" required />
                        </div>
                        <div>
                            <label for="email">Email: </label>
                            <input type="email" id="email" name="email" size="30" required />
                        </div>
                    </div>
                    <button type="submit" class="btn" id="btn-save-user">Guardar</button>
                </form>
            </div>
        </section>
    `;t.innerHTML=n;const s=document.querySelector("#newRegisterForm"),o=async r=>{r.preventDefault();const a=document.querySelector("#error-message"),c=document.querySelector("#username").value,i=document.querySelector("#password").value,v=document.querySelector("#email").value,p={method:"POST",body:JSON.stringify({userName:c,password:i,email:v}),headers:{"Content-Type":"application/json"}};try{const l=await fetch(`${H}users/registro`,p);if(!l.ok){l.status===400?a.textContent="El nombre de usuario y/o password ya existe. Por favor, elija otro.":console.error("Error en la respuesta del servidor:",l.statusText);return}a&&(a.textContent="");const y=await l.json();console.log("Respuesta del servidor:",y),a.textContent="Usuario creado correctamente.",setTimeout(()=>{h(c,i)},5e3)}catch(l){console.error("Error en la solicitud:",l),a.textContent="Error en la solicitud. Inténtalo de nuevo más tarde."}};s.addEventListener("submit",o)},D=()=>{document.querySelector("body").classList.add("body-login");const t=document.querySelector("main"),n=`
        <section id="main-login">
            <h1>Summer Events</h1>
            <h2>2024</h2>
            <div id="error-message"></div>
            <div class="box-login">
                <form id="loginForm">
                    <div class="box-form">
                        <div>
                            <label for="username">UserName: </label>
                            <input type="text" name="username" id="username" autocomplete="username">
                        </div>
                        <div>
                            <label for="password">Password: </label>
                            <input type="password" name="password" id="password" autocomplete="current-password">
                        </div>
                    </div>
                    <button type="submit" class="btn" id="btn-enviar">Enviar</button>
                </form>

                <div class="box-info">
                    <p class="txt">Si no recuerdas tu userName o password - Recordar</p>
                    <p class="txt">Si no estás registrado <a href="#" id="register-link">Regístrate</a></p>
                </div>
            </div>
        </section>
    `;t.innerHTML=n;const s=document.querySelector("#loginForm"),o=document.querySelector("#username"),r=document.querySelector("#password");s.addEventListener("submit",function(c){c.preventDefault(),h(o.value,r.value)}),document.querySelector("#register-link").addEventListener("click",c=>{c.preventDefault(),M()})},F=e=>{const t=document.querySelector("body");t.className="",t.classList.add("body-eventPage");const n=document.querySelector("main"),s=`
        <div class="eventPage-box-page" id="event-${e._id}">
            <div class="eventPage-img"><img src="${e.img}" /></div>
            <div class="eventPage-info">              
                <h2 class="eventPage-name">${e.name}</h2>
                <div id="error-message" class="error-message"></div>
                <p class="eventPage-location">${e.location}</p>
                <p class="eventPage-description">${e.description}</p> 
                <p class="eventPage-date"><span>Date:</span> ${e.date}</p>
                <p class="eventPage-hour"><span>Hour:</span> ${e.hour}</p>
                <div class="asistentes"></div>             
            </div>
            <div class="eventPage-buttons">
                <button class="btn" id="ver-asistentes">Ver Asistentes</button>
                <button class="btn" id="confirmar-asistencia">Confirmar Asistencia</button>
            </div>
        </div>
    `;n.innerHTML=s,document.querySelector("#ver-asistentes").addEventListener("click",a=>{a.preventDefault(),I(`${e._id}`)}),document.querySelector("#confirmar-asistencia").addEventListener("click",a=>{a.preventDefault(),w(`${e._id}`)})},b="https://back-proyecto-10-mu.vercel.app/";document.addEventListener("DOMContentLoaded",function(){const e=localStorage.getItem("token");e?(console.log("Usuario autenticado con token:",e),g()):D()});const R=async e=>{document.getElementById("loading").style.display="block";try{const t=await fetch(`${b}events/${e}`);if(!t.ok)throw new Error("Error al obtener los detalles del evento");return await t.json()}catch(t){return console.error("Error al obtener los detalles del evento:",t),null}finally{document.getElementById("loading").style.display="none"}};window.handleViewEvent=async e=>{const t=await R(e);t?F(t):console.error("Error al cargar los detalles del evento")};const O=async e=>{document.getElementById("loading").style.display="block";const t=localStorage.getItem("token"),n=document.querySelector(`#event-${e} .error-message`);if(!t){console.error("No se encontró el token de autenticación."),n.textContent="Por favor, inicia sesión para confirmar tu asistencia.";return}try{const s=await fetch(`${b}events/${e}/asistentes`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!s.ok)throw new Error(`Error al verificar asistencia: ${s.statusText}`);if((await s.json()).isUserAttending){n.textContent="Ya has confirmado tu asistencia a este evento.";return}const r=await fetch(`${b}events/${e}/confirmarAsistencia`,{method:"POST",body:JSON.stringify({eventId:e}),headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!r.ok)throw new Error(`Error al confirmar asistencia: ${r.statusText}`);const a=await r.json();return n.textContent="Se ha confirmado tu asistencia al evento.",a}catch(s){console.error("Error:",s),n.textContent="Hubo un problema al confirmar tu asistencia. Por favor, intenta de nuevo más tarde."}finally{document.getElementById("loading").style.display="none"}};window.handleConfirmarAsistencia=async e=>{await O(e)};
