import React, { Component, PropTypes } from 'react';

export default class ChatView extends Component {
	constructor() {
		super();
		this.state = { text: '' };
	}

	text(value) {
		if (value === undefined) {
			return this.state.text;
		} else {
			this.setState({ text: value || '' });
		}
	}

	render() {
		const { onSend } = this.props;
		return (
			<div>
		    <input type="button" className="btnSend" value="Send" onClick={onSend} />
		    <div className="divSendText">
		        <input type="text" className="txtSend"
		        	placeholder="Type some message here..."
		        	value={ this.state.text }
		        	onChange={(event) => { this.setState({text: event.target.value}) }} />
		    </div>
		    <div className="txtReceived"></div>
	    </div>
		);
	}
}

ChatView.propTypes = {
	onSend: PropTypes.func.isRequired
};
