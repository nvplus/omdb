import React, { useState } from 'react';

function Banner() {
    const [display, setDisplay] = useState(true);

    return (
        <div className="banner">
            You've nominated five movies!
        </div>
    )
}

export default Banner;