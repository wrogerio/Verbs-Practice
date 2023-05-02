import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Row, Table } from 'react-bootstrap';
// components
import { HeaderPage } from '@/components/HeaderPage';
// services
import { GetList, RemoveItem } from '../../services/VerbsService';
import { toFirstLetterUpperCase } from "@/helper/util";

const Verbs = () => {
  const urlRoot = "verbs";
  const [termo, setTermo] = useState("");
  const [lista, setLista] = useState([]);
  const [listaTotal, setListaTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const handleRemove = (id) => {
    if (!confirm("Are you shure?")) return;
    RemoveItem(id).then(data => {
      GetList().then(data => {
        setLista(data);
      })
    })
  }

  const handleTotal = () => {
    setTimeout(() => {
      const tds = document.querySelectorAll("tr:not(.d-none) > .tdTotal");
      setListaTotal(tds.length);
      const total = Array.from(tds).reduce((acc, cur) => {
        return acc + parseFloat(cur.innerText.replace("R$", "").replace(".", "").replace(",", ".").replace(" ", ""));
      }, 0);
      setTotal(total.toFixed(2));
    }, 600);
  }

  useEffect(() => {
    GetList().then(data => {
      setLista(data);
      handleTotal();
    })
    handleTotal();
  }, [])

  useEffect(() => {
    handleSearch(termo.toLowerCase());
    handleTotal();
  }, [termo])

  return (
    <>
      <HeaderPage title={toFirstLetterUpperCase(urlRoot)} lenght={listaTotal} total={total} pageType="index" accessKey="c" textBt="Cadastrar" iconBt="fas fa-plus-circle me-2"></HeaderPage>
      <Row>
        <Col className="m-0">
          <input type="text" className="form-control" placeholder="Pesquisar" value={termo} onChange={e => setTermo(e.target.value)} />
          <Table bordered hover>
            <thead>
              <tr>
                <th>Instituicao</th>
                <th className="d-none d-md-table-cell">Tipo</th>
                <th className="d-none d-sm-table-cell">Data</th>
                <th style={{ width: 115 }}>Valor</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {
                Array.isArray(lista) && lista.map((item, index) => (
                  <tr data-search={`${item.Section}-${item.Verb}-${item.Past}-${item.Translate}`} key={index}>
                    <td>{item.Section}</td>
                    <td className="d-none d-md-table-cell">{item.Verb}</td>
                    <td className="d-none d-md-table-cell">{item.Past}</td>
                    <td className="d-none d-md-table-cell">{item.Translate}</td>
                    <td className="text-center">
                      <Link href={`/${urlRoot}/add-or-edit/${item.Id}`}>
                        <i className="fas fa-edit me-2"></i>
                      </Link>
                      <span className="text-danger" onClick={e => handleRemove(item.Id.toLowerCase())}>
                        <i className="fas fa-trash-alt"></i>
                      </span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default Verbs;