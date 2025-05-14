import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { FC } from "react";

// Stock 아이템 타입 정의
interface StockItem {
  id: number;
  name: string;
  count: number;
  price: number;
}

const Cart: FC = () => {
  return (
    <div>
      <div>
        <h4>장바구니</h4>
      </div>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>상품명</th>
            <th>수량</th>
            <th>가격</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          <TableDatas />
        </tbody>
      </Table>
    </div>
  );
};

const TableDatas: FC = () => {
  const items = useSelector((state: RootState) => state.stock);

  return (
    <>
      {items.map((item: StockItem) => (
        <TableRow key={item.id} item={item} />
      ))}
    </>
  );
};

interface TableRowProps {
  item: StockItem;
}

const TableRow: FC<TableRowProps> = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.count}</td>
      <td>{item.price}</td>
      <td>
        <button onClick={() => dispatch(changeName("john"))}>변경하기</button>
      </td>
    </tr>
  );
};

export const CartComponent = () => {
  return <Cart />;
};
