import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";

import { BtnDeleteOrder } from "./BtnDeleteOrder";

export const OrdersTable = async () => {
  const getOrders = async () => {
    const ordersRef = collection(db, "ordenes");
    const querySnapshot = await getDocs(ordersRef);
    const docs = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
    return docs;
  };

  const orders = await getOrders();

  

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Email</th>
            <th>Fecha</th>
            <th>Productos</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Dirección</th>
            <th>Telefono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* row */}
          {orders?.map((e) => (
            <tr key={e.fecha}>
              <td>{e.cliente.email}</td>
              <td>{e.fecha}</td>
              <td>
                {e.productos.map((e) => (
                  <div key={e.titulo} className="flex justify-center flex-col">
                    <span key={e.fecha}>{e.titulo}</span>
                  </div>
                ))}
              </td>

              <td>
                {e.productos.map((e) => (
                  <div key={e.titulo} className="flex justify-center flex-col">
                    <span key={e.fecha}>{e.qty}</span>
                  </div>
                ))}
              </td>

              <td>{e.productos.reduce((acc, item) => acc + item.total, 0)}</td>

              <td>{e.cliente.direccion}</td>

              <td>{e.cliente?.telefono}</td>

              <td className="flex ">
                <input type="checkbox" className="checkbox checkbox-lg mx-5" />

                <BtnDeleteOrder  buyID={e.buyID} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
