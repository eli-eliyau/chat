import React, { useEffect, useState } from "react";
import { apiPost } from "../apiServer/apiToServer";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { atomDataClickedUser } from "../atom/atom";
import webpush from "web-push";

const notifications = (id: string) => {
  // const clickedUser = useRecoilValue(atomDataClickedUser);

  // apiPost(
  //   {
  //     _id_to_user: id,
  //     _id_from_user: localStorage.getItem("chatIdMyUser"),
  //     _message: `שלח לך הודעה ${localStorage.getItem("chatUserName")}`,
  //   },
  //   "notification"
  // ).then((res) => {
  //   console.log(res);
  //   if (localStorage.getItem("chatIdMyUser") === res._id_to_user) {
  //     sendMessageToFriend(res._message);

  //   } else {

  //   }
  // });
  const publicVapidKey =
    "BH67tm8cUd_PqcJMUQHLNBdbWccbBpY9-j1GEJ7pj2Ya0EgbBlOROJad_miVMyxL1S22lqf-d-JSx1le_wlYGn0";
  const send = async () => {
    const register = await navigator.serviceWorker.register("/worker.ts", {
      scope: "/",
    });

    console.log(123);

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: ` ${webpush.generateVAPIDKeys().publicKey}`,
    });

    apiPost(subscription ,'notification').then((res)=>{
      console.log('eli');
      
    }).catch((err)=>console.log(err)
    )
  };
  if ("serviceWorker" in navigator) {
    send().catch((err) => console.error(err));
  }

  const sendMessageToFriend = (message: string) => {
    const notificationTitle = "הודעה חדשה";
    const notificationContent = `שלום, יש לך הודעה חדשה מחבר ${message}`;

    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("hh");

          new Notification(notificationTitle, {
            body: notificationContent,
          });
        }
      });
    }
  };
};

export default notifications;
