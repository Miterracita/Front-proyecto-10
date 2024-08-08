(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const S="https://back-proyecto-10-mu.vercel.app/",L=()=>{const e=document.querySelector("body");e.className="",e.classList.add("body-newRegister");const n=document.querySelector("main"),r=`
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
    `;n.innerHTML=r;const s=document.querySelector("#newRegisterForm"),t=document.querySelector("#error-message"),o=async(a,u,i)=>{const d={method:"POST",body:JSON.stringify({userName:a,password:u,email:i}),headers:{"Content-Type":"application/json"}};try{const l=await fetch(`${S}users/registro`,d);if(!l.ok){l.status===400?t.textContent="El nombre de usuario ya existe. Por favor, elija otro.":console.error("Error en la respuesta del servidor:",l.statusText);return}t&&(t.textContent="");const b=await l.json();console.log("Respuesta del servidor:",b),t.textContent="Usuario creado correctamente.",setTimeout(()=>{y()},8e3)}catch(l){console.error("Error en la solicitud:",l),t.textContent="Error en la solicitud. Inténtalo de nuevo más tarde."}};s.addEventListener("submit",function(a){a.preventDefault();const u=document.querySelector("#username").value,i=document.querySelector("#password").value,c=document.querySelector("#email").value;console.log("Username:",u),console.log("Password:",i),console.log("Email:",c),o(u,i,c)})},k=e=>`
        <div class="event-box" id="event-${e._id}">
            <div class="event-img"><img src="${e.img}" alt="imagen del evento"/></div>
            <div class="event-info">              
                <h2 class="event-name">${e.name}</h2>
                <div id="error-message" class="error-message"></div>
                <p class="event-location">${e.location}</p>
                <p class="event-description">${e.description}</p> 
                <p class="event-date"><span>Date:</span> ${e.date}</p>
                <p class="event-hour"><span>Hour:</span> ${e.hour}</p>
                <p class="event-hour"><span>Id:</span> ${e._id}</p>                
            </div>
            <div class="event-buttons">
                <button class="btn" onclick="handleViewEvent('${e._id}')">Ver Evento</button>
                <button class="btn" onclick="handleConfirmarAsistencia('${e._id}')">Confirmar Asistencia</button>
            </div>
        </div>
    `,P=()=>{const e=document.querySelector("body");e.className="",e.classList.add("body-newEvent");const n=document.querySelector("main"),r=`
        <section class="main-newEvent">
            <h1 class="new-event">New Event</h1>
            <h2 class="new-event">2024</h2>
            <h2 class="new-event">Summer Events</h2>
            <div id="error-message"></div>
            <div class="box-newEvent">
                <form id="newEventForm">
                    <div class="box-form-newEvent">
                        <div class="line-flex">
                            <label>Nombre: </label>
                            <input type="text" name="event-name" id="event-name">
                        </div>
                        <div class="line-flex">
                            <label>Descripción: </label>
                            <textarea name="textarea" rows="10" cols="50" name="description" id="description">Descripción del evento</textarea>
                        </div>
                        <div class="line-flex">
                            <label>Fecha: </label>
                            <input type="date" id="date" name="trip-start" value="2024-06-01" min="2024-06-01" max="2024-12-01" />

                            <label class="m-l-20">Hora: </label>
                            <input type="time" id="time" name="time" min="19:00" max="05:00" required />
                        </div>
                        <div class="line-flex">
                            <label>Localización: </label>
                            <input type="text" id="location" name="location" value="location">
                        </div>
                        <div class="line-flex">
                            <label>Imagen del evento: </label>
                            <input type="file" id="event-img" name="event-img" />
                        </div>
                    </div>

                    <button type="submit" class="btn" id="btn-event-save">Guardar</button>
                </form>

            </div>
        </section>
    `;n.innerHTML=r;const s=async()=>{try{const i=await fetch(`${t}events/events`);if(!i.ok)throw new Error("Error al obtener los eventos");return await i.json()}catch(i){return console.error("Error al obtener los eventos:",i),[]}},t="https://back-proyecto-10-mu.vercel.app/",o=localStorage.getItem("token"),a=document.querySelector("#newEventForm"),u=async i=>{i.preventDefault();const[c,d,l,b,g,w]=i.target,m=new FormData;m.append("name",c.value),m.append("description",d.value),m.append("date",l.value),m.append("time",b.value),m.append("location",g.value),m.append("img",w.files[0]);try{const v=await fetch(`${t}events/nuevoEvento`,{method:"POST",headers:{Authorization:`Bearer ${o}`},body:m});if(!v.ok){console.error("Error en la respuesta del servidor:",v.statusText);return}const E=document.querySelector("#error-message"),$=await v.json();console.log("Respuesta del servidor:",$),E.textContent="El evento se ha creado correctamente.";const x=await s();setTimeout(()=>{h(x)},8e3)}catch(v){console.error("Error en la solicitud:",v)}};a.addEventListener("submit",u)},q=()=>{const e=document.querySelector("header");e.innerHTML=`
        <div class="header-btns">
            <button type="submit" class="btn btn-header" id="new-event-link">Crear nuevo evento</button>
        </div>
    `,document.querySelector("#new-event-link").addEventListener("click",r=>{r.preventDefault(),P();const s='<button class="btn btn-header" onclick="handleListEvents();">Volver</button>',t=document.querySelector(".header-btns");t.innerHTML+=s})},h=e=>{const n=document.querySelector("body");n.className="",n.classList.add("body-eventList");const r=document.querySelector("main"),t=`
            <section id="eventos">
                <h1>Próximos Eventos</h1>
                <div class="list-events">
                    ${e.map(o=>k(o)).join("")}
                </div>
            </section>
        `;r.innerHTML=t,q()},f="https://back-proyecto-10-mu.vercel.app/",N=()=>{document.querySelector("body").classList.add("body-login");const n=document.querySelector("main"),r=`
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
    `;n.innerHTML=r,document.querySelector("#register-link").addEventListener("click",t=>{t.preventDefault(),L()})},T=async()=>{try{const e=await fetch(`${f}events/events`);if(!e.ok)throw new Error("Error al obtener los eventos");return await e.json()}catch(e){return console.error("Error al obtener los eventos:",e),[]}},y=()=>{N();const e=document.querySelector("#loginForm"),n=document.querySelector("#username"),r=document.querySelector("#password"),s=document.querySelector("#error-message"),t=async(o,a)=>{const i={method:"POST",body:JSON.stringify({userName:o,password:a}),headers:{"Content-Type":"application/json"}};try{const c=await fetch(`${f}users/login`,i);if(c.status===400){s.textContent="Usuario o contraseña incorrectos";return}s&&s.remove();const d=await c.json();if(console.log("Respuesta del servidor:",d),d.token){localStorage.setItem("token",d.token);const l=await T();h(l)}else console.error("El token no está definido en la respuesta:",d),s.textContent="Error al iniciar sesión. Por favor, inténtalo de nuevo."}catch(c){console.error("Error en la petición:",c),s.textContent="Error en la conexión. Por favor, inténtalo de nuevo."}};e.addEventListener("submit",function(o){o.preventDefault(),t(n.value,r.value)})},C=e=>{const n=document.querySelector("body");n.className="",n.classList.add("body-eventPage");const r=document.querySelector("main"),s=`
        <div class="eventPage-box-page" id="event-${e._id}">
            <div class="eventPage-img"><img src="${e.img}" /></div>
            <div class="eventPage-info">              
                <h2 class="eventPage-name">${e.name}</h2>
                <div id="error-message" class="error-message"></div>
                <p class="eventPage-location">${e.location}</p>
                <p class="eventPage-description">${e.description}</p> 
                <p class="eventPage-date"><span>Date:</span> ${e.date}</p>
                <p class="eventPage-hour"><span>Hour:</span> ${e.hour}</p>
                <p class="eventPage-hour"><span>Id:</span> ${e._id}</p>
                <div class="asistentes"></div>             
            </div>
            <div class="eventPage-buttons">
                <button class="btn" onclick="handleVerAsistentes('${e._id}')">Ver Asistentes</button>
                <button class="btn" onclick="handleConfirmarAsistencia('${e._id}')">Confirmar Asistencia</button>
            </div>
        </div>
    `;r.innerHTML=s},p="https://back-proyecto-10-mu.vercel.app/";y();const j=async()=>{try{const e=await fetch(`${p}events/events`);if(!e.ok)throw new Error("Error al obtener los eventos");return await e.json()}catch(e){return console.error("Error al obtener los eventos:",e),[]}};window.handleListEvents=async()=>{const e=await j();h(e)};const H=async e=>{try{const n=await fetch(`${p}events/${e}`);if(!n.ok)throw new Error("Error al obtener los detalles del evento");return await n.json()}catch(n){return console.error("Error al obtener los detalles del evento:",n),null}};window.handleViewEvent=async e=>{const n=await H(e);if(n){C(n);const r='<button class="btn btn-header" onclick="handleListEvents();">Volver</button>',s=document.querySelector(".header-btns");s.innerHTML+=r}else console.error("Error al cargar los detalles del evento")};const A=async e=>{const n=localStorage.getItem("token"),r=document.querySelector(`#event-${e} .error-message`);if(!n){console.error("No se encontró el token de autenticación."),r.textContent="Por favor, inicia sesión para confirmar tu asistencia.";return}try{const s=await fetch(`${p}events/${e}/asistentes`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`}});if(!s.ok)throw new Error(`Error al verificar asistencia: ${s.statusText}`);if((await s.json()).isUserAttending){r.textContent="Ya has confirmado tu asistencia a este evento.";return}const o=await fetch(`${p}events/${e}/confirmarAsistencia`,{method:"POST",body:JSON.stringify({eventId:e}),headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`}});if(!o.ok)throw new Error(`Error al confirmar asistencia: ${o.statusText}`);const a=await o.json();return r.textContent="Se ha confirmado tu asistencia al evento.",a}catch(s){console.error("Error:",s),r.textContent="Hubo un problema al confirmar tu asistencia. Por favor, intenta de nuevo más tarde."}};window.handleConfirmarAsistencia=async e=>{await A(e)};const R=async e=>{const n=localStorage.getItem("token"),r=document.querySelector(".asistentes"),s=document.querySelector("#error-message");if(!n){console.error("No se encontró el token de autenticación.");return}try{const t=await fetch(`${p}events/${e}/asistentes`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`}});if(!t.ok)throw new Error(`Error al consultar los asistentes a este evento: ${t.statusText}`);const o=await t.json();Array.isArray(o)&&o.length>0?r.innerHTML=`
        <h3>Estos son los asistentes al evento:</h3>
        <ul>
          ${o.map(a=>`<li><strong>Usuario:</strong> ${a.userName} - ${a.email}</li>`).join(`
`)}
        </ul>
      `:s.textContent="No hay asistentes al evento.";return}catch(t){console.error("Error:",t)}};window.handleVerAsistentes=async e=>{await R(e)};
