<p align="center"><a href="https://novatorsoft.com" target="_blank"><img src="https://os.novatorsoft.com/novatorsoft/dark-logo.png" width="700" alt="Novatorsoft Logo"/></a></p>

<h1 align="center">NestJS Storage Module</h1>
<p align="center">A NestJS storage module that provides a provider-based abstraction for uploading, deleting, and sharing files across different storage backends (e.g. S3, MinIO).</p>

<p align="center">
     <a href="https://sonarcloud.io/summary/overall?id=nestjs-nvs-storage" target="_blank"><img src="https://sonarcloud.io/api/project_badges/measure?project=nestjs-nvs-storage&metric=alert_status"/></a>
     <a href="https://sonarcloud.io/summary/overall?id=nestjs-nvs-storage" target="_blank"><img src="https://sonarcloud.io/api/project_badges/measure?project=nestjs-nvs-storage&metric=coverage"/></a>
     <a href="https://www.npmjs.com/package/nestjs-nvs-storage" target="_blank"><img src="https://img.shields.io/npm/v/nestjs-nvs-storage.svg" alt="NPM Version" /></a>
     <a href="https://www.npmjs.com/package/nestjs-nvs-storage" target="_blank"><img src="https://img.shields.io/npm/l/nestjs-nvs-storage.svg" alt="Package License" /></a>
     <a href="https://www.npmjs.com/package/nestjs-nvs-storage" target="_blank"><img src="https://img.shields.io/npm/dm/nestjs-nvs-storage.svg" alt="NPM Downloads" /></a>
</p>
<p align="center">
     <a href="https://www.instagram.com/novatorsoft/" target="_blank"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>
     <a href="https://www.linkedin.com/company/novatorsoft/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
</p>

## About

`nestjs-nvs-storage` helps you standardize file handling in NestJS by exposing a single storage service API while keeping provider-specific details (credentials, endpoints, and backend behavior) encapsulated behind pluggable implementations. It supports common upload flows (raw buffer, base64, URL-to-buffer), performs basic file type/size validation, and lets you switch storage providers via module configuration without rewriting business logic.

## Documentation

For installation, usage, configuration, and examples, see the documentation:
- [Documentation](https://opensource.novatorsoft.com/docs/nestjs-nvs-storage/intro)

## License
MIT — see [LICENSE](./LICENSE).
