"use strict";let varTemp,marker=0;const setViewportHeight=()=>document.querySelector("main").style.height=window.innerHeight+"px",toggleMenu=t=>{t?document.getElementById("nav-container").classList.remove("hidden"):document.getElementById("nav-container").classList.add("hidden")},toDarkTheme=()=>{document.body.classList.add("dark"),localStorage.setItem("theme","dark")},toLightTheme=()=>{document.body.classList.remove("dark"),localStorage.setItem("theme","light")},toggleTheme=()=>{document.body.classList.contains("dark")?(document.body.classList.remove("dark"),localStorage.setItem("theme","light")):(document.body.classList.add("dark"),localStorage.setItem("theme","dark"))},setHeight=()=>{dial(`<p>${LAB.dial.setHeight}</p>\n\t\t\t<input \n\t\t\t\tmax="4"\n\t\t\t\tmin="0.25" \n\t\t\t\toninput="document.querySelector('main').style.gridTemplateRows = 'auto 1fr ' + this.value + 'fr'" \n\t\t\t\tstep="0.25" \n\t\t\t\ttype="range" \n\t\t\t/>`)},setWidth=()=>{dial(`<p>${LAB.dial.setWidth}</p>\n\t\t\t<input\n\t\t\t\t max="100"\n\t\t\t\t min="25"\n\t\t\t\t oninput="document.querySelector('main').style.width = this.value + '%'"\n\t\t\t\t step="5"\n\t\t\t\t type="range"\n\t\t\t/>`)},onHelp=()=>window.open("./help.html"),dial=t=>{let e=document.getElementById("dial");null!=t?(e.querySelector("div").innerHTML=t,document.querySelector("main").style.opacity="0.1",e.classList.remove("hidden")):(e.querySelector("div").innerHTML="",document.querySelector("main").style.opacity="1",e.classList.add("hidden")),!1?document.getElementById("nav-container").classList.remove("hidden"):document.getElementById("nav-container").classList.add("hidden")},saveIntoLocalStorage=()=>{let t=JSON.stringify(getPost());localStorage?(localStorage.setItem("post",t),dial(localStorage.getItem("post")===t?LAB.dial.wsSaveSucc:LAB.dial.wsSaveFail)):dial(LAB.dial.wsUnavailable)},importFromLocalStorage=t=>{resetPost(),setPost(t),dial(LAB.dial.loadSucc)},deleteFromLocalStorage=(t=!1)=>{localStorage?localStorage.getItem("post")?t?(localStorage.removeItem("post"),localStorage.getItem("post")?dial(LAB.dial.wsDelFail):(resetPost(),dial(LAB.dial.wsDelSucc))):dial(LAB.dial.wsDelAskConf):dial(LAB.dial.wsDelEmpty):dial(LAB.dial.wsUnavailable)},createRequest=t=>{let e=new XMLHttpRequest;return e.open("POST",t,!0),e.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),e},pushPost=(t=!1)=>{if(""!=document.getElementById("output-art-title").textContent.trim()){let e=createRequest(API_URL+"push.php");e.onload=()=>{200===e.status?"release"===e.responseText?dial(LAB.dial.servConfNew):"update"===e.responseText?dial(LAB.dial.servConfUpdate):"success"===e.responseText?dial(LAB.dial.servSucc):dial(LAB.dial.servFail):dial(LAB.dial.servUnavailable)},e.send("post="+encodeURI(JSON.stringify(getPost()))+"&editorId="+EDITOR_ID+"&validation="+t)}else dial(LAB.dial.servTitleEmpty)},deleteFromServer=(t=!1,e)=>{if(t){let t=createRequest(API_URL+"delete.php");t.onload=()=>{200===t.status&&("success"===t.responseText?dial(LAB.dial.servDelSucc):dial(LAB.dial.servDelFail))},t.send("editorId="+EDITOR_ID+"&dirName="+e)}else varTemp=e,dial(LAB.dial.servConfDel)},importFromFile=t=>{let e=new FileReader;e.onloadend=t=>{resetPost(),setPost(JSON.parse(t.target.result)),dial(LAB.dial.loadSucc)},e.readAsText(t)},importFromServer=t=>{let e=createRequest(API_URL+"open.php");e.onload=()=>{var t;200===e.status&&(t=JSON.parse(e.responseText),resetPost(),setPost(t),dial(LAB.dial.loadSucc))},e.send("editorId="+EDITOR_ID+"&dirName="+t)},getFiles=()=>{let t=createRequest(API_URL+"get.php");t.onload=()=>{if(200===t.status){let e=JSON.parse(t.responseText);if(e.length>0){let t=`<p>${LAB.dial.modify}</p>\n\t\t\t\t\t<ul id="posts-list">`;for(let l of e)t+=`<li >\n\t\t\t\t\t\t\t<button\n\t\t\t\t\t\t\t\tclass="danger"\n\t\t\t\t\t\t\t\tonclick="deleteFromServer(false, '${l.dir}')"\n\t\t\t\t\t\t\t\ttitle="${LAB.bt.delete}">\n\t\t\t\t\t\t\t\tX\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t<button\n\t\t\t\t\t\t\t\tclass="${l.draft?"draft":"release"}" \n\t\t\t\t\t\t\t\tonclick="importFromServer('${l.dir}')"\n\t\t\t\t\t\t\t\ttitle="${LAB.bt.open}"\n\t\t\t\t\t\t\t\tvalue="${l.dir}">\n\t\t\t\t\t\t\t\t${l.title}\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</li>`;t+="</ul>",dial(t)}else dial(LAB.dial.servEmpty)}else dial(LAB.dial.servUnavailable)},t.send("editorId="+EDITOR_ID)},exportToFile=()=>{dial(`<p>${LAB.dial.export}</p>\n\t\t\t<p id="raw-data">${JSON.stringify(getPost())}</p>`)};function chess(t){let e=document.createElement(t.type);if(t.text?e.textContent=t.text:t.html&&(e.innerHTML=t.html),t.attributes)for(let l in t.attributes)e.setAttribute(l,t.attributes[l]);if(t.events)for(let l of t.events)e.addEventListener(l.type,l.function);if(t.children)for(let l of t.children)e.appendChild(chess(l));return e}const runEditor=t=>{let e=document.getElementById(t),l=document.getElementById(t.replace("input","output")),a=e.value.replace(/(<([^>]+)>)/gi,"");if("textarea"===e.type)for(let t of REGEX)a=a.replace(t.desc,t.output);return l.innerHTML=a,a},getPost=()=>{let t={title:document.getElementById("input-art-title").value,introduction:document.getElementById("input-art-introduction").value,sections:null},e=document.getElementsByClassName("input-section");if(e.length>0){t.sections=[];for(let l of e)t.sections.push({title:l.querySelector("input").value,content:l.querySelector("textarea").value})}return t},setPost=t=>{if(document.getElementById("input-art-title").value=t.title,runEditor("input-art-title"),document.getElementById("input-art-introduction").value=t.introduction,runEditor("input-art-introduction"),t.sections)for(let e of t.sections){let t=marker;document.getElementById("bt-add-section").click(),document.getElementById("input-sec-title-"+t).value=e.title,runEditor("input-sec-title-"+t),document.getElementById("input-sec-content-"+t).value=e.content,runEditor("input-sec-content-"+t)}},resetPost=()=>{document.getElementById("input-art-title").value="",runEditor("input-art-title"),document.getElementById("input-art-introduction").value="",runEditor("input-art-introduction");for(let t of document.getElementsByClassName("input-section"))document.getElementById(t.id.replace("input","output")).remove(),t.remove()},addSection=()=>{let t=marker;document.getElementById("output").appendChild(chess({type:"section",attributes:{id:"output-sec-"+marker},children:[{type:"h2",attributes:{id:"output-sec-title-"+marker}},{type:"div",attributes:{id:"output-sec-content-"+marker}}]}));let e=chess({type:"section",attributes:{class:"input-section",id:"input-sec-"+marker}});for(let t of[{type:"input",id:"input-sec-title-"+marker,placeholder:LAB.input.h2},{type:"textarea",id:"input-sec-content-"+marker,placeholder:LAB.input.content}])e.appendChild(chess({type:"label",text:t.placeholder,attributes:{for:t.id}})),e.appendChild(chess({type:t.type,attributes:{id:t.id,oninput:"runEditor(this.attributes.id.value)",placeholder:t.placeholder,type:"text"}}));for(let t=3;t<=6;t++)e.appendChild(chess({type:"button",text:"h"+t,attributes:{title:LAB.bt.addHx+t},events:[{type:"click",function:()=>formatContent(e.querySelector("textarea"),{title:LAB.bt.addHx+t,tag:"h"+t})}]}));for(let t of[{text:"str",title:LAB.bt.addStr,tag:"strong"},{text:"em",title:LAB.bt.addEm,tag:"em"},{text:"ol",title:LAB.bt.addOl,tag:"ol"},{text:"ul",title:LAB.bt.addUl,tag:"ul"},{text:"a",title:LAB.bt.addA,tag:"a"},{text:"img",title:LAB.bt.addImg,tag:"img"},{text:"fig",title:LAB.bt.addFig,tag:"figure"}])e.appendChild(chess({type:"button",text:t.text,attributes:{title:t.title},events:[{type:"click",function:()=>formatContent(e.querySelector("textarea"),t)}]}));e.appendChild(chess({type:"button",text:"X",attributes:{class:"danger",title:LAB.bt.delSec},events:[{type:"click",function:()=>{confirm(LAB.dial.delSection)&&(document.getElementById("input-sec-"+t).remove(),document.getElementById("output-sec-"+t).remove())}}]})),document.getElementById("input").insertBefore(e,document.getElementById("bt-add-section")),document.location.replace(document.location.pathname+"#input-sec-title-"+marker),marker++},formatContent=(t,e)=>{let l={header:"<form><h2>"+e.title+"</h2>",body:"",footer:'<button type="submit">Valider</button></form>'},a=t.value.substring(t.selectionStart,t.selectionEnd),i=/^https?/i;switch(e.tag){case"h3":case"h4":case"h5":case"h6":l.body=`<label for="h-value">${LAB.input.txtToTransf}</label>\n\t\t\t\t\t<input id="h-value" type="text" value="${a}" required />`;break;case"strong":case"em":l.body=`<label for="inline-value">${LAB.input.txtToTransf}</label>\n\t\t\t\t\t<input id="inline-value" type="text" value="${a}" required />`;break;case"ol":case"ul":l.body=`<label for="list-values">${LAB.input.list}</label>\n\t\t\t\t\t<textarea id="list-values" required>${a}</textarea>`;break;case"a":l.body=`<label for="a-value">${LAB.input.url}</label>\n\t\t\t\t\t<input id="a-value" type="text" placeholder="https://example.com" value="${null!=a.match(i)?a:""}" required />\n\t\t\t\t\t<label for="a-label">${LAB.input.lib}</label>\n\t\t\t\t\t<input id="a-label" type="text" value="${null!=a.match(i)?"":a}" required />`;break;case"img":l.body=`<label for="img-src">${LAB.input.url}</label>\n\t\t\t\t\t<input id="img-src" type="text" placeholder="https://example.com/image.png" value="${null!=a.match(i)?a:""}" required />\n\t\t\t\t\t<label for="img-alt">${LAB.input.alt}</label>\n\t\t\t\t\t<input id="img-alt" type="text" value="${null!=a.match(i)?"":a}" required />`;break;case"figure":l.body=`<label for="fig-src">${LAB.input.url}</label>\n\t\t\t\t\t<input id="fig-src" type="text" placeholder="https://example.com/image.png" value="${null!=a.match(i)?a:""}" required />\n\t\t\t\t\t<label for="fig-legend">${LAB.input.leg}</label>\n\t\t\t\t\t<input id="fig-legend" type="text" value="${null!=a.match(i)?"":a}" required />\n\t\t\t\t\t<label for="fig-alt">${LAB.input.alt}</label>\n\t\t\t\t\t<input id="fig-alt" type="text" required />`}dial(l.header+l.body+l.footer),"ol"===e.tag||"ul"===e.tag?document.querySelector("#dial textarea").focus():document.querySelector("#dial input").focus(),document.querySelector("#dial form").onsubmit=l=>{let a;switch(e.tag){case"h3":case"h4":case"h5":case"h6":a="\n"+e.tag.substring(1,2)+"("+l.target.elements[0].value+")\n";break;case"strong":a="s("+l.target.elements[0].value+")";break;case"em":a="e("+l.target.elements[0].value+")";break;case"ol":case"ul":let t=e.tag.substring(0,1);a=t+"(";for(let t of l.target.elements[0].value.split("%%"))""!==t.trim()&&(a+="(("+t.trim()+"))");a!==t+"("?a+=")":a="";break;case"a":a="a("+l.target.elements[1].value+"("+l.target.elements[0].value+"))";break;case"img":a="i("+l.target.elements[1].value+"("+l.target.elements[0].value+"))";break;case"figure":a="f("+l.target.elements[1].value+"("+l.target.elements[2].value+"("+l.target.elements[0].value+")))"}t.value=t.value.substring(0,t.selectionStart)+a+t.value.substring(t.selectionEnd),l.preventDefault(),runEditor(t.id),t.focus(),dial()}};