import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

export const EditPage = ({ exercise }) => {
 
    const [name, setName] = useState(exercise.name);
    const [reps, setReps] = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);
    const [unit, setUnit] = useState(exercise.unit);
    const [date, setDate] = useState(exercise.date.toLocaleString('en-US').substring(0, 10));
    
    const history = useHistory();

    const editExercise = async () => {
        if (!name || reps <= 0 || weight <= 0 || !unit || !date) {
            let err = "Invalid edits";
            throw err;
        }
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                name: name, 
                reps: reps, 
                weight: weight,
                unit: unit,
                date: date
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert("Successfully edited exercise!");
        } else {
            const errMessage = await response.json();
            alert(`Failed to update exercise. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push("/");
    }

    return (
        <>
            <h2>Edit an Exercise</h2>
            <p>Update the details of the exercise below</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <table>
                    <thead>
                        <tr>
                            <th>Exercise name</th>
                            <th>Reps</th>
                            <th>Weight</th>
                            <th>Unit</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input required
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)} 
                                    id="name" />
                            </td>
                            <td>
                                <input required
                                    type="number"
                                    min={1}
                                    value={reps}
                                    onChange={e => setReps(e.target.value)} 
                                    id="reps" />
                            </td>
                            <td>
                                <input required
                                    type="number"
                                    min={1}
                                    value={weight}
                                    onChange={e => setWeight(e.target.value)} 
                                    id="weight" />
                            </td>
                            <td>
                                <select required value={unit} id="unit" onChange={e => setUnit(e.target.value)}>
                                    <option value="invalid" disabled>-- Please select --</option>
                                    <option value="lbs">lbs</option>
                                    <option value="kgs">kgs</option>
                                    <option value="miles">miles</option>
                                    <option value="km">km</option>
                                </select>
                            </td>
                            <td>
                                <input required
                                    type="date"
                                    value={date}
                                    onChange={e => setDate(e.target.value)} 
                                    id="date" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <label for="submit">
                    <button
                        onClick={editExercise}
                        id="submit"
                    >Save</button></label>
            </form>
        </>
    );
}
export default EditPage;