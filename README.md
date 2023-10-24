# novelator-lector

Lector de novelas para novelator.

## Instalación

Para instalar el lector de novelator, desde consola ejecutar:

```sh
git clone ${repo} .
npm install
```

## Desarrollo

El desarrollo tiene varios aspectos, que separaremos a continuación.

### Escribir la novela

La novela siempre se escribe en el mismo fichero:

 - [./novela/source/novela.nvl](./novela/source/novela.nvl)

Por lo cual, borra su contenido actual y edita tu propia novela en él, con cualquier editor de ficheros.

### Incluir imágenes

Para incluir imágenes en tu novela, debes colocar los ficheros *.jpg o *.png o cualquier otro formato de imagen soportado por HTML en la carpeta que sigue:

 - [./novela/assets](./novela/assets)

Las imágenes colocadas ahí podrás referenciarlas en la novela simplemente escribiendo `assets/{nombre del fichero}`.

Esto sirve igual para otros ficheros, como sonidos, vídeos, o documentos de apoyo.

Puedes crear carpetas para organizar los ficheros a tu antojo, simplemente recuerda de referenciarlos adecuadamente en tu novela.

### Compilar la novela

Cuando hayas terminado de escribir tu novela, puedes compilarla a JSON con el siguiente comando:

```sh
npm run build
```

Esto producirá el fichero JSON en:

 - [./novela/source/novela.json](./novela/source/novela.json)

Este fichero es el que usará la aplicación lectora.

## Uso

Para correr tu novela y ver cómo queda, desde consola ejecutar:

```sh
npm start
```

Esto encenderá un servidor HTTP que desplegará tu novela. Es entonces cuando puedes acceder a ella con tu navegador, yendo a la dirección URL que aparecerá en la consola, que típicamente y si no hay otra aplicación corriendo en el mismo puerto, será:

- [http://127.0.0.1:8080](http://127.0.0.1:8080)

Puedes, entonces, ver el resultado final de tu novela.

Para posteriores modificaciones, simplemente corre el comando para **compilar la novela** tantas veces necesites, así como modifica los ficheros que veas apropiado.

