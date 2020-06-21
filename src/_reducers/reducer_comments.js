import { articleConstants } from "../_constants";

export default function (state = [], action) {
  switch (action.type) {
    case articleConstants.FETCH_COMMENTS:
      return action.payload.data.comments;
    case articleConstants.DELETE_COMMENT:
      return state;
    case articleConstants.ADD_COMMENT:
      return state;
    default:
      return state;
  }
}
