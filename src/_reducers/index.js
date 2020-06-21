import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { alert } from "./alert.reducer";
import PostsReducer from "./reducer_posts";
import TagsReducer from "./reducer_tags";
import CommentsReducer from "./reducer_comments";

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  posts: PostsReducer,
  tags: TagsReducer,
  comments: CommentsReducer,
});

export default rootReducer;
