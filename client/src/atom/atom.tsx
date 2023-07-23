// recoilState.js
import { atom } from "recoil";

interface Data {
  _id: string;
  _fullName: string;
  _email: string;
  _dade_created: string;
}

interface YourMessage {
  yourMessage: string | undefined;
  messageFromAnother: string | undefined;
}

interface MessageFromAnother {
  messageFromAnother: string | undefined;
}

// export const atomDataUser = atom({
//   key: "DataUser",
//   default: {},
// });
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

export const atomDataMessageFromAnother = atom<MessageFromAnother[]>({
  key: "DataMessage",
  default: [
    {
      messageFromAnother: "",
    },
  ],
});

export const atomDataYourMessage = atom<YourMessage[]>({
  key: "DataMessage",
  default: [
    {
      yourMessage: "a",
      messageFromAnother: "x",
    },
    {
      yourMessage: "v",
      messageFromAnother: "z",
    },
    {
      yourMessage: "y",
      messageFromAnother: "h",
    },
    {
      yourMessage: "k",
      messageFromAnother: "d",
    },
  ],
});
