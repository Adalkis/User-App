import axios from 'axios';

export default{
 async  fetchUsers(){
 let data = await axios.get("https://reqres.in/api/unknown");
 return data;
 },

 async createUser(createUser){
 let data = await axios.post("https://reqres.in/api/users", createUser);
 return data;
 }
}