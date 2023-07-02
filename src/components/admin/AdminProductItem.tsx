import Button from "../common/Button";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { FormEvent, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import AdminModalTemplate from "./AdminModalTemplate";
import { formatDollar } from "../../lib/Function/commonFn";
import { productDel, productEdit } from "../../lib/API/adminAPI";

//응답 타입
interface IProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  tags: string[];
  thumbnail: string | null;
  photo: string | null;
  isSoldOut: boolean;
  discountRate: number;
  onclick: any;
}

function AdminProductItem(props: IProduct) {
  //모달 상태 기본값 false다 true로 바뀌면 modalOpen의 값이되며 이 값은 return문의 AdminModal 컴포넌트 요청에 사용된다.
  const [modalOpen, setModalOpen] = useState(false);
  const [ThumbnailImg, setThumbnailImg] = useState("");
  const [PhotoImg, setPhotoImg] = useState("");
  const [ThumbnailFile, setThumbnailFile] = useState(null); //제품 썸네일 파일명 상태
  const [PhotoFile, setPhotoFile] = useState(null); //상세 이미지 썸네일 파일명 상태
  const [thisProduct, setThisProduct] = useState<IProduct | null>(null);

  //모달 요청 setModalOpen()에 true 값을 보낸다.
  const editModal = (
    event: React.MouseEvent<HTMLButtonElement>,
    props: IProduct,
  ) => {
    event.preventDefault();
    setModalOpen(true);
    setThisProduct(props);
  };

  const [put, setPut] = useState();

  // 제품 삭제 함수
  const onDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
    ID: string,
  ) => {
    if (window.confirm("삭제하시겠습니까?")) {
      event.preventDefault();
      await productDel(ID);
      console.log("제품 삭제 완료");
      setPut(props.onclick);
    }
  };

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

  //제품 수정 input에 입력되는 값을 state에 저장하는 함수
  const onChange = (event: any) => {
    const { name, value } = event.target;
    // 가격 입력란에 숫자가 아닌 값을 입력하면 0을 반환
    let updatedValue: string | number = value;
    if (name === "price") {
      updatedValue = value === "" || isNaN(Number(value)) ? "" : Number(value);
    }

    // id는 개별 state에 저장
    setUpdateForm((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  //제품 추가 input에 입력되는 tags값을 state에 저장하하고 쉽표 기준으로 잘라 setProductForm에 내보내는 함수
  const onChangeTags = (event: any) => {
    const { name, value } = event.target;
    let updatedTags: never[] = [];
    if (name === "tags") {
      updatedTags = value.split(",").map((tag: string) => tag.trim());
      console.log(updatedTags);
    }
    setUpdateForm((prev: any) => ({
      ...prev,
      tags: updatedTags,
    }));
  };

  //상품 수정의 정보 상태
  const [updateform, setUpdateForm] = useState({
    tags: [],
    price: 0,
    title: "",
    isSoldOut: false,
    discountRate: 0,
    description: "",
    photoBase64: "",
    thumbnailBase64: "",
  });

  //제품 추가 폼 입력 후 제출시 API로 값을 전달해 제품 등록
  const onSubmit = async (event: FormEvent, id: string) => {
    event.preventDefault();
    //아이템의 id 값을 받아 productEdit의 매개변수로 넣어 보낸다.
    await productEdit(id, updateform, ThumbnailImg, PhotoImg);
    //input 초기화
    setUpdateForm({
      tags: [],
      price: 0,
      title: "",
      isSoldOut: false,
      discountRate: 0,
      description: "",
      photoBase64: "",
      thumbnailBase64: "",
    });
    //창 닫기 요청
    setModalOpen(false);
    setPut(props.onclick);
  };

  //모달 창 닫기 기능
  const ModalBoxCloses = (event: any) => {
    event.preventDefault();
    setModalOpen(false); //setModalOpen 함수를 호출하여 값을 전달합니다.
  };

  //제품 썸네일 파일명 표시 기능
  const ThumbnailFileChange = (event: any) => {
    const file = event.target.files[0];
    setThumbnailFile(file ? file.name : null);
  };

  //상세 이미지 썸네일 파일명 표시 기능
  const PhotoFileChange = (event: any) => {
    const file = event.target.files[0];
    setPhotoFile(file ? file.name : null);
  };

  return (
    <>
    <ItemContainer>
      <ItemBox>
        <ProductImg>
          {props.thumbnail && <img src={props.thumbnail} alt="Thumbnail" />}
          {!props.thumbnail && (
            <img src="/images/Thumbnail.png" alt="기본 이미지" />
          )}
        </ProductImg>
        {put}
        <ProductTitle>{props.title}</ProductTitle>
        <ProductId>{props.id}</ProductId>
        <ProductPrice>{formatDollar(props.price)}</ProductPrice>
        <ProductTags>{props.tags}</ProductTags>
        <ProductIsSoldOut>{props.isSoldOut ? "X" : "O"}</ProductIsSoldOut>
        <ProductDiscountRate>{props.discountRate}</ProductDiscountRate>
      </ItemBox>
      <BtnBox>
        <EditBtn
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            editModal(event, props);
          }}
          adminedit
        >
          수정
        </EditBtn>
        <DeleteBtn
          admindel
          onClick={(event: any) => {
            onDelete(event, props.id);
          }}
        >
          삭제
        </DeleteBtn>
      </BtnBox>
    </ItemContainer>
    <>
    {modalOpen && thisProduct && (
      <AdminModalTemplate>
        <ModalAdd>
          <ModalClose type="button" onClick={ModalBoxCloses}>
            <AiOutlineClose size="1.2rem" />
          </ModalClose>
          <FormContainer>
            <TitleAdd>제품 수정</TitleAdd>
            <form
              onSubmit={(event: any) => {
                onSubmit(event, props.id);
              }}
            >
              <Thumbnail>
                <FileTltle>제품 썸네일</FileTltle>
                <input
                  id="thumbnail-input-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    ThumbnailUpload(event);
                    ThumbnailFileChange(event);
                  }}
                />
                <FileAddname>{ThumbnailFile}</FileAddname>
                <FileAddBtn htmlFor="thumbnail-input-file">
                  파일선택
                </FileAddBtn>
              </Thumbnail>
              <Photo>
                <FileTltle>상세 이미지</FileTltle>
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
                <FileAddBtn htmlFor="photo-input-file">
                  파일 선택
                </FileAddBtn>
              </Photo>
              <TitleInput>
                <div>제품명</div>
                <input
                  type="text"
                  name="title"
                  placeholder={thisProduct.title}
                  onChange={onChange}
                  value={updateform.title}
                />
              </TitleInput>
              <PriceInput>
                <div>제품 가격</div>
                <input
                  type="text"
                  name="price"
                  placeholder={thisProduct.price.toString()}
                  onChange={onChange}
                  value={updateform.price !== 0 ? updateform.price : ""}
                />
              </PriceInput>
              <DescriptionInput>
                <div>제품 설명</div>
                <textarea
                  name="description"
                  onChange={onChange}
                  placeholder={thisProduct.description}
                  value={updateform.description}
                />
              </DescriptionInput>
              <TagsInput>
                <div>제품 태그</div>
                <input
                  type="text"
                  name="tags"
                  placeholder={thisProduct.tags.join(", ")}
                  onChange={(e) => {
                    onChange(e);
                    onChangeTags(e);
                  }}
                  value={updateform.tags}
                />
              </TagsInput>

              <DiscountRateInput>
                <div>할인율</div>
                <input
                  type="text"
                  name="discountRate"
                  placeholder={thisProduct.discountRate.toString()}
                  onChange={onChange}
                  value={
                    updateform.discountRate !== 0
                      ? updateform.discountRate
                      : ""
                  }
                />
              </DiscountRateInput>
              <ItemAddBtn adminadd type="submit">
                수정하기
              </ItemAddBtn>
            </form>
          </FormContainer>
        </ModalAdd>
      </AdminModalTemplate>
    )}
  </>
  </>
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
  padding-bottom: 50px;
  font-family: "GmarketSans";
  font-weight: 700;
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
  width: 48%;
  display: flex;
  font-size: 14px;
  font-weight: 400;
  color: ${theme.colors.gray[3]};
