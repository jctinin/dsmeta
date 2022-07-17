import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Sale } from "../../models/sale";
import { BASE_URL } from "../../utils/request";
import NotificationButton from "../NotificationButton";
import "./styles.css";

function SalesCard() {
  const start = new Date(new Date().setDate(new Date().getDate() - 365));

  const [startDate, setStartDate] = useState(start);
  const [finalDate, setFinalDate] = useState(new Date());

  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const dMin = startDate.toISOString().slice(0, 10);
    const dMax = finalDate.toISOString().slice(0, 10);

    console.log("dmin" + dMin + " -- " + "dmax" + dMax);

    axios
      .get(`${BASE_URL}/sales?minDate=${dMin}&maxDate=${dMax}`)
      .then((response) => {
        setSales(response.data.content);
      });
  }, [startDate, finalDate]);

  return (
    <>
      <div className="dsmeta-card">
        <h2 className="dsmeta-sales-title">Vendas</h2>
        <div>
          <div className="dsmeta-form-control-container">
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => {
                setStartDate(date);
              }}
              className="dsmeta-form-control"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="dsmeta-form-control-container">
            <DatePicker
              selected={finalDate}
              onChange={(date: Date) => {
                setFinalDate(date);
              }}
              className="dsmeta-form-control"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>

        <div>
          <table className="dsmeta-sales-table">
            <thead>
              <tr>
                <th className="show992">ID</th>
                <th className="show576">Data</th>
                <th>Vendedor</th>
                <th className="show992">Visitas</th>
                <th className="show992">Vendas</th>
                <th>Total</th>
                <th>Notificar</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((conteudo) => (
                <tr key={conteudo.id}>
                  <td className="show992">{conteudo.id}</td>
                  <td className="show576">
                    {new Date(conteudo.date).toLocaleDateString()}
                  </td>

                  <td>{conteudo.seller_name}</td>

                  <td className="show992">{conteudo.visited}</td>
                  <td className="show992">{conteudo.deals}</td>
                  <td>R${conteudo.amount.toFixed(2)}</td>
                  <td>
                    <NotificationButton saleId={conteudo.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default SalesCard;
