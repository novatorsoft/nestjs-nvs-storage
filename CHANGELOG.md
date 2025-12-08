

## [2.6.3](https://github.com/ismetkizgin/nestjs-nvs-storage/compare/v2.6.2...v2.6.3) (2025-12-08)


### Bug Fixes

* make isGlobal property optional in StorageConfig class ([0ce102f](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/0ce102fab48fc5717d8a9ff112f33676660ef28d))

## [2.6.2](https://github.com/ismetkizgin/nestjs-nvs-storage/compare/v2.6.1...v2.6.2) (2025-12-08)

## [2.6.1](https://github.com/ismetkizgin/nestjs-nvs-storage/compare/v2.6.0...v2.6.1) (2025-12-08)

## [2.6.0](https://github.com/ismetkizgin/nestjs-nvs-storage/compare/v2.5.1...v2.6.0) (2025-12-08)


### Features

* update file type handling in storage services ([7d1a0bf](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/7d1a0bfe46966d85762578b979796ee7f23e55ce))

## [2.5.1](https://github.com/ismetkizgin/nestjs-nvs-storage/compare/v2.5.0...v2.5.1) (2025-12-08)


### Bug Fixes

* update StorageAsyncConfig to use Omit for provider and isGlobal properties ([4c7b3dc](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/4c7b3dc340f875b9867c7adc38b8863ec1ea0def))

## [2.5.0](https://github.com/ismetkizgin/nestjs-nvs-storage/compare/v2.4.0...v2.5.0) (2025-07-27)


### Features

* streamline base64 file handling in upload services and tests ([12d7cc3](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/12d7cc33276479ed0dc6a6311f41b3f554778734))

## [2.4.0](https://github.com/ismetkizgin/nestjs-nvs-storage/compare/v2.3.0...v2.4.0) (2025-07-26)


### Features

* enhance file upload validation with size and type checks ([cba1f4d](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/cba1f4d88ea8680b1c94cde0737978507ed8875f))

## [2.3.0](https://github.com/ismetkizgin/nestjs-nvs-storage/compare/v2.2.0...v2.3.0) (2025-04-29)


### Features

* add default mime in upload service ([d8fe361](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/d8fe361ba2bd6baa97391ceb88cc93b51575f691))

## [2.2.0](https://github.com/ismetkizgin/nestjs-nvs-storage/compare/v2.1.0...v2.2.0) (2025-04-29)


### Features

* add default mime type in upload args ([0ded8b3](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/0ded8b31f5061b1f5b4890c4670582f912ed307c))

## [2.1.0](https://github.com/ismetkizgin/nestjs-nvs-storage/compare/v2.0.1...v2.1.0) (2024-11-17)


### Features

* add content type for upload files ([1f4b57f](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/1f4b57f03b31e8d8b9d9acbbcdebf10000aa4c61))


### Bug Fixes

* fix for upload result dto ([47a7535](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/47a7535bd9e4e14adc857a504a77c5c6a1c159ec))

## [2.0.1](https://github.com/ismetkizgin/nestjs-nvs-storage/compare/v2.0.0...v2.0.1) (2024-11-17)


### Bug Fixes

* add region config in minio configs ([e34ed85](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/e34ed8516f0b1b40a9aef5dce4999713a15582c9))

## [2.0.0](https://github.com/ismetkizgin/nestjs-nvs-storage/compare/v1.1.1...v2.0.0) (2024-11-17)


### ⚠ BREAKING CHANGES

* removed forRoot methods and added global parameter to register methods

### Features

* add minio storage provider ([89dc1b7](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/89dc1b706e126c0b808a4f4f4774ddc1a924b215))
* add minio storage provider in storage service ([367d011](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/367d011c703a5516317a0767e8e0352d06ffc492))
* removed forRoot methods and added global parameter to register methods ([eaf5608](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/eaf56085370e079ca24d9acc74d919eada0e1753))

## [1.1.1](https://github.com/ismetkizgin/nestjs-nvs-storage/compare/v1.1.0...v1.1.1) (2024-10-07)


### Bug Fixes

* fix for upload result ([b99bd03](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/b99bd03c5871ac71b0c608f0df3ebc7799c03c86))

## [1.1.0](https://github.com/ismetkizgin/nestjs-nvs-storage/compare/v1.0.2...v1.1.0) (2024-10-07)


### Features

* create createShareLinkAsync method ([96ef3de](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/96ef3de8b9c1835898ed3542d86799cc0dac8b0b))
* create uploadWithUrl endpoint and mutation ([65a913c](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/65a913cf9893ee52aedea33fb4d6ea8ec863e91c))
* create uploadWithUrlAsync method ([c17e49f](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/c17e49fbdc7fbbf91f90dfba1e8165f8e7011acc))

## [1.0.2](https://github.com/ismetkizgin/nestjs-nvs-storage/compare/v1.0.1...v1.0.2) (2024-09-15)

## [1.0.1](https://github.com/ismetkizgin/nestjs-nvs-storage/compare/v1.0.0...v1.0.1) (2024-09-15)

## 1.0.0 (2024-09-15)


### Features

* create api key guard ([733d3c2](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/733d3c2458fda779dd57e8ef30ea56dc33d3f465))
* create s3 storage provider ([1c50d6a](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/1c50d6a2cafee3a8106376bbeafa39a828c9ac11))
* create upload module ([78d5adb](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/78d5adb1bbbc770734f2dcdd15834fea60f0f30d))
* setup owl storage module ([27d4b14](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/27d4b145c2f4292e872b05256b58f19510b74da0))
* setup project ([1ed7024](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/1ed7024fe777ba407a3b955e23fb293f9eefeb72))
* setup storage service ([e3ae22c](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/e3ae22c42693fec4f52a9106bf205385d7d7aaea))


### Bug Fixes

* fix for graphql api ([73c3746](https://github.com/ismetkizgin/nestjs-nvs-storage/commit/73c3746c9ddab4ee37ec9cb7470062e1eb40a81f))
