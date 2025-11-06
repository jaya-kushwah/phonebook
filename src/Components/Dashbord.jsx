import React, { useEffect, useState } from 'react'

function Dashbord() {
    const [val, setVal] = useState(0)
    useEffect(() => {
        console.log("change");
    }, [val])

    return (
        <div>
            <button className='btn btn-sucess' style={{ marginTop: '25%' }} onClick={() => setVal(val + 1)}>CLICK</button>
        </div>
    )
}

export default Dashbord