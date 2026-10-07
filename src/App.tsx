import React, {
useState,
useEffect
} from 'react';
import {
usePWAInstall
} from './usePWAInstall';
import {
INITIAL_BRANCHES,
BranchItem
} from './branchesData';

const STORAGE_KEY =
'forkmaster_branches_v1';
const REPO_KEY =
'forkmaster_repo_v1';
const LOCK_MODE_KEY =
'forkmaster_lock_mode_v1';

// draw forkgram classic svg icon
// we use original vector coordinates
function ForkIcon({
size = 28
}: {
size?: number;
}) {
return (
<svg
width={size}
height={size}
viewBox="0 0 320 320"
className="shrink-0 rounded-full"
>
<defs>
<linearGradient
id="fg_bg"
x1="160"
y1="60"
x2="160"
y2="260"
gradientUnits="userSpaceOnUse"
>
<stop
offset="0%"
stopColor="#3a5e83"
/>
<stop
offset="100%"
stopColor="#274566"
/>
</linearGradient>
<linearGradient
id="fg_1"
x1="81"
y1="256"
x2="431"
y2="288"
gradientUnits="userSpaceOnUse"
>
<stop
offset="0%"
stopColor="#bdd9ef"
/>
<stop
offset="100%"
stopColor="#b3bcc0"
/>
</linearGradient>
<linearGradient
id="fg_2"
x1="81"
y1="268"
x2="431"
y2="224"
gradientUnits="userSpaceOnUse"
>
<stop
offset="0%"
stopColor="#d9ecf8"
/>
<stop
offset="100%"
stopColor="#f8feed"
/>
</linearGradient>
<linearGradient
id="fg_3"
x1="81"
y1="268"
x2="105"
y2="248"
gradientUnits="userSpaceOnUse"
>
<stop
offset="0%"
stopColor="#7c9bbe"
/>
<stop
offset="100%"
stopColor="#788b9b"
/>
</linearGradient>
</defs>
<circle
cx="160"
cy="160"
r="140"
fill="url(#fg_bg)"
/>
<g
transform={
'translate(46.006, 54.138) ' +
'scale(0.43080)'
}
>
<g
transform={
'translate(256, 256) ' +
'rotate(-40) ' +
'scale(1.14, 1.34) ' +
'translate(-256, -256)'
}
>
<path
d={
'M81 256L431 256L341 263' +
'L341 281L431 288L341 295' +
'L341 296L301 268L81 268Z'
}
fill="url(#fg_1)"
/>
<path
d={
'M81 244L301 244L341 216' +
'L341 217L431 224L341 231' +
'L341 249L431 256L81 256Z'
}
fill="url(#fg_2)"
/>
<path
d="M81 244L81 268L105 256Z"
fill="url(#fg_3)"
/>
</g>
</g>
</svg>
);
}

