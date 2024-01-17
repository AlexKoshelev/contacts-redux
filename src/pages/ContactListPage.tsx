import React, { memo } from "react";

import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { FilterForm, FilterFormValues } from "src/components/FilterForm";

import { useAppSelector } from "src/redux/hooks";

import { useDispatch } from "react-redux";
import {
  filtredContacts,
  useGetContactsQuery,
  useGetGroupsQuery,
} from "src/redux/contactsReducer";

export const ContactListPage = memo(() => {
  const dispatch = useDispatch();
  const { data: contacts } = useGetContactsQuery();
  const groups: [] = [];
  /*   const { data: groups } = useGetGroupsQuery(); */
  console.log("fd");

  console.log("contacts", contacts);
  /*   console.log("groups", groups); */

  const { loading } = useAppSelector((state) => state.contacts.contacts);
  console.log("loading", loading);

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    if (contacts?.length !== 0 && groups?.length !== 0) {
      dispatch(
        filtredContacts({
          name: fv.name!,
          groupId: fv.groupId!,
          contacts,
          groups,
          loading: false,
        })
      );
    }
  };
  const findContacts = useAppSelector((state) => state.contacts.findContacts);
  return (
    <Row xxl={1}>
      {loading ? (
        "loading"
      ) : (
        <>
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
        </>
      )}
    </Row>
  );
});
