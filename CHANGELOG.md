# Changelog

## [v2.9.0](https://github.com/georstat/react-native-image-cache/compare/v2.8.0...v2.9.0)

#### Improvements

- chore: updated dev and example packages ([eba84f1](https://github.com/georstat/react-native-image-cache/commit/eba84f101269b150e1718fe4a1f13f8e50fc5d0e)).

#### Documentations

- docs: added supports new Arch in Features ([bd859ef](https://github.com/georstat/react-native-image-cache/commit/bd859ef2be9e1c4c603939925d0808021de04eda)).

## [v2.8.0](https://github.com/georstat/react-native-image-cache/compare/v2.7.0...v2.8.0) - 2023-08-07

#### Improvements

- chore: updated dev and example packages ([8633bbb](https://github.com/georstat/react-native-image-cache/commit/8633bbbdb3494dbe0fdc493f1a800617731034a1)).
- chore: import useRef instead of React.useRef ([d02ea03](https://github.com/georstat/react-native-image-cache/commit/d02ea03717374c5b76eb380fc37a0a95bfde66f8)).

## [v2.7.0](https://github.com/georstat/react-native-image-cache/compare/v2.6.0...v2.7.0) - 2023-07-31

#### Improvements

- chore: updated CHANGELOG.md ([4b01561](https://github.com/georstat/react-native-image-cache/commit/4b015611e5c2f0335dcd9cc572ce57aae85d09e8)).

#### Fixes

- fix: allow `0` as an animation duration on both source and thumbnail ([071941c](https://github.com/georstat/react-native-image-cache/commit/071941c850d0510f574d3d0b9fc7dfe0136d39da)).

## [v2.6.0](https://github.com/georstat/react-native-image-cache/compare/v2.5.0...v2.6.0) - 2023-07-31

#### Improvements

- chore: updated example packages, react-native@0.72.3 ([6ca18a8](https://github.com/georstat/react-native-image-cache/commit/6ca18a829b4190f8d58870635129a2bd868200c0)).
- chore: updated dev packages, react-native@0.72.3 ([6a5dd6d](https://github.com/georstat/react-native-image-cache/commit/6a5dd6d8f442cfa4195c66d193847caaa6363181)).
- chore: eslint fixes ([f25cbd5](https://github.com/georstat/react-native-image-cache/commit/f25cbd5ae9a701af11d6eb792a0ffeac01ec57c5)).

## [v2.5.0](https://github.com/georstat/react-native-image-cache/compare/v2.4.0...v2.5.0) - 2023-06-12

#### Improvements

- chore: updated dev end example packages ([d2359c1](https://github.com/georstat/react-native-image-cache/commit/d2359c146e9065993141470870d81f558b92ff41)).

## [v2.4.0](https://github.com/georstat/react-native-image-cache/compare/v2.3.0...v2.4.0) - 2023-05-12

#### Improvements

- chore: updated example to react-native@0.71.8 and dev packages ([c512549](https://github.com/georstat/react-native-image-cache/commit/c512549c46026012db3fc2cf60dcad2969838654)).
- chore: prettified files ([3288507](https://github.com/georstat/react-native-image-cache/commit/3288507f464a30a8e9f1a4a7364aae88e5fb4007)).
- chore: added nullish check on sourceAnimationDuration from global config ([f75ce87](https://github.com/georstat/react-native-image-cache/commit/f75ce870aa340ba31434d0d9986ca17af7c0439f)).
- chore: added tintColor prop on source image ([8c91921](https://github.com/georstat/react-native-image-cache/commit/8c9192124d0113aafd6f83ded8a6be8e2b710021)).
- chore: added missing / on bugs.url on package.json ([52cd27e](https://github.com/georstat/react-native-image-cache/commit/52cd27e6e05b0701cfc9f8eaa2598e8ce10ce17c)).
- chore: added missing comma on package.json ([457fcff](https://github.com/georstat/react-native-image-cache/commit/457fcfff73e1998aa0b03e90a5547e1eee9ee471)).
- chore: updated eslint rules ([232564d](https://github.com/georstat/react-native-image-cache/commit/232564d5d9900539206ef7979cbca7f787a9c6ef)).

#### Fixes

- fix: move reanimated to dev dependencies ([4066952](https://github.com/georstat/react-native-image-cache/commit/4066952f139fd4a5f8e8e3e76eb32f450a9008c7)).
- fix: use options for thumbnails & support token refresh

- Use options for thumbnails as well:
Options property are used only for source image. So, if you have any required header or option to get thumbnail images from whatever backend you're using, it'll silently fail.
- Support refresh on token update
Cache Manager is being instanced once and only registering uris and options by source URL. So, if you have the same URL being called from different places across the app, you may face at some point that your images won't load since they have been stored by URL (which is the same) and with the first option that Cache Manager received; so you may already got the idea but to summarize you're not getting your images because the token that Cache Manager is using has expired and it's not being updated. ([6c21996](https://github.com/georstat/react-native-image-cache/commit/6c21996a1bed5ebec0c84d988641129ee275a821)).

#### Documentations

- docs: update README.md

added buy me a coffee link ([2982b22](https://github.com/georstat/react-native-image-cache/commit/2982b225249b8632223b090a02fa3489b5bb1d0b)).
- docs: fix typo ([bee2b26](https://github.com/georstat/react-native-image-cache/commit/bee2b26784cd8aa193e6a8609192181d8af3919f)).

## [v2.3.0](https://github.com/georstat/react-native-image-cache/compare/v2.2.0...v2.3.0) - 2022-08-09

#### Features

- feat: Prefetch image and return the base64/blob string ([47d537a](https://github.com/georstat/react-native-image-cache/commit/47d537a3429654bf61fc95066327c536856967a7)).

#### Improvements

- chore: updated dev and example packages ([2f23710](https://github.com/georstat/react-native-image-cache/commit/2f2371019c11d8bb774e2f28834215111d810bd3)).
- chore: updated dev and example packages ([6f90b01](https://github.com/georstat/react-native-image-cache/commit/6f90b01659713eef208ce9c0e314c6d086f84e03)).
- chore: updated dev and example packages ([4257f05](https://github.com/georstat/react-native-image-cache/commit/4257f051da00ec958325f6b774dd82428d1728c2)).
- chore: updated CHANGELOG.md to include getCustomCacheKey new config ([977ddd6](https://github.com/georstat/react-native-image-cache/commit/977ddd60c1365762c2a525d8dc0b3b7a75566794)).

## [v2.2.0](https://github.com/georstat/react-native-image-cache/compare/v2.1.0...v2.2.0) - 2022-06-20

#### Improvements

- chore: updated dev packages ([0e87709](https://github.com/georstat/react-native-image-cache/commit/0e8770929f3ed68708049000d4142de6d4e08861)).
- chore: updated example packages, added routes.tsx on .eslintignore ([859a880](https://github.com/georstat/react-native-image-cache/commit/859a88005a370d484103173eec9ff359c34fac6b)).
- chore: linted example and fixed a typo in a comment ([f2237a6](https://github.com/georstat/react-native-image-cache/commit/f2237a6a891bb3a0f474d8c0fd4bdbf41c7c07c3)).
- chore: a-b sorted types.d.ts ([3698869](https://github.com/georstat/react-native-image-cache/commit/3698869e96b3a524e101f0b2595a55aefeb09ced)).

#### Documentations

- docs: added testID prop and new getCustomCacheKey config option ([c1dfdf0](https://github.com/georstat/react-native-image-cache/commit/c1dfdf035694eeffe13c72fdf740068d4852d61b)).
- docs: mark prefetch options as optional on parameters ([3db99cf](https://github.com/georstat/react-native-image-cache/commit/3db99cf9a72ab547263c0b4e9d7ef075c7e34e48)).

## [v2.1.0](https://github.com/georstat/react-native-image-cache/compare/v2.0.1...v2.1.0) - 2022-05-05

## [v2.0.1](https://github.com/georstat/react-native-image-cache/compare/v2.0.0...v2.0.1) - 2022-04-05

## [v2.0.0](https://github.com/georstat/react-native-image-cache/compare/v1.6.0...v2.0.0) - 2022-04-03

#### Improvements

- chore: use reanimated 2 instead of react-native Animated ([8b92afc](https://github.com/georstat/react-native-image-cache/commit/8b92afcaa75425d5da1cc348af152aa3fdd04ec8)).
- chore: remove reanimated from peer deps ([d477f57](https://github.com/georstat/react-native-image-cache/commit/d477f57d3e131ed9f7f946ebbf3b3c5556966718)).
- chore: conflicts ([472fe71](https://github.com/georstat/react-native-image-cache/commit/472fe71bef379fa33ec755f62ce1740e86e4aab6)).

#### Fixes

- fix: example for reanimated 2 ([19b1f81](https://github.com/georstat/react-native-image-cache/commit/19b1f81695e9760db9b8d0176ecad73f7d5c5f29)).
- fix: image size in example ([a962ffa](https://github.com/georstat/react-native-image-cache/commit/a962ffa3402d30e951ac420c83c5aad24c95479b)).
- fix: reanimated bug with types ([fa0cbff](https://github.com/georstat/react-native-image-cache/commit/fa0cbff00835071b90bd1d386354b3a1d9b5ccc9)).

#### Documentations

- docs: highlight reanimated warning ([42e0c23](https://github.com/georstat/react-native-image-cache/commit/42e0c2363e1edfed9b19942bf89a65d3822bbe81)).
- docs: added Caution for users not using react-native-reanimated version 2.x.x ([66b16a7](https://github.com/georstat/react-native-image-cache/commit/66b16a70fc75b6d575f8837733706522b8251364)).

## [v1.6.0](https://github.com/georstat/react-native-image-cache/compare/v1.5.0...v1.6.0) - 2022-04-03

#### Features

- feat: maxAge in hours to keep the image on cache ([375bbc4](https://github.com/georstat/react-native-image-cache/commit/375bbc414ac5c5822b41e4796b3693eb18ea0fcd)).
- feat: do not cache the image prop ([1ede802](https://github.com/georstat/react-native-image-cache/commit/1ede80228f30085aa12ce291ea65b9188265fa84)).

#### Improvements

- chore: updated react-native-file-access, fixes double / of file path on iOS ([3a590aa](https://github.com/georstat/react-native-image-cache/commit/3a590aaffafb65e45559074fc67fe5333806f7ef)).
- chore: remove .replace on file.path during cache prune unlink ([fb274d8](https://github.com/georstat/react-native-image-cache/commit/fb274d88bdaaa513bb8b84ecf9b4c204600ea8ba)).

#### Fixes

- fix: Android example now builds correctly & fixed button colors ([aa1a3d9](https://github.com/georstat/react-native-image-cache/commit/aa1a3d9a78173c8ae85ffafa325e72485a4de2da)).

#### Documentations

- docs: fixed a typo ([b98a9bf](https://github.com/georstat/react-native-image-cache/commit/b98a9bf6f234b9ad571aa107e53d53430b4c7b4b)).

## [v1.5.0](https://github.com/georstat/react-native-image-cache/compare/v1.4.0...v1.5.0) - 2022-04-01

#### Features

- feat: cacheLimit configuration for cache auto pruning ([f81983a](https://github.com/georstat/react-native-image-cache/commit/f81983a9f02631297bf49f9ea2ac57ea5d9bdcda)).

#### Improvements

- chore: updated example to use react-native 0.67.4 ([eba5049](https://github.com/georstat/react-native-image-cache/commit/eba504950788782755fe25f20ac552d93c5b50df)).
- chore: bumped react-native to 0.67.4 on working dir ([74409fa](https://github.com/georstat/react-native-image-cache/commit/74409faff6547d16e6ecabcbfeac933035606e8b)).

#### Documentations

- docs: improved cache pruning flow ([493ad52](https://github.com/georstat/react-native-image-cache/commit/493ad5230677308a02ac69a89ebd0d219689cc25)).
- docs: better cacheLimit config header ([5594b84](https://github.com/georstat/react-native-image-cache/commit/5594b84097ddedd780cb2fd06eeed01bc2e682d7)).
- docs: added an extra step on cache pruning flow ([a044978](https://github.com/georstat/react-native-image-cache/commit/a0449782ea75fbc1e890e8a0529bb69b44511ca9)).
- docs: update README

added download per month ([5366c33](https://github.com/georstat/react-native-image-cache/commit/5366c33fc222b6a8ab160eee4781c8d64721232a)).

## [v1.4.0](https://github.com/georstat/react-native-image-cache/compare/v1.3.0...v1.4.0) - 2022-03-12

#### Features

- feat: add onLoad and and onLoadEnd props ([85885d8](https://github.com/georstat/react-native-image-cache/commit/85885d87685f79ad2e369d67f152c630b3fe645f)).

#### Improvements

- chore: updated example to react-native 0.66.3 ([c32f5e7](https://github.com/georstat/react-native-image-cache/commit/c32f5e7c591fda52e2526b8ed2f6eb09a2543b66)).
- chore: align project with eslint 8.x.x requirements ([5bb5b2f](https://github.com/georstat/react-native-image-cache/commit/5bb5b2f0c25350e6d656081a741d0b0aa66a855d)).
- chore: updated dev packages ([c2e64d0](https://github.com/georstat/react-native-image-cache/commit/c2e64d01ca316b9c002cf3d8a15a9d6eabf1f6da)).
- chore: removed test from example, fixed some typings ([783fada](https://github.com/georstat/react-native-image-cache/commit/783fadab0e6868d53ebabd96314d8aac4ec9c278)).
- chore: rename uri to image ([0b5efe8](https://github.com/georstat/react-native-image-cache/commit/0b5efe81fa3519bf49cf0ba3cc2025bf91dfd799)).

#### Documentations

- docs: added checkboxes on Todo ([eda10bd](https://github.com/georstat/react-native-image-cache/commit/eda10bd68eca18d082e1fc8b24f089836a1ce99a)).
- docs: add onLoad and onLoadEnd props ([2885ab9](https://github.com/georstat/react-native-image-cache/commit/2885ab90b9f35c301f49260723a29c32de22d1ec)).
- docs: added missing @ on image-library link ([7b9b252](https://github.com/georstat/react-native-image-cache/commit/7b9b2525daa03ff5d3879c3b30486f62d1565e37)).

## [v1.3.0](https://github.com/georstat/react-native-image-cache/compare/v1.2.8...v1.3.0) - 2021-10-31

#### Features

- feat: Add method to check if image is cached or not ([84e1464](https://github.com/georstat/react-native-image-cache/commit/84e146460d1509e714a7940534c27bcbcd06883c)).
- feat: Add method to check if image is cached or not ([6072a23](https://github.com/georstat/react-native-image-cache/commit/6072a2374cbc9023e0387aa7fb85032b4b6ece6f)).

#### Improvements

- chore: rename method to check if image is cached ([d767aae](https://github.com/georstat/react-native-image-cache/commit/d767aae38dcd25110d5acfcb4e1e7f3bed045b5d)).
- chore: change file to image on error message ([dcc8928](https://github.com/georstat/react-native-image-cache/commit/dcc892896945103d6c892a4e475238ece0756682)).

#### Fixes

- fix: Better error message while checking if file exists ([ca6840d](https://github.com/georstat/react-native-image-cache/commit/ca6840d54bbd4a689d6644516426c92d19bfc9e9)).

#### Documentations

- docs: add react-native file access version for rn 0.65 ([e38bf3b](https://github.com/georstat/react-native-image-cache/commit/e38bf3bdb253b5cc84d383873c18377b235c4363)).
- docs: add new method to check if image is cached ([3070564](https://github.com/georstat/react-native-image-cache/commit/30705642189177ba525dbc0d4ce8f65eee177338)).
- docs: typo in docs ([197fa77](https://github.com/georstat/react-native-image-cache/commit/197fa77835f7abcaaa2ffaef77a948358fd91626)).
- docs: typo in note for rn 0.65 ([833ed36](https://github.com/georstat/react-native-image-cache/commit/833ed367de32b9beb5b9c49eef1b6111d3e7ac22)).

## [v1.2.8](https://github.com/georstat/react-native-image-cache/compare/v1.2.7...v1.2.8) - 2021-08-27

#### Improvements

- chore: updated packages ([5e18298](https://github.com/georstat/react-native-image-cache/commit/5e182980b098daf710e13a0da9d513273603dfd0)).
- chore: updated example packages ([88b190a](https://github.com/georstat/react-native-image-cache/commit/88b190ad84f592a9aeb6630d91eb60211bddb890)).

#### Fixes

- fix: thumbnail image should now show up, was missing `style` ([8358a6d](https://github.com/georstat/react-native-image-cache/commit/8358a6d7419d85abba3fe450726ece5b4d53daf4)).

## [v1.2.7](https://github.com/georstat/react-native-image-cache/compare/v1.2.6...v1.2.7) - 2021-07-16

#### Documentations

- docs: added accessibility props ([b3ef531](https://github.com/georstat/react-native-image-cache/commit/b3ef531c216ac4a755cda44e823a0177a24e61f0)).
- docs: made `remote` bold ([0527a47](https://github.com/georstat/react-native-image-cache/commit/0527a47dc709d404930d6e5e3304fa5a6811e6f1)).

## [v1.2.6](https://github.com/georstat/react-native-image-cache/compare/v1.2.5...v1.2.6) - 2021-07-12

#### Improvements

- chore: added `useStateIfMounted` hook to prevent `Can't perform a React state update on an unmounted component.` warning ([833b331](https://github.com/georstat/react-native-image-cache/commit/833b331c2b7b85aab498daa33f81b05728504d85)).

## [v1.2.5](https://github.com/georstat/react-native-image-cache/compare/v1.2.4...v1.2.5) - 2021-07-11

#### Improvements

- chore: added example with `loadingImageComponent` ([5396857](https://github.com/georstat/react-native-image-cache/commit/53968577ab95fcf90c9bb6366e733af564c978fe)).
- chore: updated npm packages ([f63d354](https://github.com/georstat/react-native-image-cache/commit/f63d3547b307d3804624abd81e33aee9e434fca7)).
- chore: updated example npm packages
* prettier add bracket spacing ([9a7bb68](https://github.com/georstat/react-native-image-cache/commit/9a7bb680eccd0cb052221621855353818925dc42)).
- chore: added native modules linking instructions on README ([f20b3cc](https://github.com/georstat/react-native-image-cache/commit/f20b3cc2db134687894b5c53979bff6316126ede)).

#### Fixes

- fix: infinite callback
chore: improved loadingImageComponent behavior ([5fc9cbd](https://github.com/georstat/react-native-image-cache/commit/5fc9cbd57d8c05b8cdbe15cf2fd834e19d36e298)).
- fix: fix `blacklist` module not found error ([aff0b65](https://github.com/georstat/react-native-image-cache/commit/aff0b653231797797a02847dab42c3f86da1bd4a)).

## [v1.2.4](https://github.com/georstat/react-native-image-cache/compare/v1.2.3...v1.2.4) - 2021-07-06

#### Improvements

- chore: resolve conflicts ([3d254a0](https://github.com/georstat/react-native-image-cache/commit/3d254a0d043a5c4acbbf77e2df7075b7f30b0857)).
- chore: bump react-native-file-access ([e3d8165](https://github.com/georstat/react-native-image-cache/commit/e3d81651978d42567a583f0760744410a7d51129)).

#### Fixes

- fix: example on android ([1e50e8b](https://github.com/georstat/react-native-image-cache/commit/1e50e8b60df7546e8d7e299145d5caa4ff2014ca)).

## [v1.2.3](https://github.com/georstat/react-native-image-cache/compare/v1.2.2...v1.2.3) - 2021-06-05

## [v1.2.2](https://github.com/georstat/react-native-image-cache/compare/v1.2.1...v1.2.2) - 2021-06-05

#### Improvements

- chore: `react-native-file-access` now installs patch version instead of latest minor ([2d0c7a7](https://github.com/georstat/react-native-image-cache/commit/2d0c7a7f82bef79d462d55457ccafe33f912fe04)).

## [v1.2.1](https://github.com/georstat/react-native-image-cache/compare/v1.2.0...v1.2.1) - 2021-05-18

#### Improvements

- chore: added `blurRadius` as a prop BREAKING: please add `blurRadius` in `CacheManager` config
docs: improved docs badges and added `blurRadius` prop info
chore: sorted alphabetically some objects ([942a588](https://github.com/georstat/react-native-image-cache/commit/942a58884cfd77f66b56bb33f1c364e4c2dba42a)).

## [v1.2.0](https://github.com/georstat/react-native-image-cache/compare/v1.1.2...v1.2.0) - 2021-05-15

#### Features

- feat: remove single cache entry ([1796ec1](https://github.com/georstat/react-native-image-cache/commit/1796ec1352ad039df7a385240196e8960d389fa5)).

#### Improvements

- refactor: base dir in camel case ([38536ef](https://github.com/georstat/react-native-image-cache/commit/38536ef55a33bb9dab95457972fa426aa4bb8b71)).

#### Documentations

- docs: ipdate docs ([8c725d4](https://github.com/georstat/react-native-image-cache/commit/8c725d484f5c60b7bd5d4665c52b6302b84873a4)).

## [v1.1.2](https://github.com/georstat/react-native-image-cache/compare/v1.1.1...v1.1.2) - 2021-05-11

#### Improvements

- chore: removed some peerDependencies

chore: removed `@react-native-community/bob` and added `react-native-builder-bob`

fix: fixed `useEffect` props to only check for `props.source` instead of full props object, it was causing a loop if there was an error loading the image from cache ([d5f85c8](https://github.com/georstat/react-native-image-cache/commit/d5f85c89493919f49dfe632a367998df5f6ccc0a)).

## [v1.1.1](https://github.com/georstat/react-native-image-cache/compare/v1.1.0...v1.1.1) - 2021-05-11

#### Fixes

- fix: fixed a typo on `onImageLoad` animation prop
docs: added new TODO
docs: added `react-native-file-access` docs link about `Dirs` ([cce01dc](https://github.com/georstat/react-native-image-cache/commit/cce01dc97ccc0c636a174ed7d93138deef27241d)).

## [v1.1.0](https://github.com/georstat/react-native-image-cache/compare/v1.0.9...v1.1.0) - 2021-05-11

#### Features

- feat: BREAKING CHANGE: added Global Config
docs: updated README.md
chore: updated dependencies ([b7cb4be](https://github.com/georstat/react-native-image-cache/commit/b7cb4be3d0d1db23c76409720128897f0c06dd41)).

## [v1.0.9](https://github.com/georstat/react-native-image-cache/compare/v1.0.8...v1.0.9) - 2021-05-10

#### Fixes

- fix: finally fixed `defaultProps` typings
fix: fixed a typo on `thumbnailSource` url in example ([a87e8b7](https://github.com/georstat/react-native-image-cache/commit/a87e8b7cb3b1039c9585c4c9f289a529ec7cf276)).

## [v1.0.8](https://github.com/georstat/react-native-image-cache/compare/v1.0.7...v1.0.8) - 2021-05-10

#### Fixes

- fix: fixed `defaultProps` typings ([1cd94be](https://github.com/georstat/react-native-image-cache/commit/1cd94be7c070961f68106f965c88e1df628c3cb9)).

#### Documentations

- docs: docs typo ([15a0b0f](https://github.com/georstat/react-native-image-cache/commit/15a0b0f214717f89c5b73410d51b7160af94fda8)).
- docs: add default durations ([b2e2f86](https://github.com/georstat/react-native-image-cache/commit/b2e2f862435d24652731863700e0aab905c62f1f)).

## [v1.0.7](https://github.com/georstat/react-native-image-cache/compare/v1.0.6...v1.0.7) - 2021-05-08

#### Improvements

- refactor: delete console logs and unused files ([5180849](https://github.com/georstat/react-native-image-cache/commit/5180849afce1474e2851801de96254488c020c69)).
- refactor: refactor code ([d6b5405](https://github.com/georstat/react-native-image-cache/commit/d6b54050c6430d872fa7eccb51b1d5b0fe41dfbe)).

#### Fixes

- fix: rewrite cached image as hook ([9dc89fa](https://github.com/georstat/react-native-image-cache/commit/9dc89fa350fdaa6d49d74fbd0dc0bd4b12cfe017)).
- fix: import only iniqueId from lodash ([0feb013](https://github.com/georstat/react-native-image-cache/commit/0feb013bcbae917b1560b6a703009d7ed2c854bb)).

#### Documentations

- docs: hooks todo and options prop correction ([5d9b983](https://github.com/georstat/react-native-image-cache/commit/5d9b983ec1624be3ed51502ea233e2ebc8f05d1f)).
- docs: fixed preview os headers ([7e762f9](https://github.com/georstat/react-native-image-cache/commit/7e762f9973829df13397b433abf4112275fb433e)).
- docs: finally fixed Android demo gif ([f070a2a](https://github.com/georstat/react-native-image-cache/commit/f070a2afd55520ec1940531771497b0bde016576)).

## [v1.0.6](https://github.com/georstat/react-native-image-cache/compare/v1.0.5...v1.0.6) - 2021-05-07

#### Documentations

- docs: fix Android demo gif ([68a212f](https://github.com/georstat/react-native-image-cache/commit/68a212fcba89218800ac496b5bed1f3d5d63e212)).

## [v1.0.5](https://github.com/georstat/react-native-image-cache/compare/v1.0.4...v1.0.5) - 2021-05-07

#### Improvements

- refactor: alphanum sorted some objects and props
docs: sorted props on props table
refactor: removed unused code
refactor: BREAKING CHANGE: renamed `imageAnimationDuration` to `sourceAnimationDuration` prop for convention
docs: removed iOS video demo and added GIF
docs: added Android demo ([e36e5b2](https://github.com/georstat/react-native-image-cache/commit/e36e5b23c224d9afc0e46efc5d253546657c8d6a)).

## [v1.0.4](https://github.com/georstat/react-native-image-cache/compare/v1.0.3...v1.0.4) - 2021-05-07

#### Fixes

- fix: Remove cache key from props ([b9e9dc1](https://github.com/georstat/react-native-image-cache/commit/b9e9dc1077d6081223aa36bfa142efdacb6cb5bf)).

#### Documentations

- docs: Update props, Add cache manager methods ([6743975](https://github.com/georstat/react-native-image-cache/commit/67439752f96bad16c303f6063abe24c7194135a6)).

## [v1.0.3](https://github.com/georstat/react-native-image-cache/compare/v1.0.2...v1.0.3) - 2021-05-07

#### Improvements

- chore: added LICENSE ([12e667f](https://github.com/georstat/react-native-image-cache/commit/12e667ffb41b8bce2af2dbb072346fb7ad76ea66)).
- refactor: source is now a string instead of object for convenience
refactor: removed useNativeDriver prop, now it's always `true`
refactor: types cleanup ([149426f](https://github.com/georstat/react-native-image-cache/commit/149426fb922efcaec76c66c12d0471d86c4a5912)).
- chore: version bump ([bfcface](https://github.com/georstat/react-native-image-cache/commit/bfcfaced5e52270b863aa0ad0decd514068f81c0)).

## v1.0.2 - 2021-05-07

#### Documentations

- docs: README fixes ([53d272e](https://github.com/georstat/react-native-image-cache/commit/53d272e3b9d22e4caf0e6ff5227435dfa3d05e93)).
