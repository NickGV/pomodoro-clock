import * as React from "react";

export const useClock = () => {
    const [breakLength, setBreakLength] = React.useState(5);
    const [sessionLength, setSessionLength] = React.useState(25);
    const [timeLeft, seTtimeLeft] = React.useState(1500);
    const [timingType, setTimingtype] = React.useState("SESSION");
    const [play, setPlay] = React.useState(false);

    const breakIncrease = () => {
        if (breakLength < 60) {
            setBreakLength(breakLength + 1);
        }
    };

    const breakDecrease = () => {
        if (breakLength > 1) {
            setBreakLength(breakLength - 1);
        }
    };

    const sessionIncrease = () => {
        if (sessionLength < 60) {
            setSessionLength(sessionLength + 1);
            seTtimeLeft(timeLeft + 60);
        }
    };

    const sessionDecrease = () => {
        if (sessionLength > 1) {
            setSessionLength(sessionLength - 1);
            seTtimeLeft(timeLeft - 60);
        }
    };
    const timeout = setTimeout(() => {
        if (timeLeft && play) {
            seTtimeLeft(timeLeft - 1);
        }
    }, 1000);

    const reset = () => {
        clearTimeout(timeout);
        setPlay(false);
        seTtimeLeft(1500);
        setBreakLength(5);
        setSessionLength(25);
        setTimingtype("SESSION");
        const audio = document.getElementById("beep");
        audio.pause();
        audio.currentTime = 0;
    };

    const handlePlay = () => {
        document.getElementById("start").classList.toggle("active");
        document.getElementById("stop").classList.toggle("active");
        clearTimeout(timeout);
        setPlay(!play);
    };

    const resetClock = () => {
        const audio = document.getElementById("beep");
        if (!timeLeft && timingType === "SESSION") {
            seTtimeLeft(breakLength * 60);
            setTimingtype("BREAK");
            audio.play();
        }
        if (!timeLeft && timingType === "BREAK") {
            seTtimeLeft(sessionLength * 60);
            setTimingtype("SESSION");
            audio.pause();
            audio.currentTime = 0;
        }
    };

    const clock = () => {
        if (play) {
            timeout;
            resetClock();
        } else {
            clearTimeout(timeout);
        }
    };

    React.useEffect(() => {
        clock();
    }, [play, timeLeft, timeout]);

    const timeFormatter = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft - minutes * 60;
        const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return {
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
    };
};
