import {
StrictMode
} from 'react';
import {
createRoot
} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// mount react app into root node
// we grab #root from dom and render
const rootNode =
document.getElementById('root')!;
createRoot(rootNode).render(
<StrictMode>
<App />
</StrictMode>,
);
