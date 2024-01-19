import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { GroupContactsCard } from "src/components/GroupContactsCard";
import { Empty } from "src/components/Empty";
import { ContactCard } from "src/components/ContactCard";
import { observer } from "mobx-react-lite";
import { store } from "src/store/contactsStore";

export const GroupPage = observer(() => {
  const { groupId } = useParams<{ groupId: string }>();
  const { groups, contacts } = store;
  const selectedGroup = groups.find((group) => group.id === groupId);
  const currentGroupContacts = contacts.filter((contact) =>
    selectedGroup?.contactIds.includes(contact.id)
  );
  return (
    <Row className="g-4">
      {groups ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={selectedGroup!} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className="g-4">
              {currentGroupContacts.map((contact) => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : (
        <Empty />
      )}
    </Row>
  );
});
