import platinumDesktopMenuStyles from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopMenu.module.scss";
import platinumDesktopMenuWidgetTimeStyles
    from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopMenuWidgetTime.module.scss"
import platinumMenuStyles from "@/app/SystemFolder/SystemResources/Menu/PlatinumMenu.module.scss";
import classNames from "classnames";
import React from 'react';

type PlatinumDesktopMenuWidgetTimeProps = {
    hide?: boolean;
    militaryTime?: boolean;
    displaySeconds?: boolean;
    displayPeriod?: boolean;
    displayDay?: boolean;
    displayLongDay?: boolean;
    flashSeparators?: boolean;
}

const PlatinumDesktopMenuWidgetTime: React.FC<PlatinumDesktopMenuWidgetTimeProps> = (
    {
        hide = false,
        militaryTime = false,
        displaySeconds = false,
        displayPeriod = true,
        displayDay = true,
        displayLongDay = false,
        flashSeparators = true
    }
) => {
    const [time, setTime] = React.useState({
        day: new Date().getDay(),
        minutes: new Date().getMinutes(),
        hours: new Date().getHours(),
        seconds: new Date().getSeconds(),
        period: new Date().getHours() >= 12 ? ' PM' : ' AM'
    })

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            const date = new Date();
            setTime({
                day: date.getDay(),
                minutes: date.getMinutes(),
                hours: date.getHours(),
                seconds: date.getSeconds(),
                period: date.getHours() >= 12 ? ' PM' : ' AM'
            })
        }, 1000)

        return () => clearInterval(intervalId);
    }, [])

    const convertToTwoDigit = (number) => {
        return number.toLocaleString('en-US', {
            minimumIntegerDigits: 2
        })
    }

    const convertTo12HourPeriod = (number) => {
        if (number > 12) {
            return number - 12;
        }
        return number;
    }

    const toBlink = () => {
        if (flashSeparators) {
            return platinumDesktopMenuWidgetTimeStyles.textBlinker;
        }

        return;
    }

    return (
        <>
            {!hide &&
                <li className={
                    classNames(
                        platinumMenuStyles.platinumMenuItem,
                        platinumMenuStyles.platinumMenuItemNoImage,
                        platinumDesktopMenuStyles.platinumDesktopMenuTime
                    )
                }>
                    {displayDay &&
                        <span>{displayLongDay ? daysOfWeek[time.day] : daysOfWeek[time.day].slice(0, 3)}&nbsp;</span>
                    }
                    <span> {militaryTime ? convertToTwoDigit(time.hours) : convertTo12HourPeriod(time.hours)}
                    </span>
                    <span><span
                        className={displaySeconds ? "" : toBlink()}>:</span>{convertToTwoDigit(time.minutes)}</span>
                    {displaySeconds &&
                        <span><span
                            className={toBlink()}>:</span>{convertToTwoDigit(time.seconds)}</span>
                    }
                    {!militaryTime && displayPeriod &&
                        <span>&nbsp;{time.hours >= 12 ? 'PM' : 'AM'}</span>
                    }
                </li>
            }
        </>
    );
};

export default PlatinumDesktopMenuWidgetTime;
