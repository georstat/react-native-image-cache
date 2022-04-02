# Changelog

## [v1.6.0](https://github.com/georstat/react-native-image-cache/compare/v1.5.0...v1.6.0)

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
