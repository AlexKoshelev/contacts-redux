import { Col, Row } from "react-bootstrap";
import { store } from "../store/contactsStore";
import { observer } from "mobx-react-lite";
import { FilterForm, FilterFormValues } from "src/components/FilterForm";
import { ContactCard } from "src/components/ContactCard";

export const ContactListPage = observer(() => {
  const { isLoading, error, getFilterContacts, findContacts } = store;

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    getFilterContacts({ name: fv.name!, groupId: fv.groupId! });
  };

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm initialValues={{}} onSubmit={onSubmit} />
      </Col>
      {isLoading && "Загрузка"}
      {error && "Ошибка"}
      <Col>
        <Row xxl={4} className="g-4">
          {findContacts.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>{" "}
    </Row>
  );
});
