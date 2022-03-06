import axios from "axios";
export default axios.create({
    baseURL:"http://192.168.10.16:8080",
    header:{
        "Content-type":"application/json"
    }
});