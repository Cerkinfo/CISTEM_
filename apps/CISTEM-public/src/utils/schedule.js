import React from "react";
import moment from 'moment';
import Papa from 'papaparse';

function mergeConsecutiveSlots(perms) {
    Object.keys(perms).forEach(benevole => {
        Object.keys(perms[benevole]).forEach(day => {
            if (Array.isArray(perms[benevole][day])) {
                const mergedSlots = [];
                let currentSlot = null;
                perms[benevole][day].forEach(slot => {
                    const key = Object.keys(slot)[0];
                    const [start, end] = slot[key];
                    if (currentSlot && Object.keys(currentSlot)[0] === key) {
                        currentSlot[key][1] = end;
                    } else {
                        if (currentSlot) {
                            mergedSlots.push(currentSlot);
                        }
                        currentSlot = { [key]: [start, end] };
                    }
                });
                if (currentSlot) {
                    mergedSlots.push(currentSlot);
                }
                perms[benevole][day] = mergedSlots;
            }
        });
    });
    return perms;
}

export function csvToDict(csvData, dates) {
    const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true
    });

    const dict = {};
    parsedData.data.forEach(row => {
        const name = row.NAME;
        delete row.NAME;
        dict[name] = {};
        let day = null;

        Object.keys(row).forEach(key => {
            if (key === 'VENDREDI' || key === 'LUNDI') {
                if (row[key] === 'TRUE') {
                    const date = moment(dates[key]);
                    dict[name][date] = [];
                    key === 'VENDREDI' ? (
                        dict[name][date].push({['Montage']: [
                            moment(dates[key]).set({ hour: 8, minute: 0 }),
                            moment(dates[key]).set({ hour: 20, minute: 0 })
                        ]})
                    ) : (
                        dict[name][date].push({['Démontage']: [
                            moment(dates[key]).set({ hour: 9, minute: 0 }),
                            moment(dates[key]).set({ hour: 13, minute: 0 })
                        ]})
                    )
                } else {
                    dict[name][moment(dates[key])] = [];
                }
            } else if ((key === 'SAMEDI' || key === 'DIMANCHE') && row[key] === 'FALSE') {
                    dict[name][moment(dates[key])] = [];
            } else {
                if (key === 'SAMEDI' || key === 'DIMANCHE') { 
                    day = key;
                    const date = moment(dates[key]);
                    dict[name][date] = [];
                }
                else if (key.includes(' - ')) {
                    const [startTime, endTime] = key.split(' - ');
                    const location = row[key];
                    if (location) {
                        dict[name][moment(dates[day])].push({
                            [location]: [
                                moment(dates[day]).set({ hour: parseInt(startTime.split(':')[0]), minute: parseInt(startTime.split(':')[1]) }),
                                moment(dates[day]).set({ hour: parseInt(endTime.split(':')[0]), minute: parseInt(endTime.split(':')[1]) })
                            ]
                        });
                    }
                }
            }
        });
    });
    return mergeConsecutiveSlots(dict);
}

export function format_list_schedules(perms, benevoles) {
    const groups = benevoles.sort((a, b) => a.localeCompare(b))
        .map((benevole, index) => ({
        id: (index + 1).toString(),
        user: benevole,
        schedule: []
    }));
    let itemId = benevoles.length + 1;

    groups.forEach((benevole) => {
        const schedule = perms[benevole['user']];
        if (schedule) {
            Object.keys(schedule).forEach(day => {
                benevole['schedule'].push({
                    day: day,
                    perms: []
                });
                schedule[day].forEach(location => {
                    const perms = benevole['schedule'][benevole['schedule'].length - 1]['perms'];
                    Object.keys(location).forEach(slot => {
                        const [start, end] = location[slot];
                        perms.push({
                            id: (itemId++).toString(),
                            title: slot,
                            start: moment(start),
                            end: moment(end),
                        });
                    });
                });
            });
        }
    });
    return groups;
}

export function format_personal_schedule(perms) {
    const schedule = [];
    Object.keys(perms).forEach(day => {
        schedule.push({
            day: day,
            perms: []
        });
        perms[day].forEach(location => {
            const perms = schedule[schedule.length - 1]['perms'];
            Object.keys(location).forEach(slot => {
                const [start, end] = location[slot];
                perms.push({
                    title: slot,
                    start: moment(start),
                    end: moment(end),
                });
            });
        });
    });
    return schedule;
}

export function format_bars_schedule(bar, perms) {
    const schedule = [];

    Object.keys(perms).sort((a, b) => a.localeCompare(b)).forEach(person => {
        const personSchedule = {
            name: person,
            perms: {}
        };
        Object.keys(perms[person]).forEach(day => {
            const dayPerms = perms[person][day];
            dayPerms.forEach(location => {
                if (location[bar]) {
                    if (!personSchedule.perms[day]) {
                        personSchedule.perms[day] = [];
                    }
                    const [start, end] = location[bar];
                    personSchedule.perms[day].push({
                        start: moment(start),
                        end: moment(end)
                    });
                }
            });
        });
        if (Object.keys(personSchedule.perms).length > 0) {
            schedule.push(personSchedule);
        }
    });

    return schedule;
}