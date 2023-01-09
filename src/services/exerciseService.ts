import {axiosInstance} from "./axios.service";
import {ExerciseType} from "../types/ExerciseType";

const url = "/exercises/";
const getExercises = () => {
    return axiosInstance.get(url);
}

const createExercise = (exercise : ExerciseType) => {
    return axiosInstance.post(url, exercise);
}

const addMusclegroupToExercise = (exerciseId : number, musclegroupId : number) => {
    return axiosInstance.post(url + exerciseId + "/musclegroups/" + musclegroupId);
}

export default{
    getExercises,
    createExercise,
    addMusclegroupToExercise
}