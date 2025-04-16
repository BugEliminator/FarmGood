"use client";

import styles from "./styles.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; // 네비게이션 스타일
import "swiper/css/pagination"; // 페이지네이션 스타일
import * as PortOne from "@portone/browser-sdk/v2";

import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";

import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LinkIcon from "@mui/icons-material/Link";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const FECTH_TRAVEL_PRODUCT = gql`
  query fetchTravelproduct($id: ID!) {
    fetchTravelproduct(travelproductId: $id) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      soldAt
      travelproductAddress {
        zipcode
        addressDetail
        lat
        lng
      }
    }
  }
`;

const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation ($paymentId: ID!) {
    createPointTransactionOfLoading(paymentId: $paymentId)
  }
`;

const CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING = gql`
  mutation ($useritemId: ID!) {
    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
      name
      price
    }
  }
`;
// 삭제 API 아직 적용 전
const DELETE_TRAVEL_PRODUCT = gql`
  mutation ($travelproductId: ID!) {
    deleteTravelproduct(travelproductId: $travelproductId)
  }
`;

export default function PurchaseDetail() {
  const params = useParams();
  console.log("Params:", params.purchaseId);
  const useritemId = params.purchaseId;
  const { data } = useQuery(FECTH_TRAVEL_PRODUCT, {
    variables: { id: params.purchaseId },
  });
  console.log("data:", data);

  const isoDate = data?.fetchTravelproduct.soldAt;
  console.log(isoDate);
  const date = new Date(isoDate);

  const formattedDate = date.toLocaleString(); // 기본 형식 (로컬 환경에 맞게)
  console.log("구매날짜:", formattedDate); // 예: "2024. 11. 21. 오후 11:15:28" (한국어 환경 기준)

  const [createPointTransactionOfLoading] = useMutation(
    CREATE_POINT_TRANSACTION_OF_LOADING
  );

  const [createPointTransactionOfBuyingAndSelling] = useMutation(
    CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING
  );

  const [deleteTravelproduct] = useMutation(DELETE_TRAVEL_PRODUCT);

  const onClickPayment = async (useritemId: string) => {
    try {
      if (!useritemId) {
        throw new Error("상품 ID가 필요합니다.");
      }

      const result = await createPointTransactionOfBuyingAndSelling({
        variables: {
          useritemId,
        },
      });
      alert("상품을 구매했습니다.");
      console.log("상품 구매 결과:", result);
      // 추가 로직 (성공 시, 페이지 이동 등)
    } catch (error) {
      alert("구매 중 오류가 발생했습니다.");
      console.error("상품 구매 중 오류 발생:", error);
    }
  };
  // console.log(data?.fetchTravelproduct.tags);
  return (
    <main className={styles.main}>
      <section className={styles.titleSection}>
        <span className={styles.title}>{data?.fetchTravelproduct.name}</span>
        <div className={styles.icons}>
          <DeleteOutlined />
          <LinkIcon />
          <PlaceOutlinedIcon />
          <div className={styles.bookmarkIcon}>
            <BookmarkBorderOutlinedIcon />
            <span>26</span>
          </div>
        </div>
      </section>
      <div>6731aff39712e0002973f12c</div>
      {/* 코드수정할때 계속 생성하기 귀찮아서 박아둔 purchaseID 값 */}
      {/* ---- 임시 아이들 */}
      <div>
        우편번호:
        {data?.fetchTravelproduct?.travelproductAddress?.zipcode || "정보 없음"}
      </div>
      <div>
        상세주소:
        {data?.fetchTravelproduct?.travelproductAddress?.addressDetail ||
          "정보 없음"}
      </div>

      <div>
        위도:
        {data?.fetchTravelproduct?.travelproductAddress?.lat || "정보 없음"}
      </div>
      <div>
        경도:
        {data?.fetchTravelproduct?.travelproductAddress?.lng || "정보 없음"}
      </div>
      {/* ------ */}
      <span className={styles.summaryText}>
        {data?.fetchTravelproduct.remarks}
      </span>
      <span className={styles.hashTagText}>
        {data?.fetchTravelproduct.tags}
      </span>
      {/* 타이틀 아래부분 ======================== */}
      {/* 왜 스와이퍼의 스타일 적용이 안되는 것인가,,,, */}
      <section className={styles.middleArea}>
        <div className={styles.imageSection}>
          <div className={styles.showImage}>
            <Swiper
              className="swiper-container" // 명시적으로 추가
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              autoplay={{
                delay: 3000, // 자동 슬라이드 전환 시간 (밀리초)
                disableOnInteraction: false, // 사용자가 슬라이드를 조작해도 자동 전환 계속 유지
              }}
              navigation={true} // 네비게이션 버튼 활성화
              pagination={{
                clickable: true, // 페이지네이션 클릭 가능
              }}
            >
              {data?.fetchTravelproduct.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    className={styles.images}
                    src={`https://storage.googleapis.com/${image}`}
                    width={1000} // 고정된 너비
                    height={500} // 고정된 높이
                    alt="이미지"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div>
          <div className={styles.priceAndPurchaseSection}>
            <span className={styles.price}>
              {data?.fetchTravelproduct.price} 원
            </span>
            <ul className={styles.list}>
              <li>이용권은 포인트 충전 후 구매하실 수 있습니다.</li>
              <li>상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.</li>
            </ul>
            <button
              className={styles.purchaseBtn}
              onClick={() => onClickPayment(useritemId)}
            >
              구매하기
            </button>
          </div>
          <div className={styles.sellerSection}>
            <span className={styles.sellerTitle}>판매자</span>
            <div className={styles.sellerName}>
              <UserOutlined />
              <span>파는사람이름</span>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.underLine}></div>
      <section className={styles.contentsSection}>
        <span className={styles.contentsTitle}>상세설명</span>
        <p className={styles.contnetsText}>
          {data?.fetchTravelproduct.contents}
        </p>
      </section>
      <div className={styles.underLine}></div>
      <section className={styles.locationSection}>
        <span className={styles.locationTitle}>상세위치</span>
        <div className={styles.locationBox}>위치지도가 나올 부분</div>
      </section>
    </main>
  );
}
