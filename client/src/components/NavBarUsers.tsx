import { List, ListItem, ListItemText } from "@mui/material";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useEffect, useState } from "react";
import { apiPost } from "../apiServer/apiToServer";
import { useSetRecoilState } from "recoil";
import { atomDataClickedUser, atomNumRoom } from "../atom/atom";
import { sockets } from "./HomeMessages";
import { Socket, io } from "socket.io-client";
interface Data {
  _id: string;
  _fullName: string;
  _email: string;
  _dade_created: string;
}

const NavBarUsers = (props: { onInOpen: Function; open: boolean }) => {
  const [dataUsers, setDataUsers] = useState<Data[]>();
  const setAtomNumRoo = useSetRecoilState(atomNumRoom);
  const setClickedUser = useSetRecoilState(atomDataClickedUser);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("idMyUser")
  ); // Replace with the actual user ID
  // const [usersStatus, setUsersStatus] = useState<{ [userId: string]: boolean }>({});
  const [usersStatus, setUsersStatus] = useState<{ [userId: string]: boolean }>(
    {}
  );

  useEffect(() => {
    // Connect to the Socket.IO server
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    // Emit a 'userConnected' event when the user logs in
    newSocket.emit("userConnected", userId);

    // Listen for 'userStatusUpdate' events
    newSocket.on(
      "userStatusUpdate",
      (updatedUserId: string, isOnline: boolean) => {
        setUsersStatus((prevStatus) => ({
          ...prevStatus,
          [updatedUserId]: isOnline,
        }));
      }
    );

    // Clean up the socket connection on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    apiPost({ _id: localStorage.getItem("idMyUser") }, "getAllUsers")
      .then((data) => {
        setDataUsers(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const joinRoom = async (room: number) => {
    sockets.emit("join_room", room);
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
        dataUsers?.map((element, index) => {
          console.log(usersStatus);

          return (
            <List key={index}>
              <ListItem
                button
                onClick={async () => {
                  setClickedUser(element);
                  sendApi(element);
                  props.open !== true
                    ? props.onInOpen(true)
                    : props.onInOpen(false);
                }}
              >
                {usersStatus[element._id] && (
                  <PersonPinIcon
                    sx={{ position: "static", bottom: 0, left: 0, right: 0 }}
                    elevation={3}
                  />
                )}
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
