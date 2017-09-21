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

	componentDidMount() {
		adjustView();
	}

	componentDidUpdate() {
		adjustView();
	}

	render() {
		const { onSend, messages } = this.props;
		const items = messages.map(toListItem);
		return (
			<div>
				<div className="send-wrapper">
			    <input type="button" className="send-button" value="Send" onClick={onSend} />
			    <div className="send-text-wrapper">
			        <input type="text" className="send-text"
			        	placeholder="Type some message here..."
			        	value={ this.state.text }
			        	onChange={event => { this.setState({text: event.target.value}) }}
			        	onKeyDown={event => { if (event.key === 'Enter') onSend() }} />
			    </div>
			  </div>
		    <ul className="received-messages">{items}</ul>
	    </div>
		);
	}
}

function adjustView() {
	const textView = document.querySelector('.send-text');
	const messagesView = document.querySelector('.received-messages');
	messagesView.scrollTop = messagesView.scrollHeight;
	textView.focus();
}

function toListItem(msg, key) {
  const timestamp = parseInt(msg.timestamp);
  const time = '[' + new Date(timestamp).toLocaleTimeString() + '] ';
  const user = msg.name ? msg.name + ': ' : "";
  const text = time + user + msg.message;
  const color = msg.color;
  return (<li key={key} style={{color:color}}>{text}</li>);
}

ChatView.propTypes = {
	onSend: PropTypes.func.isRequired,
	messages: PropTypes.array.isRequired
};
