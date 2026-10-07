import {
useEffect,
useState
} from 'react';

interface PromptEvent extends Event {
prompt: () => Promise<void>;
userChoice: Promise<{
outcome: 'accepted' | 'dismissed';
platform: string;
}>;
}

// track pwa install state on device
// we listen to browser prompt events
export function usePWAInstall() {
const [
deferredPrompt,
setDeferredPrompt
] = useState<PromptEvent | null>(
null
);
const [
isInstalled,
setIsInstalled
] = useState(false);
const [
isIOS,
setIsIOS
] = useState(false);

useEffect(() => {
// check if app runs standalone
// we test display-mode media query
const mq = window.matchMedia(
'(display-mode: standalone)'
);
const nav =
window.navigator as unknown as {
standalone?: boolean;
};
const standalone =
mq.matches ||
nav.standalone === true;
setIsInstalled(standalone);

// check if device is ios
// we match iphone or ipad in ua
const ua =
window.navigator.userAgent
.toLowerCase();
const ios =
/iphone|ipad|ipod/.test(ua);
setIsIOS(ios);

// save install prompt for later
// we stop default banner and store
const onPrompt = (e: Event) => {
e.preventDefault();
setDeferredPrompt(
e as PromptEvent
);
};

// mark app as installed when done
// we clear saved prompt state
const onInstalled = () => {
setIsInstalled(true);
setDeferredPrompt(null);
};

window.addEventListener(
'beforeinstallprompt',
onPrompt
);
window.addEventListener(
'appinstalled',
onInstalled
);

return () => {
window.removeEventListener(
'beforeinstallprompt',
onPrompt
);
window.removeEventListener(
'appinstalled',
onInstalled
);
};
}, []);

// trigger native install dialog
// we call prompt on saved event
const install = async () => {
if (!deferredPrompt) {
return false;
}
await deferredPrompt.prompt();
const res =
await deferredPrompt.userChoice;
if (res.outcome === 'accepted') {
setIsInstalled(true);
setDeferredPrompt(null);
return true;
}
return false;
};

return {
isInstallable: !!deferredPrompt,
isInstalled,
isIOS,
install,
};
}
