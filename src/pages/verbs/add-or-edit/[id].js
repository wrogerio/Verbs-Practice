import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Button, Col, Form, Row } from "react-bootstrap";

// components
import HeaderPage from '@/components/HeaderPage';
import { nDateIso, toFirstLetterUpperCase, nDateIsoPlusOneDay } from "@/helper/util";
import { SaveItem, GetItem } from "@/services/VerbsService";
import { GetList } from "@/services/VerbsService";


const Index = () => {
  const urlRoot = "verbs";
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const btSubmit = useRef();
  const [item, setItem] = useState({ Section: '', Verb: '', Past: '', Translate: '' });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() !== false) {
      btSubmit.current.style.display = "none";
      SaveItem({
        ...item
      }).then((result) => {
        if (result) router.push(`/${urlRoot}`);
        else console.log("Erro ao salvar");
      })
    }
    setValidated(true);
  };

  useEffect(() => {
    const id = window.location.pathname.split("/").pop()
    if (id !== "0") {
      GetItem(id.toLowerCase()).then(item => {
        setItem({ Id: item.Id, Section: item.Section, Verb: item.Verb, Past: item.Past, Translate: item.Translate, });
      })
    }
  }, [])

  return (
    <>
      <HeaderPage title={toFirstLetterUpperCase(urlRoot)} pageType="cadastrar" accessKey="v" textBt="Voltar" iconBt="fas fa-plus-circle me-2"></HeaderPage>
      <pre>
        {JSON.stringify(item, null, 2)}
      </pre>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <fieldset>
          <Row>
            <Col xs={12} lg={3} >
              <Form.Group className="mb-3" controlId="section">
                <Form.Label>Section</Form.Label>
                <Form.Control type="number" autoFocus required name="section" value={item.Section} onChange={e => setItem({ ...item, Section: e.target.value })}>
                </Form.Control>
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  set the field section
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfect!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={3} >
              <Form.Group className="mb-3" controlId="TipoEnvio">
                <Form.Label>Verb</Form.Label>
                <Form.Control type="text" required name="Verb" value={item.Verb} onChange={e => setItem({ ...item, Verb: e.target.value })}>
                </Form.Control>
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  set the field VERB
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfect!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={3} >
              <Form.Group className="mb-3" controlId="TipoEnvio">
                <Form.Label>Past</Form.Label>
                <Form.Control type="text" required name="Past" value={item.Past} onChange={e => setItem({ ...item, Past: e.target.value })}>
                </Form.Control>
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  set the field PAST
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfect!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={3} >
              <Form.Group className="mb-3" controlId="TipoEnvio">
                <Form.Label>Translate</Form.Label>
                <Form.Control type="text" required name="Translate" value={item.Translate} onChange={e => setItem({ ...item, Translate: e.target.value })}>
                </Form.Control>
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  set the field TRANSLATE
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfect!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </fieldset>
        <Row>
          <Col>
            <Button ref={btSubmit} type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Index;
