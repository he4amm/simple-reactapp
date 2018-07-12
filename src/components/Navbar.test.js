import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Navbar from './Navbar';

describe('Navbar component', () => {
    let component, node;
    let domain = window.location;

    beforeEach(() => {
        component = TestUtils.renderIntoDocument(
            <Navbar />
        );
        node = ReactDOM.findDOMNode(component);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Navbar />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders navbar btn with icon', () => {
        expect(node.querySelector('.Navbar__btn')).toBeDefined();
        expect(node.querySelector('.Navbar__btn img')).toBeDefined();
        expect(node.querySelector('.Navbar__btn img').src).toEqual(`${domain}bars.png`);
    });

    it('renders logo', () => {
        expect(node.querySelector('.Navbar__logo img')).toBeDefined();
        expect(node.querySelector('.Navbar__logo').src).toEqual(`${domain}logo.png`);
    });

    it('renders dropdown', () => {
        expect(node.querySelector('.dropdown')).toBeDefined();
        expect(node.querySelector('.dropdown-btn')).toBeDefined();
        expect(node.querySelector('.dropdown-content')).toBeDefined();
    });

    it ('toggle dropdown', () => {
        expect(component.state.dropdown).toBeFalsy();
        component.toggleDropdown();
        expect(component.state.dropdown).toBeTruthy();
    });
});