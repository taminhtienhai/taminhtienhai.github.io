import 'uno.css';
import { $Renderer } from './machine';

let home_page_btn = document.querySelector('.home');
let detail_page_btn = document.querySelector('.detail');

home_page_btn?.addEventListener('click', (event) => {
    $Renderer.send({ type: 'home' });
});

detail_page_btn?.addEventListener('click', (event) => {
    $Renderer.send({ type: 'detail' });
});

// start state-machine
$Renderer.start();