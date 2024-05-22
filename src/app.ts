import 'uno.css';
import { $Renderer } from './machine';

let home_page_btn = document.querySelector('.home');
let detail_page_btn = document.querySelector('.detail');

// start state-machine
$Renderer.start();

home_page_btn?.addEventListener('click', (event) => {
    $Renderer.send({ type: 'view' });
});

detail_page_btn?.addEventListener('click', (event) => {
    $Renderer.send({ type: 'back' });
});