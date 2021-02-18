"use strict";let marker=0;const setViewportHeight=()=>UI.main.style.height=window.innerHeight+"px",savePref=(t,e)=>localStorage.setItem(t,e),toggleMenu=t=>t?UI.nav.classList.add("--visible"):UI.nav.classList.remove("--visible"),toggleTheme=()=>UI.body.classList.contains("--dark")?toLightTheme():toDarkTheme(),toDarkTheme=()=>{UI.body.classList.add("--dark"),savePref("theme","--dark")},toLightTheme=()=>{UI.body.classList.remove("--dark"),savePref("theme","--light")},setHeight=()=>{const t=[["0.75fr 0.25fr",LAB.bt.advReading],["0.5fr 0.5fr",LAB.bt.balanced],["0.25fr 1.5fr",LAB.bt.advWriting]];let e=`\n\t\t\n\t\t\t<h2>${LAB.bt.setHeight}</h2>\n\t\t\t<p>${LAB.dial.setHeight}</p>\n\t\t\t\n\t\t`;for(let a=0,n=t.length;a<n;a++)e+=`\n\t\t\t\t<button \n\t\t\t\t\tclass="${a===n-1?"dial-trap-last":""}"\n\t\t\t\t\tonclick="UI.main.style.gridTemplateRows = 'auto ${t[a][0]}', \n\t\t\t\t\tdial()">\n\t\t\t\t\t${t[a][1]}\n\t\t\t\t</button>\n\t\t\t`;dial(e)},setWidth=()=>{const t=["360px","540px","768px","1024px","1280px","Max"];let e=`<h2>${LAB.bt.setWidth}</h2>\n\t\t\t<p>${LAB.dial.setWidth}</p>`;for(let a=0,n=t.length;a<n;a++)e+=`\n\t\t\t\t<button \n\t\t\t\t\tclass="${a===n-1?"dial-trap-last":""}"\n\t\t\t\t\tonclick="UI.main.setAttribute('class', '--mw${t[a]}'),\n\t\t\t\t\tsavePref('max-width', '--mw${t[a]}'),\n\t\t\t\t\tdial()">\n\t\t\t\t\t${t[a]}\n\t\t\t\t</button>\n\t\t\t`;dial(e)},dial=t=>{if(void 0!==t){let e;_.Q("div",UI.dial).innerHTML=t,UI.dial.classList.add("--visible"),((e=_.Q(".dial-content input"))||(e=_.Q(".dial-content textarea"))||(e=_.Q(".dial-content button")))&&e.focus()}else UI.dial.classList.remove("--visible");!1?UI.nav.classList.add("--visible"):UI.nav.classList.remove("--visible")},setNotice=(t,e)=>{dial(),UI.notice.setAttribute("class","notice"),UI.notice.textContent=t,UI.notice.offsetWidth,UI.notice.setAttribute("class","notice --visible "+e)},negNotice=t=>setNotice(t,"--bad"),posNotice=t=>setNotice(t,"--good"),getPost=()=>{let t={date:_.I("post-date").value,isDraft:_.I("post-draft").checked,class:_.I("post-class").value,title:_.I("in-h1").value,introduction:_.I("in-intro").value,sections:null};const e=_.C("in-sec");if(e.length>0){t.sections=[];for(const a of e)t.sections.push({title:_.Q("input",a).value,content:_.Q("textarea",a).value})}return t},setPost=t=>{try{const e=JSON.parse(t);if(emptyPost(),_.I("post-date").value=e.date,_.I("post-draft").checked=e.isDraft,_.I("post-class").value=e.class,_.I("in-h1").value=e.title,runEditor("in-h1"),_.I("in-intro").value=e.introduction,runEditor("in-intro"),e.sections)for(const t of e.sections){let e=marker;_.I("bt-add-section").click(),_.I("in-sec-h2-"+e).value=t.title,runEditor("in-sec-h2-"+e),_.I("in-sec-content-"+e).value=t.content,runEditor("in-sec-content-"+e)}posNotice(LAB.notice.load1)}catch(t){negNotice(LAB.notice.load0)}},emptyPost=()=>{_.I("in-h1").value="",runEditor("in-h1"),_.I("in-intro").value="",runEditor("in-intro");const t=_.C("in-sec");for(;t.length>=1;){const e=t[0];t[0].remove(),_.I(e.id.replace("in","out")).remove()}},pushLocalPost=()=>{const t=JSON.stringify(getPost());localStorage.setItem("post",t),localStorage.getItem("post")===t?posNotice(LAB.notice.wsSave1):negNotice(LAB.notice.wsSave0)},deleteLocalPost=()=>{localStorage.getItem("post")?confirm(LAB.dial.confDelWs)&&(localStorage.removeItem("post"),localStorage.getItem("post")?negNotice(LAB.notice.wsDel0):(emptyPost(),posNotice(LAB.notice.wsDel1))):negNotice(LAB.notice.wsDelY)},exportPost=()=>dial(`\n\t\t\t<h2>${LAB.bt.exportPost}</h2>\n\t\t\t<p>${LAB.dial.exportPost}</p>\n\t\t\t<p style="color:var(--color1)">${JSON.stringify(getPost())}</p>\n\t\t\t<button class='dial-trap-last' onclick='dial()'>${LAB.bt.close}</button>\n\t\t`),importPost=t=>{let e=new FileReader;e.onloadend=t=>setPost(t.target.result),e.readAsText(t)},ajaxManager=(t,e,a)=>{let n=new XMLHttpRequest;n.open("POST",API_URL+t+".php",!0),n.onload=()=>a(n.responseText);let l=new FormData;if(l.append("editorId",EDITOR_ID),null!==e)for(let t of e)l.append(t.name,t.value);n.send(l)},getPosts=()=>{ajaxManager("getPosts",null,(t=>{const e=JSON.parse(t);if(e.length>0){let t=`\n\t\t\t\t\t\t\t<h2>${LAB.bt.listPost}</h2>\n\t\t\t\t\t\t\t<p>${LAB.dial.editPost}</p>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t`;for(let a=0,n=e.length;a<n;a++)t+=`\t\n\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t<button\n\t\t\t\t\t\t\t\t\t\tclass="--danger"\n\t\t\t\t\t\t\t\t\t\tonclick="deletePost('${e[a].dir}')"\n\t\t\t\t\t\t\t\t\t\ttitle="${LAB.bt.delete}">\n\t\t\t\t\t\t\t\t\t\tX\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t<button \n\t\t\t\t\t\t\t\t\t\tclass="${a===n-1?"dial-trap-last":""}"\n\t\t\t\t\t\t\t\t\t\tonclick="readPost('${e[a].dir}')"\n\t\t\t\t\t\t\t\t\t\ttitle="${LAB.bt.open}"\n\t\t\t\t\t\t\t\t\t\tvalue="${e[a].dir}">\n\t\t\t\t\t\t\t\t\t\t${e[a].title} \n\t\t\t\t\t\t\t\t\t\t${e[a].isDraft?`<span class="private">${LAB.bt.private}</span>`:`<span class="published">${LAB.bt.published}</span>`}\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t`;t+="</ul>",dial(t)}else negNotice(LAB.notice.servContentY)}))},readPost=t=>{ajaxManager("readPost",[{name:"post",value:t}],(t=>setPost(t)))},pushPost=(t=!1)=>{""!=_.I("out-h1").textContent.trim()?ajaxManager("pushPost",[{name:"post",value:JSON.stringify(getPost())},{name:"validation",value:t}],(t=>{switch(t){case"release":dial(`<h2>${LAB.bt.pushPost}</h2>\n\t\t\t\t\t\t\t\t\t<p>${LAB.dial.confPushServ}</p>\n\t\t\t\t\t\t\t\t\t<button class="dial-trap-last" onclick="pushPost(true)">${LAB.bt.confirm}</button>`);break;case"update":dial(`<h2>${LAB.bt.pushPost}</h2>\n\t\t\t\t\t\t\t\t\t<p>${LAB.dial.confUpdateServ}</p>\n\t\t\t\t\t\t\t\t\t<button class="dial-trap-last" onclick="pushPost(true)">${LAB.bt.update}</button>`);break;case"success":posNotice(LAB.notice.serv1);break;default:negNotice(LAB.notice.serv0)}})):negNotice(LAB.notice.servTitleY)},deletePost=t=>{confirm(LAB.dial.confDelServ)&&ajaxManager("deletePost",[{name:"post",value:t}],(t=>"success"===t?posNotice(LAB.notice.servDel1):negNotice(LAB.notice.servDel0)))},getImages=()=>{ajaxManager("getImages",null,(t=>{let e=`\n\t\t\t\t\t\t<h2>${LAB.bt.getImages}</h2>\n\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t<h3>${LAB.bt.addImg}</h3>\n\t\t\t\t\t\t\t<input \n\t\t\t\t\t\t\t\taccept="image/jpeg, image/png, image/webp"\n\t\t\t\t\t\t\t\tclass="${"[]"===t?"dial-trap-last":""}"\n\t\t\t\t\t\t\t\tonchange="pushImage(this.files[0])"\n\t\t\t\t\t\t\t\ttype="file" />\n\t\t\t\t\t\t\t${LAB.bt.condImg}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t`;if("[]"!==t){const a=JSON.parse(t);e+=`\n\t\t\t\t\t\t\t<h3>${LAB.bt.availImg}</h3>\n\t\t\t\t\t\t\t<div class="gallery">\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t`;for(let t=0,n=a.length;t<n;t++)e+=` \n\t\t\t\t\t\t\t\t<div>\t\n\t\t\t\t\t\t\t\t\t<p>${a[t].name}</p>\t\n\t\t\t\t\t\t\t\t\t<img loading="lazy" src="${a[t].thumbPath}" />\n\t\t\t\t\t\t\t\t\t<button \n\t\t\t\t\t\t\t\t\t\tclass="--danger"\n\t\t\t\t\t\t\t\t\t\tonclick="deleteImage('${a[t].name}')"\n\t\t\t\t\t\t\t\t\t\ttitle="${LAB.bt.delete}">\n\t\t\t\t\t\t\t\t\t\tX\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t<button\n\t\t\t\t\t\t\t\t\t\tclass="${t===n-1?"dial-trap-last":""}" \n\t\t\t\t\t\t\t\t\t\tonclick="addFromGallery('${a[t].normalPath}')">\n\t\t\t\t\t\t\t\t\t\t${LAB.bt.add}\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t`;e+="\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t"}dial(e)}))},pushImage=t=>{ajaxManager("pushImage",[{name:"file",value:t}],(t=>"success"===t?getImages():negNotice(LAB.notice.error)))},deleteImage=t=>{confirm(`${LAB.bt.delete} ${t} ?`)&&ajaxManager("deleteImage",[{name:"picture",value:t}],(t=>"success"===t?getImages():negNotice(LAB.notice.error)))},_={Q:(t,e=document)=>e.querySelector(t),I:(t,e=document)=>e.getElementById(t),C:(t,e=document)=>e.getElementsByClassName(t),T:(t,e=document)=>e.getElementsByTagName(t)},chess=t=>{let e=document.createElement(t.type);if(t.text?e.textContent=t.text:t.html&&(e.innerHTML=t.html),t.attributes)for(const a in t.attributes)e.setAttribute(a,t.attributes[a]);if(t.events)for(const a of t.events)e.addEventListener(a.type,a.function);if(t.children)for(const a of t.children)e.appendChild(chess(a));return e},runEditor=t=>{let e=_.I(t),a=_.I(t.replace("in","out")),n=e.value.replace(/(<([^>]+)>)/gi,"");if("textarea"===e.type)for(const t of REGEX)n=n.replace(t.desc,t.output);a.innerHTML=n},addFromGallery=t=>{dial();let e=_.T("textarea");e=e[e.length-1],e.value+=`![alternative](${t})`,runEditor(e.id)},addSection=()=>{let t=marker;UI.output.appendChild(chess({type:"section",attributes:{id:"out-sec-"+marker},children:[{type:"h2",attributes:{id:"out-sec-h2-"+marker}},{type:"div",attributes:{id:"out-sec-content-"+marker}}]}));let e=chess({type:"section",attributes:{class:"in-sec",id:"in-sec-"+marker}});for(let t of[{type:"input",id:"in-sec-h2-"+marker,placeholder:LAB.input.h2},{type:"textarea",id:"in-sec-content-"+marker,placeholder:LAB.input.secContent}])e.appendChild(chess({type:"label",text:t.placeholder,attributes:{for:t.id}})),e.appendChild(chess({type:t.type,attributes:{id:t.id,oninput:"runEditor(this.attributes.id.value)",placeholder:t.placeholder,type:"text"}}));for(let t=3;t<=6;t++)e.appendChild(chess({type:"button",text:"h"+t,attributes:{title:LAB.bt.addHx+t},events:[{type:"click",function:()=>formatContent(_.Q("textarea",e),{title:LAB.bt.addHx+t,tag:"h"+t})}]}));for(const t of[{text:"str",title:LAB.bt.addStr,tag:"strong"},{text:"em",title:LAB.bt.addEm,tag:"em"},{text:"ol",title:LAB.bt.addOl,tag:"ol"},{text:"ul",title:LAB.bt.addUl,tag:"ul"},{text:"a",title:LAB.bt.addA,tag:"a"},{text:"img",title:LAB.bt.addImg,tag:"img"},{text:"fig",title:LAB.bt.addFig,tag:"figure"}])e.appendChild(chess({type:"button",text:t.text,attributes:{title:t.title},events:[{type:"click",function:()=>formatContent(_.Q("textarea",e),t)}]}));e.appendChild(chess({type:"button",text:"X",attributes:{class:"--danger",title:LAB.bt.delSec},events:[{type:"click",function:()=>{confirm(LAB.dial.confDelSec)&&(_.I("in-sec-"+t).remove(),_.I("out-sec-"+t).remove())}}]})),_.Q("div",UI.input).appendChild(e),document.location.replace(document.location.pathname+"#in-sec-h2-"+marker),e.children[1].focus(),marker++},formatContent=(t,e)=>{const a=t.value.substring(t.selectionStart,t.selectionEnd),n=/^https?/i;let l=`<form><h2>${e.title}</h2>`;switch(e.tag){case"h3":case"h4":case"h5":case"h6":l+=`<label>\n\t\t\t\t\t\t${LAB.input.txtToTransf}\n\t\t\t\t\t\t<input focus value="${a}" required />\n\t\t\t\t\t</label>`;break;case"strong":case"em":l+=`<label>\n\t\t\t\t\t\t${LAB.input.txtToTransf}\n\t\t\t\t\t\t<input value="${a}" required />\n\t\t\t\t\t</label>`;break;case"ol":case"ul":l+=`<label>\n\t\t\t\t\t\t${LAB.input.list}\n\t\t\t\t\t\t<textarea required>${a}</textarea>\n\t\t\t\t\t</label>`;break;case"a":l+=`<label>\n\t\t\t\t\t\t${LAB.input.url}\n\t\t\t\t\t\t<input placeholder="https://example.com" value="${null!=a.match(n)?a:""}" required />\n\t\t\t\t\t</label>\n\t\t\t\t\t<label>\n\t\t\t\t\t\t${LAB.input.lab}\n\t\t\t\t\t\t<input value="${null!=a.match(n)?"":a}" required />\n\t\t\t\t\t</label>`;break;case"img":l+=`<label>\n\t\t\t\t\t\t${LAB.input.url}\n\t\t\t\t\t\t<input placeholder="https://example.com/image.png" value="${null!=a.match(n)?a:""}" required />\t\t\n\t\t\t\t\t</label>\n\t\t\t\t\t<label>\n\t\t\t\t\t\t${LAB.input.imgAlt}\n\t\t\t\t\t\t<input value="${null!=a.match(n)?"":a}" required />\n\t\t\t\t\t</label>`;break;case"figure":l+=`<label>\n\t\t\t\t\t\t${LAB.input.url}\n\t\t\t\t\t\t<input placeholder="https://example.com/image.png" value="${null!=a.match(n)?a:""}" required />\n\t\t\t\t\t</label>\n\t\t\t\t\t<label>\n\t\t\t\t\t\t${LAB.input.imgLeg}\n\t\t\t\t\t\t<input value="${null!=a.match(n)?"":a}" required />\n\t\t\t\t\t</label>\n\t\t\t\t\t<label>\n\t\t\t\t\t\t${LAB.input.imgAlt}\n\t\t\t\t\t\t<input required />\n\t\t\t\t\t</label>`}l+=`<button class="dial-trap-last" type="submit">${LAB.bt.confirm}</button></form>`,dial(l),_.Q(".dial form").onsubmit=a=>{let n;switch(e.tag){case"h3":case"h4":case"h5":case"h6":n=`\n${e.tag.substring(1,2)}_${a.target.elements[0].value}\n`;break;case"strong":n=`__${a.target.elements[0].value}__`;break;case"em":n=`_${a.target.elements[0].value}_`;break;case"ol":case"ul":const t="ol"===e.tag?"__":"_";n="\n";for(let e of a.target.elements[0].value.split("\n"))""!==e.trim()&&(n+=`${t} ${e.trim()}\n`);break;case"a":n=`[${a.target.elements[1].value}](${a.target.elements[0].value})`;break;case"img":n=`![${a.target.elements[1].value}](${a.target.elements[0].value})`;break;case"figure":n=`![${a.target.elements[2].value}|${a.target.elements[1].value}](${a.target.elements[0].value})`}t.value=t.value.substring(0,t.selectionStart)+n+t.value.substring(t.selectionEnd),a.preventDefault(),runEditor(t.id),t.focus(),dial()}};