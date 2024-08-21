(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();const q=e=>`
        <div class="event-box" id="event-${e._id}">
            <div class="event-img"><img src="${e.img||"https://res.cloudinary.com/dq2daoeex/image/upload/v1723579439/API-Rest-FILES/imagen_por_defecto_dldpud.jpg"}" alt="imagen del evento"/></div>
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
    `;window.ConfirmarAsistencia=async e=>{await x(e)};window.EliminarEvento=async e=>{await I(e)};const C=()=>{const e=document.querySelector("body");e.className="",e.classList.add("body-newEvent");const t=document.querySelector("main"),o=`
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
    `;t.innerHTML=o;const r=async()=>{try{const c=await fetch(`${n}events/events`);if(!c.ok)throw new Error("Error al obtener los eventos");return await c.json()}catch(c){return console.error("Error al obtener los eventos:",c),[]}},n="https://back-proyecto-10-mu.vercel.app/",s=localStorage.getItem("token"),a=document.querySelector("#newEventForm"),i=async c=>{c.preventDefault();const[v,f,p,l,y,S]=c.target,d=new FormData;d.append("name",v.value),d.append("description",f.value),d.append("date",p.value),d.append("time",l.value),d.append("location",y.value),d.append("img",S.files[0]);try{const m=await fetch(`${n}events/nuevoEvento`,{method:"POST",headers:{Authorization:`Bearer ${s}`},body:d});if(!m.ok){console.error("Error en la respuesta del servidor:",m.statusText);return}const $=document.querySelector("#error-message"),k=await m.json();console.log("Respuesta del servidor:",k),$.textContent="El evento se ha creado correctamente.";const L=await r();setTimeout(()=>{EventList(L)},8e3)}catch(m){console.error("Error en la solicitud:",m)}};a.addEventListener("submit",i)},P=()=>{const e=document.querySelector("header");e.innerHTML=`
        <div class="header-btns">
            <button class="btn btn-header" id="new-event-link">Crear nuevo evento</button>
        </div>
    `,document.querySelector("#new-event-link").addEventListener("click",o=>{o.preventDefault(),C(),j(),A()})},T=()=>{const e=`
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
    `,t=document.querySelector(".filtros");t.innerHTML=e,document.querySelector("#filtro-eventos").addEventListener("submit",r=>{r.preventDefault();const n=document.querySelector("#event-name").value.trim();n?B(n):alert("Por favor, ingresa un nombre de evento para buscar.")})},E=e=>{const t=document.querySelector("body");t.className="",t.classList.add("body-eventList");const o=document.querySelector("main"),n=`
            <section id="eventos">
                <h1>Próximos Eventos</h1>
                <div class="filtros"></div>
                <div class="list-events">
                    ${e.map(s=>q(s)).join("")}
                </div>
            </section>
        `;o.innerHTML=n,P(),T()},u="https://back-proyecto-10-mu.vercel.app/",h=localStorage.getItem("token"),w=async(e,t)=>{document.getElementById("loading").style.display="block";const o=document.querySelector("#error-message"),n={method:"POST",body:JSON.stringify({userName:e,password:t}),headers:{"Content-Type":"application/json"}};try{const s=await fetch(`${u}users/login`,n);if(s.status===400){o.textContent="Usuario o contraseña incorrectos";return}o&&o.remove();const a=await s.json();console.log("Respuesta del servidor:",a),a.token?(localStorage.setItem("token",a.token),b()):(console.error("El token no está definido en la respuesta:",a),o.textContent="Error al iniciar sesión. Por favor, inténtalo de nuevo.")}catch(s){console.error("Error en la petición:",s),o.textContent="Error en la conexión. Por favor, inténtalo de nuevo."}finally{document.getElementById("loading").style.display="none"}},I=async e=>{document.getElementById("loading").style.display="block";try{const t=await fetch(`${u}events/${e}/borrar`,{method:"DELETE",headers:{Authorization:`Bearer ${h}`,"Content-Type":"application/json"}});if(!t.ok){const r=document.querySelector(`#event-${e} .error-message`);r.textContent=`Error: ${t.statusText}`,console.error("Error en la respuesta del servidor:",t.statusText);return}const o=await t.json();boxErrorMessage.textContent="El evento se ha eliminado correctamente.",console.log("Respuesta del servidor:",o)}catch(t){console.error("Error en la solicitud:",t),boxErrorMessage.textContent=`Error al eliminar el evento: ${t.message}. Inténtelo de nuevo.`}finally{setTimeout(()=>{window.location.reload()},4e3),document.getElementById("loading").style.display="none"}},b=async()=>{document.getElementById("loading").style.display="block";try{const e=await fetch(`${u}events/events`);if(!e.ok)throw new Error("Error al obtener los eventos");const t=await e.json();return E(t),t}catch(e){return console.error("Error al obtener los eventos:",e),[]}finally{document.getElementById("loading").style.display="none"}},B=async e=>{document.getElementById("loading").style.display="block";try{const t=await fetch(`${u}events?name=${encodeURIComponent(e)}`,{method:"GET",headers:{Authorization:`Bearer ${h}`,"Content-Type":"application/json"}});if(!t.ok){console.error("Error en la respuesta del servidor:",t.statusText);const r=document.querySelector("#error-message");r.textContent=`Error: ${t.statusText}`;return}const o=await t.json();console.log("Eventos encontrados:",o),E(o)}catch(t){console.error("Error al obtener los eventos:",t);const o=document.querySelector("#error-message");o.textContent="Error al buscar el evento. Inténtelo de nuevo."}finally{document.getElementById("loading").style.display="none"}},N=async e=>{document.getElementById("loading").style.display="block";const t=localStorage.getItem("token"),o=document.querySelector(".asistentes"),r=document.querySelector("#error-message");if(!t){console.error("No se encontró el token de autenticación.");return}try{const n=await fetch(`${u}events/${e}/asistentes`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!n.ok)throw new Error(`Error al consultar los asistentes a este evento: ${n.statusText}`);const s=await n.json();Array.isArray(s)&&s.length>0?o.innerHTML=`
          <h3>Estos son los asistentes al evento:</h3>
          <ul>
            ${s.map(a=>`<li><strong>Usuario:</strong> ${a.userName} - ${a.email}</li>`).join(`
`)}
          </ul>
        `:r.textContent="No hay asistentes al evento.";return}catch(n){console.error("Error:",n)}finally{document.getElementById("loading").style.display="none"}},x=async e=>{document.getElementById("loading").style.display="block";const t=localStorage.getItem("token"),o=document.querySelector(`#event-${e} .error-message`);if(!t){console.error("No se encontró el token de autenticación."),o.textContent="Por favor, inicia sesión para confirmar tu asistencia.";return}try{const r=await fetch(`${u}events/${e}/confirmarAsistencia`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!r.ok)throw new Error(`Error al confirmar asistencia: ${r.statusText}`);const n=await r.json();o.textContent=n.message}catch(r){console.error("Error:",r),o.textContent="Hubo un problema al confirmar tu asistencia. Por favor, intenta de nuevo más tarde."}finally{document.getElementById("loading").style.display="none"}},A=()=>{const e='<button class="btn btn-header" id="btn-volver">Volver</button>',t=document.querySelector(".header-btns");t.innerHTML+=e,document.querySelector("#btn-volver").addEventListener("click",r=>{r.preventDefault(),b()})},j=()=>{const e=document.querySelector(".header-btns");e.innerHTML=""},D="https://back-proyecto-10-mu.vercel.app/",H=()=>{const e=document.querySelector("body");e.className="",e.classList.add("body-newRegister");const t=document.querySelector("main"),o=`
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
    `;t.innerHTML=o;const r=document.querySelector("#newRegisterForm"),n=async s=>{s.preventDefault();const a=document.querySelector("#error-message"),i=document.querySelector("#username").value,c=document.querySelector("#password").value,v=document.querySelector("#email").value,p={method:"POST",body:JSON.stringify({userName:i,password:c,email:v}),headers:{"Content-Type":"application/json"}};try{const l=await fetch(`${D}users/registro`,p);if(!l.ok){l.status===400?a.textContent="El nombre de usuario y/o password ya existe. Por favor, elija otro.":console.error("Error en la respuesta del servidor:",l.statusText);return}a&&(a.textContent="");const y=await l.json();console.log("Respuesta del servidor:",y),a.textContent="Usuario creado correctamente.",setTimeout(()=>{w(i,c)},5e3)}catch(l){console.error("Error en la solicitud:",l),a.textContent="Error en la solicitud. Inténtalo de nuevo más tarde."}};r.addEventListener("submit",n)},M=()=>{document.querySelector("body").classList.add("body-login");const t=document.querySelector("main"),o=`
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
    `;t.innerHTML=o;const r=document.querySelector("#loginForm"),n=document.querySelector("#username"),s=document.querySelector("#password");r.addEventListener("submit",function(i){i.preventDefault(),w(n.value,s.value)}),document.querySelector("#register-link").addEventListener("click",i=>{i.preventDefault(),H()})},F=e=>{const t=document.querySelector("body");t.className="",t.classList.add("body-eventPage");const o=document.querySelector("main"),n=`
        <div class="eventPage-box-page" id="event-${e._id}">
            <div class="eventPage-img"><img src="${e.img||"https://res.cloudinary.com/dq2daoeex/image/upload/v1723579439/API-Rest-FILES/imagen_por_defecto_dldpud.jpg"}" /></div>
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
    `;o.innerHTML=n,document.querySelector("#ver-asistentes").addEventListener("click",i=>{i.preventDefault(),N(`${e._id}`)}),document.querySelector("#confirmar-asistencia").addEventListener("click",i=>{i.preventDefault(),x(`${e._id}`)})},g="https://back-proyecto-10-mu.vercel.app/";document.addEventListener("DOMContentLoaded",function(){const e=localStorage.getItem("token");e?(console.log("Usuario autenticado con token:",e),b()):M()});const R=async e=>{document.getElementById("loading").style.display="block";try{const t=await fetch(`${g}events/${e}`);if(!t.ok)throw new Error("Error al obtener los detalles del evento");return await t.json()}catch(t){return console.error("Error al obtener los detalles del evento:",t),null}finally{document.getElementById("loading").style.display="none"}};window.handleViewEvent=async e=>{const t=await R(e);t?F(t):console.error("Error al cargar los detalles del evento")};const O=async e=>{document.getElementById("loading").style.display="block";const t=localStorage.getItem("token"),o=document.querySelector(`#event-${e} .error-message`);if(!t){console.error("No se encontró el token de autenticación."),o.textContent="Por favor, inicia sesión para confirmar tu asistencia.";return}try{const r=await fetch(`${g}events/${e}/asistentes`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!r.ok)throw new Error(`Error al verificar asistencia: ${r.statusText}`);if((await r.json()).isUserAttending){o.textContent="Ya has confirmado tu asistencia a este evento.";return}const s=await fetch(`${g}events/${e}/confirmarAsistencia`,{method:"POST",body:JSON.stringify({eventId:e}),headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!s.ok)throw new Error(`Error al confirmar asistencia: ${s.statusText}`);const a=await s.json();return o.textContent="Se ha confirmado tu asistencia al evento.",a}catch(r){console.error("Error:",r),o.textContent="Hubo un problema al confirmar tu asistencia. Por favor, intenta de nuevo más tarde."}finally{document.getElementById("loading").style.display="none"}};window.handleConfirmarAsistencia=async e=>{await O(e)};