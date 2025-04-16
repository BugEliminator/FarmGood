import Link from "next/link";

import styles from "./styles.module.css";
import { FormOutlined, SearchOutlined } from "@ant-design/icons";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

export default function PerchaseMain() {
  return (
    <main className={styles.main}>
      <section className={styles.suggestSection}>
        <h1 className={styles.suggestTitle}>
          2024 끝여름 낭만있게 마무리 하고 싶다면?
        </h1>
        <div className={styles.suggestImages}>
          {/* 스와이퍼에서 Slides per view 쓰면 깔끔할꺼 같음.*/}
          <div>이미지1</div>
          <div>이미지2</div>
        </div>
      </section>

      <section className={styles.advertisementSection}>
        <div className={styles.advertisement}>광고 들어올 자리</div>
      </section>

      <section className={styles.reservationSection}>
        <span className={styles.reservationTitle}>
          여기서만 예약할 수 있는 숙소
        </span>
        <div className={styles.reservationButtonArea}>
          {/* 클릭한다면? 클래스에 clickButton이 생기면서 클릭한거 같은 느낌  */}
          <button
            className={`${styles.reservationButton} ${styles.clickButton}`}
          >
            예약 가능 숙소
          </button>

          <button className={styles.reservationButton}>예약 마감 숙소</button>
        </div>

        <div className={styles.searchAndSellingArea}>
          <div className={styles.searchArea}>
            <div className={styles.searchBar}>
              <SearchOutlined className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                type="text"
                placeholder="제목을 입력해 주세요."
              />
            </div>
            {/* <div>년도설정하는부분</div>  - 아직 미정*/}
            <button className={styles.searchButton}>검색</button>
          </div>

          <button className={styles.sellingButton}>
            <FormOutlined />
            <span>숙박권 판매하기</span>
          </button>
        </div>
      </section>

      <section className={styles.productCardSection}>
        <div className={styles.productCard}>
          <div className={styles.productImage}>
            <div className={styles.bookmark}>
              {/* 북마크 */}
              <BookmarkBorderOutlinedIcon className={styles.bookmarkIcon} />
              <span>26</span>
            </div>
          </div>

          <div>
            <span>타이틀 들어가는 곳</span>
            <span>상세설명 들어가는 곳</span>
            <div>#태그 들어가는 곳</div>
          </div>
          <div>
            <div>
              <div>아이콘자리</div>
              <span>판매자이름</span>
            </div>
            <div>
              <span>3,000</span>
              <span>원</span>
            </div>
          </div>
        </div>
      </section>

      <br />
      <br />
      <button>
        <Link href="/purchase/purchaseId">상품 & 일정 상세보기 버튼</Link>
      </button>
      <br />
      <br />
      <button>
        <Link href="/purchase/purchaseWrite">상품 & 일정 등록하기 버튼</Link>
      </button>
      <br />
      <br />
      <button>
        <Link href="/purchase/purchaseId/edit">상품 & 일정 수정하기 버튼</Link>
      </button>
    </main>
  );
}
