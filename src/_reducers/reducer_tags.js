import { articleConstants } from "../_constants";

export default function (state = [], action) {
  switch (action.type) {
    case articleConstants.FETCH_TAGS:
      return action.payload.articles.tags;
    default:
      return state;
  }
}
