document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("message-banner"); // Banner globale

    let currentAudio = null; // Variabile globale per tracciare l'audio
    let isAudioPlaying = false; // Variabile per tracciare lo stato dell'audio

    // Funzione per gestire il suono e l'icona
    const toggleSound = (soundFilePath, soundButtonId) => {
        const soundButton = document.getElementById(soundButtonId);

        // Se c'è un audio in corso e l'utente clicca di nuovo sul bottone, fermiamo l'audio
        if (currentAudio && !currentAudio.paused) {
            currentAudio.pause(); // Mettiamo in pausa l'audio
            currentAudio.currentTime = 0; // Riavvolgiamo l'audio
            soundButton.innerHTML = '<i class="fas fa-volume-up"></i>'; // Torniamo all'icona volume attivo
            isAudioPlaying = false; // L'audio non è più in riproduzione
            return; // Esci dalla funzione
        }

        // Se l'audio non è mai stato creato o è stato fermato
        if (!currentAudio || currentAudio.paused) {
            currentAudio = new Audio(soundFilePath); // Creiamo una nuova istanza dell'audio
            currentAudio.play().catch((error) => {
                console.error("Errore durante la riproduzione del suono:", error);
            });

            // Cambia l'icona a stereo muto mentre l'audio è in riproduzione
            soundButton.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Icona muto
            isAudioPlaying = true; // L'audio è in riproduzione
        }

        // Eventi per il cambio di icona al termine della riproduzione
        currentAudio.addEventListener("ended", () => {
            soundButton.innerHTML = '<i class="fas fa-volume-up"></i>'; // Torna all'icona volume attivo
            isAudioPlaying = false; // Audio terminato
        });
    };

    // Funzione generica per la gestione del form
    const handleSubmit = async (event, endpoint, flagInputId, soundButtonId, soundFile) => {
        event.preventDefault(); // Preveniamo il submit del form

        const flagInput = document.getElementById(flagInputId);
        const flagValue = flagInput.value;

        // Invia la richiesta POST al server
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ flag: flagValue }),
        });

        try {
            const data = await response.json(); // Ottieni la risposta JSON

            // Resetta le classi del banner
            banner.classList.remove("success", "error");

            // Applica la nuova classe e mostra il messaggio
            if (data.success) {
                banner.classList.add("success");

                // Mostra il bottone del suono in caso di successo
                const soundButton = document.getElementById(soundButtonId);
                soundButton.style.display = "inline-block"; // Rendi visibile il bottone
                soundButton.innerHTML = '<i class="fas fa-volume-up"></i>'; // Icona volume attivo di default

                // Preveniamo che il click sul bottone dell'audio invii il form
                soundButton.addEventListener("click", (event) => {
                    event.preventDefault(); // Evitiamo che il bottone dell'audio invii il form
                    toggleSound(soundFile, soundButtonId); // Collega la funzione toggleSound
                });
            } else {
                banner.classList.add("error");
            }

            banner.textContent = data.message;

            // Mostra il banner per qualche secondo
            banner.classList.add("show"); // Mostra il banner

            setTimeout(() => {
                banner.classList.remove("show"); // Nascondi il banner
            }, 3000);
        } catch (error) {
            console.error("Errore nel parsing del JSON:", error);
        }
    };

    // Gestisci il form per la flag1
    const form1 = document.getElementById("flag1-form");
    if (form1) {
        form1.addEventListener("submit", (event) =>
            handleSubmit(
                event,
                "/submit_flag1",
                "flag1",
                "play-sound-button1",
                "../static/sounds/io-a-napoli-non-ci-sono-mai-stato.mp3"
            )
        );
    }

    // Gestisci il form per la flag2
    const form2 = document.getElementById("flag2-form");
    if (form2) {
        form2.addEventListener("submit", (event) =>
            handleSubmit(
                event,
                "/submit_flag2",
                "flag2",
                "play-sound-button2",
                "../static/sounds/pacciani.mp3"
            )
        );
    }
});



// Bottone per tornare in cima alla pagina
const scrollToTopBtn = document.getElementById('scroll-to-top-btn');

// Funzione per mostrare o nascondere il bottone quando si scorre
function toggleScrollToTopBtn() {
    console.log(window.scrollY); // Debug: Stampa la posizione dello scroll
    if (window.scrollY > 200) { // Se l'utente ha scrolled più di 200px dalla parte superiore
        scrollToTopBtn.classList.add('show'); // Mostra il bottone
    } else {
        scrollToTopBtn.classList.remove('show'); // Nascondi il bottone
    }
}

// Evento di scroll alla finestra
window.addEventListener('scroll', toggleScrollToTopBtn);

// Evento per far salire l'utente quando clicca sul bottone
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});



// Scrolling fluido per tutti i link con #
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Previene il salto immediato
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth', // Scroll fluido
                block: 'start'     // Posizionamento all'inizio della sezione
            });
        }
    });
});


//navbar visibile o meno per dispositivi mobile
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
    if (navbar.classList.contains('show')) {
        menuToggle.classList.add('open'); // Quando la navbar è aperta, ruota l'icona
        menuToggle.classList.remove('close'); // Rimuove la rotazione di chiusura
    } else {
        menuToggle.classList.add('close'); // Quando la navbar è chiusa, ruota l'icona di 0 gradi
        menuToggle.classList.remove('open'); // Rimuove la rotazione di apertura
    }
});

// Chiudi la navbar se si clicca altrove
document.addEventListener('click', function(event) {
    // Verifica se il clic non è stato fatto sul menu o sulla navbar
    if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
        nav.classList.remove('show');  // Chiude la navbar
        menuToggle.classList.remove('open'); // Riporta l'icona alla posizione originale
        menuToggle.classList.add('close'); // Ruota l'icona a sinistra
    }
});

// Chiudi la navbar quando l'utente scorre la pagina
window.addEventListener('scroll', function() {
    nav.classList.remove('show');  // Chiude la navbar
    menuToggle.classList.remove('open'); // Riporta l'icona alla posizione originale
    menuToggle.classList.add('close'); // Ruota l'icona a sinistra
});