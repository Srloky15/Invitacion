/*
=================================================================
 CONFIGURACIÃ“N: PLANTILLA "NEON PULSE" (FIESTA/ANTRO)
=================================================================
*/

const config = {
    
    // === 1. EL FESTEJADO(A) ===
    info: {
        nombre: "Acompáñanos a festejar",
        edad: "images/img.jpeg", 
        tituloEvento: "BIRTHDAY BASH", 
        frase: "La noche es joven. Prepárate para el descontrol."
    },

    // FECHA: Mes DÃ­a, AÃ±o Hora:Minutos:Segundos
    fechaDelEvento: "Apr 18, 2026 20:30:00", 

    // === 2. UBICACIÃ“N ===
    lugar: {
        nombre: "Salon Terraza Mirage",
        direccion: "Bosques de los Continentes 4, Bosques de Aragon, 57170 Cdad. Nezahualcóyotl, Méx.",
        linkMapa: "https://maps.app.goo.gl/n4k1PMXgMRahPJdVA"
    },

    // === 3. LINEUP (ITINERARIO) ===
    lineup: [
        { hora: "08:30 PM", actividad: "Puertas Abiertas", icono: "fa-door-open" },
        { hora: "09:30 PM", actividad: "Cena", icono: "fa-utensils" },
        { hora: "10:00 PM", actividad: "Brindis & Shots", icono: "fa-champagne-glasses" },
        { hora: "03:00 AM", actividad: "After Party", icono: "fa-fire-flame-curved" }
    ],
    // === 4. FOTOS (RUTA LOCAL 'images/') ===
    fotos: {
        // Tus fotos guardadas en la carpeta images
        portada: "images/portada.jpg", 
        lugar: "images/lugar.jpg",     
        regalo: "images/regalo.png",    
        dresscode: "images/dresscode.png",
        
        // NUEVA FOTO EXTRA (Para la secciÃ³n 'THE VIBE')
        fotoExtra: "images/extra.png" 
    },

    // === 5. CÃ“DIGO DE VESTIMENTA ===
    dresscode: {
        titulo: "Dresscode: NEON VIBES",
        texto: "Outfit negro o blanco para brillar con las luces UV. Â¡Nada aburrido!"
    },

    // === 6. REGALOS / COVER ===
    regalos: {
        titulo: "Regalos",
        texto: "Tu presencia es mi regalo",
        //tipo: "sobres", 
        //datos: {
          //  banco: "Banco Azteca",
           // cuenta: "9876 5432 1098",
           // titular: "Valentina M."
        //}
    },

    // === 7. TICKET VIP ===
    ticket: {
        activar: true,
        folio: "VIP-2026",
        nivel: "ACCESS ALL AREAS"
    },

    // === 8. MÃšSICA (RUTA LOCAL 'musica/') ===
    musica: {
        titulo: "Los Caligaris",
        artista: "Kilómetros",
        // Tu archivo guardado en la carpeta musica
        url: "musica/musica.mp3" 
    },

    // === 9. WHATSAPP ===
    whatsapp: {
        numero: "525584311521",
       mensajeConfirmacion: "Confirmo mi asistencia para celebrar a Sandra y César 🎂✨ Será una noche épica."
    }
};