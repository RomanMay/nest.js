import apiKey from "../../constants.js"
import axios from "axios"
export class ApiService {
    apiKey: string

    constructor() {
        this.apiKey = 'dde0d3a0b613331e5cde136b980e3616'
    }

    async getDataFromApi(ip: string){
        
        return await axios.get(`http://api.ipapi.com/37.57.0.213?access_key=${this.apiKey}`)
                 .then(res => {
                    return res.data.city

        })
    }

}



