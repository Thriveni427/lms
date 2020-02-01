
import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    LinkedinIcon,
    EmailIcon,
} from 'react-share';


export class UsersShare extends Component {
    state = {
        value: 'http://lmsdev.southeastasia.cloudapp.azure.com/',
        copied: false,
    };
    render() {
        const {
            singleShare
        } = this.props;
        const url = 'http://lmsdev.southeastasia.cloudapp.azure.com/'

        return (
            <div className="ss">
                <p className="shareThis">Share {singleShare.CourseName} Course</p>
                <hr className="hrLine"/>
                <div>
                    <input className="inputText"
                        value={this.state.value}
                        onChange={({ target: { value } }) => this.setState({ value, copied: false })}
                    />

                    <CopyToClipboard className="copy" text={this.state.value}
                        onCopy={() => this.setState({ copied: true })}>
                        <button>Copy</button>
                    </CopyToClipboard>

                    {this.state.copied ? <span style={{ color: 'red' }}>Copied.</span> : null}
                </div>
                <div className="lineCol">
                    <div className="mr-4 mt-4"><FacebookShareButton url={url}><FacebookIcon size={32} round={true} /></FacebookShareButton></div>
                    <div className="mr-4 mt-4"><TwitterShareButton url={url}><TwitterIcon size={32} round={true} /></TwitterShareButton></div>
                    <div className="mr-4 mt-4"><WhatsappShareButton url={url}><WhatsappIcon size={32} round={true} /></WhatsappShareButton></div>
                    <div className="mr-4 mt-4"><LinkedinShareButton url={url}><LinkedinIcon size={32} round={true} /></LinkedinShareButton></div>
                    <div className="mr-4 mt-4"><EmailShareButton url={url}><EmailIcon size={32} round={true} /></EmailShareButton></div>
                  
                </div>
            </div>
        )
    }
}

export default UsersShare
