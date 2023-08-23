import "./Clockstyles.css";
import { useClock } from "../hooks/useClock";
export const ClockComponent = () => {
    const {
        breakIncrease,
        breakDecrease,
        sessionDecrease,
        sessionIncrease,
        breakLength,
        sessionLength,
        timingType,
        play,
        reset,
        handlePlay,
        timeFormatter,
    } = useClock();

    const title = timingType === "SESSION" ? "Session" : "Break";

    return (
        <>
            <div className="container">
                <h1 className="title">Pomodoro Clock</h1>
                <div className="length-control">
                    <div>
                        <h3 id="break-label">Break Length</h3>
                        <div>
                            <button
                                className="decrement"
                                disabled={play}
                                onClick={breakDecrease}
                                id="break-decrement"
                            >
                                <i className="fa-solid fa-minus"></i>
                            </button>
                            <strong className="length">{breakLength}</strong>
                            <button
                                className="increment"
                                disabled={play}
                                onClick={breakIncrease}
                                id="break-increment"
                            >
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div>
                        <h3 id="session-label">Session Length</h3>
                        <div>
                            <button
                                className="decrement"
                                disabled={play}
                                onClick={sessionDecrease}
                                id="session-decrement"
                            >
                                <i className="fa-solid fa-minus"></i>
                            </button>
                            <strong className="length">{sessionLength}</strong>
                            <button
                                className="increment"
                                disabled={play}
                                onClick={sessionIncrease}
                                id="session-increment"
                            >
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="clock">
                    <div className="timer">
                        <h2>{title}</h2>
                        <h2 id="time-left">{timeFormatter()}</h2>
                    </div>
                </div>
                <div className="control-buttons">
                    <button onClick={handlePlay} id="start_stop">
                        <i className="fa-solid fa-play" id="start"></i>
                        <i className="fa-solid fa-stop" id="stop"></i>
                    </button>
                    <button onClick={reset} className="reset">
                        <i className="fa-solid fa-arrows-rotate"></i>
                    </button>
                </div>
            </div>
            <audio
                id="beep"
                preload="auto"
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            />
        </>
    );
};
