import Button from "../common/Button";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { FormEvent, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import GlobalStyle from "../../styles/GlobalStyle";
import { productPost } from "../../lib/API/adminAPI";

function AdminProductItemAdd({ setModalOpen }: any) {
  const [ThumbnailImg, setThumbnailImg] = useState("");
  const [PhotoImg, setPhotoImg] = useState("");
  const [ThumbnailFile, setThumbnailFile] = useState(null); //제품 썸네일 파일명 상태
  const [PhotoFile, setPhotoFile] = useState(null); //상세 이미지 썸네일 파일명 상태

  //제품 썸네일 이미지 랜더링
  function ThumbnailUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files as FileList;
    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", (e) => {
        setThumbnailImg((e.target as FileReader).result as string);
      });
    }
  }

  //제품 상세 이미지 랜더링
  function PhotoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files as FileList;
    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", (e) => {
        setPhotoImg((e.target as FileReader).result as string);
      });
    }
  }

  //제품 추가 input에 입력되는 값을 state에 저장하는 함수
  const onChange = (event: any) => {
    const { name, value } = event.target;
    let updatedValue: string | number = value;

    if (name === "price") {
      updatedValue = value === "" || isNaN(Number(value)) ? 0 : Number(value);
    }

    setProductForm((prev: any) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  //제품 추가 input에 입력되는 tags값을 state에 저장하하고 쉽표 기준으로 잘라 setProductForm에 내보내는 함수
  const onChangeTags = (event: any) => {
    const { name, value } = event.target;
    let updatedTags: never[] = [];

    if (name === "tags") {
      updatedTags = value.split(",");
      console.log(updatedTags);
    }

    setProductForm((prev: any) => ({
      ...prev,
      tags: updatedTags,
    }));
  };

  //상품 추가의 정보 상태
  const [productform, setProductForm] = useState({
    tags: [],
    price: 0,
    title: "",
    isSoldOut: 0,
    discountRate: 0,
    description: "",
    photoBase64: "",
    thumbnailBase64: "",
  });

  //제품 추가 폼 입력 후 제출시 API로 값을 전달해 제품 등록
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await productPost(productform, ThumbnailImg, PhotoImg);
    //input 초기화
    setProductForm({
      tags: [],
      price: 0,
      title: "",
      isSoldOut: 0,
      discountRate: 0,
      description: "",
      photoBase64: "",
      thumbnailBase64: "",
    });
    //창 닫기 요청
    setModalOpen(false);
  };

  //모달 창 닫기 함수
  const ModalBoxClose = (event: any) => {
    event.preventDefault();
    setModalOpen(false); //setModalOpen 함수를 호출하여 값을 전달합니다.
  };

  //제품 썸네일 파일명 표시 함수
  const ThumbnailFileChange = (event: any) => {
    const file = event.target.files[0];
    setThumbnailFile(file ? file.name : null);
  };

  //상세 이미지 썸네일 파일명 표시 함수
  const PhotoFileChange = (event: any) => {
    const file = event.target.files[0];
    setPhotoFile(file ? file.name : null);
  };

  return (
    <ModalAdd>
      <GlobalStyle />
      <ModalClose type="button" onClick={ModalBoxClose}>
        <AiOutlineClose size="1.2rem" />
      </ModalClose>
      <FormContainer>
        <TitleAdd>제품 추가</TitleAdd>
        <form onSubmit={onSubmit}>
          <Thumbnail>
            <div>제품 썸네일</div>
            <input
              id="thumbnail-input-file"
              type="file"
              style={{ display: "none" }}
              //onChange 함수 사용으로 ThumbnailUpload과 handleFileChange 기능 호출
              onChange={(event) => {
                ThumbnailUpload(event);
                ThumbnailFileChange(event);
              }}
            />
            <FileAddname>{ThumbnailFile}</FileAddname>
            <FileAddBtn htmlFor="thumbnail-input-file">파일선택</FileAddBtn>
          </Thumbnail>
          <Photo>
            <div>상세 이미지</div>
            <input
              id="photo-input-file"
              type="file"
              style={{ display: "none" }}
              //onChange 함수 사용으로 ThumbnailUpload과 handleFileChange 기능 호출
              onChange={(event) => {
                PhotoUpload(event);
                PhotoFileChange(event);
              }}
            />
            <FileAddname>{PhotoFile}</FileAddname>
            <FileAddBtn htmlFor="photo-input-file">파일 선택</FileAddBtn>
          </Photo>
          <TitleInput>
            <div>제품명</div>
            <input
              required
              type="text"
              name="title"
              placeholder="제품명을 입력해주세요"
              onChange={onChange}
              value={productform.title}
            />
          </TitleInput>
          <PriceInput>
            <div>제품 가격</div>
            <input
              required
              type="text"
              name="price"
              onChange={onChange}
              value={productform.price}
            />
          </PriceInput>
          <DescriptionInput>
            <div>제품 설명</div>
            <textarea
              required
              name="description"
              onChange={onChange}
              placeholder="제품 상세 설명을 입력해주세요"
              value={productform.description}
            />
          </DescriptionInput>
          <TagsInput>
            <div>제품 태그</div>
            <input
              required
              type="text"
              name="tags"
              placeholder="쉼표를 사용하여 태그를 입력해주세요"
              onChange={(e) => {
                onChange(e);
                onChangeTags(e);
              }}
              value={productform.tags}
            />
          </TagsInput>
          <IsSoldOutInput>
            <div>재고 수량</div>
            <input
              required
              type="text"
              name="isSoldOut"
              placeholder="재고"
              onChange={onChange}
              value={productform.isSoldOut}
            />
          </IsSoldOutInput>
          <DiscountRateInput>
            <div>할인율</div>
            <input
              required
              type="text"
              name="discountRate"
              placeholder="할인율"
              onChange={onChange}
              value={productform.discountRate}
            />
          </DiscountRateInput>
          <ItemAddBtn adminadd type="submit">
            추가하기
          </ItemAddBtn>
        </form>
      </FormContainer>
    </ModalAdd>
  );
}

