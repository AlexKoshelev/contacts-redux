import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ContactCard } from "src/components/ContactCard";
import { Empty } from "src/components/Empty";
import { store } from "src/store/contactsStore";

export const ContactPage: FC = observer(() => {
  const { contactId } = useParams<{ contactId: string }>();
  const { findContacts } = store;
  const contact = findContacts.find((c) => c.id === contactId);
  return (
    <Row xxl={3}>
      <Col className={"mx-auto"}>
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
});
