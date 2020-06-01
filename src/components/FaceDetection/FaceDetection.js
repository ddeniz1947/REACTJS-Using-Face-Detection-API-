import React, { Component } from 'react';
import './FaceDetection.css';

let deneme = 0;
class FaceDetection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: '',
            count: '',
            box: '',
            topRow: [],
            leftCol: [],
            rightCol: [],
            bottomRow: []
        }
    }

    render() {
        let returnedArray = Array.from(this.props.countArray);
         let width = this.props.width;
         let height = this.props.height;   
        // let returnedTop = Array.from(this.props.topRow);
        // let returnedRight = Array.from(this.props.rightCol);
       
        // let returnedLeft = Array.from(this.props.leftCol);
        // let returnedBottom = Array.from(this.props.bottomRow);
        return (
            <div className='center ma'>
                <div className='absolute mt2'>
                    <img id='inputImage' alt='' src={this.props.imageUrl} width='500px' height='auto' />
                    {returnedArray.map((data, index) => (

                        <div key={index} className='bounding-box' style={{ top: returnedArray[index].region_info.bounding_box.top_row * height, right: width - (returnedArray[index].region_info.bounding_box.right_col * width) , bottom: height - (returnedArray[index].region_info.bounding_box.top_row * height), left: returnedArray[index].region_info.bounding_box.left_col * width}}>
                        </div>
                    //     <div key={index} className='bounding-box' style={{}}></div>
                    //     <div key={index}></div>
                    //    <div key={index}></div>
                    ))}

                </div>
            </div>
        )


    }

}


export default FaceDetection;