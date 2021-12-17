/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { Grid, Text, Image, Button } from "../elements"; 
import styled from 'styled-components'
import DetailArticle from '../components/DetailArticle'
import CenterNavi from "../components/CenterNavi";
import CenterTweet from "../components/CenterTweet";
import CenterFeed from "../components/CenterFeed";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as articleActions } from "../redux/modules/article";
import { actionCreators as commentActions } from "../redux/modules/comment";

const Detail = (props) => {
  const dispatch = useDispatch();
  const comment_list = useSelector(state => state.comment.list);
  const article_list = useSelector(state => state.article.list);
  const user_id = localStorage.getItem('loginId');
  const article_id = props.match.params.id;
  const idx = article_list.findIndex(a => a.id === article_id);
  const article = article_list[idx];

  // const _comment = [comment_list[article_id]]
  // console.log(_comment);
  // const __comment = [...comment_list]
  // console.log(__comment)
  // console.log(comment_list)
  console.log(comment_list[article_id])

  React.useEffect(() => {
    if(!article_id) {
      return ;
    }

    dispatch(commentActions.getCommentDB(article_id));
    dispatch(articleActions.getDetailDB(article_id));
  }, [])

  return(
    <React.Fragment>
      <CenterBox>
        <HeadBox>
          <CenterNavi is_tweetNavi />
        </HeadBox>
        <DetailArticle 
          {...article}
          is_me = {user_id === 'chung'? true : false} 
        /> 
        <Grid is_flex="flex" borderB padding="15px 0 5px 0">
          <CenterTweet is_commentTweet article_id={article_id}/>
        </Grid>
        <Grid padding="5px 0">
          {comment_list.map(c => {
            return(
              <CenterFeed key={c.id} is_commentFeed comment={c}/>
            )
          })}
        </Grid>
      </CenterBox>

    </React.Fragment>
  )
};

const CenterBox = styled.div`
  width: 600px;
  height: 100vh;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  border: 1px solid #efefef;
  border-top: none;
  border-bottom: none;
  overflow-y: scroll;
  padding: 0 13px;
`;

const HeadBox = styled.div`
  width: 100%;
  height: 53px;
  display: inline-block;
  position: sticky;
  top: 0;
  left: 0;
`;

export default Detail;