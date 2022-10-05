import { Outlet } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../hooks";
import { useTranslation } from "react-i18next";

export const Root = () => {
  const { loggedIn, logOut } = useAuth();
  const { t } = useTranslation();

  const handleClick = () => {
    logOut();
  };

  return (
    <>
      <nav className="shadow-sm p-3 mb-5 bg-white rounded">
        <Container>
          <Row>
            <Col>
              <Stack direction="horizontal" gap={2}>
                <a href="/" className="navbar-brand">
                  {t("header.hexletLogo")}
                </a>
                {loggedIn && (
                  <Button
                    className="ms-auto"
                    variant="primary"
                    onClick={handleClick}
                  >
                    {t("header.exit")}
                  </Button>
                )}
              </Stack>
            </Col>
          </Row>
        </Container>
      </nav>
      <Outlet></Outlet>
    </>
  );
};
