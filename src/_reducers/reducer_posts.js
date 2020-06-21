import { articleConstants } from "../_constants";
import _ from "lodash";

export default function (state = {}, action) {
  switch (action.type) {
    case articleConstants.FETCH_POSTS:
      return _.mapKeys(action.payload, "slug");
    case articleConstants.FETCH_POSTS_BY_FILTER:
      return _.mapKeys(action.payload.data.articles, "slug");
    case articleConstants.DELETE_POST:
      return state;
    default:
      return state;
  }
}
