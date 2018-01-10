import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      query: e.target.value,
    });
  }

  handleSubmit() {
    console.log('clicked', this.state.query);

    this.props.fetch('book', this.state.query);

  }

  render() {
    return (
      <div>
        <label>
          Search for a book:
        </label>
        <input type="text" value={this.query} onChange={this.onChange} />
        <button onClick={this.handleSubmit} > Search </button>
      </div>
    );
  }
}
export default Search;
