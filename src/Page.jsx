import React, { Component } from 'react';
import axios from 'axios';
import horoscopes from './horoscopes.json';

const REQ_URL = 'https://aztro.sameerkumar.website/';

export class Page extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display: null,
            signData: {}
        };
    }

    componentDidMount() {
        let getCount = 0;
        for (const sign of horoscopes['signs']) {
            axios.post(REQ_URL + '/?day=today&sign=' + sign['Sign'].toLowerCase(), {
                'crossDomain': true,
                'headers': {
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then((res) => {
                    this.setState(prevState => {
                        let newSignData = prevState.signData;
                        newSignData[sign['Sign']] = res.data;
                        return {
                            signData: newSignData
                        };
                    });
                    getCount++;
                    if (getCount === horoscopes['signs'].length) {
                        this.displayData();
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    displayData() {
        const signData = this.state.signData;
        let allSignsElement = [];
        for (const sign of horoscopes['signs']) {
            const curData = signData[sign['Sign']];
            const curElement = (
                <div className='card mb-2' key={sign['Sign']}>
                    <div className='card-body'>
                        <h4>{sign['Sign']}</h4>
                        <h6>{sign['Period']}</h6>
                        <p>{curData['description']}</p>
                        <p>Mood: {curData['mood']}</p>
                    </div>
                </div>
            );
            allSignsElement.push(curElement);
        }
        this.setState({
            display: allSignsElement
        });
    }

    render() {
        return (
            <div>
                <div className='container mt-5'>
                    <div className='mb-3 text-center'>
                        <h1>Horoscopes</h1>
                        <p className='font-weight-bold'>{new Date().toDateString()}</p>
                    </div>
                    {this.state.display ? this.state.display : <h4>Loading...</h4>}
                </div>
            </div>
        );
    }
}

export default Page;