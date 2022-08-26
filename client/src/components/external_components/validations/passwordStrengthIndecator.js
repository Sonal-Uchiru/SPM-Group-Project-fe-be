import React from 'react'
import PasswordValidator from "password-validator"

export const PasswordStrengthMeter = ({password}) => {

    const num = 100 - (getScore(password) * 100 / 4)

    const createPassLabel = () => {
        const score = getScore(password)

        if (score === 4) return 'Very weak'

        if (score === 3) return 'Weak'

        if (score === 2) return 'Fear'

        if (score === 1) return 'Good'

        if (score === 0) return 'Strong'

        return ''
    }

    const funcProgressColor = () => {
        const score = getScore(password)

        if (score === 4) return '#828282'

        if (score === 3) return '#EA1111'

        if (score === 2) return '#FFAD00'

        if (score === 1) return '#9bc158'

        if (score === 0) return '#00b500'

        return 'none'
    }

    const changePasswordColor = () => ({
        width: `${num}%`,
        background: funcProgressColor(),
        height: '7px'
    })

    return (
        <>
            <div className="progress" style={{height: '7px'}}>
                <div className="progress-bar" style={changePasswordColor()}/>
            </div>
            <p style={{color: funcProgressColor()}}>{createPassLabel()}</p>
        </>
    )
}

const getScore = (password) => {
    const schema = new PasswordValidator();

    schema
        .is().min(8)     // Minimum length 8
        .is().max(100)  // Maximum length 100
        .has().uppercase()   // Must have uppercase letters
        .has().lowercase()   // Must have lowercase letters
        .has().digits(2)  // Must have at least 2 digits
        .has().not().spaces()    // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123', 'Email123']);

    return schema.validate(password, {details: true}).length
}

export const isStrongPassword = (password) => {
    return getScore(password) === 0
}




