import { useState } from "react";

import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { useNavigate } from "react-router-dom";
import { FC, useEffect } from "react";
import { getProducts, Product, ProductResponse } from "../../api/products.ts";

export const ItemCards: FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  getProducts().then((res) => {
    console.log("API 응답 확인:", res); // 여기에서 content가 있는지 확인
  });
  useEffect(() => {
    getProducts().then((res) => {
      const mapped = res.content.map(
        (product): Item => ({
          id: product.productId,
          name: product.productName,
          description: product.personaMessages,
          image: product.thumbnailImage ?? "",
          updatedAt: new Date().toISOString(),
        })
      );
      setItems(mapped);
    });
  }, []);

  return (
    <CardGroup>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </CardGroup>
  );
};

interface Item {
  id: number;
  name: string;
  description: string[];
  image: string;
  updatedAt: string;
}

interface ItemCardProps {
  item: Item;
}

const ItemCard: FC<ItemCardProps> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate("/detail/" + item.id)}>
      <Card.Img variant="top" src={item.image} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          최근 업데이트 {calTimeDiff(item.updatedAt)}
        </small>
      </Card.Footer>
    </Card>
  );
};

function calTimeDiff(time: string | Date | null | undefined): string {
  if (!time) return "시간정보없음";

  const now = new Date();
  const givenTime =
    typeof time === "string" || time instanceof Date ? new Date(time) : null;

  if (!givenTime || isNaN(givenTime.getTime())) return "유효하지 않은 시간";

  const timeDiff = now.getTime() - givenTime.getTime();
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
