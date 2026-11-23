import { Container } from "@mui/material";
import miamiam from "./assets/miammiam.png";
import { RecipeList } from "./components/RecipeList";
import { PageLayout } from "./components/PageLayout";

const App = () => {
  return (
    <>
      <PageLayout>
        <Container>
          <img
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            src={miamiam}
            alt="miamiam.png"
          />
        </Container>

        <Container>
          <RecipeList />
        </Container>
      </PageLayout>
    </>
  );
};
export default App;
