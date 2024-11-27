import React from 'react'



const DropdownTransaction = (date, description, amount, balance) => {
    return (
        <div>

            <div>{date}</div>
            <div>{description}</div>
            <div>{amount}</div>
            <div>{balance}</div>
            {/* dropdown */}
        </div>
    )
}

export default DropdownTransaction