import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Comments } from "./Comments";
import { articleActions } from "../_actions";

class PostShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  render() {
    let { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div className="col-md-6">
        <div className="row text-right">
          <div className="col-md-6 col-md-offset-6">
            <span className="m-1">
              <Link to="/" className="btn btn-primary btn-lg">
                Back to Home
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
          <div className="col-md-12">
            <h1>Title: {post.title}</h1>
            <h3>Description: {post.description}</h3>
            <h3>Body: {post.body}</h3>
            <h3>TagList: {post.tagList}</h3>
            <h3>Author: {post.author.username}</h3>
          </div>
        </div>
        <div className="row mt-5">
          <Comments slug={post.slug} />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

const ConnectedPostShow = connect(mapStateToProps, {
  fetchPost: articleActions.fetchPost,
})(PostShow);
export { ConnectedPostShow as PostShow };
