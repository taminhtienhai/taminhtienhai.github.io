import"../chunks/CWj6FrbW.js";import{K as ze,b as Se,J as Te,e as je,am as qe,an as Qe,o as Ve,q as se,aH as $e,aI as Ge,x as W,w as oe,I as M,V as N,aJ as $,g as v,aj as He,h as T,i as j,t as Y,s as F,n as Ue,G,aK as Be,a as Ke}from"../chunks/pZ4bjZez.js";import{o as Je,c as ae,a as P,p as We,t as re,q as Ye,r as Xe}from"../chunks/BWuyBP88.js";import{s as Ze}from"../chunks/Dokq1AvK.js";import{b as et}from"../chunks/BOPkxAHy.js";import"../chunks/69_IOA4Y.js";import{i as fe}from"../chunks/BjVtwbPo.js";import{h as tt}from"../chunks/B6owQsc8.js";import{d as ue,s as de,r as nt,a as st}from"../chunks/D5R0EA_W.js";import{i as ot}from"../chunks/Bs4ukYaj.js";import{l as rt,p as H}from"../chunks/BHeZo_h-.js";import{o as it,a as ct,c as lt}from"../chunks/DdyTnd0R.js";import{b as at}from"../chunks/BjV6Hqd3.js";import{S as ft}from"../chunks/12V8nQak.js";function pe(e,n,s){ze(()=>{var o=Se(()=>n(e,s==null?void 0:s())||{});if(s&&(o!=null&&o.update)){var t=!1,r={};Te(()=>{var i=s();je(i),t&&qe(r,i)&&(r=i,o.update(i))}),t=!0}if(o!=null&&o.destroy)return()=>o.destroy()})}function ut(e,n,s=n){var o=Qe();Je(e,"input",t=>{var r=t?e.defaultValue:e.value;if(r=U(e)?B(r):r,s(r),o&&r!==(r=n())){var i=e.selectionStart,c=e.selectionEnd;e.value=r??"",c!==null&&(e.selectionStart=i,e.selectionEnd=Math.min(c,e.value.length))}}),(Ve&&e.defaultValue!==e.value||Se(n)==null&&e.value)&&s(U(e)?B(e.value):e.value),Te(()=>{var t=n();U(e)&&t===B(e.value)||e.type==="date"&&!t&&!e.value||t!==e.value&&(e.value=t??"")})}function U(e){var n=e.type;return n==="number"||n==="range"}function B(e){return e===""?null:+e}const dt=!1,An=Object.freeze(Object.defineProperty({__proto__:null,ssr:dt},Symbol.toStringTag,{value:"Module"})),Ce=/^[a-z0-9]+(-[a-z0-9]+)*$/,Q=(e,n,s,o="")=>{const t=e.split(":");if(e.slice(0,1)==="@"){if(t.length<2||t.length>3)return null;o=t.shift().slice(1)}if(t.length>3||!t.length)return null;if(t.length>1){const c=t.pop(),l=t.pop(),a={provider:t.length>0?t[0]:o,prefix:l,name:c};return n&&!R(a)?null:a}const r=t[0],i=r.split("-");if(i.length>1){const c={provider:o,prefix:i.shift(),name:i.join("-")};return n&&!R(c)?null:c}if(s&&o===""){const c={provider:o,prefix:"",name:r};return n&&!R(c,s)?null:c}return null},R=(e,n)=>e?!!((n&&e.prefix===""||e.prefix)&&e.name):!1,Fe=Object.freeze({left:0,top:0,width:16,height:16}),q=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),V=Object.freeze({...Fe,...q}),X=Object.freeze({...V,body:"",hidden:!1});function pt(e,n){const s={};!e.hFlip!=!n.hFlip&&(s.hFlip=!0),!e.vFlip!=!n.vFlip&&(s.vFlip=!0);const o=((e.rotate||0)+(n.rotate||0))%4;return o&&(s.rotate=o),s}function he(e,n){const s=pt(e,n);for(const o in X)o in q?o in e&&!(o in s)&&(s[o]=q[o]):o in n?s[o]=n[o]:o in e&&(s[o]=e[o]);return s}function ht(e,n){const s=e.icons,o=e.aliases||Object.create(null),t=Object.create(null);function r(i){if(s[i])return t[i]=[];if(!(i in t)){t[i]=null;const c=o[i]&&o[i].parent,l=c&&r(c);l&&(t[i]=[c].concat(l))}return t[i]}return Object.keys(s).concat(Object.keys(o)).forEach(r),t}function gt(e,n,s){const o=e.icons,t=e.aliases||Object.create(null);let r={};function i(c){r=he(o[c]||t[c],r)}return i(n),s.forEach(i),he(e,r)}function Pe(e,n){const s=[];if(typeof e!="object"||typeof e.icons!="object")return s;e.not_found instanceof Array&&e.not_found.forEach(t=>{n(t,null),s.push(t)});const o=ht(e);for(const t in o){const r=o[t];r&&(n(t,gt(e,t,r)),s.push(t))}return s}const mt={provider:"",aliases:{},not_found:{},...Fe};function K(e,n){for(const s in n)if(s in e&&typeof e[s]!=typeof n[s])return!1;return!0}function Ee(e){if(typeof e!="object"||e===null)return null;const n=e;if(typeof n.prefix!="string"||!e.icons||typeof e.icons!="object"||!K(e,mt))return null;const s=n.icons;for(const t in s){const r=s[t];if(!t||typeof r.body!="string"||!K(r,X))return null}const o=n.aliases||Object.create(null);for(const t in o){const r=o[t],i=r.parent;if(!t||typeof i!="string"||!s[i]&&!o[i]||!K(r,X))return null}return n}const ge=Object.create(null);function vt(e,n){return{provider:e,prefix:n,icons:Object.create(null),missing:new Set}}function E(e,n){const s=ge[e]||(ge[e]=Object.create(null));return s[n]||(s[n]=vt(e,n))}function Oe(e,n){return Ee(n)?Pe(n,(s,o)=>{o?e.icons[s]=o:e.missing.add(s)}):[]}function yt(e,n,s){try{if(typeof s.body=="string")return e.icons[n]={...s},!0}catch{}return!1}let D=!1;function Le(e){return typeof e=="boolean"&&(D=e),D}function bt(e){const n=typeof e=="string"?Q(e,!0,D):e;if(n){const s=E(n.provider,n.prefix),o=n.name;return s.icons[o]||(s.missing.has(o)?null:void 0)}}function xt(e,n){const s=Q(e,!0,D);if(!s)return!1;const o=E(s.provider,s.prefix);return n?yt(o,s.name,n):(o.missing.add(s.name),!0)}function wt(e,n){if(typeof e!="object")return!1;if(typeof n!="string"&&(n=e.provider||""),D&&!n&&!e.prefix){let t=!1;return Ee(e)&&(e.prefix="",Pe(e,(r,i)=>{xt(r,i)&&(t=!0)})),t}const s=e.prefix;if(!R({prefix:s,name:"a"}))return!1;const o=E(n,s);return!!Oe(o,e)}const Ae=Object.freeze({width:null,height:null}),Me=Object.freeze({...Ae,...q}),It=/(-?[0-9.]*[0-9]+[0-9.]*)/g,kt=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function me(e,n,s){if(n===1)return e;if(s=s||100,typeof e=="number")return Math.ceil(e*n*s)/s;if(typeof e!="string")return e;const o=e.split(It);if(o===null||!o.length)return e;const t=[];let r=o.shift(),i=kt.test(r);for(;;){if(i){const c=parseFloat(r);isNaN(c)?t.push(r):t.push(Math.ceil(c*n*s)/s)}else t.push(r);if(r=o.shift(),r===void 0)return t.join("");i=!i}}function _t(e,n="defs"){let s="";const o=e.indexOf("<"+n);for(;o>=0;){const t=e.indexOf(">",o),r=e.indexOf("</"+n);if(t===-1||r===-1)break;const i=e.indexOf(">",r);if(i===-1)break;s+=e.slice(t+1,r).trim(),e=e.slice(0,o).trim()+e.slice(i+1)}return{defs:s,content:e}}function St(e,n){return e?"<defs>"+e+"</defs>"+n:n}function Tt(e,n,s){const o=_t(e);return St(o.defs,n+o.content+s)}const jt=e=>e==="unset"||e==="undefined"||e==="none";function Ct(e,n){const s={...V,...e},o={...Me,...n},t={left:s.left,top:s.top,width:s.width,height:s.height};let r=s.body;[s,o].forEach(k=>{const y=[],h=k.hFlip,f=k.vFlip;let x=k.rotate;h?f?x+=2:(y.push("translate("+(t.width+t.left).toString()+" "+(0-t.top).toString()+")"),y.push("scale(-1 1)"),t.top=t.left=0):f&&(y.push("translate("+(0-t.left).toString()+" "+(t.height+t.top).toString()+")"),y.push("scale(1 -1)"),t.top=t.left=0);let w;switch(x<0&&(x-=Math.floor(x/4)*4),x=x%4,x){case 1:w=t.height/2+t.top,y.unshift("rotate(90 "+w.toString()+" "+w.toString()+")");break;case 2:y.unshift("rotate(180 "+(t.width/2+t.left).toString()+" "+(t.height/2+t.top).toString()+")");break;case 3:w=t.width/2+t.left,y.unshift("rotate(-90 "+w.toString()+" "+w.toString()+")");break}x%2===1&&(t.left!==t.top&&(w=t.left,t.left=t.top,t.top=w),t.width!==t.height&&(w=t.width,t.width=t.height,t.height=w)),y.length&&(r=Tt(r,'<g transform="'+y.join(" ")+'">',"</g>"))});const i=o.width,c=o.height,l=t.width,a=t.height;let u,p;i===null?(p=c===null?"1em":c==="auto"?a:c,u=me(p,l/a)):(u=i==="auto"?l:i,p=c===null?me(u,a/l):c==="auto"?a:c);const d={},m=(k,y)=>{jt(y)||(d[k]=y.toString())};m("width",u),m("height",p);const I=[t.left,t.top,l,a];return d.viewBox=I.join(" "),{attributes:d,viewBox:I,body:r}}const Ft=/\sid="(\S+)"/g,Pt="IconifyId"+Date.now().toString(16)+(Math.random()*16777216|0).toString(16);let Et=0;function Ot(e,n=Pt){const s=[];let o;for(;o=Ft.exec(e);)s.push(o[1]);if(!s.length)return e;const t="suffix"+(Math.random()*16777216|Date.now()).toString(16);return s.forEach(r=>{const i=typeof n=="function"?n(r):n+(Et++).toString(),c=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");e=e.replace(new RegExp('([#;"])('+c+')([")]|\\.[a-z])',"g"),"$1"+i+t+"$3")}),e=e.replace(new RegExp(t,"g"),""),e}const Z=Object.create(null);function Lt(e,n){Z[e]=n}function ee(e){return Z[e]||Z[""]}function ie(e){let n;if(typeof e.resources=="string")n=[e.resources];else if(n=e.resources,!(n instanceof Array)||!n.length)return null;return{resources:n,path:e.path||"/",maxURL:e.maxURL||500,rotate:e.rotate||750,timeout:e.timeout||5e3,random:e.random===!0,index:e.index||0,dataAfterTimeout:e.dataAfterTimeout!==!1}}const ce=Object.create(null),L=["https://api.simplesvg.com","https://api.unisvg.com"],z=[];for(;L.length>0;)L.length===1||Math.random()>.5?z.push(L.shift()):z.push(L.pop());ce[""]=ie({resources:["https://api.iconify.design"].concat(z)});function At(e,n){const s=ie(n);return s===null?!1:(ce[e]=s,!0)}function le(e){return ce[e]}const Mt=()=>{let e;try{if(e=fetch,typeof e=="function")return e}catch{}};let ve=Mt();function Dt(e,n){const s=le(e);if(!s)return 0;let o;if(!s.maxURL)o=0;else{let t=0;s.resources.forEach(i=>{t=Math.max(t,i.length)});const r=n+".json?icons=";o=s.maxURL-t-s.path.length-r.length}return o}function Nt(e){return e===404}const Rt=(e,n,s)=>{const o=[],t=Dt(e,n),r="icons";let i={type:r,provider:e,prefix:n,icons:[]},c=0;return s.forEach((l,a)=>{c+=l.length+1,c>=t&&a>0&&(o.push(i),i={type:r,provider:e,prefix:n,icons:[]},c=l.length),i.icons.push(l)}),o.push(i),o};function zt(e){if(typeof e=="string"){const n=le(e);if(n)return n.path}return"/"}const qt=(e,n,s)=>{if(!ve){s("abort",424);return}let o=zt(n.provider);switch(n.type){case"icons":{const r=n.prefix,c=n.icons.join(","),l=new URLSearchParams({icons:c});o+=r+".json?"+l.toString();break}case"custom":{const r=n.uri;o+=r.slice(0,1)==="/"?r.slice(1):r;break}default:s("abort",400);return}let t=503;ve(e+o).then(r=>{const i=r.status;if(i!==200){setTimeout(()=>{s(Nt(i)?"abort":"next",i)});return}return t=501,r.json()}).then(r=>{if(typeof r!="object"||r===null){setTimeout(()=>{r===404?s("abort",r):s("next",t)});return}setTimeout(()=>{s("success",r)})}).catch(()=>{s("next",t)})},Qt={prepare:Rt,send:qt};function Vt(e){const n={loaded:[],missing:[],pending:[]},s=Object.create(null);e.sort((t,r)=>t.provider!==r.provider?t.provider.localeCompare(r.provider):t.prefix!==r.prefix?t.prefix.localeCompare(r.prefix):t.name.localeCompare(r.name));let o={provider:"",prefix:"",name:""};return e.forEach(t=>{if(o.name===t.name&&o.prefix===t.prefix&&o.provider===t.provider)return;o=t;const r=t.provider,i=t.prefix,c=t.name,l=s[r]||(s[r]=Object.create(null)),a=l[i]||(l[i]=E(r,i));let u;c in a.icons?u=n.loaded:i===""||a.missing.has(c)?u=n.missing:u=n.pending;const p={provider:r,prefix:i,name:c};u.push(p)}),n}function De(e,n){e.forEach(s=>{const o=s.loaderCallbacks;o&&(s.loaderCallbacks=o.filter(t=>t.id!==n))})}function $t(e){e.pendingCallbacksFlag||(e.pendingCallbacksFlag=!0,setTimeout(()=>{e.pendingCallbacksFlag=!1;const n=e.loaderCallbacks?e.loaderCallbacks.slice(0):[];if(!n.length)return;let s=!1;const o=e.provider,t=e.prefix;n.forEach(r=>{const i=r.icons,c=i.pending.length;i.pending=i.pending.filter(l=>{if(l.prefix!==t)return!0;const a=l.name;if(e.icons[a])i.loaded.push({provider:o,prefix:t,name:a});else if(e.missing.has(a))i.missing.push({provider:o,prefix:t,name:a});else return s=!0,!0;return!1}),i.pending.length!==c&&(s||De([e],r.id),r.callback(i.loaded.slice(0),i.missing.slice(0),i.pending.slice(0),r.abort))})}))}let Gt=0;function Ht(e,n,s){const o=Gt++,t=De.bind(null,s,o);if(!n.pending.length)return t;const r={id:o,icons:n,callback:e,abort:t};return s.forEach(i=>{(i.loaderCallbacks||(i.loaderCallbacks=[])).push(r)}),t}function Ut(e,n=!0,s=!1){const o=[];return e.forEach(t=>{const r=typeof t=="string"?Q(t,n,s):t;r&&o.push(r)}),o}var Bt={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function Kt(e,n,s,o){const t=e.resources.length,r=e.random?Math.floor(Math.random()*t):e.index;let i;if(e.random){let g=e.resources.slice(0);for(i=[];g.length>1;){const _=Math.floor(Math.random()*g.length);i.push(g[_]),g=g.slice(0,_).concat(g.slice(_+1))}i=i.concat(g)}else i=e.resources.slice(r).concat(e.resources.slice(0,r));const c=Date.now();let l="pending",a=0,u,p=null,d=[],m=[];typeof o=="function"&&m.push(o);function I(){p&&(clearTimeout(p),p=null)}function k(){l==="pending"&&(l="aborted"),I(),d.forEach(g=>{g.status==="pending"&&(g.status="aborted")}),d=[]}function y(g,_){_&&(m=[]),typeof g=="function"&&m.push(g)}function h(){return{startTime:c,payload:n,status:l,queriesSent:a,queriesPending:d.length,subscribe:y,abort:k}}function f(){l="failed",m.forEach(g=>{g(void 0,u)})}function x(){d.forEach(g=>{g.status==="pending"&&(g.status="aborted")}),d=[]}function w(g,_,b){const S=_!=="success";switch(d=d.filter(C=>C!==g),l){case"pending":break;case"failed":if(S||!e.dataAfterTimeout)return;break;default:return}if(_==="abort"){u=b,f();return}if(S){u=b,d.length||(i.length?O():f());return}if(I(),x(),!e.random){const C=e.resources.indexOf(g.resource);C!==-1&&C!==e.index&&(e.index=C)}l="completed",m.forEach(C=>{C(b)})}function O(){if(l!=="pending")return;I();const g=i.shift();if(g===void 0){if(d.length){p=setTimeout(()=>{I(),l==="pending"&&(x(),f())},e.timeout);return}f();return}const _={status:"pending",resource:g,callback:(b,S)=>{w(_,b,S)}};d.push(_),a++,p=setTimeout(O,e.rotate),s(g,n,_.callback)}return setTimeout(O),h}function Ne(e){const n={...Bt,...e};let s=[];function o(){s=s.filter(c=>c().status==="pending")}function t(c,l,a){const u=Kt(n,c,l,(p,d)=>{o(),a&&a(p,d)});return s.push(u),u}function r(c){return s.find(l=>c(l))||null}return{query:t,find:r,setIndex:c=>{n.index=c},getIndex:()=>n.index,cleanup:o}}function ye(){}const J=Object.create(null);function Jt(e){if(!J[e]){const n=le(e);if(!n)return;const s=Ne(n),o={config:n,redundancy:s};J[e]=o}return J[e]}function Wt(e,n,s){let o,t;if(typeof e=="string"){const r=ee(e);if(!r)return s(void 0,424),ye;t=r.send;const i=Jt(e);i&&(o=i.redundancy)}else{const r=ie(e);if(r){o=Ne(r);const i=e.resources?e.resources[0]:"",c=ee(i);c&&(t=c.send)}}return!o||!t?(s(void 0,424),ye):o.query(n,t,s)().abort}function be(){}function Yt(e){e.iconsLoaderFlag||(e.iconsLoaderFlag=!0,setTimeout(()=>{e.iconsLoaderFlag=!1,$t(e)}))}function Xt(e){const n=[],s=[];return e.forEach(o=>{(o.match(Ce)?n:s).push(o)}),{valid:n,invalid:s}}function A(e,n,s){function o(){const t=e.pendingIcons;n.forEach(r=>{t&&t.delete(r),e.icons[r]||e.missing.add(r)})}if(s&&typeof s=="object")try{if(!Oe(e,s).length){o();return}}catch(t){console.error(t)}o(),Yt(e)}function xe(e,n){e instanceof Promise?e.then(s=>{n(s)}).catch(()=>{n(null)}):n(e)}function Zt(e,n){e.iconsToLoad?e.iconsToLoad=e.iconsToLoad.concat(n).sort():e.iconsToLoad=n,e.iconsQueueFlag||(e.iconsQueueFlag=!0,setTimeout(()=>{e.iconsQueueFlag=!1;const{provider:s,prefix:o}=e,t=e.iconsToLoad;if(delete e.iconsToLoad,!t||!t.length)return;const r=e.loadIcon;if(e.loadIcons&&(t.length>1||!r)){xe(e.loadIcons(t,o,s),u=>{A(e,t,u)});return}if(r){t.forEach(u=>{const p=r(u,o,s);xe(p,d=>{const m=d?{prefix:o,icons:{[u]:d}}:null;A(e,[u],m)})});return}const{valid:i,invalid:c}=Xt(t);if(c.length&&A(e,c,null),!i.length)return;const l=o.match(Ce)?ee(s):null;if(!l){A(e,i,null);return}l.prepare(s,o,i).forEach(u=>{Wt(s,u,p=>{A(e,u.icons,p)})})}))}const en=(e,n)=>{const s=Ut(e,!0,Le()),o=Vt(s);if(!o.pending.length){let l=!0;return n&&setTimeout(()=>{l&&n(o.loaded,o.missing,o.pending,be)}),()=>{l=!1}}const t=Object.create(null),r=[];let i,c;return o.pending.forEach(l=>{const{provider:a,prefix:u}=l;if(u===c&&a===i)return;i=a,c=u,r.push(E(a,u));const p=t[a]||(t[a]=Object.create(null));p[u]||(p[u]=[])}),o.pending.forEach(l=>{const{provider:a,prefix:u,name:p}=l,d=E(a,u),m=d.pendingIcons||(d.pendingIcons=new Set);m.has(p)||(m.add(p),t[a][u].push(p))}),r.forEach(l=>{const a=t[l.provider][l.prefix];a.length&&Zt(l,a)}),n?Ht(n,o,r):be};function tn(e,n){const s={...e};for(const o in n){const t=n[o],r=typeof t;o in Ae?(t===null||t&&(r==="string"||r==="number"))&&(s[o]=t):r===typeof s[o]&&(s[o]=o==="rotate"?t%4:t)}return s}const nn=/[\s,]+/;function sn(e,n){n.split(nn).forEach(s=>{switch(s.trim()){case"horizontal":e.hFlip=!0;break;case"vertical":e.vFlip=!0;break}})}function on(e,n=0){const s=e.replace(/^-?[0-9.]*/,"");function o(t){for(;t<0;)t+=4;return t%4}if(s===""){const t=parseInt(e);return isNaN(t)?0:o(t)}else if(s!==e){let t=0;switch(s){case"%":t=25;break;case"deg":t=90}if(t){let r=parseFloat(e.slice(0,e.length-s.length));return isNaN(r)?0:(r=r/t,r%1===0?o(r):0)}}return n}function rn(e,n){let s=e.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const o in n)s+=" "+o+'="'+n[o]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+s+">"+e+"</svg>"}function cn(e){return e.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function ln(e){return"data:image/svg+xml,"+cn(e)}function an(e){return'url("'+ln(e)+'")'}const we={...Me,inline:!1},fn={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img"},un={display:"inline-block"},te={"background-color":"currentColor"},Re={"background-color":"transparent"},Ie={image:"var(--svg)",repeat:"no-repeat",size:"100% 100%"},ke={"-webkit-mask":te,mask:te,background:Re};for(const e in ke){const n=ke[e];for(const s in Ie)n[e+"-"+s]=Ie[s]}function dn(e){return e+(e.match(/^[-0-9.]+$/)?"px":"")}function pn(e,n){const s=tn(we,n),o=n.mode||"svg",t=o==="svg"?{...fn}:{};e.body.indexOf("xlink:")===-1&&delete t["xmlns:xlink"];let r=typeof n.style=="string"?n.style:"";for(let h in n){const f=n[h];if(f!==void 0)switch(h){case"icon":case"style":case"onLoad":case"mode":case"ssr":break;case"inline":case"hFlip":case"vFlip":s[h]=f===!0||f==="true"||f===1;break;case"flip":typeof f=="string"&&sn(s,f);break;case"color":r=r+(r.length>0&&r.trim().slice(-1)!==";"?";":"")+"color: "+f+"; ";break;case"rotate":typeof f=="string"?s[h]=on(f):typeof f=="number"&&(s[h]=f);break;case"ariaHidden":case"aria-hidden":f!==!0&&f!=="true"&&delete t["aria-hidden"];break;default:if(h.slice(0,3)==="on:")break;we[h]===void 0&&(t[h]=f)}}const i=Ct(e,s),c=i.attributes;if(s.inline&&(r="vertical-align: -0.125em; "+r),o==="svg"){Object.assign(t,c),r!==""&&(t.style=r);let h=0,f=n.id;return typeof f=="string"&&(f=f.replace(/-/g,"_")),{svg:!0,attributes:t,body:Ot(i.body,f?()=>f+"ID"+h++:"iconifySvelte")}}const{body:l,width:a,height:u}=e,p=o==="mask"||(o==="bg"?!1:l.indexOf("currentColor")!==-1),d=rn(l,{...c,width:a+"",height:u+""}),I={"--svg":an(d)},k=h=>{const f=c[h];f&&(I[h]=dn(f))};k("width"),k("height"),Object.assign(I,un,p?te:Re);let y="";for(const h in I)y+=h+": "+I[h]+";";return t.style=y+r,{svg:!1,attributes:t}}Le(!0);Lt("",Qt);if(typeof document<"u"&&typeof window<"u"){const e=window;if(e.IconifyPreload!==void 0){const n=e.IconifyPreload,s="Invalid IconifyPreload syntax.";typeof n=="object"&&n!==null&&(n instanceof Array?n:[n]).forEach(o=>{try{(typeof o!="object"||o===null||o instanceof Array||typeof o.icons!="object"||typeof o.prefix!="string"||!wt(o))&&console.error(s)}catch{console.error(s)}})}if(e.IconifyProviders!==void 0){const n=e.IconifyProviders;if(typeof n=="object"&&n!==null)for(let s in n){const o="IconifyProviders["+s+"] is invalid.";try{const t=n[s];if(typeof t!="object"||!t||t.resources===void 0)continue;At(s,t)||console.error(o)}catch{console.error(o)}}}}function hn(e,n,s,o,t){function r(){n.loading&&(n.loading.abort(),n.loading=null)}if(typeof e=="object"&&e!==null&&typeof e.body=="string")return n.name="",r(),{data:{...V,...e}};let i;if(typeof e!="string"||(i=Q(e,!1,!0))===null)return r(),null;const c=bt(i);if(!c)return s&&(!n.loading||n.loading.name!==e)&&(r(),n.name="",n.loading={name:e,abort:en([i],o)}),null;r(),n.name!==e&&(n.name=e,t&&!n.destroyed&&t(e));const l=["iconify"];return i.prefix!==""&&l.push("iconify--"+i.prefix),i.provider!==""&&l.push("iconify--"+i.provider),{data:c,classes:l}}function _e(e,n){return e?pn({...V,...e},n):null}var gn=We("<svg><!></svg>"),mn=re("<span></span>");function ne(e,n){const s=rt(n,["children","$$slots","$$events","$$legacy"]);se(n,!1);const o=N({name:"",loading:null,destroyed:!1});let t=N(!1),r=N(0),i=N();const c=d=>{typeof s.onLoad=="function"&&s.onLoad(d),lt()("load",{icon:d})};function l(){He(r)}it(()=>{M(t,!0)}),ct(()=>{$(o,v(o).destroyed=!0),v(o).loading&&(v(o).loading.abort(),$(o,v(o).loading=null))}),$e(()=>(v(r),je(s),v(t),v(o),v(i),_e),()=>{v(r);const d=!!s.ssr||v(t),m=hn(s.icon,v(o),d,l,c);M(i,m?_e(m.data,s):null),v(i)&&m.classes&&$(i,v(i).attributes.class=(typeof s.class=="string"?s.class+" ":"")+m.classes.join(" "))}),Ge(),ot();var a=ae(),u=W(a);{var p=d=>{var m=ae(),I=W(m);{var k=h=>{var f=gn();let x;var w=T(f);tt(w,()=>v(i).body,!0,!1),j(f),Y(()=>x=ue(f,x,{...v(i).attributes})),P(h,f)},y=h=>{var f=mn();let x;Y(()=>x=ue(f,x,{...v(i).attributes})),P(h,f)};fe(I,h=>{v(i).svg?h(k):h(y,!1)})}P(d,m)};fe(u,d=>{v(i)&&d(p)})}P(e,a),oe()}var vn=re('<label><!> <input type="search" placeholder="type to search..." autocomplete="off"> <kbd class="kbd kbd-sm">Ctrl</kbd> <kbd class="kbd kbd-sm">Q</kbd></label>');function yn(e,n){const s=Ye();se(n,!0);let o=H(n,"self",15),t=H(n,"exclass",3,""),r=H(n,"value",15);const i=`${s}-search-bar`;var c=vn();de(c,"for",i);var l=T(c);ne(l,{icon:"material-symbols-light:search",class:"opacity-50 h-full w-fit"});var a=F(l,2);nt(a),de(a,"id",i),at(a,u=>o(u),()=>o()),Ue(4),j(c),Y(()=>st(c,1,`input ${t()??""}
focus-within:outline-none`)),ut(a,r),P(e,c),oe()}var bn=re(`<nav class="navbar bg-base-100 text-base-content
shadow-sm pr-5 sticky top-0 z-50 transition-all"><div class="flex-none hidden sm:block"><a href="/" class="btn btn-ghost text-2xl"><svg width="100" height="60" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#00CFFF; stop-opacity:1"></stop><stop offset="100%" style="stop-color:#FF00FF; stop-opacity:1"></stop></linearGradient></defs><rect x="90" y="30" width="120" height="120" transform="rotate(45 150 90)" fill="url(#grad1)"></rect><rect x="125" y="65" width="50" height="50" transform="rotate(45 150 90)" fill="white"></rect><text x="50" y="170" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="url(#grad1)" letter-spacing="5">HAI TMT</text></svg></a></div> <div class="flex-1 flex justify-center"><div class="dropdown dropdown-center"><!> <!></div></div> <div class="flex-none"><ul class="menu menu-horizontal text-sm sm:text-base md:text-lg 2xl:text-xl"><li><a href="/blog">Blog</a></li> <li><a href="/">About</a></li></ul> <label class="swap swap-rotate self-center text-lg sm:text-xl md:text-2xl 2xl:text-3xl"><input type="checkbox" value="light" class="theme-controller"> <div class="swap-on"><!></div> <div class="swap-off"><!></div></label></div></nav> <main class="w-full min-h-screen bg-base-200"><!></main>`,1);function Mn(e,n){se(n,!0);let s=G(""),o=G(0),t=G(void 0);const r=(b,S=["py-0"])=>{Ke(()=>{v(o)>50?b.classList.add(...S):b.classList.remove(...S)})},i=b=>{var S;b.ctrlKey&&b.key==="q"&&((S=v(t))==null||S.focus())};var c=bn();Xe("keydown",Be,i);var l=W(c),a=T(l),u=T(a);pe(u,(b,S)=>r==null?void 0:r(b,S),()=>["hidden"]),j(a);var p=F(a,2),d=T(p),m=T(d);yn(m,{exclass:"m-auto w-full max-h-[90%] sm:max-h-full",get self(){return v(t)},set self(b){M(t,b,!0)},get value(){return v(s)},set value(b){M(s,b,!0)}});var I=F(m,2);ft(I,{exclass:"dropdown-content shadow-sm w-full mt-2",get search_input(){return v(s)}}),j(d),j(p);var k=F(p,2),y=F(T(k),2),h=T(y),f=F(h,2),x=T(f);ne(x,{icon:"noto:sun"}),j(f);var w=F(f,2),O=T(w);ne(O,{icon:"noto-v1:crescent-moon"}),j(w),j(y),j(k),j(l),pe(l,b=>r==null?void 0:r(b));var g=F(l,2),_=T(g);Ze(_,()=>n.children),j(g),et("y",()=>v(o),b=>M(o,b,!0)),P(e,c),oe()}export{Mn as component,An as universal};