// build main forkmaster screen
// we show local branches and shield
export default function App() {
// get saved branches from storage
// we fall back to built-in git list
const [branches, setBranches] =
useState<BranchItem[]>(() => {
try {
const raw =
localStorage.getItem(
STORAGE_KEY
);
if (raw) {
return JSON.parse(raw);
}
} catch {
// skip broken storage data
// we return default list below
}
return INITIAL_BRANCHES;
});

// get active repository filter
// we default to Pole repo first
const [activeRepo, setActiveRepo] =
useState<string>(() => {
return (
localStorage.getItem(
REPO_KEY
) || 'Pole'
);
});

// track if lock stays after resume
// we save user choice in storage
const [
stayLockedOnResume,
setStayLockedOnResume
] = useState<boolean>(() => {
return (
localStorage.getItem(
LOCK_MODE_KEY
) === 'true'
);
});

// track white screen shield state
// we turn white on blur or hide
const [isShielded, setIsShielded] =
useState<boolean>(false);
const [
manualLocked,
setManualLocked
] = useState<boolean>(false);
const [search, setSearch] =
useState<string>('');
const [
newBranchName,
setNewBranchName
] = useState<string>('');
const [
showAddModal,
setShowAddModal
] = useState<boolean>(false);
const [
showIOSGuide,
setShowIOSGuide
] = useState<boolean>(false);

const {
isInstallable,
isInstalled,
isIOS,
install
} = usePWAInstall();

// save branches to local storage
// we write json on every update
useEffect(() => {
try {
localStorage.setItem(
STORAGE_KEY,
JSON.stringify(branches)
);
} catch {
// skip quota errors on mobile
// we keep state in memory
}
}, [branches]);

// save selected repo to storage
// we persist tab across reloads
useEffect(() => {
try {
localStorage.setItem(
REPO_KEY,
activeRepo
);
} catch {
// skip storage write failure
// we keep active repo in state
}
}, [activeRepo]);

// save lock mode preference
// we persist sticky shield toggle
useEffect(() => {
try {
localStorage.setItem(
LOCK_MODE_KEY,
String(stayLockedOnResume)
);
} catch {
// skip storage write failure
// we keep flag in memory
}
}, [stayLockedOnResume]);

// watch app visibility and focus
// we show white screen when hidden
useEffect(() => {
const setMetaColor = (
color: string
) => {
const meta =
document.querySelector(
'meta[name="theme-color"]'
);
if (meta) {
meta.setAttribute(
'content',
color
);
}
};

const activateShield = () => {
setIsShielded(true);
document.title = '\u200B';
setMetaColor('#ffffff');
if (stayLockedOnResume) {
setManualLocked(true);
}
};

const restoreView = () => {
if (!stayLockedOnResume) {
setIsShielded(false);
document.title = 'Forkmaster';
setMetaColor('#274566');
}
};

const onVisChange = () => {
if (
document.hidden ||
document.visibilityState !==
'visible'
) {
activateShield();
} else {
restoreView();
}
};

const onBlur = () => {
activateShield();
};

const onFocus = () => {
restoreView();
};

document.addEventListener(
'visibilitychange',
onVisChange
);
window.addEventListener(
'blur',
onBlur
);
window.addEventListener(
'focus',
onFocus
);
window.addEventListener(
'pagehide',
activateShield
);

return () => {
document.removeEventListener(
'visibilitychange',
onVisChange
);
window.removeEventListener(
'blur',
onBlur
);
window.removeEventListener(
'focus',
onFocus
);
window.removeEventListener(
'pagehide',
activateShield
);
};
}, [stayLockedOnResume]);

// unlock white privacy screen
// we restore title and header color
const unlockScreen = () => {
setManualLocked(false);
setIsShielded(false);
document.title = 'Forkmaster';
const meta =
document.querySelector(
'meta[name="theme-color"]'
);
if (meta) {
meta.setAttribute(
'content',
'#274566'
);
}
};

// switch active head branch
// we mark clicked branch as current
const checkoutBranch = (
targetId: string,
repoName: string
) => {
setBranches(prev =>
prev.map(item => {
if (item.repo !== repoName) {
return item;
}
return {
...item,
isCurrent:
item.id === targetId,
};
})
);
};

// create new local branch offline
// we generate short sha and save
const addLocalBranch = (
e: React.FormEvent
) => {
e.preventDefault();
const clean =
newBranchName
.trim()
.replace(/\s+/g, '-');
if (!clean) {
return;
}
const targetRepo =
activeRepo === 'All'
? 'Pole'
: activeRepo;
const randomSha = Math.random()
.toString(16)
.slice(2, 9);
const now = new Date();
const dateStr =
now.toISOString().slice(0, 10) +
' ' +
now.toTimeString().slice(0, 5);

const created: BranchItem = {
id:
targetRepo +
'-' +
clean +
'-' +
randomSha,
repo: targetRepo,
name: clean,
sha: randomSha,
author: 'local-dev',
date: dateStr,
message:
'local branch checkout ' +
'from HEAD',
isCurrent: true,
};

setBranches(prev => [
created,
...prev.map(b =>
b.repo === targetRepo
? { ...b, isCurrent: false }
: b
),
]);
setNewBranchName('');
setShowAddModal(false);
};

const repos = [
'Pole',
'purple-fox',
'loto',
'androidtvhost2',
'pole-assets',
'Forkmaster',
'All',
];

const visibleBranches =
branches.filter(item => {
const matchRepo =
activeRepo === 'All' ||
item.repo === activeRepo;
const q = search.toLowerCase();
const matchText =
!q ||
item.name
.toLowerCase()
.includes(q) ||
item.sha
.toLowerCase()
.includes(q) ||
item.message
.toLowerCase()
.includes(q);
return matchRepo && matchText;
});

const currentHead =
visibleBranches.find(
b => b.isCurrent
) || visibleBranches[0];

// show pure white screen when hidden
// we block screenshots and recents
if (isShielded || manualLocked) {
return (
<div
onClick={unlockScreen}
className={
'fixed inset-0 z-50 ' +
'bg-white select-none ' +
'cursor-pointer'
}
/>
);
}

return (
<div
className={
'min-h-screen bg-[#eef2f5] ' +
'text-slate-900 flex ' +
'flex-col font-sans'
}
>
<header
className={
'sticky top-0 z-30 ' +
'bg-[#274566] text-white ' +
'px-4 py-3 shadow-sm'
}
>
<div
className={
'max-w-2xl mx-auto flex ' +
'items-center ' +
'justify-between gap-2'
}
>
<div
className={
'flex items-center ' +
'gap-2.5 min-w-0'
}
>
<ForkIcon size={32} />
<span
className={
'text-lg font-semibold ' +
'tracking-tight truncate'
}
>
Forkmaster
</span>
</div>

<div
className={
'flex items-center gap-2'
}
>
{!isInstalled &&
isInstallable && (
<button
onClick={install}
className={
'px-3 py-1.5 text-xs ' +
'font-medium rounded-lg ' +
'bg-[#3a5e83] ' +
'hover:bg-[#466f99] ' +
'whitespace-nowrap ' +
'min-h-[38px]'
}
>
Install
</button>
)}

{!isInstalled &&
!isInstallable &&
isIOS && (
<button
onClick={() =>
setShowIOSGuide(true)
}
className={
'px-3 py-1.5 text-xs ' +
'font-medium rounded-lg ' +
'bg-[#3a5e83] ' +
'whitespace-nowrap ' +
'min-h-[38px]'
}
>
iOS Setup
</button>
)}

<button
onClick={() =>
setManualLocked(true)
}
title="White Screen Shield"
className={
'px-3 py-1.5 text-xs ' +
'font-medium rounded-lg ' +
'bg-white/15 ' +
'hover:bg-white/25 ' +
'whitespace-nowrap ' +
'min-h-[38px] flex ' +
'items-center gap-1.5'
}
>
<svg
width="15"
height="15"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2.2"
>
<rect
x="3"
y="11"
width="18"
height="11"
rx="2"
/>
<path
d={
'M7 11V7a5 5 0 0 1 10 0v4'
}
/>
</svg>
<span>Shield</span>
</button>
</div>
</div>
</header>

<main
className={
'flex-1 max-w-2xl w-full ' +
'mx-auto p-3 sm:p-4 ' +
'space-y-3'
}
>
<section
className={
'bg-white rounded-xl p-3.5 ' +
'border border-slate-200/80'
}
>
<div
className={
'flex items-center ' +
'justify-between gap-2 ' +
'mb-2.5'
}
>
<div>
<div
className={
'text-xs text-slate-500'
}
>
Active HEAD · Local Git
</div>
<div
className={
'text-base font-semibold ' +
'text-[#274566] ' +
'font-mono mt-0.5'
}
>
{currentHead
? currentHead.repo +
' / ' +
currentHead.name
: 'No branch'}
</div>
</div>

<button
onClick={() =>
setShowAddModal(true)
}
className={
'px-3.5 py-2 text-xs ' +
'font-medium text-white ' +
'bg-[#274566] rounded-lg ' +
'hover:bg-[#1e3652] ' +
'whitespace-nowrap ' +
'min-h-[40px]'
}
>
+ New Branch
</button>
</div>

<div
className={
'flex items-center ' +
'justify-between pt-2.5 ' +
'border-t border-slate-100 ' +
'text-xs text-slate-600'
}
>
<span>
White screen on minimize:
{' '}
<strong
className="text-slate-900"
>
Active
</strong>
</span>

<button
onClick={() =>
setStayLockedOnResume(
!stayLockedOnResume
)
}
className={
'text-xs font-medium ' +
'text-[#274566] underline ' +
'whitespace-nowrap py-1'
}
>
{stayLockedOnResume
? 'Mode: Tap to Unlock'
: 'Mode: Auto Resume'}
</button>
</div>
</section>

<div
className={
'flex items-center gap-1.5 ' +
'overflow-x-auto pb-1 ' +
'no-scrollbar'
}
>
{repos.map(repo => {
const active =
activeRepo === repo;
return (
<button
key={repo}
onClick={() =>
setActiveRepo(repo)
}
className={
'px-3 py-2 text-xs ' +
'font-medium rounded-lg ' +
'whitespace-nowrap ' +
'shrink-0 min-h-[38px] ' +
'transition-colors ' +
(active
? 'bg-[#274566] text-white'
: 'bg-white text-slate-700 ' +
'border border-slate-200')
}
>
{repo}
</button>
);
})}
</div>

<div className="relative">
<input
type="text"
value={search}
onChange={e =>
setSearch(e.target.value)
}
placeholder={
'Filter branches, ' +
'commits, or sha...'
}
className={
'w-full bg-white ' +
'border border-slate-200 ' +
'rounded-xl px-3.5 py-2.5 ' +
'text-sm outline-none ' +
'focus:border-[#274566]'
}
/>
</div>

<section
className={
'bg-white rounded-xl ' +
'border border-slate-200/80 ' +
'divide-y divide-slate-100'
}
>
{visibleBranches.map(item => (
<div
key={item.id}
onClick={() =>
checkoutBranch(
item.id,
item.repo
)
}
className={
'p-3.5 cursor-pointer ' +
'hover:bg-slate-50 ' +
'transition-colors flex ' +
'items-start ' +
'justify-between gap-3'
}
>
<div
className="min-w-0 flex-1"
>
<div
className={
'flex items-center ' +
'gap-2 flex-wrap'
}
>
<span
className={
'font-mono text-sm ' +
'font-semibold ' +
(item.isCurrent
? 'text-[#274566]'
: 'text-slate-900')
}
>
{item.name}
</span>
<span
className={
'text-xs text-slate-400'
}
>
·
</span>
<span
className={
'font-mono text-xs ' +
'text-slate-500 ' +
'tabular-nums'
}
>
{item.sha}
</span>
{item.isCurrent && (
<span
className={
'text-xs font-medium ' +
'text-emerald-700'
}
>
· HEAD
</span>
)}
{item.isDefault && (
<span
className={
'text-xs text-slate-500'
}
>
· default
</span>
)}
</div>

<p
className={
'text-xs text-slate-600 ' +
'mt-1 line-clamp-1'
}
>
{item.message}
</p>

<div
className={
'text-[11px] ' +
'text-slate-400 mt-1 ' +
'tabular-nums'
}
>
{item.repo} · {item.author}
{' · '}
{item.date}
</div>
</div>

<button
type="button"
onClick={e => {
e.stopPropagation();
checkoutBranch(
item.id,
item.repo
);
}}
className={
'px-2.5 py-1.5 text-xs ' +
'font-medium rounded-lg ' +
'shrink-0 min-h-[36px] ' +
(item.isCurrent
? 'bg-emerald-50 ' +
'text-emerald-800'
: 'bg-slate-100 ' +
'text-slate-700 ' +
'hover:bg-slate-200')
}
>
{item.isCurrent
? 'Active'
: 'Checkout'}
</button>
</div>
))}

{visibleBranches.length ===
0 && (
<div
className={
'p-8 text-center ' +
'text-sm text-slate-500'
}
>
No matching local branches.
</div>
)}
</section>
</main>

{showAddModal && (
<div
className={
'fixed inset-0 z-40 ' +
'bg-black/50 flex ' +
'items-center ' +
'justify-center p-4'
}
>
<form
onSubmit={addLocalBranch}
className={
'w-full max-w-sm ' +
'bg-white rounded-2xl ' +
'p-5 space-y-4'
}
>
<h3
className={
'text-base font-semibold ' +
'text-slate-900'
}
>
Create Local Branch
</h3>
<input
type="text"
value={newBranchName}
onChange={e =>
setNewBranchName(
e.target.value
)
}
placeholder={
'e.g. feature/offline-sync'
}
autoFocus
className={
'w-full border ' +
'border-slate-300 ' +
'rounded-xl px-3.5 py-2.5 ' +
'text-sm font-mono ' +
'outline-none ' +
'focus:border-[#274566]'
}
/>
<div
className={
'flex items-center ' +
'justify-end gap-2'
}
>
<button
type="button"
onClick={() =>
setShowAddModal(false)
}
className={
'px-4 py-2 text-xs ' +
'font-medium ' +
'text-slate-600 ' +
'rounded-lg ' +
'hover:bg-slate-100'
}
>
Cancel
</button>
<button
type="submit"
className={
'px-4 py-2 text-xs ' +
'font-medium text-white ' +
'bg-[#274566] rounded-lg'
}
>
Create & Checkout
</button>
</div>
</form>
</div>
)}

{showIOSGuide && (
<div
className={
'fixed inset-0 z-40 ' +
'bg-black/50 flex ' +
'items-center ' +
'justify-center p-4'
}
>
<div
className={
'w-full max-w-sm ' +
'bg-white rounded-2xl ' +
'p-5 space-y-3'
}
>
<h3
className={
'text-base font-semibold'
}
>
Install Forkmaster on iOS
</h3>
<p
className={
'text-xs text-slate-600 ' +
'leading-relaxed'
}
>
1. Tap Share in Safari.
<br />
2. Select Add to Home Screen.
</p>
<button
onClick={() =>
setShowIOSGuide(false)
}
className={
'w-full py-2 text-xs ' +
'font-medium text-white ' +
'bg-[#274566] rounded-lg'
}
>
Close
</button>
</div>
</div>
)}
</div>
);
}
