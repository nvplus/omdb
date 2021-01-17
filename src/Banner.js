import React, { useState } from 'react';

function Banner() {
    const [display, setDisplay] = useState(true);

    return (
        <div className="banner">
            Five nominations achieved!
        </div>
    )
}

export default Banner;