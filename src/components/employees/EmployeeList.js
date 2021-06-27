import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { fetchIt } from "../../utils/fetchIt"
import "./Employees.css"

export const EmployeeList = () => {
    const [employees, changeEmployees] = useState([])
    const [specialties, setSpecial] = useState("")

    useEffect(
        () => {
            fetchIt("http://localhost:8000/employees")
                .then(changeEmployees)
                .catch(() => changeEmployees([]))
        },
        []
    )

    useEffect(() => {
        const justSpecialities = employees.map(emp => emp.specialty)
        setSpecial(justSpecialities.join(", "))
    }, [employees])


    return (
        <>
            <div className="specialities">
                <strong>Team Specialties</strong>: { specialties }
            </div>
            <h2>Employee Roster</h2>
            {
                employees.map(
                    (employee) => {
                        return <Link key={`employee--${employee.id}`} to={`employees/${employee.id}`}>
                            <p>{employee.full_name}</p>
                        </Link>
                    }
                )
            }
        </>
    )
}