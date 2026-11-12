import { useEffect } from "react";

const EVENTOS = ["mousemove", "keydown", "click", "scroll"];

// Ejecuta alInactivar cuando pasa tiempo sin actividad , un caso caundo no hay movimiento del mouse(RF05)

export default function useIdleTimer(minutos, alInactivar) {
    useEffect(() => {
        let temporizador;
        const reiniciar = () => {
            clearTimeout(temporizador);
            temporizador = setTimeout(alInactivar, minutos * 60 * 1000);
        };
        EVENTOS.forEach((e) => window.addEventListener(e, reiniciar));
        reiniciar();
        return () => {
            clearTimeout(temporizador);
            EVENTOS.forEach((e) => window.removeEventListener(e, reiniciar));
        };
    }, [minutos, alInactivar]);
}

