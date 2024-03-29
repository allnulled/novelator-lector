window.addEventListener("load", async function() {
    try {
        const jFondo = jQuery("#novelator_fondo");
        const jAccion = jQuery("#novelator_accion");
        const jActor = jQuery("#novelator_actor");
        const jEscena = jQuery("#novelator_escena");
        const jCapitulo = jQuery("#novelator_capitulo");
        const jDialogo = jQuery("#novelator_dialogo");
        const api = {};
        api.intervencion_actual = -1;
        api.fondo = jFondo;
        api.accion = jAccion;
        api.actor = jActor;
        api.dialogo = jDialogo;
        api.capitulo = jCapitulo;
        api.escena = jEscena;
        api.cambiar_fondo = function(imagen) {
            api.fondo.html("");
            api.fondo.append(jQuery("<img>").attr("src", imagen));
            api.actor.text("");
            api.dialogo.text("");
        };
        api.cambiar_escena = function(escena) {
            api.escena.text(escena);
            api.actor.text("");
            api.dialogo.text("");
        };
        api.cambiar_capitulo = function(capitulo) {
            api.capitulo.text(capitulo);
            api.actor.text("");
            api.dialogo.text("");
        };
        api.cambiar_texto_de_dialogo = function(actores, dialogo) {
            api.actor.text(`${actores} ${actores.length === 1 ? 'dice:' : 'dicen:'}`);
            api.dialogo.text(`"${dialogo}"`);
        };
        api.cambiar_texto_de_accion = function(actores, accion) {
            api.actor.text(actores);
            api.dialogo.text(accion);
        };
        api.actualizar_intervencion = function() {
            const intervencion = api.todas_las_intervenciones[api.intervencion_actual];
            switch(intervencion.tipo) {
                case "sentencia de cambio de escena":
                    api.cambiar_escena(intervencion.escena);
                    break;
                case "sentencia de cambio de fondo":
                    api.cambiar_fondo(intervencion.fondo);
                    break;
                case "sentencia de cambio de capítulo":
                    api.cambiar_capitulo(intervencion.capitulo);
                    break;
                case "sentencia de diálogo":
                    api.cambiar_texto_de_dialogo(intervencion.personajes, intervencion.dicen);
                    break;
                case "sentencia de acción":
                    api.cambiar_texto_de_accion(intervencion.personajes, intervencion.hacen);
                    break;
            }
            console.log(intervencion);
            api.guardar_pagina();
        };
        api.ir_a_intervencion_posterior = function() {
            if(api.intervencion_actual === api.todas_las_intervenciones.length-1) {
                return;
            }
            api.intervencion_actual++;
            api.actualizar_intervencion();
        };
        api.ir_a_intervencion_anterior = function () {
            if (api.intervencion_actual === 0) {
                return;
            }
            api.intervencion_actual--;
            api.actualizar_intervencion();
        };
        api.oir_en_voz = function() {
            const msg = new SpeechSynthesisUtterance();
            const voices = speechSynthesis.getVoices().filter(voice => voice.name === "Spanish (Spain)")[0];
            msg.voice = voices[0];
            msg.volume = 1; // From 0 to 1
            msg.rate = 1; // From 0.1 to 10
            msg.pitch = 2; // From 0 to 2
            msg.text = api.accion.text();
            msg.lang = "es";
            speechSynthesis.speak(msg);
        };
        api.guardar_pagina = function() {
            const titulo_de_novela = jQuery("#novelator_titulo_de_novela").text();
            const almacen = {
                fondo: api.fondo.html(),
                escena: api.escena.html(),
                capitulo: api.capitulo.html(),
                actor: api.actor.html(),
                dialogo: api.dialogo.html(),
                pagina_actual: api.intervencion_actual,
            };
            const almacen_json = JSON.stringify(almacen);
            localStorage.setItem("NOVELATOR_" + titulo_de_novela, almacen_json);
        };
        api.cargar_pagina = function() {
            try {
                const titulo_de_novela = jQuery("#novelator_titulo_de_novela").text();
                const almacen_json = localStorage.getItem("NOVELATOR_" + titulo_de_novela);
                const almacen = JSON.parse(almacen_json);
                if(!almacen) throw new Error("Almacen no iniciado");
                if(!("pagina_actual" in almacen)) throw new Error("Pagina no determinada");
                const pagina_actual = almacen.pagina_actual;
                api.intervencion_actual = pagina_actual;
                api.fondo.html(almacen.fondo);
                api.escena.html(almacen.escena);
                api.capitulo.html(almacen.capitulo);
                api.actor.html(almacen.actor);
                api.dialogo.html(almacen.dialogo);
            } catch(error) {
                console.log(error);
            }
        };
        api.todas_las_intervenciones = await jQuery.ajax("/source/novela.json");
        window.Novelator_lector = api;
        api.cargar_pagina();
    } catch (error) {

    }
});