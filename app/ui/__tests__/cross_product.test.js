import React from 'react';
import CrossProduct from '../src/cross_product.js';
import { shallow, configure } from 'enzyme';
import  Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Validate input error message on empty strings', () => {
  const component = shallow(
    <CrossProduct/>
  );
  expect(component.find('button').text()).toEqual('Compute');
  component.find('button').simulate('click', {preventDefault() {}});

  const vector1 = component.findWhere(n => n.name() === 'TextInput' && n.prop('label') === 'Vector 1');
  expect(vector1.props().errorMessage).toEqual('Input cannot be empty.');

  const vector2 = component.findWhere(n => n.name() === 'TextInput' && n.prop('label') === 'Vector 2');
  expect(vector1.props().errorMessage).toEqual('Input cannot be empty.');
});