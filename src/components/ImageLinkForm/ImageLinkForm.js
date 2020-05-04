import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onSubmitClick}) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain Will Detect Faces in your pictures'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input onChange={onInputChange} className='f3 pa2 w-70 center' type='text' />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmitClick}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;