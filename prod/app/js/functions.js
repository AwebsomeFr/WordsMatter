"use strict";let marker=0;const setViewportHeight=()=>UI.main.style.height=window.innerHeight+"px",savePref=(t,e)=>{localStorage&&localStorage.setItem(t,e)},toggleMenu=t=>{t?UI.nav.classList.add("visible"):UI.nav.classList.remove("visible")},toDarkTheme=()=>{document.body.classList.add("dark"),savePref("color-scheme","dark")},toLightTheme=()=>{document.body.classList.remove("dark"),savePref("color-scheme","light")},toggleTheme=()=>{document.body.classList.contains("dark")?(document.body.classList.remove("dark"),savePref("color-scheme","light")):(document.body.classList.add("dark"),savePref("color-scheme","dark"))},setHeight=()=>{let t="";for(let e of[["0.75fr 0.25fr",LAB.bt.advReading],["0.5fr 0.5fr",LAB.bt.balanced],["0.25fr 1.5fr",LAB.bt.advWriting]])t+=`<button onclick="UI.main.style.gridTemplateRows = 'auto ${e[0]}', dial()">${e[1]}</button>`;dial(`<p>${LAB.dial.setHeight}</p>\n\t\t\t${t}`)},setWidth=()=>{let t="";for(let e of[360,540,768,1024,1280,"Max"])t+=`<button onclick="\n\t\t\t\t\tUI.main.setAttribute('class', 'mw${e}'),\n\t\t\t\t\tsavePref('max-width', 'mw${e}'),\n\t\t\t\t\tdial()">\n\t\t\t\t\t${e}${isNaN(e)?"":"px"}\n\t\t\t\t</button>`;dial(`<p>${LAB.dial.setWidth}</p>\n\t\t\t${t}`)},openLink=t=>window.open(t),dial=t=>{if(null!=t){UI.dial.querySelector("div").innerHTML=t,UI.main.style.opacity="0.1",UI.dial.classList.add("visible");let e=UI.dial.getElementsByTagName("button");e[e.length-1].classList.add("dial-trap-last")}else UI.dial.querySelector("div").innerHTML="",UI.main.style.opacity="1",UI.dial.classList.remove("visible");!1?UI.nav.classList.add("visible"):UI.nav.classList.remove("visible")},setNotice=(t,e)=>{dial(),UI.notice.setAttribute("class",""),UI.notice.textContent=t,UI.notice.setAttribute("class","visible "+e),setTimeout((()=>{UI.notice.setAttribute("class","")}),2500)},badNotice=t=>setNotice(t,"bad"),goodNotice=t=>setNotice(t,"good"),saveIntoLocalStorage=()=>{let t=JSON.stringify(getPost());localStorage?(localStorage.setItem("post",t),localStorage.getItem("post")===t?goodNotice(LAB.notice.wsSave1):badNotice(LAB.notice.wsSave0)):badNotice(LAB.notice.wsX)},importFromLocalStorage=t=>{resetPost(),setPost(t),goodNotice(LAB.notice.load1)},deleteFromLocalStorage=(t=!1)=>{localStorage?localStorage.getItem("post")?t?(localStorage.removeItem("post"),localStorage.getItem("post")?badNotice(LAB.notice.wsDel0):(resetPost(),goodNotice(LAB.notice.wsDel1))):dial(`<p> ${LAB.dial.confDelWs}</p> \n\t\t\t\t\t\t<button class="danger onclick="deleteFromLocalStorage(true)">${LAB.bt.confirm}</button>`):badNotice(LAB.notice.wsDelY):badNotice(LAB.notice.wsX)},createRequest=t=>{let e=new XMLHttpRequest;return e.open("POST",t,!0),e.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),e},pushPost=(t=!1)=>{if(""!=document.getElementById("out-h1").textContent.trim()){let e=createRequest(API_URL+"push.php");e.onload=()=>{200===e.status?"release"===e.responseText?dial(`<p>${LAB.dial.confPushServ}</p>\n\t\t\t\t\t\t\t<button onclick="pushPost(true)">${LAB.bt.confirm}</button>`):"update"===e.responseText?dial(`<p>${LAB.dial.confUpdateServ}</p>\n\t\t\t\t\t\t\t<button onclick="pushPost(true)">${LAB.bt.update}</button>`):"success"===e.responseText?goodNotice(LAB.notice.serv1):badNotice(LAB.notice.serv0):badNotice(LAB.notice.servX)},e.send("post="+encodeURI(JSON.stringify(getPost()))+"&editorId="+EDITOR_ID+"&validation="+t)}else badNotice(LAB.notice.servTitleY)},deleteFromServer=(t=!1,e)=>{if(t){let t=createRequest(API_URL+"delete.php");t.onload=()=>{200===t.status&&("success"===t.responseText?goodNotice(LAB.notice.servDel1):badNotice(LAB.notice.servDel0))},t.send("editorId="+EDITOR_ID+"&dirName="+e)}else dial(`<p>${LAB.dial.confDelServ}</p>\n\t\t\t\t<button class="danger" onclick="deleteFromServer(true, '${e}')">${LAB.bt.confirm}</button>`)},importFromFile=t=>{let e=new FileReader;e.onloadend=t=>{resetPost(),setPost(JSON.parse(t.target.result)),dial(LAB.dial.load1)},e.readAsText(t)},importFromServer=t=>{let e=createRequest(API_URL+"open.php");e.onload=()=>{var t;200===e.status&&(t=JSON.parse(e.responseText),resetPost(),setPost(t),goodNotice(LAB.notice.load1))},e.send("editorId="+EDITOR_ID+"&dirName="+t)},getFiles=()=>{let t=createRequest(API_URL+"get.php");t.onload=()=>{if(200===t.status){let e=JSON.parse(t.responseText);if(e.length>0){let t=`<p>${LAB.dial.editPost}</p>\n\t\t\t\t\t<ul>`;for(let l of e)t+=`<li >\n\t\t\t\t\t\t\t<button\n\t\t\t\t\t\t\t\tclass="danger"\n\t\t\t\t\t\t\t\tonclick="deleteFromServer(false, '${l.dir}')"\n\t\t\t\t\t\t\t\ttitle="${LAB.bt.delete}">\n\t\t\t\t\t\t\t\tX\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t<button \n\t\t\t\t\t\t\t\tonclick="importFromServer('${l.dir}')"\n\t\t\t\t\t\t\t\ttitle="${LAB.bt.open}"\n\t\t\t\t\t\t\t\tvalue="${l.dir}">\n\t\t\t\t\t\t\t\t${l.title} \n\t\t\t\t\t\t\t\t${l.isDraft?`<span class="private"><br/>${LAB.bt.private}</span>`:`<span class="published"><br/>${LAB.bt.published}</span>`}\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</li>`;t+="</ul>",dial(t)}else badNotice(LAB.notice.servContentY)}else badNotice(LAB.notice.servX)},t.send("editorId="+EDITOR_ID)},exportToFile=()=>{dial(`<p>${LAB.dial.exportPost}</p>\n\t\t\t<p style="color:var(--color1)">${JSON.stringify(getPost())}</p>`)};function chess(t){let e=document.createElement(t.type);if(t.text?e.textContent=t.text:t.html&&(e.innerHTML=t.html),t.attributes)for(let l in t.attributes)e.setAttribute(l,t.attributes[l]);if(t.events)for(let l of t.events)e.addEventListener(l.type,l.function);if(t.children)for(let l of t.children)e.appendChild(chess(l));return e}const runEditor=t=>{let e=document.getElementById(t),l=document.getElementById(t.replace("in","out")),a=e.value.replace(/(<([^>]+)>)/gi,"");if("textarea"===e.type)for(let t of REGEX)a=a.replace(t.desc,t.output);l.innerHTML=a},getPost=()=>{let t={date:document.getElementById("art-date").value,isDraft:document.getElementById("art-draft").checked,class:document.getElementById("art-class").value,title:document.getElementById("in-h1").value,introduction:document.getElementById("in-intro").value,sections:null},e=document.getElementsByClassName("in-section");if(e.length>0){t.sections=[];for(let l of e)t.sections.push({title:l.querySelector("input").value,content:l.querySelector("textarea").value})}return t},setPost=t=>{if(document.getElementById("art-date").value=t.date,document.getElementById("art-draft").checked=t.isDraft,document.getElementById("art-class").value=t.class,document.getElementById("in-h1").value=t.title,runEditor("in-h1"),document.getElementById("in-intro").value=t.introduction,runEditor("in-intro"),t.sections)for(let e of t.sections){let t=marker;document.getElementById("bt-add-section").click(),document.getElementById("in-sec-title-"+t).value=e.title,runEditor("in-sec-title-"+t),document.getElementById("in-sec-content-"+t).value=e.content,runEditor("in-sec-content-"+t)}},resetPost=()=>{document.getElementById("in-h1").value="",runEditor("in-h1"),document.getElementById("in-intro").value="",runEditor("in-intro");for(let t of document.getElementsByClassName("in-section"))document.getElementById(t.id.replace("in","out")).remove(),t.remove()},addSection=()=>{let t=marker;UI.output.appendChild(chess({type:"section",attributes:{id:"out-sec-"+marker},children:[{type:"h2",attributes:{id:"out-sec-title-"+marker}},{type:"div",attributes:{id:"out-sec-content-"+marker}}]}));let e=chess({type:"section",attributes:{class:"in-section",id:"in-sec-"+marker}});for(let t of[{type:"input",id:"in-sec-title-"+marker,placeholder:LAB.input.h2},{type:"textarea",id:"in-sec-content-"+marker,placeholder:LAB.input.secContent}])e.appendChild(chess({type:"label",text:t.placeholder,attributes:{for:t.id}})),e.appendChild(chess({type:t.type,attributes:{id:t.id,oninput:"runEditor(this.attributes.id.value)",placeholder:t.placeholder,type:"text"}}));for(let t=3;t<=6;t++)e.appendChild(chess({type:"button",text:"h"+t,attributes:{title:LAB.bt.addHx+t},events:[{type:"click",function:()=>formatContent(e.querySelector("textarea"),{title:LAB.bt.addHx+t,tag:"h"+t})}]}));for(let t of[{text:"str",title:LAB.bt.addStr,tag:"strong"},{text:"em",title:LAB.bt.addEm,tag:"em"},{text:"ol",title:LAB.bt.addOl,tag:"ol"},{text:"ul",title:LAB.bt.addUl,tag:"ul"},{text:"a",title:LAB.bt.addA,tag:"a"},{text:"img",title:LAB.bt.addImg,tag:"img"},{text:"fig",title:LAB.bt.addFig,tag:"figure"}])e.appendChild(chess({type:"button",text:t.text,attributes:{title:t.title},events:[{type:"click",function:()=>formatContent(e.querySelector("textarea"),t)}]}));e.appendChild(chess({type:"button",text:"X",attributes:{class:"danger",title:LAB.bt.delSec},events:[{type:"click",function:()=>{confirm(LAB.dial.confDelSec)&&(document.getElementById("in-sec-"+t).remove(),document.getElementById("out-sec-"+t).remove())}}]})),UI.input.querySelector("div").appendChild(e),document.location.replace(document.location.pathname+"#in-sec-title-"+marker),e.children[1].focus(),marker++},formatContent=(t,e)=>{let l={header:"<form><h2>"+e.title+"</h2>",body:"",footer:`<button type="submit">${LAB.bt.confirm}</button></form`},a=t.value.substring(t.selectionStart,t.selectionEnd),o=/^https?/i;switch(e.tag){case"h3":case"h4":case"h5":case"h6":l.body=`<label for="h-value">${LAB.input.txtToTransf}</label>\n\t\t\t\t\t<input id="h-value" type="text" value="${a}" required />`;break;case"strong":case"em":l.body=`<label for="inline-value">${LAB.input.txtToTransf}</label>\n\t\t\t\t\t<input id="inline-value" type="text" value="${a}" required />`;break;case"ol":case"ul":l.body=`<label for="list-values">${LAB.input.list}</label>\n\t\t\t\t\t<textarea id="list-values" required>${a}</textarea>`;break;case"a":l.body=`<label for="a-value">${LAB.input.url}</label>\n\t\t\t\t\t<input id="a-value" type="text" placeholder="https://example.com" value="${null!=a.match(o)?a:""}" required />\n\t\t\t\t\t<label for="a-label">${LAB.input.lab}</label>\n\t\t\t\t\t<input id="a-label" type="text" value="${null!=a.match(o)?"":a}" required />`;break;case"img":l.body=`<label for="img-src">${LAB.input.url}</label>\n\t\t\t\t\t<input id="img-src" type="text" placeholder="https://example.com/image.png" value="${null!=a.match(o)?a:""}" required />\n\t\t\t\t\t<label for="img-alt">${LAB.input.imgAlt}</label>\n\t\t\t\t\t<input id="img-alt" type="text" value="${null!=a.match(o)?"":a}" required />`;break;case"figure":l.body=`<label for="fig-src">${LAB.input.url}</label>\n\t\t\t\t\t<input id="fig-src" type="text" placeholder="https://example.com/image.png" value="${null!=a.match(o)?a:""}" required />\n\t\t\t\t\t<label for="fig-legend">${LAB.input.imgLeg}</label>\n\t\t\t\t\t<input id="fig-legend" type="text" value="${null!=a.match(o)?"":a}" required />\n\t\t\t\t\t<label for="fig-alt">${LAB.input.imgAlt}</label>\n\t\t\t\t\t<input id="fig-alt" type="text" required />`}dial(l.header+l.body+l.footer),"ol"===e.tag||"ul"===e.tag?document.querySelector("#dial textarea").focus():document.querySelector("#dial input").focus(),document.querySelector("#dial form").onsubmit=l=>{let a;switch(e.tag){case"h3":case"h4":case"h5":case"h6":a=`\n${e.tag.substring(1,2)}_${l.target.elements[0].value}\n`;break;case"strong":a=`__${l.target.elements[0].value}__`;break;case"em":a=`_${l.target.elements[0].value}_`;break;case"ol":case"ul":let t="ol"===e.tag?"__":"_";a="\n";for(let e of l.target.elements[0].value.split("\n"))""!==e.trim()&&(a+=`${t} ${e.trim()}\n`);break;case"a":a=`[${l.target.elements[1].value}](${l.target.elements[0].value})`;break;case"img":a=`![${l.target.elements[1].value}](${l.target.elements[0].value})`;break;case"figure":a=`![${l.target.elements[2].value}|${l.target.elements[1].value}](${l.target.elements[0].value})`}t.value=t.value.substring(0,t.selectionStart)+a+t.value.substring(t.selectionEnd),l.preventDefault(),runEditor(t.id),t.focus(),dial()}};