import{j as _,o as u,y as g,E as D,H as S,z as h,A as k,B as F,C as I,D as A,k as b,F as v,U as H,p as C}from"./pZ4bjZez.js";function O(E,m,[t,s]=[0,0]){u&&t===0&&g();var a=E,f=null,e=null,i=H,p=t>0?D:0,c=!1;const N=(n,l=!0)=>{c=!0,o(l,n)},o=(n,l)=>{if(i===(i=n))return;let T=!1;if(u&&s!==-1){if(t===0){const r=a.data;r===S?s=0:r===h?s=1/0:(s=parseInt(r.substring(1)),s!==s&&(s=i?1/0:-1))}const R=s>t;!!i===R&&(a=k(),F(a),I(!1),T=!0,s=-1)}i?(f?A(f):l&&(f=b(()=>l(a))),e&&v(e,()=>{e=null})):(e?A(e):l&&(e=b(()=>l(a,[t+1,s]))),f&&v(f,()=>{f=null})),T&&I(!0)};_(()=>{c=!1,m(N),c||o(null,null)},p),u&&(a=C)}export{O as i};
