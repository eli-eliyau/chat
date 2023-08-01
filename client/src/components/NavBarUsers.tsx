import { List, ListItem, ListItemText } from "@mui/material";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useEffect, useState } from "react";
import { apiPost } from "../apiServer/apiToServer";
import { useRecoilState, useSetRecoilState } from "recoil";
import { atomDataClickedUser, atomNumRoom } from "../atom/atom";
import { socket } from "./HomeMessages";

interface Data {
  _id: string;
  _fullName: string;
  _email: string;
  _dade_created: string;
}

const NavBarUsers = (props: { onInOpen: Function ,op:boolean}) => {
  const [dataUsers, setDataUsers] = useState<Data[]>();
  const setAtomNumRoo = useSetRecoilState(atomNumRoom);
  const setClickedUser = useSetRecoilState(atomDataClickedUser);

  useEffect(() => {
    apiPost({ _id: localStorage.getItem("idMyUser") }, "getAllUsers")
      .then((data) => {
        setDataUsers(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const joinRoom = async (room: number) => {
    socket.emit("join_room", room);
  };

  const sendApi = async (element: Data) => {
    const room = await apiPost(
      [{ _id: element._id }, { _id: localStorage.getItem("idMyUser") }],
      "numRoom"
    );
    setAtomNumRoo(room);
    room && joinRoom(room);
  };

  return (
    <>
      {dataUsers ? (
        dataUsers.map((element, index) => {
          return (
            <List>
              <ListItem
                button
                onClick={async () => {
                  setClickedUser(element);
                  sendApi(element);
                 props.op !== true ?  props.onInOpen(true):props.onInOpen(false)

                }}
                key={index}
              >
                <PersonPinIcon
                  sx={{ position: "static", bottom: 0, left: 0, right: 0 }}
                  elevation={3}
                />
                <ListItemText
                  primary={element._id}
                  secondary={element._fullName}
                />
              </ListItem>
            </List>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
export default NavBarUsers;
