import { useEffect, useState } from "react"

export const useCondensed = ({ limit, field }) => {
    const [original, setOriginal] = useState([])
    const [condensed, setCondensed] = useState([])

    useEffect(() => {
        const withEllipses = original.map(t => {
            const copy = structuredClone(t)

            copy.condensed = false
            copy.canCondense = false
            copy.originalValue = copy[field]
            copy.condensedValue = `${copy[field].slice(0, limit)}`

            if (t[field].length > limit) {
                copy[field] = `${t[field].slice(0, limit)}`
                copy.canCondense = true
                copy.condensed = true
            }
            return copy
        })
        setCondensed(withEllipses)
    }, [original])

    const toggleCondensed = (ticket) => {
        const copy = condensed.map(t => {
            if (t.id === ticket.id) {
                t[field] = t.condensed ? t.originalValue : t.condensedValue
                t.condensed = !t.condensed
            }
            else if (t.canCondense) {
                t.condensed = true
                t[field] = t.condensedValue
            }
            return t
        })
        setCondensed(copy)
    }

    return {
        toggle: toggleCondensed,
        setOriginal,
        condensed
    }
}
