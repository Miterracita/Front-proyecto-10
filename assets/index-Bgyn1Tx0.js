(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();const k=e=>`
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
                <button class="btn" onclick="VerEvento('${e._id}')">Ver Evento</button>
                <button class="btn" onclick="ConfirmarAsistencia('${e._id}')">Confirmar Asistencia</button>
                <button class="btn btn-delete" onclick="EliminarEvento('${e._id}')">Eliminar Evento</button>
            </div>
        </div>
    `;window.VerEvento=async e=>{await A(e)};window.ConfirmarAsistencia=async e=>{await S(e)};window.EliminarEvento=async e=>{await D(e)};const C=()=>{const e=document.querySelector("body");e.className="",e.classList.add("body-newEvent");const o=document.querySelector("main"),t=`
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
    `;o.innerHTML=t;const s=async()=>{try{const i=await fetch(`${n}events/events`);if(!i.ok)throw new Error("Error al obtener los eventos");return await i.json()}catch(i){return console.error("Error al obtener los eventos:",i),[]}},n="https://back-proyecto-10-mu.vercel.app/",r=localStorage.getItem("token"),a=document.querySelector("#newEventForm"),c=async i=>{i.preventDefault();const[b,E,g,l,f,L]=i.target,d=new FormData;d.append("name",b.value),d.append("description",E.value),d.append("date",g.value),d.append("time",l.value),d.append("location",f.value),d.append("img",L.files[0]);try{const v=await fetch(`${n}events/nuevoEvento`,{method:"POST",headers:{Authorization:`Bearer ${r}`},body:d});if(!v.ok){console.error("Error en la respuesta del servidor:",v.statusText);return}const x=document.querySelector("#error-message"),$=await v.json();console.log("Respuesta del servidor:",$),x.textContent="El evento se ha creado correctamente.";const q=await s();setTimeout(()=>{EventList(q)},8e3)}catch(v){console.error("Error en la solicitud:",v)}};a.addEventListener("submit",c)},P=()=>{const e=document.querySelector("header");e.innerHTML=`
        <div class="header-btns">
            <button type="button" class="btn btn-header" id="btn-volver">Volver</button>
            <button type="button" class="btn btn-header" id="new-event-link">Crear nuevo evento</button>
            <button type="button" class="btn btn-cerrar-sesion" id="btn-cerrar-sesion">Cerrar sesión</button>
        </div>
    `,document.querySelector("#new-event-link").addEventListener("click",n=>{n.preventDefault(),C(),B(),M()}),document.querySelector("#btn-cerrar-sesion").addEventListener("click",n=>{n.preventDefault(),I()}),document.querySelector("#btn-volver").addEventListener("click",n=>{n.preventDefault(),p()})},T=()=>{const e=`
        <form id="filtro-eventos">
            <div class="form-buscar-nombre">
                <div>
                    <label class="bold" for="event-name">Buscar eventos por nombre:</label>
                    <input type="text" name="event-name" id="event-name" size="30">
                </div>
                <div class="error bold"></div>
                <div class="btns-filtros">
                    <button type="button" id="buscar-evento" class="btn btn-header">Buscar</button>
                    <button type="button" id="limpiar-filtro" class="btn btn-header">Limpiar filtro</button>
                </div>
            </div>
        </form>
    `,o=document.querySelector(".filtros");o.innerHTML=e,document.querySelector("#buscar-evento").addEventListener("click",()=>{const n=document.querySelector("#event-name").value.trim();n?F(n):alert("Por favor, ingresa un nombre de evento para buscar.")}),document.querySelector("#limpiar-filtro").addEventListener("click",()=>{p()})},h=e=>{const o=document.querySelector("body");o.className="",o.classList.add("body-eventList");const t=document.querySelector("main"),n=`
            <section id="eventos">
                <h1>Próximos Eventos</h1>
                <div class="filtros"></div>
                <div class="list-events">
                    ${e.map(a=>k(a)).join("")}
                </div>
            </section>
        `;t.innerHTML=n,P(),T(),document.querySelector("#btn-volver").classList.add("eliminar")},N=e=>{const o=document.querySelector("body");o.className="",o.classList.add("body-eventPage");const t=document.querySelector("main"),n=`
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
    `;t.innerHTML=n,document.querySelector("#btn-volver").classList.remove("eliminar"),document.querySelector("#ver-asistentes").addEventListener("click",i=>{i.preventDefault(),H(`${e._id}`)}),document.querySelector("#confirmar-asistencia").addEventListener("click",i=>{i.preventDefault(),S(`${e._id}`)})},u="https://back-proyecto-10-mu.vercel.app/",y=localStorage.getItem("token"),m=async(e,o={})=>{document.getElementById("loading").style.display="block";try{const t=await fetch(e,o);if(!t.ok)throw new Error(`Error: ${t.statusText}`);return await t.json()}catch(t){throw console.error("Error en la solicitud:",t),t}finally{document.getElementById("loading").style.display="none"}},w=async(e,o)=>{const t=document.querySelector("#error-message"),n={method:"POST",body:JSON.stringify({userName:e,password:o}),headers:{"Content-Type":"application/json"}};try{const r=await m(`${u}users/login`,n);r.token?(localStorage.setItem("token",r.token),p()):(console.error("El token no está definido en la respuesta:",r),t.textContent="Error al iniciar sesión. Por favor, inténtalo de nuevo.")}catch{t.textContent="Error en la conexión. Por favor, inténtalo de nuevo."}},A=async e=>{try{const o=await m(`${u}events/${e}`);N(o)}catch(o){console.error("Error al obtener los detalles del evento:",o)}},D=async e=>{const o={method:"DELETE",headers:{Authorization:`Bearer ${y}`,"Content-Type":"application/json"}};try{const t=await m(`${u}events/${e}/borrar`,o),s=document.querySelector(`#event-${e} .error-message`);s.textContent="El evento se ha eliminado correctamente.",document.getElementById(`event-${e}`).remove()}catch(t){const s=document.querySelector(`#event-${e} .error-message`);s.textContent=`Error al eliminar el evento: ${t.message}. Inténtelo de nuevo.`}},p=async()=>{try{const e=await m(`${u}events/events`);return h(e),e}catch(e){return console.error("Error al obtener los eventos:",e),[]}},F=async e=>{const o={method:"GET",headers:{Authorization:`Bearer ${y}`,"Content-Type":"application/json"}};try{const t=await m(`${u}events?name=${encodeURIComponent(e)}`,o);h(t)}catch{const s=document.querySelector(".error");s.textContent="Error al buscar el evento. Inténtelo de nuevo."}},H=async e=>{const o={method:"GET",headers:{Authorization:`Bearer ${y}`,"Content-Type":"application/json"}};try{const t=await m(`${u}events/${e}/asistentes`,o),s=document.querySelector(".asistentes"),n=document.querySelector("#error-message");Array.isArray(t)&&t.length>0?s.innerHTML=`
          <h3>Estos son los asistentes al evento:</h3>
          <ul>
            ${t.map(r=>`<li><strong>Usuario:</strong> ${r.userName} - ${r.email}</li>`).join(`
`)}
          </ul>
        `:n.textContent="No hay asistentes al evento.";return}catch{errorMessage.textContent="Error al obtener los asistentes:"}},S=async e=>{const o={method:"POST",headers:{Authorization:`Bearer ${y}`,"Content-Type":"application/json"}};try{const t=await m(`${u}events/${e}/confirmarAsistencia`,o),s=document.querySelector(`#event-${e} .error-message`);s.textContent=t.message}catch(t){console.error("Error:",t),boxErrorMessage.textContent="Hubo un problema al confirmar tu asistencia. Por favor, intenta de nuevo más tarde."}},M=()=>{const e='<button class="btn btn-header" id="btn-volver">Volver</button>',o=document.querySelector(".header-btns");o.innerHTML+=e,document.querySelector("#btn-volver").addEventListener("click",s=>{s.preventDefault(),p()})},B=()=>{const e=document.querySelector(".header-btns");e.innerHTML=""},I=()=>{localStorage.removeItem("token"),window.location.reload()},V="https://back-proyecto-10-mu.vercel.app/",j=()=>{const e=document.querySelector("body");e.className="",e.classList.add("body-newRegister");const o=document.querySelector("main"),t=`
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
    `;o.innerHTML=t;const s=document.querySelector("#newRegisterForm"),n=async r=>{r.preventDefault();const a=document.querySelector("#error-message"),c=document.querySelector("#username").value,i=document.querySelector("#password").value,b=document.querySelector("#email").value,g={method:"POST",body:JSON.stringify({userName:c,password:i,email:b}),headers:{"Content-Type":"application/json"}};document.getElementById("loading").style.display="block";try{const l=await fetch(`${V}users/registro`,g);if(!l.ok){l.status===400?a.textContent="El nombre de usuario y/o password ya existe. Por favor, elija otro.":console.error("Error en la respuesta del servidor:",l.statusText);return}a&&(a.textContent="");const f=await l.json();console.log("Respuesta del servidor:",f),a.textContent="Usuario creado correctamente.",setTimeout(()=>{w(c,i)},5e3)}catch(l){console.error("Error en la solicitud:",l),a.textContent="Error en la solicitud. Inténtalo de nuevo más tarde."}finally{document.getElementById("loading").style.display="none"}};s.addEventListener("submit",n)},R=()=>{document.querySelector("body").classList.add("body-login");const o=document.querySelector("main"),t=`
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
    `;o.innerHTML=t;const s=document.querySelector("#loginForm"),n=document.querySelector("#username"),r=document.querySelector("#password");s.addEventListener("submit",function(c){c.preventDefault(),w(n.value,r.value)}),document.querySelector("#register-link").addEventListener("click",c=>{c.preventDefault(),j()})};document.addEventListener("DOMContentLoaded",function(){const e=localStorage.getItem("token");e?(console.log("Usuario autenticado con token:",e),p()):R()});
