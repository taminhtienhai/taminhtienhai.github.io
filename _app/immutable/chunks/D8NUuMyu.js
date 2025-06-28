const n=()=>fetch("/meta/all_post.json").then(t=>t.json()),o=t=>t?fetch(`/meta/badge_${t}.json`).then(s=>s.json()):n(),a=t=>n().then(s=>s.filter(e=>e.title.includes(t)));export{a,o as b,n as f};
