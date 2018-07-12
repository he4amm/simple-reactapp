import React, { Component } from 'react';
import moment from 'moment';
import '../styles/components/StoryCard.css';

export default class StoryCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            cardImg: ''
        }
    };

    componentDidMount() {
        this.getCardImg();
    }

    render() {
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
                                    onClick={() => this.openURL(this.props.story.url)}
                                >
                                    {this.props.story.title}
                                </span>
                                <span className="details-header__info--about">
                                    <span>{this.props.story.domain_name}</span>
                                    <span>{this.getCardTime(this.props.story.publishTime)}</span>
                                </span>
                            </span>
                            <span className="details-header__percentage">
                                {this.props.story.score}%
                            </span>
                        </div>

                        <div className={this.state.expanded ? 'details-description show' : 'details-description'}>
                            {this.props.story.description 
                                ? this.props.story.description
                                : 'No descriprion!'
                            }
                        </div>
                    </div>
                    <div className="Card__content--expand">
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
                        
                    </div>
                </div>
                <div className="Card__tools">
                    <div className="Card__tools--item bookmark">
                        <img src={require(`../assets/img/like.png`)} className="tool-icon" alt="bookmark" />
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
            </div>
        )
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

    openURL = (url) => {
        let win = window.open(url, '_blank');
        win.focus();
    }
}