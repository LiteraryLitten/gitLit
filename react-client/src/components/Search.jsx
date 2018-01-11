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

  // bind the fetch callback to this component
  // accept a callback that returns the isbn of the first result or the selected one to APP
  // the CB will set the state of the currentbook in the APP and trigger a re-render of the book page

  onChange(e) {
    this.setState({
      query: e.target.value,
    });
  }

  handleSubmit() {
    console.log('clicked', this.state.query);
    this.props.fetch('search', this.state.query, (book) => {
      this.setState({
        selectedBook: book,
      });
    });
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
