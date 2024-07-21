import 'uno.css';
import { $Renderer } from './machine';

$Renderer.start();



document.getElementById('theme-switcher')?.addEventListener('click', (_) => {
    if (document.documentElement.classList.contains('light')) {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
    }
    else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    }
})