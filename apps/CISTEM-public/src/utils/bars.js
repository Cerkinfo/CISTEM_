import bars from '../assets/data/config.json';

const transformedBars = Object.keys(bars['bars']).map((bar, index) => ({
    label: bar,
    key: (index).toString()
}));

export default transformedBars;