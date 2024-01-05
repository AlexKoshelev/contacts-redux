import React, { memo } from "react";

import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { FilterForm, FilterFormValues } from "src/components/FilterForm";

import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { filtredActionCreator } from "src/redux/actions";

export const ContactListPage = memo(() => {
  const findContacts = useAppSelector((state) => state.contacts.findContacts);
  const dispatch = useAppDispatch();
  const onSubmit = (fv: Partial<FilterFormValues>) => {
    dispatch(filtredActionCreator(fv.name!, fv.groupId!));
  };

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm initialValues={{}} onSubmit={onSubmit} />
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {findContacts.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
});