const FormContainer = styled.ul`
  width: 80%;
  display: flex;
  flex-direction: column;
  li {
    margin-bottom: 10px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      width: 350px;
      height: 40px;
      padding-left: 10px;
      border-radius: 5px;
      border: 1px solid ${theme.colors.gray[3]};
      background-color: ${theme.colors.gray[2]};
    }
  }
`;

const TitleAdd = styled.li`
  margin: auto;
  font-size: 36px;
  font-weight: 700;
  padding-bottom: 50px;
  font-family: "GmarketSans";
`;

const FileAddBtn = styled.label`
  width: 90px;
  height: 26px;
  display: flex;
  cursor: pointer;
  font-size: 13px;
  transition: 0.3s;
  line-height: 24px;
  border-radius: 20px;
  justify-content: center;
  color: ${theme.colors.orange.main};
  border: 1px solid ${theme.colors.orange.main};
  &:hover {
    color: ${theme.colors.white};
    background-color: ${theme.colors.orange.main};
  }
`;

const FileAddname = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-left: 20px;
  color: ${theme.colors.gray[3]};
`;

const Thumbnail = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const Photo = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const TitleInput = styled.li``;
const PriceInput = styled.li``;
const DescriptionInput = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  textarea {
    width: 350px;
    resize: none;
    height: 200px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid ${theme.colors.gray[3]};
    background-color: ${theme.colors.gray[2]};
  }
`;
const TagsInput = styled.li``;
const IsSoldOutInput = styled.li``;
const DiscountRateInput = styled.li``;

const ItemAddBtn = styled(Button)`
  margin-top: 20px;
`;

const ModalClose = styled.button`
  top: 1.5rem;
  right: 2rem;
  width: 2rem;
  height: 2rem;
  border: none;
  position: absolute;
  background-color: transparent;
  color: ${(props) => props.theme.colors.gray[5]};
  &:hover {
    cursor: pointer;
  }
`;

const ModalAdd = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 640px;
  height: 800px;
  display: flex;
  position: fixed;
  align-items: center;
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: ${(props) => props.theme.colors.white};
`;

export default AdminProductItemAdd;
