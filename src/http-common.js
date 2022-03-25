import axios from "axios";
export default axios.create({
    baseURL:"https://time-table-server.herokuapp.com",
    header:{
        "Content-type":"application/json"
    }
});