import { atom } from "recoil";

interface Data {
  _id: string;
  _fullName: string;
  _email: string;
  _dade_created: string;
}
export interface TypeMessage{
  text?: string ,
  user?: string| null, 
  userTo?:string ,
  date?:  string ,
  file?:  {
    name: string, url: string ,date:string
  }
}

export interface F1 {
  name: string, url: string
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

export const atomDataListMessages = atom<TypeMessage[] >({
  key: "DataMessages",
  default: [],
});



