import { AxiosResponse } from "axios";
import http from "../utils/http";

const XsrfService = {
    getToken: async (url: string) => {
        try {
            const response: AxiosResponse = await http.get(url);
            if (response) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default XsrfService;