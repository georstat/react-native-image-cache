# Changelog

## [v1.2.4](https://github.com/georstat/react-native-image-cache/compare/v1.2.3...v1.2.4)

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
