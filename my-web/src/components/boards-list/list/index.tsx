"use client";

import Image from "next/image";
import useBoard from "./hook";
import { IBoardProps } from "./types";
import styles from "./styles.module.css";

export default function Board(props: IBoardProps) {
  // ------------------------------------------ 페이지네이션

  // const [startPage, setStartPage] = useState(1);
  // //  데이타 중복되어서 이름 지어줌
  // const { data: dataBoard, refetch } = useQuery(FETCH_BOARDS);

  // const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);

  // const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 5) / 5);
  // console.log("마지막페이지:", lastPage);
  // console.log(dataBoard);

  // const onClickPage = (event) => {
  //   refetch({ mypage: Number(event.currentTarget.id) });
  // };

  // const onClickPrevPage = () => {
  //   if (startPage === 1) return;

  //   setStartPage(startPage - 5);
  //   refetch({ mypage: startPage - 5 });
  // };

  // const onClickNextPage = () => {
  //   if (startPage + 5 <= lastPage) {
  //     setStartPage(startPage + 5);
  //     refetch({ mypage: startPage + 5 });
  //   }
  // };

  // ------------------------------------------ 페이지네이션
  const { keyword } = props; // 프롭스로 받고 나서 구조분해 할당하는 방식

  const { goingBoardDetail, onClickDelete, data } = useBoard();

  return (
    <>
      <div className={styles.boardContainer}>
        <div className={`${styles.boardRow} ${styles.boardHeader}`}>
          <div className={styles.cellLeft}>
            <div className={styles.number}>번호</div>
            <div className={styles.title}>제목</div>
          </div>
          <div className={styles.cellRight}>
            <div className={styles.writer}>작성자</div>
            <div className={styles.date}>날짜</div>
          </div>
        </div>

        {props.data?.fetchBoards.map((el, index) => (
          <div
            key={el._id}
            className={styles.boardRow}
            onClick={(e) => {
              e.stopPropagation();
              goingBoardDetail(el._id);
            }}
          >
            <div className={styles.cellLeft}>
              <div className={styles.boardNum}>{index + 1}</div>
              <div className={styles.boardTitle}>
                {el.title
                  .replaceAll(keyword, `#$${keyword}#$`)
                  .split("#$")
                  .map((part, i) => (
                    <span
                      key={`${part}_${i}`}
                      style={{ color: part === keyword ? "#59ce42" : "black" }}
                    >
                      {part}
                    </span>
                  ))}
              </div>
            </div>
            <div className={styles.cellRight}>
              <div className={styles.boardName}>{el.writer}</div>
              <div className={styles.boardDate}>
                {new Date(el.createdAt).toLocaleDateString()}
              </div>
            </div>
            <span onClick={onClickDelete}>
              <Image
                src="/images/delete.png"
                alt="삭제하기"
                className={styles.deleteIcon}
                width={0}
                height={0}
                sizes="100vw"
                id={el._id}
              />
            </span>
          </div>
        ))}
      </div>

      {/* ------------------------------------------ 페이지네이션 */}
      {/* <div className={styles.임시페이지내이션}>
        <span onClick={onClickPrevPage}>이전페이지</span>

        {new Array(5).fill("").map((_, index) => (
          <span
            key={index + startPage}
            id={String(index + startPage)}
            onClick={onClickPage}
          >
            {index + startPage}
          </span>
        ))}

        <span onClick={onClickNextPage}>다음페이지</span>
      </div> */}

      {/* ------------------------------------------ 페이지네이션 */}
    </>
  );
}
