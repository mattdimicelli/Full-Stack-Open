import axios from 'axios';
const URL = 'http://localhost:3001/persons';

const getAllEntries = () => {
    return axios.get(URL).then(res=> res.data);
};

const newEntry = (entry) => {
    return axios.post(URL, entry).then(res => res.data);
}

export default { getAllEntries, newEntry };