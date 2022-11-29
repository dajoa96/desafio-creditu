# Kraken Race

Interfaz gráfica (Front End) de la aplicación web [Kraken Race](https://krakentechstudios.com/kraken-race). Cualquier cambio al código principal debe realizarse en la rama `dev`.

Para agregar más caracteriticas al código, se debe crear una rama hija de la rama `dev`; una vez terminados los cambios y aprobados los mismos; hacer `merge` a la rama `dev` para realizar pruebas previas a la puesta producción. Hacer `merge` a la rama `master` una vez sea aprobada la puesta en marcha en producción del código.

Este proyecto fué generado con el [Angular CLI](https://github.com/angular/angular-cli), en su versión 13.0.1.

## Descargar el proyecto

Correr `git clone https://github.com/dajoa96/desafio-creditu.git` para clonar el código a un directorio.

## Instalar las dependencias necesarias para correr el proyecto

Correr `npm install` para instalar las dependencias del proyecto, las cuales son definidas en el package.json.

## Desplegar el servidor de pruebas

Correr `ng serve` para generar un server de pruebas. Ingrear a la URL `http://localhost:4200/` para visualizar la aplicación. Notese que al modificar alguno de los archivos del proyecto, la aplicación se re-compilará de manera automática.

## Scaffolding del código, generar componentes, directivas, pipes, servicios, clases, guards, interfaces enums y/o módulos

Correr `ng generate component nombre-del-component` para generar un componente, Adicionalmente, se pueden generar: `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Correr `ng build` para generar un build (o contruir) del proyecto. Los resultados de la compilación serán guardados en el directorio de `dist/`.

## Para Test Unitarios

Correr `npm run test` Para ejecutar los test unitarios via [Jest](https://jestjs.io/).
Correr `npm run test:watch` Para ejecutar los test unitarios y mantener escuchando por cambios de manera continua (Recomendado solo para desarrollo).
Correr `npm run test:coverage` Para ejecutar los test unitarios y generar un informe de coverage.
Correr `npm run test:watch-coverage` Para ejecutar los test unitarios, mantener escuchando por cambios de manera continua y generar un informe de coverage.

## Ayuda adicional

Para obtener ayuda adicional acerca del CLI de Angular correr `ng help` o leer la documentación (en inglés) de [Angular CLI Overview and Command Reference](https://angular.io/cli).
