import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import StoryCard from './StoryCard';
import data from '../stories.json';

describe('StoryCard component', () => {
    let component, node, storyCard;

    beforeEach(() => {
        storyCard = <StoryCard
            story={data.stories[0]}
            type={data.stories[0].author_image_url ? 'tweet' : 'publication'}
        />;

        component = TestUtils.renderIntoDocument(
            storyCard
        );
        node = ReactDOM.findDOMNode(component);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(storyCard, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it ('checks story image is rendered', () => {
        expect(node.querySelector('.Card__content--img img')).toBeDefined();
        expect(node.querySelector('.Card__content--img img').src).toEqual(component.props.story.author_image_url);
    });

    it ('check expnad toggling', () => {
        expect(component.state.expanded).toBeFalsy();
        component.toggleExpand();
        expect(component.state.expanded).toBeTruthy();
    });

    it ('expect story time to be `a month ago`', () => {
        expect(component.getCardTime(component.props.story.publishTime)).toEqual('a month ago');
    });

    it ('check follwers format', () => {
        expect(component.getFollowersFormat(999)).toEqual(999);
        expect(component.getFollowersFormat(1000)).toEqual('1k');
        expect(component.getFollowersFormat(49000)).toEqual('49k');
        expect(component.getFollowersFormat(4000000)).toEqual('4m');
    });
});