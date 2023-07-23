import React from "react";

interface Type {
  id: string | undefined;
  fullName: string | undefined;
  dadeCreated: string | undefined;
}

const ContextDataUser = React.createContext({
  id: "",
  fullName: "",
  dadeCreated: "",
});

const ContextDataUsers = React.createContext({});

export { ContextDataUser, ContextDataUsers };
