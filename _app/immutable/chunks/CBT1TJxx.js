import{M as ee,j as ae,B as H,o as C,N as re,y as ne,g as X,O as fe,z as ie,A as z,C as M,p as R,P as le,D as W,k as Z,F as se,Q as k,R as $,S as F,T as P,V as ue,W as Q,X as te,Y as b,Z as ve,_ as de,$ as _e,m as oe,a0 as y,a1 as ce,a2 as he,a3 as Ee,a4 as G,a5 as pe}from"./pZ4bjZez.js";function xe(l,e){return e}function Ae(l,e,a,u){for(var v=[],_=e.length,t=0;t<_;t++)ve(e[t].e,v,!0);var o=_>0&&v.length===0&&a!==null;if(o){var A=a.parentNode;de(A),A.append(a),u.clear(),x(l,e[0].prev,e[_-1].next)}_e(v,()=>{for(var h=0;h<_;h++){var d=e[h];o||(u.delete(d.k),x(l,d.prev,d.next)),oe(d.e,!o)}})}function Ce(l,e,a,u,v,_=null){var t=l,o={flags:e,items:new Map,first:null},A=(e&G)!==0;if(A){var h=l;t=C?H(re(h)):h.appendChild(ee())}C&&ne();var d=null,N=!1,f=fe(()=>{var s=a();return te(s)?s:s==null?[]:$(s)});ae(()=>{var s=X(f),r=s.length;if(N&&r===0)return;N=r===0;let I=!1;if(C){var E=t.data===ie;E!==(r===0)&&(t=z(),H(t),M(!1),I=!0)}if(C){for(var p=null,T,c=0;c<r;c++){if(R.nodeType===8&&R.data===le){t=R,I=!0,M(!1);break}var n=s[c],i=u(n,c);T=J(R,o,p,null,n,i,c,v,e,a),o.items.set(i,T),p=T}r>0&&H(z())}C||Te(s,o,t,v,e,u,a),_!==null&&(r===0?d?W(d):d=Z(()=>_(t)):d!==null&&se(d,()=>{d=null})),I&&M(!0),X(f)}),C&&(t=R)}function Te(l,e,a,u,v,_,t){var L,V,Y,q;var o=(v&pe)!==0,A=(v&(y|b))!==0,h=l.length,d=e.items,N=e.first,f=N,s,r=null,I,E=[],p=[],T,c,n,i;if(o)for(i=0;i<h;i+=1)T=l[i],c=_(T,i),n=d.get(c),n!==void 0&&((L=n.a)==null||L.measure(),(I??(I=new Set)).add(n));for(i=0;i<h;i+=1){if(T=l[i],c=_(T,i),n=d.get(c),n===void 0){var K=f?f.e.nodes_start:a;r=J(K,e,r,r===null?e.first:r.next,T,c,i,u,v,t),d.set(c,r),E=[],p=[],f=r.next;continue}if(A&&Ie(n,T,i,v),(n.e.f&k)!==0&&(W(n.e),o&&((V=n.a)==null||V.unfix(),(I??(I=new Set)).delete(n))),n!==f){if(s!==void 0&&s.has(n)){if(E.length<p.length){var S=p[0],m;r=S.prev;var O=E[0],g=E[E.length-1];for(m=0;m<E.length;m+=1)U(E[m],S,a);for(m=0;m<p.length;m+=1)s.delete(p[m]);x(e,O.prev,g.next),x(e,r,O),x(e,g,S),f=S,r=g,i-=1,E=[],p=[]}else s.delete(n),U(n,f,a),x(e,n.prev,n.next),x(e,n,r===null?e.first:r.next),x(e,r,n),r=n;continue}for(E=[],p=[];f!==null&&f.k!==c;)(f.e.f&k)===0&&(s??(s=new Set)).add(f),p.push(f),f=f.next;if(f===null)continue;n=f}E.push(n),r=n,f=n.next}if(f!==null||s!==void 0){for(var w=s===void 0?[]:$(s);f!==null;)(f.e.f&k)===0&&w.push(f),f=f.next;var D=w.length;if(D>0){var j=(v&G)!==0&&h===0?a:null;if(o){for(i=0;i<D;i+=1)(Y=w[i].a)==null||Y.measure();for(i=0;i<D;i+=1)(q=w[i].a)==null||q.fix()}Ae(e,w,j,d)}}o&&Ee(()=>{var B;if(I!==void 0)for(n of I)(B=n.a)==null||B.apply()}),F.first=e.first&&e.first.e,F.last=r&&r.e}function Ie(l,e,a,u){(u&y)!==0&&P(l.v,e),(u&b)!==0?P(l.i,a):l.i=a}function J(l,e,a,u,v,_,t,o,A,h){var d=(A&y)!==0,N=(A&ce)===0,f=d?N?ue(v):Q(v):v,s=(A&b)===0?t:Q(t),r={i:s,v:f,k:_,a:null,e:null,prev:a,next:u};try{return r.e=Z(()=>o(l,f,s,h),C),r.e.prev=a&&a.e,r.e.next=u&&u.e,a===null?e.first=r:(a.next=r,a.e.next=r.e),u!==null&&(u.prev=r,u.e.prev=r.e),r}finally{}}function U(l,e,a){for(var u=l.next?l.next.e.nodes_start:a,v=e?e.e.nodes_start:a,_=l.e.nodes_start;_!==u;){var t=he(_);v.before(_),_=t}}function x(l,e,a){e===null?l.first=a:(e.next=a,e.e.next=a&&a.e),a!==null&&(a.prev=e,a.e.prev=e&&e.e)}export{Ce as e,xe as i};
