import axios from 'axios';

export default{
    async login(loginUser){
        let data = axios.post("https://reqres.in/api/login", loginUser);
        return data;
    }
}