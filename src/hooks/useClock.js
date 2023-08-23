import * as React from "react";

export const useClock = () => {
    const [breakTime, setBreakTime] = React.useState(5);
    const [sessionTime, setSessionTime] = React.useState(25);
    const [timeLeft, seTtimeLeft] = React.useState(1500);
    const [timingType, setTimingtype] = React.useState("SESSION");
    const [play, setPlay] = React.useState(false);

    const changeTime = (type) => {
        if (type === "breakD") {
            if (breakTime > 1) {
                setBreakTime(breakTime - 1);
            }
        } else if (type === "breakI") {
            if (breakTime < 60) {
                setBreakTime(breakTime + 1);
            }
        } else if (type === "sessionD") {
            if (sessionTime > 1) {
                setSessionTime(sessionTime - 1);
                seTtimeLeft(timeLeft - 60);
            }
        } else if (type === "sessionI") {
            if (sessionTime < 60) {
                setSessionTime(sessionTime + 1);
                seTtimeLeft(timeLeft + 60);
            }
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
        setBreakTime(5);
        setSessionTime(25);
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
            seTtimeLeft(breakTime * 60);
            setTimingtype("BREAK");
            audio.play();
        }
        if (!timeLeft && timingType === "BREAK") {
            seTtimeLeft(sessionTime * 60);
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
        changeTime,
        breakTime,
        sessionTime,
        timingType,
        play,
        reset,
        handlePlay,
        timeFormatter,
    };
};
