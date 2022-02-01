import axios from 'axios';
import { IFormValues } from '../interfaces/ITest';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export const postData = (data:IFormValues) => {
    axios.post('http://127.0.0.1:8000/store', data)
}
