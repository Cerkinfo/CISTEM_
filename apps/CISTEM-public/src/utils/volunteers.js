import volunteers from '../assets/data/volunteers.json';

const transformedVolunteers = volunteers['volunteers']
    .sort((a, b) => a.localeCompare(b))
    .map((volunteer, index) => ({
        label: volunteer,
        key: index.toString(),
    }));

export default transformedVolunteers;