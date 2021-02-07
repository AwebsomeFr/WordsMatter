"use strict";const EDITOR_ID="editor-tjJshBE63cSDDYkEeSZ8NNrNkdHDm5vUuCktkzS24f3uXesgeC",API_URL="./api/",LANG="en",LAB={bt:{addA:"Add a hyperlink",addEm:"Add emphasic text ",addFig:"Add a figure",addHx:"Add a subtitle of level ",addImg:"Add an image",addOl:"Add an ordered list ",addSec:"Add a section",addStr:"Add strong text",addUl:"Add an unordered list",advReading:"Advantage reading",advWriting:"Advantage writing",awebsome:"Eco-responsible web developer & Consultant in digital sobriety",balanced:"Balanced",close:"Close",confirm:"Confirm",delSec:"Delete the section",delete:"Delete",doc:"Documentation",exportPost:"Export to .txt file",importPost:"Import from .txt file",listPost:"Edit from the blog",menu:"Menu",offline:"offline",online:"online",open:"Open",private:"private",published:"published",pushPost:"Push to the blog",save:"Save",setHeight:"Adjust height",setTheme:"Light theme / dark theme",setWidth:"Adjust width",update:"Update"},input:{imgAlt:"Description (alternative)",secContent:"Content of the section",h1:"Title of the post (h1)",h2:"Title of the section (h2)",secIntro:"Optional introduction",imgLeg:"Image caption",lab:"Label",list:"Elements making up the list (one by line)",txtToTransf:"Text to transform",url:"Address (URL)"},notice:{load1:"Post successfully loaded.",serv0:"Error while uploading: the post was not published.",serv1:"Message sent on the blog successfully.",servContentY:"Impossible: there is no post or draft on the blog yet.",servDel0:"Error while deleting blog post.",servDel1:"Post deleted from blog.",servTitleY:"Impossible: the post must have a title to be published or saved as a draft on the blog.",servX:"Unreachable server: the post cannot be sent to the blog. Check your internet connection.",wsDel0:"Error while deleting the post from the local memory of the web browser.",wsDel1:"Post deleted from the local memory of the web browser.",wsDelY:"Nothing to delete from the local memory of the web browser.",wsSave0:"Error while saving the post in the local memory of the web browser.",wsSave1:"Post saved in the local memory of the web browser.",wsX:"Post cannot be saved / deleted: The <i>Web Storage</i> API is unavailable."},dial:{confDelSec:"The content of this section will be lost.",confDelServ:"Permanently delete the selected post from the blog?",confDelWs:"Permanently delete the post from the local memory of the web browser?",confPushServ:"You will now send content to the blog. If the main title (h1) of the post is preceded by a %, it will be saved as a draft, but will not be made public.",confUpdateServ:"A post with an identical title already exists on the blog. Replace it ? Note: If the main title (h1) of the post is preceded by a %, it will be saved as a draft, but will not be made public.",editPost:"Which post do you want to edit from the blog?",exportPost:"Copy and paste the following content into a .txt file. Use the <i>Import from .txt file</i> option accessible from the menu to reload it.",setHeight:"Choose how the writing and writing areas should occupy the height space.",setWidth:"Select the MAXIMUM width used by WordsMatter."}},REGEX=[{desc:/\s{2}\n/g,output:()=>"<br/>"},{desc:/^(?!3_|4_|5_|6_|_\s|__\s|\!\[[^\]]+\]\([^\)]+\)).+$/gm,output:e=>`<p>${e}</p>`},{desc:/^3_.+$/gim,output:e=>`<h3>${e.substring(2)}</h3>`},{desc:/^4_.+$/gim,output:e=>`<h4>${e.substring(2)}</h4>`},{desc:/^5_.+$/gim,output:e=>`<h5>${e.substring(2)}</h5>`},{desc:/^6_.+$/gim,output:e=>`<h6>${e.substring(2)}</h6>`},{desc:/\!\[[^\]]+\]\([^\)]+\)/gi,output:e=>{let t=e.substring(2,e.length-1).split("](");return t[0]=t[0].split("|"),t[0].length>1?`<figure>\n\t\t\t\t\t\t<img src="${t[1]}" alt="${t[0][0]}" />\n\t\t\t\t\t\t<figcaption>${t[0][1]}</figcaption>\n\t\t\t\t\t</figure>`:`<img src="${t[1]}" alt="${t[0][0]}" />`}},{desc:/\[[^\]]+\]\([^\)]+\)/gi,output:e=>{let t=e.substring(1,e.length-1).split("](");return`<a href="${t[1]}">${t[0]}</a>`}},{desc:/(^__\s.*\n){1,}/gim,output:e=>`<ol>${e}</ol>`},{desc:/^(<ol>)?__\s.+/gim,output:e=>e.startsWith("<ol>__")?`<ol><li>${e.substring(7,e.length)}</li>`:`<li>${e.substring(3,e.length)}</li>`},{desc:/(^_\s.*\n){1,}/gim,output:e=>`<ul>${e}</ul>`},{desc:/^(<ul>)?_\s.+/gim,output:e=>e.startsWith("<ul>_")?`<ul><li>${e.substring(6,e.length)}</li>`:`<li>${e.substring(2,e.length)}</li>`},{desc:/_{2}[^_]+_{2}/gi,output:e=>`<strong>${e.substring(2,e.length-2)}</strong>`},{desc:/_[^_]+_/gi,output:e=>`<em>${e.substring(1,e.length-1)}</em>`}];