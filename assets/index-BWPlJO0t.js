(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();const k="https://back-proyecto-10-mu.vercel.app/",P=()=>{const e=document.querySelector("body");e.className="",e.classList.add("body-newRegister");const t=document.querySelector("main"),r=`
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
    `;t.innerHTML=r;const s=document.querySelector("#newRegisterForm"),n=async o=>{o.preventDefault();const a=document.querySelector("#error-message"),v=document.querySelector("#username").value,i=document.querySelector("#password").value,c=document.querySelector("#email").value,p={method:"POST",body:JSON.stringify({userName:v,password:i,email:c}),headers:{"Content-Type":"application/json"}};try{const l=await fetch(`${k}users/registro`,p);if(!l.ok){l.status===400?a.textContent="El nombre de usuario ya existe. Por favor, elija otro.":console.error("Error en la respuesta del servidor:",l.statusText);return}a&&(a.textContent="");const b=await l.json();console.log("Respuesta del servidor:",b),a.textContent="Usuario creado correctamente.",setTimeout(()=>{E()},8e3)}catch(l){console.error("Error en la solicitud:",l),a.textContent="Error en la solicitud. Inténtalo de nuevo más tarde."}};s.addEventListener("submit",n)},q=e=>`
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
                <button class="btn" onclick="handleConfirmarAsistencia('${e._id}')">Confirmar Asistencia</button>
            </div>
        </div>
    `,N=()=>{const e=document.querySelector("body");e.className="",e.classList.add("body-newEvent");const t=document.querySelector("main"),r=`
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
                            <textarea name="textarea" rows="10" name="description" id="description">Descripción del evento</textarea>
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
    `;t.innerHTML=r;const s=async()=>{try{const i=await fetch(`${n}events/events`);if(!i.ok)throw new Error("Error al obtener los eventos");return await i.json()}catch(i){return console.error("Error al obtener los eventos:",i),[]}},n="https://back-proyecto-10-mu.vercel.app/",o=localStorage.getItem("token"),a=document.querySelector("#newEventForm"),v=async i=>{i.preventDefault();const[c,d,p,l,b,x]=i.target,u=new FormData;u.append("name",c.value),u.append("description",d.value),u.append("date",p.value),u.append("time",l.value),u.append("location",b.value),u.append("img",x.files[0]);try{const m=await fetch(`${n}events/nuevoEvento`,{method:"POST",headers:{Authorization:`Bearer ${o}`},body:u});if(!m.ok){console.error("Error en la respuesta del servidor:",m.statusText);return}const S=document.querySelector("#error-message"),$=await m.json();console.log("Respuesta del servidor:",$),S.textContent="El evento se ha creado correctamente.";const L=await s();setTimeout(()=>{f(L)},8e3)}catch(m){console.error("Error en la solicitud:",m)}};a.addEventListener("submit",v)},T=()=>{const e=document.querySelector("header");e.innerHTML=`
        <div class="header-btns">
            <button type="submit" class="btn btn-header" id="new-event-link">Crear nuevo evento</button>
        </div>
    `,document.querySelector("#new-event-link").addEventListener("click",r=>{r.preventDefault(),N(),w()})},f=e=>{const t=document.querySelector("body");t.className="",t.classList.add("body-eventList");const r=document.querySelector("main"),n=`
            <section id="eventos">
                <h1>Próximos Eventos</h1>
                <div class="filtros">
                    <h2>Filtros</h2>
                    <form id="filtro-eventos">
                        <div class="form-buscar-nombre">
                            <div>
                                <label class="bold">Buscar eventos por nombre:</label>
                                <input type="text" name="event-name" id="event-name" size="30">
                            </div>
                            <button type="submit" id="buscar-evento" class="btn btn-header">Buscar</button>
                        </div>
                        <div class="form-ordenar-fecha">
                            <p class="bold">Ordenar por:</p>
                            <div>
                                <input type="radio" id="ordenar-proximos" name="ordenar-fecha">
                                <label for="ordenar-fecha">Fecha más cercana</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="list-events">
                    ${e.map(o=>q(o)).join("")}
                </div>
            </section>
        `;r.innerHTML=n,T()},g="https://back-proyecto-10-mu.vercel.app/",h=async()=>{document.getElementById("loading").style.display="block";try{const e=await fetch(`${g}events/events`);if(!e.ok)throw new Error("Error al obtener los eventos");const t=await e.json();return f(t),t}catch(e){return console.error("Error al obtener los eventos:",e),[]}finally{document.getElementById("loading").style.display="none"}},C=async e=>{document.getElementById("loading").style.display="block";const t=localStorage.getItem("token"),r=document.querySelector(".asistentes"),s=document.querySelector("#error-message");if(!t){console.error("No se encontró el token de autenticación.");return}try{const n=await fetch(`${g}events/${e}/asistentes`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!n.ok)throw new Error(`Error al consultar los asistentes a este evento: ${n.statusText}`);const o=await n.json();Array.isArray(o)&&o.length>0?r.innerHTML=`
            <h3>Estos son los asistentes al evento:</h3>
            <ul>
              ${o.map(a=>`<li><strong>Usuario:</strong> ${a.userName} - ${a.email}</li>`).join(`
`)}
            </ul>
          `:s.textContent="No hay asistentes al evento.";return}catch(n){console.error("Error:",n)}finally{document.getElementById("loading").style.display="none"}},w=()=>{const e='<button class="btn btn-header" id="btn-volver">Volver</button>',t=document.querySelector(".header-btns");t.innerHTML+=e,document.querySelector("#btn-volver").addEventListener("click",s=>{s.preventDefault(),h()})},j="https://back-proyecto-10-mu.vercel.app/",A=()=>{document.querySelector("body").classList.add("body-login");const t=document.querySelector("main"),r=`
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
    `;t.innerHTML=r,document.querySelector("#register-link").addEventListener("click",n=>{n.preventDefault(),P()})},E=()=>{A();const e=document.querySelector("#loginForm"),t=document.querySelector("#username"),r=document.querySelector("#password"),s=document.querySelector("#error-message"),n=async(o,a)=>{const i={method:"POST",body:JSON.stringify({userName:o,password:a}),headers:{"Content-Type":"application/json"}};try{const c=await fetch(`${j}users/login`,i);if(c.status===400){s.textContent="Usuario o contraseña incorrectos";return}s&&s.remove();const d=await c.json();console.log("Respuesta del servidor:",d),d.token?(localStorage.setItem("token",d.token),h()):(console.error("El token no está definido en la respuesta:",d),s.textContent="Error al iniciar sesión. Por favor, inténtalo de nuevo.")}catch(c){console.error("Error en la petición:",c),s.textContent="Error en la conexión. Por favor, inténtalo de nuevo."}};e.addEventListener("submit",function(o){o.preventDefault(),n(t.value,r.value)})},H=e=>{const t=document.querySelector("body");t.className="",t.classList.add("body-eventPage");const r=document.querySelector("main"),s=`
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
                <button class="btn" onclick="handleConfirmarAsistencia('${e._id}')">Confirmar Asistencia</button>
            </div>
        </div>
    `;r.innerHTML=s,document.querySelector("#ver-asistentes").addEventListener("click",o=>{o.preventDefault(),C(`${e._id}`)})},y="https://back-proyecto-10-mu.vercel.app/";E();const F=async e=>{document.getElementById("loading").style.display="block";try{const t=await fetch(`${y}events/${e}`);if(!t.ok)throw new Error("Error al obtener los detalles del evento");return await t.json()}catch(t){return console.error("Error al obtener los detalles del evento:",t),null}finally{document.getElementById("loading").style.display="none"}};window.handleViewEvent=async e=>{const t=await F(e);t?(H(t),w()):console.error("Error al cargar los detalles del evento")};const I=async e=>{document.getElementById("loading").style.display="block";const t=localStorage.getItem("token"),r=document.querySelector(`#event-${e} .error-message`);if(!t){console.error("No se encontró el token de autenticación."),r.textContent="Por favor, inicia sesión para confirmar tu asistencia.";return}try{const s=await fetch(`${y}events/${e}/asistentes`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!s.ok)throw new Error(`Error al verificar asistencia: ${s.statusText}`);if((await s.json()).isUserAttending){r.textContent="Ya has confirmado tu asistencia a este evento.";return}const o=await fetch(`${y}events/${e}/confirmarAsistencia`,{method:"POST",body:JSON.stringify({eventId:e}),headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!o.ok)throw new Error(`Error al confirmar asistencia: ${o.statusText}`);const a=await o.json();return r.textContent="Se ha confirmado tu asistencia al evento.",a}catch(s){console.error("Error:",s),r.textContent="Hubo un problema al confirmar tu asistencia. Por favor, intenta de nuevo más tarde."}finally{document.getElementById("loading").style.display="none"}};window.handleConfirmarAsistencia=async e=>{await I(e)};
