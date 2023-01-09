import {useEffect, useState, MouseEvent, FormEvent} from "react";
import {MusclegroupType} from "../types/MusclegroupType";
import musclegroupService from "../services/musclegroupService";
import "../style/Card.css"
import "../style/Form.css"
import exerciseService from "../services/exerciseService";
import {ExerciseType} from "../types/ExerciseType";
import {redirect} from "react-router-dom";

const CreateExercise = () => {
    const [exerciseName, setExerciseName] = useState<string>("");
    const [details, setDetails] = useState<string>("");
    const [musclegroups, setMusclegroups] = useState<MusclegroupType[]>([]);
    const [selectedMusclegroups, setSelectedMusclegroups] = useState<MusclegroupType[]>([]);

    useEffect(() => {
        musclegroupService.getMusclegroups().then((res) => {
            // @ts-ignore
            setMusclegroups(res.data.sort((a?: MusclegroupType, b?: MusclegroupType) => b.id - a.id));
        });
    }, []);



    const renderMusclegroups = () => {
        function addSelectedMusclegroup(musclegroup: MusclegroupType) {
            if(selectedMusclegroups.includes(musclegroup)){
                setSelectedMusclegroups(selectedMusclegroups.filter((e) => e !== musclegroup));
                return;
            }
            setSelectedMusclegroups([...selectedMusclegroups, musclegroup]);
        }

        const determineSelected = (s: MusclegroupType) => {
            const isIncluded = selectedMusclegroups.includes(s);
            if(!isIncluded) return "cardClickable unselected";
            return "cardClickable selected";
        }

        return(
            musclegroups.map((musclegroup:MusclegroupType) => (
                <div key={musclegroup.id} onClick={() => addSelectedMusclegroup(musclegroup)}
                     className={determineSelected(musclegroup)}>
                    <label className="cardName">{musclegroup.name}</label>
                </div>
            )))
    }

    function saveExercise(e: FormEvent<HTMLFormElement>) {
        const newExercise : ExerciseType = {name: exerciseName, details: details};
        exerciseService.createExercise(newExercise).then((res) => {
            for(let i = 0; i < selectedMusclegroups.length; i++){
                exerciseService.addMusclegroupToExercise(res.data.id, Number(selectedMusclegroups[i].id));
            }
        });
        alert("Exercise created!");
        e.preventDefault();
        window.location.reload();
    }

    return (
        <div className="login-box">
            <h2>Add an Exercise</h2>
            <form onSubmit={saveExercise}>
                <div className="user-box">
                    <input required type="text" onChange={(e)=> setExerciseName(e.target.value)}></input>
                    <label>Exercise name</label>
                </div>
                <div className="user-box">
                    <input required type="text" onChange={(e)=> setDetails(e.target.value)}></input>
                    <label>Details</label>
                </div>
                <div className="cardContainer">
                    {renderMusclegroups()}
                </div>
                <a>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <button className="submitButton" disabled={selectedMusclegroups.length===0} >Add Exercise</button>
                </a>
            </form>
        </div>
    );
}

export default CreateExercise;