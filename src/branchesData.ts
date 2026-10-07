export interface BranchItem {
id: string;
repo: string;
name: string;
sha: string;
author: string;
date: string;
message: string;
isDefault?: boolean;
isCurrent?: boolean;
}

// store local snapshot of branches
// we keep real git data for offline
export const INITIAL_BRANCHES:
BranchItem[] = [
{
id: 'pole-murashkovskyi',
repo: 'Pole',
name: 'murashkovskyi',
sha: 'b8c1120',
author: 'AI Assistant',
date: '2026-09-19 01:51',
message:
'feat(murashkovskyi): ' +
'diversified wheel host emotions',
isCurrent: true,
},
{
id: 'pole-zhyhalko',
repo: 'Pole',
name: 'zhyhalko',
sha: '7a46243',
author: 'AI Assistant',
date: '2026-09-19 01:51',
message:
'feat(zhyhalko): add vintage ' +
'and noir themes, wheel reactions',
},
{
id: 'pole-klassen',
repo: 'Pole',
name: 'klassen',
sha: '08a2268',
author: 'AI Assistant',
date: '2026-09-19 01:51',
message:
'feat(klassen): add vintage ' +
'and noir themes, wheel reactions',
},
{
id: 'pole-eureka',
repo: 'Pole',
name: 'eureka',
sha: '5f3a7a2',
author: 'AI Assistant',
date: '2026-09-19 01:51',
message:
'feat(eureka): add vintage ' +
'and noir themes, wheel reactions',
},
{
id: 'pole-master',
repo: 'Pole',
name: 'master',
sha: '943ae19',
author: 'noviyoleksiy-byte',
date: '2026-09-19 00:48',
message:
'Add files via upload',
isDefault: true,
},
{
id: 'pole-main',
repo: 'Pole',
name: 'main',
sha: 'fd13179',
author: 'AI Assistant',
date: '2026-09-14 14:32',
message:
'feat(main): disable debug ' +
'panel by default, 10-tap trigger',
},
{
id: 'pole-raw-photos',
repo: 'Pole',
name: 'raw-photos',
sha: 'dbb3c41',
author: 'Suidesudesu',
date: '2026-09-06 02:39',
message:
'add raw host photos',
},
{
id: 'loto-foxy',
repo: 'loto',
name: 'foxy',
sha: '3df5c33',
author: 'noviyoleksiy-byte',
date: '2026-10-06 02:11',
message:
'update code formatting ' +
'and comments',
isCurrent: true,
},
{
id: 'loto-master',
repo: 'loto',
name: 'master',
sha: '2de4d02',
author: 'Suidesudesu',
date: '2026-09-11 04:42',
message: 'Initial commit',
isDefault: true,
},
{
id: 'pfox-main',
repo: 'purple-fox',
name: 'main',
sha: 'b9ab47a',
author: 'noviyoleksiy-byte',
date: '2026-10-05 01:50',
message:
'update comments and ' +
'formatting in js files',
isDefault: true,
isCurrent: true,
},
{
id: 'pfox-master',
repo: 'purple-fox',
name: 'master',
sha: 'b9ab47a',
author: 'noviyoleksiy-byte',
date: '2026-10-05 01:50',
message:
'update comments and ' +
'formatting in js files',
},
{
id: 'pfox-murashkovskyi',
repo: 'purple-fox',
name: 'murashkovskyi',
sha: '16bd242',
author: 'AI Agent',
date: '2026-09-15 04:34',
message:
'feat: implement murashkovskyi ' +
'branch with static host',
},
{
id: 'pfox-dev',
repo: 'purple-fox',
name: 'dev',
sha: '60545b8',
author: 'AI Developer',
date: '2026-08-29 10:11',
message:
"Merge branch 'main' into dev",
},
{
id: 'atv-murashkovskyi',
repo: 'androidtvhost2',
name: 'murashkovskyi',
sha: '7483852',
author: 'noviyoleksiy-byte',
date: '2026-09-19 01:59',
message:
'chore(rebuild): build for ' +
'branch murashkovskyi v2.6.3',
isCurrent: true,
},
{
id: 'atv-klassen',
repo: 'androidtvhost2',
name: 'klassen',
sha: 'a7810ee',
author: 'noviyoleksiy-byte',
date: '2026-09-19 01:59',
message:
'chore(rebuild): build for ' +
'branch klassen v2.6.3',
},
{
id: 'atv-zhyhalko',
repo: 'androidtvhost2',
name: 'zhyhalko',
sha: 'd2b291d',
author: 'noviyoleksiy-byte',
date: '2026-09-19 01:59',
message:
'chore(rebuild): build for ' +
'branch zhyhalko v2.6.3',
},
{
id: 'atv-eureka',
repo: 'androidtvhost2',
name: 'eureka',
sha: 'eda8f7a',
author: 'noviyoleksiy-byte',
date: '2026-09-19 01:59',
message:
'chore(rebuild): build for ' +
'branch eureka v2.6.3',
},
{
id: 'atv-main',
repo: 'androidtvhost2',
name: 'main',
sha: 'a18a455',
author: 'noviyoleksiy-byte',
date: '2026-09-13 12:30',
message:
'chore(ci): update workflow ' +
'branches and version to 2.6.0',
isDefault: true,
},
{
id: 'passets-processed',
repo: 'pole-assets',
name: 'processed',
sha: 'e129105',
author: 'noviyoleksiy-byte',
date: '2026-09-06 09:21',
message:
'Add optimized cutouts ' +
'in 720x1080 uniform scale',
isCurrent: true,
},
{
id: 'passets-main',
repo: 'pole-assets',
name: 'main',
sha: '747e935',
author: 'Suidesudesu',
date: '2026-09-06 09:07',
message: 'Initial commit',
isDefault: true,
},
{
id: 'fm-main',
repo: 'Forkmaster',
name: 'main',
sha: '4f9c2a1',
author: 'noviyoleksiy-byte',
date: '2026-10-06 15:14',
message:
'feat: local branch viewer ' +
'with white screen privacy shield',
isDefault: true,
isCurrent: true,
},
];
