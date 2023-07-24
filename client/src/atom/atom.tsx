import { atom } from "recoil";

interface Data {
  _id: string;
  _fullName: string;
  _email: string;
  _dade_created: string;
}
export interface Message{
  text: string ,
  user: string| null, 
  userTo:string | null
  timestamp:  string,
}


export const atomDataClickedUser = atom<Data>({
  key: "DataClickedUser",
  default: {
    _id: "",
    _fullName: "",
    _email: "",
    _dade_created: "",
  },
});

export const atomNumRoom = atom({
  key: "NumRoom",
  default: 0,
});

export const atomDataMessageFromAnother = atom<Message[]>({
  key: "DataMessage",
  default: [],
});

export const atomDataYourMessage = atom<Message[]>({
  key: "DataMessage",
  default: [],
});
