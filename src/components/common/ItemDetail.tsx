import { useState, useEffect, FC, ReactNode } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import "../../App.css";

const ItemDetail: FC = () => {
  const [items] = useState([
    {
      id: 1,
      name: "Item 1",
      description: "Description 1",
      image: "/images/shoes1.jpg",
      updatedAt: "2025-04-24T13:45:30Z",
    },
    {
      id: 2,
      name: "Item 2",
      description: "Description 2",
      image: "/images/shoes2.jpg",
      updatedAt: "2025-03-22T13:45:30Z",
    },
    {
      id: 3,
      name: "Item 3",
      description: "Description 3",
      image: "/images/shoes3.jpg",
      updatedAt: "2024-04-21T13:45:30Z",
    },
  ]);

  const id = Number(useParams<{ id: string }>());
  const item = items.find((item) => item.id === id);

  if (!item) return <div>아이템을 찾을 수 없습니다.</div>;

  return (
    <Animation detect={id}>
      <DetailCard item={item} />
    </Animation>
  );
};

const DetailCard: FC<{
  item: {
    id: number;
    name: string;
    description: string;
    image: string;
    updatedAt: string;
  };
}> = ({ item }) => {
  const BlueBtn = styled.button`
    background-color: blue;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: darkblue;
    }
  `;

  return (
    <CardGroup>
      <Card>
        <Card.Img
          variant="top"
          src={item.image}
          style={{ width: "18rem", margin: "0 auto" }}
        />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
          <BlueBtn>구매하기</BlueBtn>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            최근 업데이트 {calTimeDiff(item.updatedAt)}
          </small>
        </Card.Footer>
        <Tabs />
      </Card>
    </CardGroup>
  );
};

const Tabs: FC = () => {
  const [tab, setTab] = useState(1);
  return (
    <>
      <Nav fill variant="tabs" defaultActiveKey="link-1">
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => setTab(1)}>
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={() => setTab(2)}>
            Loooonger NavLink
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3" onClick={() => setTab(3)}>
            Link
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </>
  );
};

const TabContent: FC<{ tab: number }> = ({ tab }) => {
  if (tab === 1) return <Animation detect={tab}>내용1</Animation>;
  if (tab === 2) return <Animation detect={tab}>내용2</Animation>;
  if (tab === 3) return <Animation detect={tab}>내용3</Animation>;
  return null;
};

const Animation: FC<{ detect: number; children: ReactNode }> = ({
  detect,
  children,
}) => {
  const [fade, setFade] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setFade("animationEnd"), 100);
    return () => {
      clearTimeout(timeout);
      setFade("");
    };
  }, [detect]);

  return <div className={"animationStart " + fade}>{children}</div>;
};

function calTimeDiff(time: string): string {
  if (!time) return "시간정보없음";
  const now = new Date();
  const timeDiff = now.getTime() - new Date(time).getTime();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years}년 전`;
  if (months > 0) return `${months}개월 전`;
  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  if (seconds > 0) return `${seconds}초 전`;
  return "방금 전";
}

export default ItemDetail;
