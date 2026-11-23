import { Button, Container, Modal } from "@mui/material";
import miamiam from "./assets/miammiam.png";
import { RecipeList } from "./components/RecipeList";
import { PageLayout } from "./components/PageLayout";
import { RecipeForm } from "./components/RecipeForm";
import { useState } from "react";

const App = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

          <Button
            sx={{ position: "fixed", translate: 25 }}
            variant="contained"
            onClick={handleOpen}
          >
            Add recept
          </Button>
        </Container>

        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            display: "flex",
            backdropFilter: "hue-rotate(160deg)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RecipeForm />
        </Modal>

        <Container>
          <RecipeList />
        </Container>
      </PageLayout>
    </>
  );
};
export default App;
