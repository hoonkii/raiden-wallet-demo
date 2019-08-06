import React from 'react'
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import Instascan from 'instascan';

class Send extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };

    }

    openModal = () => {
        this.setState({isModalOpen: true})
    };

    closeModal = () => {
        this.setState({isModalOpen: false})
    };

    render() {
        return (
            <div className="grid-half">
                <button className="colored-button" id="sendButton" onClick={this.openModal}>Send</button>
                <SendModal open={this.state.isModalOpen}
                           closeModal={() => this.closeModal()}
                           send={() => this.send()}/>

            </div>
        )
    }

}

class SendModal extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            open: props.open,
            sendAddress: null
        };
    }

    send = () => {
        fetch({
            url: process.env.REACT_APP_RAIDEN_NODE_ADDRESS + "/api/v1/payments/" + this.props.tokenAddress + "/" + this.state.sendAddress,
            method: 'POST'
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    console.log(data.entries);
                    alert('payment success to ' + data['target_address'] + 'amount : ' + data['amount'])
                });
            } else {
                console.log("Looks like the response wasn't perfect, got status", res.status);
            }
        }, function (e) {
            console.log("Fetch failed!", e);
            alert('payment request is failed')
        });
        this.props.closeModal()
    };

    render() {
        return (
            <Dialog open={this.props.open}>
                <button className="close-button" onClick={this.props.closeModal}>Close</button>
                <DialogTitle style={{textAlign: "center"}}>Send To Address</DialogTitle>
                <DialogContent style={{textAlign: "center"}}>
                    <div className="content qr row" style={{cursor: "pointer"}}>
                        <label htmlFor="amount_input">To Address</label>
                        <div className="input-group">
                            <input type="text" className="address-input" placeholder="0x..."
                                   value={this.state.sendAddress}/>
                        </div>
                        <button onClick={this.openCamera}/>
                        <label htmlFor="amount_input">Send Amount</label>
                        <div className="input-group">
                            <input type="number" className="address-input" placeholder="0.00"/>
                        </div>
                    </div>
                    <button id="tokenSendButton" onClick={this.send}>Send</button>
                </DialogContent>
            </Dialog>
        );
    }

    // openCamera = () => {
    //     let scanner = new Instascan.Scanner({video: document.getElementById('preview')});
    //     var _this = this;
    //     scanner.addListener('scan', function (content) {
    //         console.log(content);
    //         _this.state.sendAddress = content;
    //     });
    //     Instascan.Camera.getCameras().then(function (cameras) {
    //         if (cameras.length > 0) {
    //             scanner.start(cameras[0]);
    //         } else {
    //             console.error('No cameras found.');
    //         }
    //     }).catch(function (e) {
    //         console.error(e);
    //     });
    // }

}


export default Send