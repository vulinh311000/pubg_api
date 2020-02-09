import React, {Component} from 'react';

export default (WrappedComponent) => {
    return (props) => {
        return (
            <div className='box'>
                <WrappedComponent {...props}/>
            </div>
        );
    }
}