import {axiosInstance} from "./axios.service";

const url = "/musclegroups/";
const getMusclegroups = () => {
    return axiosInstance.get(url);
}

export default{
    getMusclegroups
}