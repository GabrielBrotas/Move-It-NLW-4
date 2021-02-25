import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
    const { 
        minutes,
        seconds,
        hasFinished,
        isActive,
        resetCountdown,
        startCountdown,
    } = useContext(CountdownContext);

    // split = '25' = ['2' '5']
    // padStart = '5', como 5 não tem duas posições ele vai acrescentar do inicio um '0' para manter as duas = '0' '5';
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { isActive ? (
                <button
                    type="button"
                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                    onClick={resetCountdown}
                >
                    Abandonar ciclo
                </button>
            ) : (
                <>
                 {  hasFinished ? (
                    <button
                        disabled
                        className={styles.countdownButton}
                    >
                        Ciclo encerrado
                    </button>
                 ) : (
                    <button
                        type="button"
                        className={`${styles.countdownButton} ${styles.countdownButtonDisabled}`}
                        onClick={startCountdown}
                    >
                        Iniciar ciclo
                    </button>
                )}
                </>
            )}
            
        </div>
    )
}