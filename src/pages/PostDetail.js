import React from "react";
import Post from "../components/Post";
import { Button } from "../elements";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { firestore } from "../shared/firebase";
import {history} from "../redux/configureStore";

const PostDetail = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const user_info = useSelector((state) => state.user.user);
    const post_list = useSelector(store => store.post.list);
    const post_idx = post_list.findIndex(p => p.id === id);
    const post_data = post_list[post_idx];
    const [post, setPost] = React.useState(post_data ? post_data : null);
    

    React.useEffect(() => {
        const postDB = firestore.collection("post");
        postDB.doc(id).get().then(doc => {

            let _post = doc.data();
            let post = Object.keys(_post).reduce(
                (acc, cur) => {
                  if (cur.indexOf("user_") !== -1) {
                    return {
                      ...acc,
                      user_info: { ...acc.user_info, [cur]: _post[cur] },
                    };
                  }
                  return { ...acc, [cur]: _post[cur] };
                },
                { id: doc.id, user_info: {} }
              );

              setPost(post);
        })
    }, []);

    const deletePost = () => {
        window.alert("삭제 완.");
        dispatch(postActions.deletePostFB(id));
        window.location.replace("/")
      };
    

    return (
        <React.Fragment>
            {post && <Post {...post} is_me={post.user_info.user_id === user_info.uid}/>}
            {post.user_info.user_id === user_info?.uid ? (
                <>
                <Button width="50%" _onClick={() => {
                    history.push(`/write/${id}`);
                  }}>
                    수정
                  </Button>
                <Button width="50%" _onClick={deletePost}>삭제하기</Button>
                </>
          ) : null}
            {/* <CommentWrite/>
            <CommentList/> */}
        </React.Fragment>
    )
}

export default PostDetail;