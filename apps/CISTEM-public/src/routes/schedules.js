import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { csvToDict, format_bars_schedule, format_list_schedules, format_personal_schedule } from "../utils/schedule";
import { BarTimetable, GlobalTimetable, PersonalTimetable } from "../components/timetable";
import { LocalUser } from "../components/user";
import { Helmet } from "react-helmet";

export const benevoles = require('../assets/data/volunteers.json')['volunteers'];
export const config = require('../assets/data/config.json');
export const bars = config.bars;
export const dates = config.dates;

export default () => {
    const { type, param } = useParams();
    const [schedule, setSchedule] = useState({});

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/static/schedule/perms.csv`)
            .then(response => response.text())
            .then(csvData => {
                const schedule = csvToDict(csvData, dates);
                setSchedule(schedule);
            });
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [type, param]);

    const name = type === 'personal' ? decodeURIComponent(param) : null;
    const bar = type === 'bar' ? decodeURIComponent(param) : null;

    return (
        <>
        <Helmet><title>CISTEM - {type==='global' ? 'Global' : type==='personal'? name:bar}</title></Helmet>
        {type === 'global' && (
            <GlobalTimetable data={format_list_schedules(schedule, benevoles)} dates={dates} entities={bars} left_title={<LocalUser name="FOSDEM2025" img={`${process.env.PUBLIC_URL}/static/fosdem_ci_purple.png`} />} />
        )}
        {type === 'personal' && (
            <PersonalTimetable data={format_personal_schedule({...schedule[name]})} dates={dates} entities={bars} left_title={<LocalUser name={name} />} />
        )}
        {type === 'bar' && (
            <BarTimetable data={format_bars_schedule(bar, {...schedule})} dates={dates} entities={bars} left_title={<LocalUser name={bar} img={`${process.env.PUBLIC_URL}/static/fosdem_ci_purple.png`} />} />
        )}
        </>
    );
};