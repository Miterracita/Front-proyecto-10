(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();const S="https://back-proyecto-10-mu.vercel.app/",L=()=>{const e=document.querySelector("body");e.className="",e.classList.add("body-newRegister");const t=document.querySelector("main"),r=`
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
    `;t.innerHTML=r;const s=document.querySelector("#newRegisterForm"),n=async o=>{o.preventDefault();const a=document.querySelector("#error-message"),b=document.querySelector("#username").value,i=document.querySelector("#password").value,c=document.querySelector("#email").value,m={method:"POST",body:JSON.stringify({userName:b,password:i,email:c}),headers:{"Content-Type":"application/json"}};try{const l=await fetch(`${S}users/registro`,m);if(!l.ok){l.status===400?a.textContent="El nombre de usuario ya existe. Por favor, elija otro.":console.error("Error en la respuesta del servidor:",l.statusText);return}a&&(a.textContent="");const h=await l.json();console.log("Respuesta del servidor:",h),a.textContent="Usuario creado correctamente.",setTimeout(()=>{g()},8e3)}catch(l){console.error("Error en la solicitud:",l),a.textContent="Error en la solicitud. Inténtalo de nuevo más tarde."}};s.addEventListener("submit",n)},k=e=>`
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
    `,P=()=>{const e=document.querySelector("body");e.className="",e.classList.add("body-newEvent");const t=document.querySelector("main"),r=`
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
    `;t.innerHTML=r;const s=async()=>{try{const i=await fetch(`${n}events/events`);if(!i.ok)throw new Error("Error al obtener los eventos");return await i.json()}catch(i){return console.error("Error al obtener los eventos:",i),[]}},n="https://back-proyecto-10-mu.vercel.app/",o=localStorage.getItem("token"),a=document.querySelector("#newEventForm"),b=async i=>{i.preventDefault();const[c,d,m,l,h,w]=i.target,u=new FormData;u.append("name",c.value),u.append("description",d.value),u.append("date",m.value),u.append("time",l.value),u.append("location",h.value),u.append("img",w.files[0]);try{const v=await fetch(`${n}events/nuevoEvento`,{method:"POST",headers:{Authorization:`Bearer ${o}`},body:u});if(!v.ok){console.error("Error en la respuesta del servidor:",v.statusText);return}const E=document.querySelector("#error-message"),$=await v.json();console.log("Respuesta del servidor:",$),E.textContent="El evento se ha creado correctamente.";const x=await s();setTimeout(()=>{f(x)},8e3)}catch(v){console.error("Error en la solicitud:",v)}};a.addEventListener("submit",b)},q=()=>{const e=document.querySelector("header");e.innerHTML=`
        <div class="header-btns">
            <button type="submit" class="btn btn-header" id="new-event-link">Crear nuevo evento</button>
        </div>
    `,document.querySelector("#new-event-link").addEventListener("click",r=>{r.preventDefault(),P();const s='<button class="btn btn-header" onclick="handleListEvents();">Volver</button>',n=document.querySelector(".header-btns");n.innerHTML+=s})},f=e=>{const t=document.querySelector("body");t.className="",t.classList.add("body-eventList");const r=document.querySelector("main"),n=`
            <section id="eventos">
                <h1>Próximos Eventos</h1>
                <div class="list-events">
                    ${e.map(o=>k(o)).join("")}
                </div>
            </section>
        `;r.innerHTML=n,q()},y="https://back-proyecto-10-mu.vercel.app/",N=()=>{document.querySelector("body").classList.add("body-login");const t=document.querySelector("main"),r=`
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
    `;t.innerHTML=r,document.querySelector("#register-link").addEventListener("click",n=>{n.preventDefault(),L()})},T=async()=>{try{const e=await fetch(`${y}events/events`);if(!e.ok)throw new Error("Error al obtener los eventos");return await e.json()}catch(e){return console.error("Error al obtener los eventos:",e),[]}},g=()=>{N();const e=document.querySelector("#loginForm"),t=document.querySelector("#username"),r=document.querySelector("#password"),s=document.querySelector("#error-message"),n=async(o,a)=>{const i={method:"POST",body:JSON.stringify({userName:o,password:a}),headers:{"Content-Type":"application/json"}};try{const c=await fetch(`${y}users/login`,i);if(c.status===400){s.textContent="Usuario o contraseña incorrectos";return}s&&s.remove();const d=await c.json();if(console.log("Respuesta del servidor:",d),d.token){localStorage.setItem("token",d.token);const m=await T();f(m)}else console.error("El token no está definido en la respuesta:",d),s.textContent="Error al iniciar sesión. Por favor, inténtalo de nuevo."}catch(c){console.error("Error en la petición:",c),s.textContent="Error en la conexión. Por favor, inténtalo de nuevo."}};e.addEventListener("submit",function(o){o.preventDefault(),n(t.value,r.value)})},C=e=>{const t=document.querySelector("body");t.className="",t.classList.add("body-eventPage");const r=document.querySelector("main"),s=`
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
    `;r.innerHTML=s},p="https://back-proyecto-10-mu.vercel.app/";g();const j=async()=>{try{const e=await fetch(`${p}events/events`);if(!e.ok)throw new Error("Error al obtener los eventos");return await e.json()}catch(e){return console.error("Error al obtener los eventos:",e),[]}};window.handleListEvents=async()=>{const e=await j();f(e)};const H=async e=>{try{const t=await fetch(`${p}events/${e}`);if(!t.ok)throw new Error("Error al obtener los detalles del evento");return await t.json()}catch(t){return console.error("Error al obtener los detalles del evento:",t),null}};window.handleViewEvent=async e=>{const t=await H(e);if(t){C(t);const r='<button class="btn btn-header" onclick="handleListEvents();">Volver</button>',s=document.querySelector(".header-btns");s.innerHTML+=r}else console.error("Error al cargar los detalles del evento")};const A=async e=>{const t=localStorage.getItem("token"),r=document.querySelector(`#event-${e} .error-message`);if(!t){console.error("No se encontró el token de autenticación."),r.textContent="Por favor, inicia sesión para confirmar tu asistencia.";return}try{const s=await fetch(`${p}events/${e}/asistentes`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!s.ok)throw new Error(`Error al verificar asistencia: ${s.statusText}`);if((await s.json()).isUserAttending){r.textContent="Ya has confirmado tu asistencia a este evento.";return}const o=await fetch(`${p}events/${e}/confirmarAsistencia`,{method:"POST",body:JSON.stringify({eventId:e}),headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!o.ok)throw new Error(`Error al confirmar asistencia: ${o.statusText}`);const a=await o.json();return r.textContent="Se ha confirmado tu asistencia al evento.",a}catch(s){console.error("Error:",s),r.textContent="Hubo un problema al confirmar tu asistencia. Por favor, intenta de nuevo más tarde."}};window.handleConfirmarAsistencia=async e=>{await A(e)};const F=async e=>{const t=localStorage.getItem("token"),r=document.querySelector(".asistentes"),s=document.querySelector("#error-message");if(!t){console.error("No se encontró el token de autenticación.");return}try{const n=await fetch(`${p}events/${e}/asistentes`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!n.ok)throw new Error(`Error al consultar los asistentes a este evento: ${n.statusText}`);const o=await n.json();Array.isArray(o)&&o.length>0?r.innerHTML=`
        <h3>Estos son los asistentes al evento:</h3>
        <ul>
          ${o.map(a=>`<li><strong>Usuario:</strong> ${a.userName} - ${a.email}</li>`).join(`
`)}
        </ul>
      `:s.textContent="No hay asistentes al evento.";return}catch(n){console.error("Error:",n)}};window.handleVerAsistentes=async e=>{await F(e)};
