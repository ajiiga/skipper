import React from 'react';

const AuthContainer = ({children}) => {
    return (
        <div
            style={{boxShadow: 'inset 0px 0px 13px rgba(207, 205, 205, 0.4)',
                borderRadius: '8px',
                'width':'484px',
                'overflow': 'hidden',
                'height': 'fit-content'}}>
            {children}
        </div>
    );
};

export default AuthContainer;