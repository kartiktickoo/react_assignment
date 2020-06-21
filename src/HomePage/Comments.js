import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { articleActions } from "../_actions";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.addComment(
      this.props.slug,
      {
        comment: {
          body: this.refs.textInput.value,
        },
      },
      () => {
        this.props.fetchCommentsById(this.props.slug);
        this.refs.textInput.value = "";
      }
    );
  }

  componentDidMount() {
    this.props.fetchCommentsById(this.props.slug);
  }

  onDeleteClick(event) {
    event.preventDefault();
    const { deleteComment, slug, fetchCommentsById } = this.props;

    deleteComment(slug, event.target.value, () => {
      fetchCommentsById(slug);
    });
  }

  render() {
    let { comments } = this.props;

    if (!comments) {
      return <div>Loading...</div>;
    }

    return (
      <div className="col-md-6">
        <h3>Comments:</h3>
        <div>
          {comments.length > 0 ? (
            comments.map((comment) => {
              return (
                <div className="row m-3" key={`comment_${comment.id}`}>
                  <h5>
                    {comment.author.username} - {comment.body}
                  </h5>
                  <span className="ml-3">
                    <button
                      className="btn btn-danger"
                      value={comment.id}
                      onClick={this.onDeleteClick}
                    >
                      Delete
                    </button>
                  </span>
                </div>
              );
            })
          ) : (
            <h5>No comment exist on this post</h5>
          )}
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Comment:
              <input type="text" name="comment" ref="textInput" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ comments }, { slug }) {
  return {
    comments,
    slug,
  };
}

const ConnectedComments = connect(mapStateToProps, {
  fetchCommentsById: articleActions.fetchCommentsById,
  deleteComment: articleActions.deleteComment,
  addComment: articleActions.addComment,
})(Comments);

export { ConnectedComments as Comments };
