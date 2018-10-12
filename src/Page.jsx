import React, { Component } from 'react';
import axios from 'axios';
import horoscopes from './horoscopes.json';

const REQ_URL = 'https://horoscope-api.herokuapp.com';

export class Page extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    componentDidMount() {
        let allSignsElement = [];
        for (const sign of horoscopes['signs']) {
            axios.get(REQ_URL + '/horoscope/today/' + sign['Sign'], {
                'headers': {
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    render() {
        return (
            <div>
                <div className='container mt-5'>
                    <h1>Horroscopes</h1>
                    {this.state.data ? 'Loading...' : this.state.data}
                    {JSON.stringify(horoscopes)}
                </div>
            </div>
        );
    }
}

export default Page;