import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import App from './App';
import Navbar from './components/Navbar'

describe('App component', () => {
  let component, node;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <App />
    );
    node = ReactDOM.findDOMNode(component);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it ('renders headline with text', () => {
    expect(node.querySelector('.App-content__head')).toBeDefined();
    expect(node.querySelector('.App-content__head').textContent).toEqual('Watchlist');
  });

  it('gets data and map with a non-null argument', () => {
    const mock = jest.fn();
    component.getData().map(x => mock(x));
    expect(mock).toBeCalledWith(expect.anything());
  });
});