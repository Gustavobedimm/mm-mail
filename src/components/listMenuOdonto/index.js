import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import GroupIcon from '@mui/icons-material/Group';
import BallotIcon from '@mui/icons-material/Ballot';

export function ListOdonto(props) {

  const navigate = useNavigate();
  const goProcedimentos = () => {
    navigate("/procedimentos");
  };
  const goPacientes = () => {
    navigate("/pacientes");
  };
  return (
    <>
      <List
        sx={{ width: "100%", bgcolor: "background.paper", mt: 1 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Selecione o Item
          </ListSubheader>
        }
      >
        <ListItemButton
          onClick={() => {
            goProcedimentos();
          }}
        >
          <ListItemIcon>
            <BallotIcon />
          </ListItemIcon>
          <ListItemText primary="Procedimentos" />
        </ListItemButton>
        <Divider />
        {/*<ListItemButton
          onClick={() => {
            goPacientes();
          }}
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Pacientes" />
        </ListItemButton>*/}
        <Divider />
      </List>
    </>
  );
}
