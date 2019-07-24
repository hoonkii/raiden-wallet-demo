import React from 'react';
import './App.css';
import Wallet from './component/Wallet.js'

const raidenNodeAddress = "http://141.223.83.34:5001";
const testAddress = "0x4FED1fC4144c223aE3C1553be203cDFcbD38C581";
const tokenAddress = "0x4FED1fC4144c223aE3C1553be203cDFcbD38C581";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentDidMount() {
        this._getRaidenNodeInformation();
    }

    render() {
        return (
            <div className="app">
                {this.state.address ? this._renderWallet() : <div>Loading...</div>}
                <div className="app-qr">
                    <div className="app-inner-qr">
                        <a className="app-inner-qr-url" href="#">
                            <img className="app-inner-qr-image" src={process.env.PUBLIC_URL + '/qrcode.png'}/>
                        </a>
                    </div>
                </div>
            </div>

        );
    }

    _renderWallet = () => {
        return <Wallet address={this.state.address} tokenAddresses={this.state.tokenAddresses}/>
    };

    _getRaidenNodeInformation = () => {
        // Wallet Address, token address list, balance 정보
        const urls = [
            raidenNodeAddress + '/api/v1/tokens',
            raidenNodeAddress + '/api/v1/address'
        ];

        Promise.all([
            fetch(urls[0]),
            fetch(urls[1]),
        ])
            .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
            .then(([data1, data2]) => this.setState({
                tokenAddresses: data1,
                address: data2['our_address']
            }))
            .catch(
                (err) => console.log(err)
            );
    }

}

export default App;
