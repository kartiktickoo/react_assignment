import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { articleActions, userActions } from "../_actions";

import React, { Component } from "react";
import _ from "lodash";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onFavoriteClick = this.onFavoriteClick.bind(this);
    this.onFavoriteButtonClick = this.onFavoriteButtonClick.bind(this);
    this.onResetClick = this.onResetClick.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }
  onDeleteClick(event) {
    event.preventDefault();
    this.props.deletePost(event.target.value, () => {
      this.props.fetchPost();
    });
  }

  onFavoriteClick(post) {
    if (!post.favorited) {
      this.props.favoritePost(post.slug, () => {
        this.props.fetchPost();
      });
    } else {
      this.props.deleteFavoritePost(post.slug, () => {
        this.props.fetchPost();
      });
    }
  }

  onResetClick(event) {
    event.preventDefault();
    this.props.fetchPost();
  }

  componentDidMount() {
    this.props.fetchPost();
    this.props.fetchTags();
  }

  onTagClick(event) {
    this.props.fetchPostByFilter("tag", event);
  }

  onFavoriteButtonClick(event) {
    event.preventDefault();
    debugger;
    let userId = this.getCurrentUser();
    this.props.fetchPostByFilter("favorited", userId);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user")).username;
  }

  renderPosts() {
    return _.map(this.props.posts, (post) => {
      return (
        <div key={post.slug} className="col-md-6 px-md-5">
          <div className="card flex-md-row mb-4 box-shadow">
            <div className="card-body d-flex flex-column align-items-start">
              <strong className="d-inline-block mb-2 text-primary">
                {post.author.username}
              </strong>
              <h3 className="mb-0 text-dark">{post.title}</h3>
              <p className="card-text mb-auto">{post.description}</p>
              <label>
                Favorite:
                <input
                  name="isGoing"
                  type="checkbox"
                  checked={post.favorited}
                  onChange={() => {
                    this.onFavoriteClick(post);
                  }}
                />
              </label>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <Link to={`/posts/${post.slug}`}>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View
                    </button>
                  </Link>
                  <Link
                    to={{
                      pathname: `/posts/edit/${post.slug}`,
                      state: {
                        post,
                      },
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    value={post.slug}
                    onClick={this.onDeleteClick}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  renderTags() {
    return this.props.tags.map((tag) => {
      return (
        <button key={tag} onClick={() => this.onTagClick(tag)}>
          {tag}
        </button>
      );
    });
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="row text-xs-right">
          <div className="col-md-4 col-md-offset-8">
            <span className="m-1">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={this.onResetClick}
              >
                Reset tags
              </button>
            </span>
            <span className="m-1">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={this.onFavoriteButtonClick}
              >
                Favorite
              </button>
            </span>
            <span className="m-1">
              <Link className="btn btn-primary btn-lg" to="/posts/new">
                Add a Post
              </Link>
            </span>
            <span className="m-1">
              <Link className="btn btn-primary btn-lg" to="/login">
                Logout
              </Link>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row m-4">
              <h1>Posts</h1>
            </div>
            <div className="row">{this.renderPosts()}</div>
          </div>
          <div className="col-md-4">
            <div className="row m-4">
              <h1>Tags</h1>
            </div>
            <div className="row m-4">{this.renderTags()}</div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  const posts = state.posts;
  const tags = state.tags;
  return { user, users, posts, tags };
}

const actionCreators = {
  fetchPost: articleActions.fetchPost,
  fetchTags: articleActions.fetchTags,
  fetchPostByFilter: articleActions.fetchPostByFilter,
  deletePost: articleActions.deletePost,
  favoritePost: articleActions.favoritePost,
  deleteFavoritePost: articleActions.deleteFavoritePost,
  // getCurrentUser: userActions.getCurrentUser,
};

const connectedHomePage = connect(mapStateToProps, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
