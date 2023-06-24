import styled from "styled-components";

function Banner() {
  return (
    <Container>
      <div>Banner</div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 26.25rem;
  background: black;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Banner;
