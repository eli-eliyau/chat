import { List, ListItem, ListItemText } from "@mui/material";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useEffect, useState } from "react";
import { apiPost } from "../apiServer/apiToServer";
import { useSetRecoilState } from "recoil";
import { atomDataClickedUser, atomNumRoom } from "../atom/atom";
import { sockets } from "./HomeMessages";
import { Socket, io } from "socket.io-client";
import MouseToolbar from "./MouseToolbar";
interface Data {
  _id: string;
  _fullName: string;
  _email: string;
  _connected: boolean;
  _dade_created: string;
}

const NavBarUsers = (props: { onInOpen: Function; open: boolean }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("idMyUser")
  );
  const [usersStatus, setUsersStatus] = useState<{ [userId: string]: boolean }>(
    {}
  );
  const [dataUsers, setDataUsers] = useState<Data[]>();
  const [listIndex, setListIndex] = useState<number>();

  const setAtomNumRoo = useSetRecoilState(atomNumRoom);
  const setClickedUser = useSetRecoilState(atomDataClickedUser);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    newSocket.emit("userConnected", userId);

    newSocket.on(
      "userStatusUpdate",
      (updatedUserId: string, isOnline: boolean) => {
        setUsersStatus((prevStatus) => ({
          ...prevStatus,
          [updatedUserId]: isOnline,
        }));
      }
    );

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    apiPost({ _id: localStorage.getItem("idMyUser") }, "getAllUsers")
      .then((data) => {
        console.log(data);

        setDataUsers(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const sendApi = async (element: Data) => {
    const room = await apiPost(
      [{ _id: element._id }, { _id: localStorage.getItem("idMyUser") }],
      "numRoom"
    );
    setAtomNumRoo(room);
    room && sockets.emit("join_room", room);
  };

  const customStyles = {
    importantItem: {
      backgroundColor: '#d9e1e948', 
    },
    normalItem: {
      backgroundColor: '#83C1ED',
    },
  };
  return (
    <>
      {dataUsers ? (
        <>
          <MouseToolbar
            userName={localStorage.getItem("userName")?.toString()}
          ></MouseToolbar>
          {dataUsers?.map((element, index) => (
          <List key={index}   sx={(props.open ===true && index === listIndex) ? 
            customStyles.importantItem :customStyles.normalItem }>
              <ListItem
                button
                onClick={async () => {

                  setClickedUser(element);
                  sendApi(element);
                  setListIndex(index)
                  props.open !== true
                    ? props.onInOpen(true)
                    : props.onInOpen(false);
                }}
              >
                {usersStatus[element._id] !== false && (
                  <PersonPinIcon
                    sx={{ position: "static", bottom: 0, left: 0, right: 0 }}
                    elevation={3}
                  />
                )}
                <ListItemText
                  primary={element._fullName}
                  // secondary={element._id}
                />
              </ListItem>
            </List>
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
export default NavBarUsers;
