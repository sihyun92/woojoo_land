import styled from "styled-components";
import { theme } from "../../styles/theme";
import { BsFacebook, BsGithub, BsInstagram, BsYoutube } from "react-icons/bs";

function Footer() {
  return (
    <Container>
      <Contents>
        <Logo>
          <img src="/images/LogoBlack.svg" alt="우주부동산" width={250} />
        </Logo>
        <FooterContent>
          <Customer>
            <div className="CustomerTitle">
              <div>고객센터</div>
              <div>24시간 연중무휴</div>
            </div>
            <div className="CustomerAddres">1566-1004</div>
          </Customer>
          <Company>(주)에이트 스페이스 그룹</Company>
          <Business>
            사업자 등록번호 : 150-66-100004 | 대표 : 메롱머스크
            <br />
            호스팅 서비스 : 주식회사 에버랜드 아마존 서버 | 통신판매업 신고번호:
            2023-서울강남-03377
            <br />
            06241 서울 강남구 강남대로 364, 10층 11층 (강남역, 미왕빌딩)
            <br />
            고객센터 : 서울 강남구 강남대로 364, 12층 (강남역, 미왕빌딩)
            <br />
          </Business>
          <Service>
            <div>개인정보 처리방침</div>
            <div>서비스 이용약관</div>
            <div>이용안내</div>
            <div>그룹 소개</div>
          </Service>
        </FooterContent>
        <SocialMenu>
          <BsYoutube />
          <a href="https://github.com/pildrums/KDT5-M5/tree/KDT5_TEAM8"><BsGithub /></a>
          <BsFacebook />
          <BsInstagram />
        </SocialMenu>
      </Contents>
      <Copy>© 2023. 8 SPACE GROUP All rights reserved.</Copy>
    </Container>
  );
}

const Container = styled.footer`
  height: 22.1875rem;
  display: flex;
  margin-top: 6.25rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: ${theme.colors.gray[4]};
`;

const Contents = styled.footer`
  width: 75rem;
  height: 18.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.footer`
  width: 25%;
  img {
    opacity: 30%;
  }
`;

const FooterContent = styled.footer`
  width: 50%;
  display: flex;
  padding-left: 25px;
  flex-direction: column;
  color: ${theme.colors.gray[5]};
  border-left: 3px solid ${theme.colors.gray[3]};
`;

const Customer = styled.footer`
  height: 45px;
  display: flex;
  margin-bottom: 20px;
  .CustomerTitle {
    justify-content: center;
    div:first-child {
      display: flex;
      font-size: 22px;
      font-weight: 700;
      margin: 4px 0 3px 0;
    }
    div:last-child {
      display: flex;
      font-size: 11px;
      align-items: end;
      padding-left: 2px;
    }
  }
  .CustomerAddres {
    font-size: 45px;
    font-weight: 700;
    margin-left: 18px;
  }
`;

const Company = styled.footer`
  display: flex;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Business = styled.footer`
  display: flex;
  font-size: 12px;
  line-height: 18px;
  margin-bottom: 20px;
`;

const Service = styled.footer`
  display: flex;
  div {
    width: 94px;
    height: 20px;
    display: flex;
    cursor: pointer;
    font-size: 10px;
    padding-top: 1px;
    margin-right: 8px;
    align-items: center;
    justify-content: center;
    border: 1px solid ${theme.colors.gray[3]};
  }
`;

const SocialMenu = styled.footer`
  width: 25%;
  height: 75%;
  display: flex;
  align-items: end;
  justify-content: end;
  padding-left: 20px;
  svg {
    display: flex;
    font-size: 32px;
    cursor: pointer;
    align-items: end;
    transition: 0.1s;
    margin-right: 20px;
    color: ${theme.colors.orange.main};
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const Copy = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  background-color: ${theme.colors.orange.main};
`;

export default Footer;