`;


const FileTltle = styled.div`
  width: 150px;
  display: flex;
`

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

const ItemBox = styled.div`
  width: 100%;
  display: flex;
  font-size: 18px;
`;

const BtnBox = styled.div`
  width: 134px;
  display: flex;
  margin: auto 26px auto 0;
`;

const EditBtn = styled(Button)``;

const DeleteBtn = styled(Button)`
  margin-left: 6px;
`;

const ItemContainer = styled.div`
  height: 70px;
  display: flex;
  border-radius: 5px;
  transition: 0.1s;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[7]};
  &:hover {
    transform: scale(0.99);
    background-color: ${theme.colors.gray[2]};
  }
`;

const ProductImg = styled.div`
  width: 15%;
  display: flex;
  padding: auto;
  max-height: 100%;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
  img {
    height: 100%;
    display: flex;
    border-radius: 5px;
  }
`;

const ProductTitle = styled.div`
  width: 20%;
  margin: auto;
  display: flex;
  font-weight: 700;
  justify-content: center;
`;

const ProductId = styled.div`
  width: 20%;
  margin: auto;
  display: flex;
  font-size: 14px;
  justify-content: center;
`;

const ProductPrice = styled.div`
  width: 10%;
  margin: auto;
  display: flex;
  font-size: 14px;
  justify-content: center;
`;

const ProductTags = styled.div`
  width: 15%;
  margin: auto;
  display: flex;
  font-size: 14px;
  justify-content: center;
`;

const ProductIsSoldOut = styled.div`
  width: 10%;
  margin: auto;
  display: flex;
  font-size: 14px;
  justify-content: center;
`;

const ProductDiscountRate = styled.div`
  width: 10%;
  margin: auto;
  display: flex;
  font-size: 14px;
  justify-content: center;
`;

export default AdminProductItem;
