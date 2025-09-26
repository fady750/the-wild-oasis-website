"use client"

import { useState } from "react";

function Counter({users}) {
    const [num, setNum] = useState(0);
    console.log(users);
    return (
        <div>
            <p>{users}</p>
            <button onClick={()=>setNum(e=>e+1)} >
                {num}
            </button>
        </div>
    )
}

export default Counter
