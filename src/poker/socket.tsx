import { Socket, Channel, Presence } from "phoenix";
import React, { createContext, useState, useContext, useEffect } from "react";
import { storage } from "./storage";

const PhoenixSocketContext = createContext<{ socket: Socket | null }>({
  socket: null,
});

type Props = {
  children: React.ReactNode;
};

export function PhoenixSocketProvider({ children }: Props) {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    // TODO: Use environment variable for URL
    const socket = new Socket("ws://localhost:4000/socket", {
      params: { token: storage.getToken() },
    });
    socket.connect();
    setSocket(socket);
  }, []);

  if (!socket) return null;

  return (
    <PhoenixSocketContext.Provider value={{ socket }}>
      {children}
    </PhoenixSocketContext.Provider>
  );
}

export function useChannel(channelName: string) {
  const [channel, setChannel] = useState<Channel>();
  const [error, setError] = useState<string>();
  const { socket } = useContext(PhoenixSocketContext);

  useEffect(() => {
    const phoenixChannel = socket?.channel(channelName);

    if (phoenixChannel) {
      // Now that you are connected, you can join channels with a topic:
      phoenixChannel
        .join()
        .receive("ok", (resp) => {
          console.log("Joined successfully", resp);
          setChannel(phoenixChannel);
        })
        .receive("error", (resp) => {
          console.error("Unable to join channel", resp);
          setError("Server Error");
        });
    }

    // leave the channel when the component unmounts
    return () => {
      if (phoenixChannel) {
        phoenixChannel.leave();
      }
    };
  }, [channelName, socket]);

  return { channel, error };
}

type SubscriptionArguments = {
  channel: Channel | undefined;
  event: string;
  callback: (response?: any) => void;
};

export function useSubscription({
  channel,
  event,
  callback,
}: SubscriptionArguments) {
  useEffect(() => {
    if (channel) {
      channel.on(event, callback);
    }
  }, [channel, event, callback]);
}

type PresenceSyncArguments = {
  channel: Channel | undefined;
  onJoin: (userUuid: string) => void;
  onLeave: (userUuid: string) => void;
};

export function usePresenceSync({
  channel,
  onJoin,
  onLeave,
}: PresenceSyncArguments) {
  useEffect(() => {
    if (channel) {
      const presence = new Presence(channel);
      presence.onJoin((userUuid) => {
        if (userUuid) {
          onJoin(userUuid);
        }
      });
      presence.onLeave((userUuid) => {
        if (userUuid) {
          onLeave(userUuid);
        }
      });
      // presence.onSync(() => {
      //   presence.list(cb);
      // });
    }
  }, [channel, onJoin, onLeave]);
}
