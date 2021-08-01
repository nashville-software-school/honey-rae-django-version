import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"

export const EmployeeList = () => {
    const [employees, changeEmployee] = useState([])
    const [specialties, setSpecial] = useState("")
    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/employees")
                .then(res => res.json())
                .then((employeesFromAPI) => {
                    changeEmployee(employeesFromAPI)
                })
        },
        []
    )

    useEffect(() => {
        const justSpecialities = employees.map(emp => emp.specialty)
        setSpecial(justSpecialities.join(", "))
    }, [employees])


    return (
        <>
            <div>
                <button onClick={() => history.push("/employees/create")}>Hire Employee</button>
            </div>

            <div>
                Specialties: { specialties }
            </div>
            {
                employees.map(
                    (employee) => {
                        return <Link key={`employee--${employee.id}`} to={`employees/${employee.id}`}>
                            <p >{employee.name}</p>
                        </Link>
                    }
                )
            }
        </>
    )
}