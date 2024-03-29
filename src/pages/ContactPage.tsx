import React, { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ContactCard } from "src/components/ContactCard";
import { Empty } from "src/components/Empty";
import { useAppSelector } from "src/redux/hooks";

export const ContactPage: FC = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const contact = useAppSelector(
    (state) =>
      state.contacts.contacts.filter((contact) => contact.id === contactId)[0]
  );

  return (
    <Row xxl={3}>
      <Col className={"mx-auto"}>
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
};
