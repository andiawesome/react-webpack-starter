import React, {Component} from 'react';
import Rebase from 're-base';
import ReactDOM from 'react-dom';
import Message from './messages';

const base = Rebase.createClass('https://andiawesome-react-chat.firebaseio.com/');

export default class App extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      input: 'hello', // the value of the input field
      username: '', // get username from user
      messages: [] // the array of messages
    };
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    base.syncState('chatList', {
      context: this,
      state: 'messages',
      asArray: true
    });

    var username = prompt('Gimme your name, yo!');
    this.setState({username});
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState);
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate', prevProps, prevState);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    let messages = this.state.messages.map((message, idx) => (
      <Message key={idx} {...message} />
    ));

    return (
      <div id="helloWorld">
        <ul style={{listStyleType: 'none', margin: '5px 0', padding: '0', width: '500px'}}>
          {messages}
        </ul>
        <input
          id="input"
          name="message"
          type="text"
          value={this.state.input}
          onChange={this.handleChange} />
        <button
          onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }

  handleChange(event) {
    console.log(event.target.value)
    this.setState({input: event.target.value});
  }

  handleSubmit(event) {
      event.preventDefault();
      if (this.state.input == '') return;

      let time = new Date();
      let thisTime = `${time.getHours()}:${time.getMinutes()}`;

      this.setState({
        messages: this.state.messages.concat({username: this.state.username, text: this.state.input, time: thisTime}),
        input: ''
      });
  }

}