import React, { useEffect} from "react";
import { Grid, Image, Text } from "../elements";
import HeartButton from "../elements/HeartButton";
import {history} from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as likeActions } from "../redux/modules/like";

 const Post = (props) => {
   
  const dispatch = useDispatch();
  
  const list = useSelector((state) => state.like.list);
  
  useEffect(() => {
    dispatch(likeActions.getLikeFB(props.id));
  }, []);
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
          </Grid>
        </Grid>
        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.image_url} />
        </Grid>
        <Grid padding="16px" inline_block="true">
          <HeartButton post_id={props.id}/>
          <Text margin="0px" bold>
            {props.like_cnt}
          </Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "mean0",
    user_profile: "https://miro.medium.com/max/1200/0*XCgoYU9sqt95P8J0.png",
  },
  image_url: "https://miro.medium.com/max/1200/0*XCgoYU9sqt95P8J0.png",
  contents: "리액트넹!",
  comment_cnt: 10,
  like_cnt: 0,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
};

export default Post;
