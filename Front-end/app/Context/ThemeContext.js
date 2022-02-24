import React from 'react';

const ThemeContext = React.createContext();
var AppTheme = {
    light: {SecondaryCyan : "#49DADB",
            SecondaryPurple : "#8B6AE6",
            SubText : "#BDBDBD",
            Text : "#000000",
            Primary : "#ffffff",
            Logo : "https://i.ibb.co/S02fhRW/Tourify-Logo-Black.png"
        },
    dark: { SecondaryCyan : "#49DADB",
            SecondaryPurple : "#8B6AE6",
            SubText : "#D3D3D3",
            Text : "#ffffff",
            Primary : "#000000",
            Logo : "https://i.ibb.co/S02fhRW/Tourify-Logo-Black.png"
        },
}

export {ThemeContext, AppTheme};