import classNames from "classnames";
import {useEffect, useState} from 'react';
import platinumMenuStyles from "../PlatinumMenu.module.scss";
import platinumDesktopMenuStyles from "./PlatinumDesktopMenu.module.scss";

type PlatinumDesktopMenuWidgetTimeProps = {
    hide?: boolean;
    displaySeconds?: boolean;
    displayPeriod?: boolean;
    displayDay?: boolean;
    flashSeparators?: boolean;
}

function PlatinumDesktopMenuWidgetTime() {
    const [time, setTime] = useState({
        minutes: new Date().getMinutes(),
        hours: new Date().getHours(),
        seconds: new Date().getSeconds(),
        period: new Date().getHours() >= 12 ? ' PM' : ' AM'
    })

    useEffect(() => {
        const intervalId = setInterval(() => {
            const date = new Date();
            setTime({
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

    return (
        <li className={classNames(platinumMenuStyles.platinumMenuItem, platinumMenuStyles.platinumMenuItemNoImage, platinumDesktopMenuStyles.platinumDesktopMenuTime)}>
            <span>{convertToTwoDigit(time.hours)}:</span>
            <span>{convertToTwoDigit(time.minutes)}:</span>
            <span>{convertToTwoDigit(time.seconds)}</span>
            <span>&nbsp;{time.hours >= 12 ? 'PM' : 'AM'}</span>
        </li>
    );
}

export default PlatinumDesktopMenuWidgetTime;
