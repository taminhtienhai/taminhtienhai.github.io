import{a9 as I,aa as M,ab as N,f as A,O as U,ac as T,g as f,ad as C,ae as G,I as V,b as g,W as $,af as y,a8 as q,ag as B,ah as z,ai as W,V as Z,aj as D,ak as F,al as d}from"./pZ4bjZez.js";import{l as H}from"./DIeogL5L.js";let P=!1;function J(e){var r=P;try{return P=!1,[e(),P]}finally{P=r}}const Q={get(e,r){if(!e.exclude.includes(r))return f(e.version),r in e.special?e.special[r]():e.props[r]},set(e,r,n){return r in e.special||(e.special[r]=k({get[r](){return e.props[r]}},r,T)),e.special[r](n),D(e.version),!0},getOwnPropertyDescriptor(e,r){if(!e.exclude.includes(r)&&r in e.props)return{enumerable:!0,configurable:!0,value:e.props[r]}},deleteProperty(e,r){return e.exclude.includes(r)||(e.exclude.push(r),D(e.version)),!0},has(e,r){return e.exclude.includes(r)?!1:r in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(r=>!e.exclude.includes(r))}};function ne(e,r){return new Proxy({props:e,exclude:r,special:{},version:$(0)},Q)}const X={get(e,r){let n=e.props.length;for(;n--;){let s=e.props[n];if(d(s)&&(s=s()),typeof s=="object"&&s!==null&&r in s)return s[r]}},set(e,r,n){let s=e.props.length;for(;s--;){let u=e.props[s];d(u)&&(u=u());const t=I(u,r);if(t&&t.set)return t.set(n),!0}return!1},getOwnPropertyDescriptor(e,r){let n=e.props.length;for(;n--;){let s=e.props[n];if(d(s)&&(s=s()),typeof s=="object"&&s!==null&&r in s){const u=I(s,r);return u&&!u.configurable&&(u.configurable=!0),u}}},has(e,r){if(r===q||r===B)return!1;for(let n of e.props)if(d(n)&&(n=n()),n!=null&&r in n)return!0;return!1},ownKeys(e){const r=[];for(let n of e.props){d(n)&&(n=n());for(const s in n)r.includes(s)||r.push(s)}return r}};function se(...e){return new Proxy({props:e},X)}function L(e){var r;return((r=e.ctx)==null?void 0:r.d)??!1}function k(e,r,n,s){var E;var u=(n&W)!==0,t=!H||(n&z)!==0,v=(n&y)!==0,Y=(n&F)!==0,w=!1,o;v?[o,w]=J(()=>e[r]):o=e[r];var j=q in e||B in e,_=v&&(((E=I(e,r))==null?void 0:E.set)??(j&&r in e&&(i=>e[r]=i)))||void 0,l=s,h=!0,b=!1,O=()=>(b=!0,h&&(h=!1,Y?l=g(s):l=s),l);o===void 0&&s!==void 0&&(_&&t&&M(),o=O(),_&&_(o));var c;if(t)c=()=>{var i=e[r];return i===void 0?O():(h=!0,b=!1,i)};else{var R=(u?A:U)(()=>e[r]);R.f|=N,c=()=>{var i=f(R);return i!==void 0&&(l=void 0),i===void 0?l:i}}if((n&T)===0)return c;if(_){var K=e.$$legacy;return function(i,p){return arguments.length>0?((!t||!p||K||w)&&_(p?c():i),i):c()}}var S=!1,m=Z(o),a=A(()=>{var i=c(),p=f(m);return S?(S=!1,p):m.v=i});return v&&f(a),u||(a.equals=C),function(i,p){if(arguments.length>0){const x=p?f(a):t&&v?G(i):i;if(!a.equals(x)){if(S=!0,V(m,x),b&&l!==void 0&&(l=x),L(a))return i;g(()=>f(a))}return i}return L(a)?a.v:f(a)}}export{ne as l,k as p,se as s};
