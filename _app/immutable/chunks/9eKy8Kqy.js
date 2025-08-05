const n=()=>fetch("/meta/all_post.json?v=1.0.1").then(t=>t.json()),l=t=>n().then(s=>s.filter(e=>e.title.includes(t)));export{n as a,l as f};
