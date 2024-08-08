(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const $="https://back-proyecto-10-mu.vercel.app/",L=()=>{const e=document.querySelector("body");e.className="",e.classList.add("body-newRegister");const t=document.querySelector("main"),s=`
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
    `;t.innerHTML=s;const r=document.querySelector("#newRegisterForm"),n=async o=>{o.preventDefault();const a=document.querySelector("#error-message"),v=document.querySelector("#username").value,i=document.querySelector("#password").value,c=document.querySelector("#email").value,b={method:"POST",body:JSON.stringify({userName:v,password:i,email:c}),headers:{"Content-Type":"application/json"}};try{const l=await fetch(`${$}users/registro`,b);if(!l.ok){l.status===400?a.textContent="El nombre de usuario ya existe. Por favor, elija otro.":console.error("Error en la respuesta del servidor:",l.statusText);return}a&&(a.textContent="");const h=await l.json();console.log("Respuesta del servidor:",h),a.textContent="Usuario creado correctamente.",setTimeout(()=>{g()},8e3)}catch(l){console.error("Error en la solicitud:",l),a.textContent="Error en la solicitud. Inténtalo de nuevo más tarde."}};r.addEventListener("submit",n)},k=e=>`
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
    `,P=()=>{const e=document.querySelector("body");e.className="",e.classList.add("body-newEvent");const t=document.querySelector("main"),s=`
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
    `;t.innerHTML=s;const r=async()=>{try{const i=await fetch(`${n}events/events`);if(!i.ok)throw new Error("Error al obtener los eventos");return await i.json()}catch(i){return console.error("Error al obtener los eventos:",i),[]}},n="https://back-proyecto-10-mu.vercel.app/",o=localStorage.getItem("token"),a=document.querySelector("#newEventForm"),v=async i=>{i.preventDefault();const[c,d,b,l,h,w]=i.target,u=new FormData;u.append("name",c.value),u.append("description",d.value),u.append("date",b.value),u.append("time",l.value),u.append("location",h.value),u.append("img",w.files[0]);try{const m=await fetch(`${n}events/nuevoEvento`,{method:"POST",headers:{Authorization:`Bearer ${o}`},body:u});if(!m.ok){console.error("Error en la respuesta del servidor:",m.statusText);return}const E=document.querySelector("#error-message"),x=await m.json();console.log("Respuesta del servidor:",x),E.textContent="El evento se ha creado correctamente.";const S=await r();setTimeout(()=>{y(S)},8e3)}catch(m){console.error("Error en la solicitud:",m)}};a.addEventListener("submit",v)},q=()=>{const e=document.querySelector("header");e.innerHTML=`
        <div class="header-btns">
            <button type="submit" class="btn btn-header" id="new-event-link">Crear nuevo evento</button>
        </div>
    `,document.querySelector("#new-event-link").addEventListener("click",s=>{s.preventDefault(),P();const r='<button class="btn btn-header" id="btn-volver">Volver</button>',n=document.querySelector(".header-btns");n.innerHTML+=r,document.querySelector("#btn-volver").addEventListener("click",a=>{a.preventDefault(),f()})})},y=e=>{const t=document.querySelector("body");t.className="",t.classList.add("body-eventList");const s=document.querySelector("main"),n=`
            <section id="eventos">
                <h1>Próximos Eventos</h1>
                <div class="list-events">
                    ${e.map(o=>k(o)).join("")}
                </div>
            </section>
        `;s.innerHTML=n,q()},N="https://back-proyecto-10-mu.vercel.app/",f=async()=>{try{const e=await fetch(`${N}events/events`);if(!e.ok)throw new Error("Error al obtener los eventos");const t=await e.json();return y(t),t}catch(e){return console.error("Error al obtener los eventos:",e),[]}},T="https://back-proyecto-10-mu.vercel.app/",C=()=>{document.querySelector("body").classList.add("body-login");const t=document.querySelector("main"),s=`
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
    `;t.innerHTML=s,document.querySelector("#register-link").addEventListener("click",n=>{n.preventDefault(),L()})},g=()=>{C();const e=document.querySelector("#loginForm"),t=document.querySelector("#username"),s=document.querySelector("#password"),r=document.querySelector("#error-message"),n=async(o,a)=>{const i={method:"POST",body:JSON.stringify({userName:o,password:a}),headers:{"Content-Type":"application/json"}};try{const c=await fetch(`${T}users/login`,i);if(c.status===400){r.textContent="Usuario o contraseña incorrectos";return}r&&r.remove();const d=await c.json();console.log("Respuesta del servidor:",d),d.token?(localStorage.setItem("token",d.token),f()):(console.error("El token no está definido en la respuesta:",d),r.textContent="Error al iniciar sesión. Por favor, inténtalo de nuevo.")}catch(c){console.error("Error en la petición:",c),r.textContent="Error en la conexión. Por favor, inténtalo de nuevo."}};e.addEventListener("submit",function(o){o.preventDefault(),n(t.value,s.value)})},H=e=>{const t=document.querySelector("body");t.className="",t.classList.add("body-eventPage");const s=document.querySelector("main"),r=`
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
    `;s.innerHTML=r},p="https://back-proyecto-10-mu.vercel.app/";g();const j=async e=>{try{const t=await fetch(`${p}events/${e}`);if(!t.ok)throw new Error("Error al obtener los detalles del evento");return await t.json()}catch(t){return console.error("Error al obtener los detalles del evento:",t),null}};window.handleViewEvent=async e=>{const t=await j(e);if(t){H(t);const s='<button class="btn btn-header" onclick="handleListEvents();">Volver</button>',r=document.querySelector(".header-btns");r.innerHTML+=s}else console.error("Error al cargar los detalles del evento")};const A=async e=>{const t=localStorage.getItem("token"),s=document.querySelector(`#event-${e} .error-message`);if(!t){console.error("No se encontró el token de autenticación."),s.textContent="Por favor, inicia sesión para confirmar tu asistencia.";return}try{const r=await fetch(`${p}events/${e}/asistentes`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!r.ok)throw new Error(`Error al verificar asistencia: ${r.statusText}`);if((await r.json()).isUserAttending){s.textContent="Ya has confirmado tu asistencia a este evento.";return}const o=await fetch(`${p}events/${e}/confirmarAsistencia`,{method:"POST",body:JSON.stringify({eventId:e}),headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!o.ok)throw new Error(`Error al confirmar asistencia: ${o.statusText}`);const a=await o.json();return s.textContent="Se ha confirmado tu asistencia al evento.",a}catch(r){console.error("Error:",r),s.textContent="Hubo un problema al confirmar tu asistencia. Por favor, intenta de nuevo más tarde."}};window.handleConfirmarAsistencia=async e=>{await A(e)};const F=async e=>{const t=localStorage.getItem("token"),s=document.querySelector(".asistentes"),r=document.querySelector("#error-message");if(!t){console.error("No se encontró el token de autenticación.");return}try{const n=await fetch(`${p}events/${e}/asistentes`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!n.ok)throw new Error(`Error al consultar los asistentes a este evento: ${n.statusText}`);const o=await n.json();Array.isArray(o)&&o.length>0?s.innerHTML=`
        <h3>Estos son los asistentes al evento:</h3>
        <ul>
          ${o.map(a=>`<li><strong>Usuario:</strong> ${a.userName} - ${a.email}</li>`).join(`
`)}
        </ul>
      `:r.textContent="No hay asistentes al evento.";return}catch(n){console.error("Error:",n)}};window.handleVerAsistentes=async e=>{await F(e)};
