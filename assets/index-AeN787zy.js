(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const E=()=>{const e=document.querySelector("body");e.className="",e.classList.add("body-newRegister");const o=document.querySelector("main"),r=`
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
    `;o.innerHTML=r;const n=document.querySelector("#newRegisterForm"),t=document.querySelector("#error-message"),s=async(a,i,d)=>{const u={method:"POST",body:JSON.stringify({userName:a,password:i,email:d}),headers:{"Content-Type":"application/json"}};try{const l=await fetch(`${urlProduccion}/users/registro`,u);if(!l.ok){l.status===400?t.textContent="El nombre de usuario ya existe. Por favor, elija otro.":console.error("Error en la respuesta del servidor:",l.statusText);return}t&&(t.textContent="");const m=await l.json();console.log("Respuesta del servidor:",m),t.textContent="Usuario creado correctamente.",setTimeout(()=>{y()},8e3)}catch(l){console.error("Error en la solicitud:",l),t.textContent="Error en la solicitud. Inténtalo de nuevo más tarde."}};n.addEventListener("submit",function(a){a.preventDefault();const i=document.querySelector("#username").value,d=document.querySelector("#password").value,c=document.querySelector("#email").value;console.log("Username:",i),console.log("Password:",d),console.log("Email:",c),s(i,d,c)})},S=e=>`
        <div class="event-box">
            <div class="event-img"><img src="${e.img}" /></div>
            <div class="event-info">              
                <h2 class="event-name">${e.name}</h2>
                <div id="error-message"></div>
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
    `,L=()=>{const e=document.querySelector("body");e.className="",e.classList.add("body-newEvent");const o=document.querySelector("main"),r=`
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
                    </div>

                    <button type="submit" class="btn" id="btn-event-save">Guardar</button>
                </form>

            </div>
        </section>
    `;o.innerHTML=r;const n=localStorage.getItem("token"),t=document.querySelector("#newEventForm"),s=async()=>{try{const i=await fetch(`${urlProduccion}/events/events`);if(!i.ok)throw new Error("Error al obtener los eventos");return await i.json()}catch(i){return console.error("Error al obtener los eventos:",i),[]}},a=async(i,d,c,u,l)=>{const h={method:"POST",body:JSON.stringify({name:i,date:d,time:c,location:u,description:l}),headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`}};try{const v=await fetch(`${urlProduccion}/events/nuevoEvento`,h);if(!v.ok){console.error("Error en la respuesta del servidor:",v.statusText);return}const g=document.querySelector("#error-message"),f=await v.json();console.log("Respuesta del servidor:",f),g.textContent="El evento se ha creado correctamente.";const w=await s();setTimeout(()=>{b(w)},8e3)}catch(v){console.error("Error en la solicitud:",v)}};t.addEventListener("submit",function(i){i.preventDefault();const d=document.querySelector("#event-name").value,c=document.querySelector("#description").value,u=document.querySelector("#date").value,l=document.querySelector("#time").value,m=document.querySelector("#location").value;console.log("Name:",d),console.log("Description:",c),console.log("Date:",u),console.log("Time:",l),console.log("Location:",m),a(d,u,l,m,c)})},x=()=>{const e=document.querySelector("header");e.innerHTML=`
        <div class="header-btns">
            <button type="submit" class="btn btn-header" id="new-event-link">Crear nuevo evento</button>
        </div>
    `,document.querySelector("#new-event-link").addEventListener("click",r=>{r.preventDefault(),L();const n='<button class="btn btn-header" onclick="handleListEvents();">Volver</button>',t=document.querySelector(".header-btns");t.innerHTML+=n})},b=e=>{const o=document.querySelector("body");o.className="",o.classList.add("body-eventList");const r=document.querySelector("main"),t=`
            <section id="eventos">
                <h1>Próximos Eventos</h1>
                <div class="list-events">
                    ${e.map(s=>S(s)).join("")}
                </div>
            </section>
        `;r.innerHTML=t,x()},$=()=>{document.querySelector("body").classList.add("body-login");const o=document.querySelector("main"),r=`
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
    `;o.innerHTML=r,document.querySelector("#register-link").addEventListener("click",t=>{t.preventDefault(),E()})},q=async()=>{try{const e=await fetch(`${urlProduccion}events/events'`);if(!e.ok)throw new Error("Error al obtener los eventos");return await e.json()}catch(e){return console.error("Error al obtener los eventos:",e),[]}},y=()=>{$();const e=document.querySelector("#loginForm"),o=document.querySelector("#username"),r=document.querySelector("#password"),n=document.querySelector("#error-message"),t=async(s,a)=>{const d={method:"POST",body:JSON.stringify({userName:s,password:a}),headers:{"Content-Type":"application/json"}};try{const c=await fetch(`${urlProduccion}users/login`,d);if(c.status===400){n.textContent="Usuario o contraseña incorrectos";return}n&&n.remove();const u=await c.json();if(console.log("Respuesta del servidor:",u),u.token){localStorage.setItem("token",u.token);const l=await q();b(l)}else console.error("El token no está definido en la respuesta:",u),n.textContent="Error al iniciar sesión. Por favor, inténtalo de nuevo."}catch(c){console.error("Error en la petición:",c),n.textContent="Error en la conexión. Por favor, inténtalo de nuevo."}};e.addEventListener("submit",function(s){s.preventDefault(),t(o.value,r.value)})},P=e=>{const o=document.querySelector("body");o.className="",o.classList.add("body-eventPage");const r=document.querySelector("main"),n=`
        <div class="eventPage-box-page">
            <div class="eventPage-img"><img src="${e.img}" /></div>
            <div class="eventPage-info">              
                <h2 class="eventPage-name">${e.name}</h2>
                <div id="error-message"></div>
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
    `;r.innerHTML=n},p="https://back-proyecto-10-mu.vercel.app/";y();const N=async()=>{try{const e=await fetch(`${p}events/events`);if(!e.ok)throw new Error("Error al obtener los eventos");return await e.json()}catch(e){return console.error("Error al obtener los eventos:",e),[]}};window.handleListEvents=async()=>{const e=await N();b(e)};const k=async e=>{try{const o=await fetch(`${p}events/${e}`);if(!o.ok)throw new Error("Error al obtener los detalles del evento");return await o.json()}catch(o){return console.error("Error al obtener los detalles del evento:",o),null}};window.handleViewEvent=async e=>{const o=await k(e);if(o){P(o);const r='<button class="btn btn-header" onclick="handleListEvents();">Volver</button>',n=document.querySelector(".header-btns");n.innerHTML+=r}else console.error("Error al cargar los detalles del evento")};const T=async e=>{const o=localStorage.getItem("token"),r=document.querySelector("#error-message");if(!o){console.error("No se encontró el token de autenticación.");return}try{const n=await fetch(`${p}events/${e}/confirmarAsistencia`,{method:"POST",body:JSON.stringify({eventId:e}),headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`}});if(!n.ok)throw new Error(`Error al confirmar asistencia: ${n.statusText}`);const t=await n.json();return r.textContent="Se ha confirmado tu asistencia al evento.",t}catch(n){console.error("Error:",n)}};window.handleConfirmarAsistencia=async e=>{await T(e)};const j=async e=>{const o=localStorage.getItem("token"),r=document.querySelector(".asistentes"),n=document.querySelector("#error-message");if(!o){console.error("No se encontró el token de autenticación.");return}try{const t=await fetch(`${p}events/${e}/asistentes`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`}});if(!t.ok)throw new Error(`Error al consultar los asistentes a este evento: ${t.statusText}`);const s=await t.json();Array.isArray(s)&&s.length>0?r.innerHTML=`
        <h3>Estos son los asistentes al evento:</h3>
        <ul>
          ${s.map(a=>`<li><strong>Usuario:</strong> ${a.userName} - ${a.email}</li>`).join(`
`)}
        </ul>
      `:n.textContent="No hay asistentes al evento.";return}catch(t){console.error("Error:",t)}};window.handleVerAsistentes=async e=>{await j(e)};
