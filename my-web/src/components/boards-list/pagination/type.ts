import { gql } from "@apollo/client";

export const FETCH_BOARDS = gql`
  query fetchBoards_pagination($mypage: Int) {
    fetchBoards(page: $mypage) {
      _id
      writer
      title
      contents
    }
  }
`;

export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;
