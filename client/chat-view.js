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

	update() {
		this.setState({ text: this.state.text });
	}

	render() {
		const { onSend, messages } = this.props;
		const items = messages.map(toListItem);
		return (
			<div>
		    <input type="button" className="send-button" value="Send" onClick={onSend} />
		    <div className="send-text-wrapper">
		        <input type="text" className="send-text"
		        	placeholder="Type some message here..."
		        	value={ this.state.text }
		        	onChange={event => { this.setState({text: event.target.value}) }} />
		    </div>
		    <ul className="received-messages">{items}</ul>
	    </div>
		);
	}
}

function toListItem(message, key) {
  const obj = JSON.parse(message);
  const timestamp = parseInt(obj.timestamp);
  const time = '[' + new Date(timestamp).toLocaleTimeString() + '] ';
  const user = obj.name ? obj.name + ': ' : "";
  const text = time + user + obj.message;
  const color = obj.color;
  return (<li key={key} style={{color:color}}>{text}</li>);
}

ChatView.propTypes = {
	onSend: PropTypes.func.isRequired,
	messages: PropTypes.array.isRequired
};
