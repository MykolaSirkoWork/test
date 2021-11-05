import React, {useEffect, useState} from 'react'
import { Dropdown } from 'primereact/dropdown';

import styles from './styles.module.css'
import {Button} from "primereact/button";

export const StudentsList = () => {

    const [listNationality, setListNationality] = useState()
    const [choseNationakity, setChoseNationakity] = useState({studentsNationality: ''})
    const [nationalityGroup, setNationalityGroup] = useState()
    const [reversSort, setReversSort] = useState(false)
    const article =  [
        {
            id: 1,
            firstName: 'Josh',
            lastName: 'Doe',
            age: '24',
            nationality: 'English'
        },
        {
            id: 2,
            firstName: 'Jan',
            lastName: 'Dewaele',
            age: '27',
            nationality: 'Belgian'
        },
        {
            id: 3,
            firstName: 'Jonathan',
            lastName: 'Van Driessen',
            age: '33',
            nationality: 'Belgian'
        },
        {
            id: 4,
            firstName: 'Anthony',
            lastName: 'Lamot',
            age: '30',
            nationality: 'Belgian'
        },
        {
            id: 5,
            firstName: 'Tim',
            lastName: 'Ferris',
            age: '36',
            nationality: 'American'
        },
        {
            id: 6,
            firstName: 'Melinda',
            lastName: 'Gates',
            age: '63',
            nationality: 'American'
        },
        {
            id: 7,
            firstName: 'Jan',
            lastName: 'De Hollander',
            age: '13',
            nationality: 'Dutch'
        },
        {
            id: 8,
            firstName: 'Maarten',
            lastName: 'De Vriend',
            age: '47',
            nationality: 'Dutch'
        },
        {
            id: 9,
            firstName: 'Furkan',
            lastName: 'Kursun',
            age: '23',
            nationality: 'Turkish'
        },
] ;


    useEffect(()=>{
        fetch('/api/auth/init',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(article),}
        ).then(response => response.json())
            .then(data => {
                setListNationality(data.nationality)
                setChoseNationakity({studentsNationality: data.nationality[0]})

            }).catch((error) => {
            console.error('Error:', error);
        });
    },[])

    useEffect(()=> {
        fetch('/api/auth/nationality',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(choseNationakity),})
            .then(response => response.json())
            .then(data => {
                setNationalityGroup(data)

            }).catch((error) => {
            console.error('Error:', error);
        });
    }, [choseNationakity])



    const setCity = (e) =>{
        setChoseNationakity({studentsNationality: e})
        setReversSort(false)
    }

    const sortStudents = () => {
        setReversSort(!reversSort)
        let sortStudents
        if(reversSort){
            sortStudents =  nationalityGroup.reverse()
        }else {
            sortStudents =  nationalityGroup.sort((a,b) => a.localeCompare(b))
        }
        setNationalityGroup(sortStudents)
    }





    return(
        <div>
        <div className="grid">
            <div className={`${styles.dropdown} col-12 offset-2 grid align-items-center justify-content-center`}>
        <Dropdown value={choseNationakity.studentsNationality} options={listNationality} onChange={(e) => setCity(e.value)} placeholder="Select a City"/>
            </div>
            <div className={`${styles.studentNationality} col-2 offset-2    justify-content-center`} >
                 {nationalityGroup ? nationalityGroup.map(student =>
                    <div key={student} className={styles.student}>{student}</div>
                ): ''}
            </div>

        </div>
            <div className={styles.sortButton}>
            <Button  label="Sort" onClick={sortStudents}  />
            </div>
        </div>
    )
}

