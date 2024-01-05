import React, { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { useAppSelector } from "src/redux/hooks";
import { ContactDto } from "src/types/dto/ContactDto";

export const FavoritListPage = memo(() => {
  const favoriteContacts = useAppSelector((state) => {
    let favoriteContacts: ContactDto[] | [] = [];
    const favoriteContactsIdArr = state.contacts.favoritContactsId;
    for (let i = 0; i <= favoriteContactsIdArr.length; i++) {
      favoriteContacts = [
        ...favoriteContacts,
        ...state.contacts.contacts.filter(
          (contact) => contact.id === favoriteContactsIdArr[i]
        ),
      ];
    }
    return favoriteContacts;
  });
  return (
    <Row xxl={4} className="g-4">
      {favoriteContacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});
