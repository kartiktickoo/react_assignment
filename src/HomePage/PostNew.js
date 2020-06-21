import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { articleActions } from "../_actions";

class PostNew extends React.Component {
  constructor(props) {
    super(props);
    let post;
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.post
    ) {
      post = this.props.location.state.post;
    }
    this.state = {
      user: {
        title: post ? post.title : "",
        description: post ? post.description : "",
        body: post ? post.body : "",
      },
      post: post,
      submitted: false,
      isNew: post ? false : true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user, isNew, post } = this.state;
    // if (user.title && user.description && user.body) {
    //   this.props.register(user);
    // }

    let newObject = { article: { ...user, tagList: [] } };
    if (isNew) {
      this.props.createPost(newObject, () => {
        this.props.history.push("/");
      });
    } else {
      this.props.updatePost(newObject, post.slug, () => {
        this.props.history.push("/");
      });
    }
  }

  render() {
    const { user, submitted, isNew } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>{isNew ? `New Post!` : `Edit Post!`}</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" + (submitted && !user.title ? " has-error" : "")
            }
          >
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={user.title}
              onChange={this.handleChange}
            />
            {submitted && !user.title && (
              <div className="help-block">Title is required</div>
            )}
          </div>
          <div
            className={
              "form-group" +
              (submitted && !user.description ? " has-error" : "")
            }
          >
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={user.description}
              onChange={this.handleChange}
            />
            {submitted && !user.description && (
              <div className="help-block">Description is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !user.body ? " has-error" : "")
            }
          >
            <label htmlFor="body">Body</label>
            <input
              type="text"
              className="form-control"
              name="body"
              value={user.body}
              onChange={this.handleChange}
            />
            {submitted && !user.body && (
              <div className="help-block">Body is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Submit</button>
            <Link to="/" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapState(state) {
  return {};
}

const actionCreators = {
  createPost: articleActions.createPost,
  updatePost: articleActions.updatePost,
};

const connectedPostnew = connect(mapState, actionCreators)(PostNew);
export { connectedPostnew as PostNew };
