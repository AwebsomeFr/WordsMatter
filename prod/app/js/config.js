"use strict";const EDITOR_ID="editor-tjJshBE63cSDDYkEeSZ8NNrNkdHDm5vUuCktkzS24f3uXesgeC",API_URL="./api/",LANG="en",LAB={bt:{add:"Add",addA:"Add a hyperlink",addEm:"Add emphasic text ",addFig:"Add a figure",addHx:"Add a subtitle of level ",addImg:"Add an image",addOl:"Add an ordered list ",addSec:"Add a section",addStr:"Add strong text",addUl:"Add an unordered list",advReading:"Advantage reading",advWriting:"Advantage writing",awb:"WordsMatter is offered with enthusiasm by",balanced:"Balanced",close:"Close",configuration:"configuration",confirm:"Confirm",delSec:"Delete the section",delete:"Delete",doc:"Documentation",exportPost:"Export to .txt file",loadPost:"Import from .txt file",listPost:"Edit from the blog",menu:"Menu",offline:"offline",online:"online",open:"Open",getImages:"Manage gallery",pickImg:"Or pick one here",private:"private",published:"published",pushPost:"Push to the blog",uploadImg:"Upload an image (formats accepted: JPEG, PNG, WEBP / maximum file size: 1Mb).",save:"Save",setHeight:"Adjust height",setTheme:"Light theme / dark theme",setWidth:"Adjust width",update:"Update"},input:{postClass:"Class (optional)",postDate:"Publication date",postDraft:"Save as a draft ?",imgAlt:"Description (alternative)",secContent:"Content of the section",h1:"Title of the post (h1)",h2:"Title of the section (h2)",secIntro:"Introduction (optional)",imgLeg:"Image caption",lab:"Label",list:"Elements making up the list (one by line)",txtToTransf:"Text to transform",url:"Address (URL)"},notice:{error:"An error has occurred.",load0:"Error while loading post.",load1:"Post successfully loaded.",serv0:"Error while uploading: the post was not published.",serv1:"Post sent on the blog successfully.",servContentY:"Impossible: there is no post or draft on the blog yet.",servDel0:"Error while deleting blog post.",servDel1:"Post deleted from blog.",servTitleY:"Impossible: the post must have a title to be published or saved as a draft on the blog.",wsDel0:"Error while deleting the post from the local memory of the web browser.",wsDel1:"Post deleted from the local memory of the web browser.",wsDelY:"Nothing to delete from the local memory of the web browser.",wsSave0:"Error while saving the post in the local memory of the web browser.",wsSave1:"Post saved in the local memory of the web browser."},dial:{confDelSec:"The content of this section will be lost.",confDelServ:"Permanently delete the selected post from the blog?",confDelWs:"Permanently delete the post from the local memory of the web browser?",confPushServ:"You will now send content to the blog.",confUpdateServ:"A post with an identical title already exists on the blog. Replace it ?",editPost:"Which post do you want to edit from the blog?",exportPost:"Copy and paste the following content into a .txt file. Use the <i>Import from .txt file</i> option accessible from the menu to reload it.",setHeight:"Choose how the writing and writing areas should occupy the height space.",setWidth:"Select the MAXIMUM width used by WordsMatter."}},REGEX=[{desc:/\s{2}\n/g,output:()=>"<br/>"},{desc:/^(?!3_|4_|5_|6_|_\s|__\s|\!\[[^\]]+\]\([^\)]+\)).+$/gm,output:t=>`<p>${t}</p>`},{desc:/^3_.+$/gim,output:t=>`<h3>${t.substring(2)}</h3>`},{desc:/^4_.+$/gim,output:t=>`<h4>${t.substring(2)}</h4>`},{desc:/^5_.+$/gim,output:t=>`<h5>${t.substring(2)}</h5>`},{desc:/^6_.+$/gim,output:t=>`<h6>${t.substring(2)}</h6>`},{desc:/\!\[[^\]]+\]\([^\)]+\)/gi,output:t=>{let e=t.substring(2,t.length-1).split("](");return e[0]=e[0].split("|"),e[0].length>1?`<figure>\n\t\t\t\t\t\t<img src="${e[1]}" alt="${e[0][0]}" />\n\t\t\t\t\t\t<figcaption>${e[0][1]}</figcaption>\n\t\t\t\t\t</figure>`:`<img src="${e[1]}" alt="${e[0][0]}" />`}},{desc:/\[[^\]]+\]\([^\)]+\)/gi,output:t=>{let e=t.substring(1,t.length-1).split("](");return`<a href="${e[1]}">${e[0]}</a>`}},{desc:/(^__\s.*\n){1,}/gim,output:t=>`<ol>${t}</ol>`},{desc:/^(<ol>)?__\s.+/gim,output:t=>t.startsWith("<ol>__")?`<ol><li>${t.substring(7,t.length)}</li>`:`<li>${t.substring(3,t.length)}</li>`},{desc:/(^_\s.*\n){1,}/gim,output:t=>`<ul>${t}</ul>`},{desc:/^(<ul>)?_\s.+/gim,output:t=>t.startsWith("<ul>_")?`<ul><li>${t.substring(6,t.length)}</li>`:`<li>${t.substring(2,t.length)}</li>`},{desc:/_{2}[^_]+_{2}/gi,output:t=>`<strong>${t.substring(2,t.length-2)}</strong>`},{desc:/_[^_]+_/gi,output:t=>`<em>${t.substring(1,t.length-1)}</em>`}];