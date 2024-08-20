(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const w=e=>`
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
    `;window.ConfirmarAsistencia=async e=>{await E(e)};window.EliminarEvento=async e=>{await L(e)};const x=()=>{const e=document.querySelector("body");e.className="",e.classList.add("body-newEvent");const t=document.querySelector("main"),n=`
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
    `;t.innerHTML=n,document.querySelector("#newEventForm").addEventListener("submit",o=>{o.preventDefault(),k(o)})},S=()=>{const e=document.querySelector("header");e.innerHTML=`
        <div class="header-btns">
            <button class="btn btn-header" id="new-event-link">Crear nuevo evento</button>
        </div>
    `,document.querySelector("#new-event-link").addEventListener("click",n=>{n.preventDefault(),x(),T(),P()})},$=()=>{const e=`
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
    `,t=document.querySelector(".filtros");t.innerHTML=e,document.querySelector("#filtro-eventos").addEventListener("submit",r=>{r.preventDefault();const o=document.querySelector("#event-name").value.trim();o?q(o):alert("Por favor, ingresa un nombre de evento para buscar.")})},p=e=>{const t=document.querySelector("body");t.className="",t.classList.add("body-eventList");const n=document.querySelector("main"),o=`
            <section id="eventos">
                <h1>Próximos Eventos</h1>
                <div class="filtros"></div>
                <div class="list-events">
                    ${e.map(s=>w(s)).join("")}
                </div>
            </section>
        `;n.innerHTML=o,S(),$()},l="https://back-proyecto-10-mu.vercel.app/",y=localStorage.getItem("token"),b=async(e,t)=>{document.getElementById("loading").style.display="block";const n=document.querySelector("#error-message"),o={method:"POST",body:JSON.stringify({userName:e,password:t}),headers:{"Content-Type":"application/json"}};try{const s=await fetch(`${l}users/login`,o);if(s.status===400){n.textContent="Usuario o contraseña incorrectos";return}n&&n.remove();const a=await s.json();console.log("Respuesta del servidor:",a),a.token?(localStorage.setItem("token",a.token),f()):(console.error("El token no está definido en la respuesta:",a),n.textContent="Error al iniciar sesión. Por favor, inténtalo de nuevo.")}catch(s){console.error("Error en la petición:",s),n.textContent="Error en la conexión. Por favor, inténtalo de nuevo."}finally{document.getElementById("loading").style.display="none"}},k=async e=>{e.preventDefault(),document.getElementById("loading").style.display="block";const[t,n,r,o,s,a]=e.target,i=new FormData;i.append("name",t.value),i.append("description",n.value),i.append("date",r.value),i.append("time",o.value),i.append("location",s.value),i.append("img",a.files[0]);try{const c=await fetch(`${l}events/nuevoEvento`,{method:"POST",headers:{Authorization:`Bearer ${y}`},body:i});if(!c.ok){console.error("Error en la respuesta del servidor:",c.statusText);return}const u=document.querySelector("#error-message"),g=await c.json();console.log("Respuesta del servidor:",g),u.textContent="El evento se ha creado correctamente.";const m=await fetchEvents();setTimeout(()=>{p(m)},8e3)}catch(c){console.error("Error en la solicitud:",c)}finally{document.getElementById("loading").style.display="none"}},L=async e=>{document.getElementById("loading").style.display="block";try{const t=await fetch(`${l}events/${e}/borrar`,{method:"DELETE",headers:{Authorization:`Bearer ${y}`,"Content-Type":"application/json"}});if(!t.ok){console.error("Error en la respuesta del servidor:",t.statusText);const r=document.querySelector("#error-message");r.textContent=`Error: ${t.statusText}`;return}const n=await t.json();console.log("Respuesta del servidor:",n),errorMessage.textContent="El evento se ha eliminado correctamente."}catch(t){console.error("Error en la solicitud:",t);const n=document.querySelector("#error-message");n.textContent="Error al eliminar el evento. Inténtelo de nuevo."}finally{document.getElementById("loading").style.display="none"}},f=async()=>{document.getElementById("loading").style.display="block";try{const e=await fetch(`${l}events/events`);if(!e.ok)throw new Error("Error al obtener los eventos");const t=await e.json();return p(t),t}catch(e){return console.error("Error al obtener los eventos:",e),[]}finally{document.getElementById("loading").style.display="none"}},q=async e=>{document.getElementById("loading").style.display="block";try{const t=await fetch(`${l}events/${e}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(console.log("Response status:",t.status),!t.ok)throw new Error("Error al obtener el evento");const n=await t.json();return console.log("Eventos obtenidos:",n),p(n),n}catch(t){return console.error("Error al obtener los eventos:",t),[]}finally{document.getElementById("loading").style.display="none"}},C=async e=>{document.getElementById("loading").style.display="block";const t=localStorage.getItem("token"),n=document.querySelector(".asistentes"),r=document.querySelector("#error-message");if(!t){console.error("No se encontró el token de autenticación.");return}try{const o=await fetch(`${l}events/${e}/asistentes`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!o.ok)throw new Error(`Error al consultar los asistentes a este evento: ${o.statusText}`);const s=await o.json();Array.isArray(s)&&s.length>0?n.innerHTML=`
          <h3>Estos son los asistentes al evento:</h3>
          <ul>
            ${s.map(a=>`<li><strong>Usuario:</strong> ${a.userName} - ${a.email}</li>`).join(`
`)}
          </ul>
        `:r.textContent="No hay asistentes al evento.";return}catch(o){console.error("Error:",o)}finally{document.getElementById("loading").style.display="none"}},E=async e=>{document.getElementById("loading").style.display="block";const t=localStorage.getItem("token"),n=document.querySelector(`#event-${e} .error-message`);if(!t){console.error("No se encontró el token de autenticación."),n.textContent="Por favor, inicia sesión para confirmar tu asistencia.";return}try{const r=await fetch(`${l}events/${e}/confirmarAsistencia`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!r.ok)throw new Error(`Error al confirmar asistencia: ${r.statusText}`);const o=await r.json();n.textContent=o.message}catch(r){console.error("Error:",r),n.textContent="Hubo un problema al confirmar tu asistencia. Por favor, intenta de nuevo más tarde."}finally{document.getElementById("loading").style.display="none"}},P=()=>{const e='<button class="btn btn-header" id="btn-volver">Volver</button>',t=document.querySelector(".header-btns");t.innerHTML+=e,document.querySelector("#btn-volver").addEventListener("click",r=>{r.preventDefault(),f()})},T=()=>{const e=document.querySelector(".header-btns");e.innerHTML=""},B=()=>{y||b()},N="https://back-proyecto-10-mu.vercel.app/",I=()=>{const e=document.querySelector("body");e.className="",e.classList.add("body-newRegister");const t=document.querySelector("main"),n=`
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
    `;t.innerHTML=n;const r=document.querySelector("#newRegisterForm"),o=async s=>{s.preventDefault();const a=document.querySelector("#error-message"),i=document.querySelector("#username").value,c=document.querySelector("#password").value,u=document.querySelector("#email").value,m={method:"POST",body:JSON.stringify({userName:i,password:c,email:u}),headers:{"Content-Type":"application/json"}};try{const d=await fetch(`${N}users/registro`,m);if(!d.ok){d.status===400?a.textContent="El nombre de usuario y/o password ya existe. Por favor, elija otro.":console.error("Error en la respuesta del servidor:",d.statusText);return}a&&(a.textContent="");const h=await d.json();console.log("Respuesta del servidor:",h),a.textContent="Usuario creado correctamente.",setTimeout(()=>{b(i,c)},5e3)}catch(d){console.error("Error en la solicitud:",d),a.textContent="Error en la solicitud. Inténtalo de nuevo más tarde."}};r.addEventListener("submit",o)},A=()=>{document.querySelector("body").classList.add("body-login");const t=document.querySelector("main"),n=`
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
    `;t.innerHTML=n;const r=document.querySelector("#loginForm"),o=document.querySelector("#username"),s=document.querySelector("#password");r.addEventListener("submit",function(i){i.preventDefault(),b(o.value,s.value)}),document.querySelector("#register-link").addEventListener("click",i=>{i.preventDefault(),I()})},j=e=>{const t=document.querySelector("body");t.className="",t.classList.add("body-eventPage");const n=document.querySelector("main"),r=`
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
    `;n.innerHTML=r,document.querySelector("#ver-asistentes").addEventListener("click",a=>{a.preventDefault(),C(`${e._id}`)}),document.querySelector("#confirmar-asistencia").addEventListener("click",a=>{a.preventDefault(),E(`${e._id}`)})},v="https://back-proyecto-10-mu.vercel.app/";A();const H=async e=>{document.getElementById("loading").style.display="block";try{const t=await fetch(`${v}events/${e}`);if(!t.ok)throw new Error("Error al obtener los detalles del evento");return await t.json()}catch(t){return console.error("Error al obtener los detalles del evento:",t),null}finally{document.getElementById("loading").style.display="none"}};window.handleViewEvent=async e=>{const t=await H(e);t?j(t):console.error("Error al cargar los detalles del evento")};const M=async e=>{document.getElementById("loading").style.display="block";const t=localStorage.getItem("token"),n=document.querySelector(`#event-${e} .error-message`);if(!t){console.error("No se encontró el token de autenticación."),n.textContent="Por favor, inicia sesión para confirmar tu asistencia.";return}try{const r=await fetch(`${v}events/${e}/asistentes`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!r.ok)throw new Error(`Error al verificar asistencia: ${r.statusText}`);if((await r.json()).isUserAttending){n.textContent="Ya has confirmado tu asistencia a este evento.";return}const s=await fetch(`${v}events/${e}/confirmarAsistencia`,{method:"POST",body:JSON.stringify({eventId:e}),headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!s.ok)throw new Error(`Error al confirmar asistencia: ${s.statusText}`);const a=await s.json();return n.textContent="Se ha confirmado tu asistencia al evento.",a}catch(r){console.error("Error:",r),n.textContent="Hubo un problema al confirmar tu asistencia. Por favor, intenta de nuevo más tarde."}finally{document.getElementById("loading").style.display="none"}};window.handleConfirmarAsistencia=async e=>{await M(e)};window.onload=B;
