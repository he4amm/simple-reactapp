import React, { Component } from 'react';
import moment from 'moment';
import '../styles/components/StoryCard.css';

export default class StoryCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth,
            expanded: false,
            cardImg: ''
        }
    };

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    componentDidMount() {
        this.getCardImg();
    }

    render() {
        const { width } = this.state;
        const isMobile = width <= 480;

        return (
            <div className="Card">
                <div className="Card__content">
                    <div className="Card__content--img">
                        <img src={this.state.cardImg} className="img" alt="asd" />
                    </div>
                    <div className="Card__content--details">
                        <div className="details-header">
                            <span className="details-header__info">
                                <span className="details-header__info--title"
                                    onClick={() => this.openURL()}>
                                    {this.props.story.title}
                                </span>
                                <span className="details-header__info--about">
                                    {this.props.type === 'tweet' ?
                                        <img src={require(`../assets/img/twitter.png`)} className="twitter-icon" alt="twiiter-icon"/>
                                        : ''
                                    }
                                    {this.props.type === 'tweet'
                                        ? <span>@{this.props.story.author_screen_name}</span>
                                        : <span>{this.props.story.domain_name}</span>
                                    }
                                    <span>{this.props.type === 'tweet' ? '@' : ''}{this.props.story.author_screen_name}</span>
                                    <span>{this.getCardTime(this.props.story.publishTime)}</span>

                                    {this.props.type === 'tweet' && this.state.expanded ? 
                                        <span className="followers-count">follower / ing ratio: {this.getFollowersFormat(this.props.story.author_followers_count)}</span>
                                        : ''
                                    }
                                </span>
                            </span>
                            <span className="details-header__percentage">
                                {this.props.story.score}%
                            </span>
                        </div>

                        {this.props.type === 'publication' ? 
                            <div className={this.state.expanded ? 'details-description show' : 'details-description'}>
                                {this.props.story.description}
                            </div>
                            : ''
                        }
                    </div>
                    <div className="Card__content--expand">
                        {!isMobile || this.props.type === 'tweet' || this.props.story.description ? 
                            <span className="expand-btn"
                                onClick={() => this.toggleExpand()}>
                                <span className="text">
                                    {this.state.expanded ? 'Less' : 'More'}
                                </span>
                                <img
                                    src={require(`../assets/img/arrow-${this.state.expanded ? 'up' : 'down'}.png`)}
                                    className="img desktop" alt="asd"
                                />
                                <img
                                    src={require(`../assets/img/arrow-${this.state.expanded ? 'up' : 'down'}-mob.png`)}
                                    className="img mob" alt="asd"
                                />
                            </span>
                            : ''
                        }
                        
                    </div>
                </div>
                {this.state.expanded || isMobile ? 
                    <div className="Card__tools">
                        <div className="Card__tools--item bookmark">
                            <img src={require(`../assets/img/bookmark.png`)} className="tool-icon" alt="bookmark" />
                            <span className="tool-title">Bookmark</span>
                        </div>
                        <div className="Card__tools--item like">
                            <img src={require(`../assets/img/like.png`)} className="tool-icon" alt="like" />
                            <span className="tool-title">Like</span>
                        </div>
                        <div className="Card__tools--item dislike">
                            <img src={require(`../assets/img/dislike.png`)} className="tool-icon" alt="dislike" />
                            <span className="tool-title">Dislike</span>
                        </div>
                    </div>
                    : ''
                }
                
            </div>
        )
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    }

    toggleExpand = () => {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    getCardImg = () => {
        var img = new Image();

        img.onload = () => {
            this.setState({
                cardImg: this.props.story.author_image_url
            });
        }
        img.onerror = (err) => {
            this.setState({
                cardImg: this.props.story.domain_cached_logo_url
            });
        }

        img.src = this.props.story.author_image_url;
    }

    getCardTime = (time) => {
        return moment(time, "YYYYMMDD").fromNow();
    }

    getFollowersFormat = (num) => {
        return num > 999 && num < 999999 
            ? Math.floor(num / 1000) + 'k' 
            : num > 999999
            ? Math.floor(num / 1000000) + 'm'
            : num
    }

    openURL = () => {
        let win;

        if (this.props.type === 'tweet') {
            win = window.open(`https://twitter.com/statuses/${this.props.story.additional_data.tweet_id}`, '_blanck');
        } else {
            win = window.open(this.props.story.url, '_blank');
        }

        win.focus();
    }
}