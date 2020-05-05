import React, {useState, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getGoals} from "../redux/selectors";
import {addGoal} from "../redux/actions/data_actions";

let counter = 0;

export const Reactathon = React.memo(({}) => {
    const goals = useSelector(getGoals);
    const dispatch = useDispatch();
    const [ inter, setInter ] = useState(null);

    useEffect(() => {
        console.log(`useEffect called with counter at ${counter}`);

        // if (!inter) {
        //     setInter(setInterval(() => {
        //         dispatch(addGoal(`This is goal number #${++counter}`))
        //     }, 5000));
        // }
    });

    return (
    <div>
        {goals.map( goal => <span key={goal}>{goal}</span>)}
    </div>
    );
});