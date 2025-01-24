import { AppResponse } from "@/interface/app/AppResponse";
import { BettorOfDucks, DuckPicked, IGame } from "@/interface/game/Game";
import { useSocket } from "@/providers/SocketProvider";
import useGameStore from "@/stores/gameStore";
import { useEffect, useRef, useState } from "react";
import ListPlayer from "./ListPlayer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SocketEvents } from "@/constants/SocketEvents";
import ModalUser from "./ModalShowUser";
import { ROUTES } from "@/routes/path";
import CountdownTime from "./components/CountdownTime";
import useUserStore from "@/stores/userStore";
import ModalShowResult from "./ModalShowResult";
import ModalSetup from "./ModalSetup";
import { MezonAppEvent, MezonWebViewEvent } from "@/types/webview";
import { IDuck, IMezonClan, IMezonUser, Room } from "@/interface/room/Room";
import useRoomStore from "@/stores/roomStore";
import ModalBet from "./ModalBet";
import { toast } from "react-toastify";
import ModalShowRank from "./ModalShowRank";

const GamePage = () => {
  const socket = useSocket();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gameId = searchParams.get("gameId");
  const { roomId } = useParams();
  const navigate = useNavigate();
  const listDuckPickedRef = useRef<DuckPicked[]>([]);
  const {
    setCurrentGame,
    setOpenModalBet,
    setIsRacing,
    setIsResetGame,
    setGameStatus,
    setIsCompletedAll,
    setListBettorOfDucks,
    isRacing,
    gameStatus,
    setListDuckPicked,
    setIsConfirmedBet,
    listDuckPicked,
  } = useGameStore();
  const {
    setCurrentRoom,
    setAddDuckText,
    currentRoom,
    setOpenModalShowUser,
    listDucks,
    setMezonClanRoles,
    setMezonClanUsers,
    setSelectedClanRole,
    setListDucks,
    setTabs,
    setTotalDucks,
    setOpenModalShowRank,
    setOpenModalShowResult,
  } = useRoomStore();
  const { currentUser } = useUserStore();
  const [listDuckToShow, setListDuckToShow] = useState<IDuck[]>([]);

  useEffect(() => {
    if (!socket || !roomId) return;
    socket.emit(SocketEvents.EMIT.GET_ROOM_INFO, roomId);
    socket.on(SocketEvents.ON.GET_ROOM_INFO_SUCCESS, (data: AppResponse<Room>) => {
      setCurrentRoom(data.data as Room);
      setListDucks(data.data?.ducks || []);
      setTotalDucks(data.data?.totalDuck || 0);
      navigate(`${ROUTES.ROOM_DETAIL.replace(":roomId", (data.data as Room).roomId)}?gameId=${(data.data as Room).currentGame}`);
    });
    socket.on(SocketEvents.ON.GET_ROOM_INFO_FAILED, (data: AppResponse<null>) => {
      console.log("GamePage -> data", data);
    });
    socket.on(SocketEvents.ON.GET_DUCKS_OF_ROOM_SUCCESS, (data: AppResponse<IDuck[]>) => {
      console.log("GamePage -> data", data);
      setListDucks(data.data || []);
      setTotalDucks(data.data?.length || 0);
    });
    socket.on(SocketEvents.ON.GET_DUCKS_OF_ROOM_FAILED, (data: AppResponse<null>) => {
      console.log("GamePage -> data", data);
    });
    socket.on(SocketEvents.ON.REMOVE_USER_FROM_GAME_SUCCESS, (data: AppResponse<Room>) => {
      setCurrentRoom(data.data as Room);
      setListDucks(data.data?.ducks || []);
      setTotalDucks(data.data?.totalDuck || 0);
    });
    socket.on(SocketEvents.ON.REMOVE_USER_FROM_GAME_FAILED, (data: AppResponse<null>) => {
      console.log(data.errorMessage);
    });
    socket.on(SocketEvents.ON.ADD_DUCK_TO_ROOM_FAILED, (data: AppResponse<null>) => {
      console.log(data.errorMessage);
    });
    socket.on(SocketEvents.ON.ADD_DUCK_TO_ROOM_SUCCESS, (data: AppResponse<IGame>) => {
      console.log(data);
      setAddDuckText("");
      setTabs("list-user");
    });
    socket.on(SocketEvents.ON.UPDATE_LIST_DUCK_OF_ROOM_SUCCESS, (data: AppResponse<Room>) => {
      setCurrentRoom(data.data as Room);
      setListDucks(data.data?.ducks || []);
      setTotalDucks(data.data?.totalDuck || 0);
      setTabs("list-user");
    });
    socket.on(SocketEvents.ON.UPDATE_LIST_DUCK_OF_ROOM_FAILED, (data: AppResponse<null>) => {
      console.log(data.errorMessage);
    });
    return () => {
      socket.off(SocketEvents.ON.GET_ROOM_INFO_SUCCESS);
      socket.off(SocketEvents.ON.GET_ROOM_INFO_FAILED);
      socket.off(SocketEvents.ON.GET_DUCKS_OF_ROOM_SUCCESS);
      socket.off(SocketEvents.ON.GET_DUCKS_OF_ROOM_FAILED);
      socket.off(SocketEvents.ON.REMOVE_USER_FROM_GAME_SUCCESS);
      socket.off(SocketEvents.ON.REMOVE_USER_FROM_GAME_FAILED);
      socket.off(SocketEvents.ON.ADD_DUCK_TO_ROOM_FAILED);
      socket.off(SocketEvents.ON.ADD_DUCK_TO_ROOM_SUCCESS);
      socket.off(SocketEvents.ON.UPDATE_LIST_DUCK_OF_ROOM_SUCCESS);
      socket.off(SocketEvents.ON.UPDATE_LIST_DUCK_OF_ROOM_FAILED);
    };
  }, [navigate, roomId, setCurrentRoom, setListDucks, setTotalDucks, socket]);

  useEffect(() => {
    setOpenModalShowUser(true);
    setIsRacing(false);
    setIsCompletedAll(false);
  }, [setIsCompletedAll, setIsRacing, setOpenModalShowUser]);

  useEffect(() => {
    if (listDucks.length === 0) {
      return;
    }
    const newList = listDucks.sort((a, b) => b.score.totalScore - a.score.totalScore);
    setListDuckToShow(newList.slice(0, 3));
  }, [listDucks]);

  useEffect(() => {
    if (!socket || !gameId) return;
    socket.on(SocketEvents.ON.LEFT_ROOM_SUCCESS, () => {
      setCurrentGame(null);
      setListDucks([]);
      setTotalDucks(0);
      navigate(ROUTES.ROOM);
    });
    socket.on(SocketEvents.ON.OUT_ROOM_FAILED, (data: AppResponse<null>) => {
      console.log("GamePage -> data", data);
      navigate(ROUTES.HOME);
    });

    socket.on(SocketEvents.ON.START_GAME_SUCCESS, (data: AppResponse<Room>) => {
      setListDucks(data.data?.ducks || []);
      setTotalDucks(data.data?.totalDuck || 0);
      setIsRacing(true);
      setIsResetGame(false);
      setGameStatus("racing");
      setIsCompletedAll(false);

      if (countdownRef.current) {
        countdownRef.current.startCountdown();
      }
    });
    socket.on(SocketEvents.ON.START_GAME_FAILED, (data: AppResponse<null>) => {
      console.log("GamePage -> data", data);
    });
    socket.on(SocketEvents.ON.START_TURN_SUCCESS, (data: AppResponse<Room>) => {
      setListDucks(data.data?.ducks || []);
      console.log("GamePage -> startTurn", data);
    });
    socket.on(SocketEvents.ON.START_TURN_FAILED, (data: AppResponse<null>) => {
      console.log("GamePage -> data", data);
    });
    socket.on(SocketEvents.ON.CREATE_NEW_GAME_SUCCESS, (data: AppResponse<Room>) => {
      console.log("reset game", data);
      setCurrentRoom(data.data as Room);
      setListDucks(data.data?.ducks || []);
      setTotalDucks(data.data?.totalDuck || 0);
      setIsRacing(false);
      setIsResetGame(true);
      setGameStatus("waiting");
      setIsCompletedAll(false);
      setOpenModalShowRank(false);
      setOpenModalShowResult(false);
      setListDuckPicked([]);
      setIsConfirmedBet(false);
      navigate(`${ROUTES.ROOM_DETAIL.replace(":roomId", (data.data as Room).roomId)}?gameId=${(data.data as Room).currentGame}`);
      if (countdownRef.current) {
        countdownRef.current.resetCountdown();
      }
    });
    socket.on(SocketEvents.ON.CREATE_NEW_GAME_FAILED, (data: AppResponse<null>) => {
      console.log("reset game", data);
      console.log("GamePage -> data", data);
    });
    socket.on(SocketEvents.ON.CHANGE_TIME_SUCCESS, (data: AppResponse<Room>) => {
      setCurrentRoom(data.data as Room);
    });
    socket.on(SocketEvents.ON.CHANGE_TIME_FAILED, (data: AppResponse<null>) => {
      console.log("GamePage -> data", data);
    });
    socket.on(SocketEvents.ON.START_BET_SUCCESS, () => {
      setGameStatus("betting");
      setOpenModalBet(true);
    });
    socket.on(SocketEvents.ON.START_BET_FAILED, (data: AppResponse<null>) => {
      console.log("GamePage -> data", data);
    });
    socket.on(SocketEvents.ON.END_BET, (data: AppResponse<null>) => {
      console.log("GamePage -> ENDBET", data);
      setOpenModalBet(false);
    });
    socket.on(SocketEvents.ON.START_GAME_NOW, () => {
      socket.emit(SocketEvents.EMIT.START_GAME, {
        gameId,
        roomId,
        userId: currentUser?.id,
      });
      setGameStatus("racing");
    });
    socket.on(SocketEvents.ON.GET_GAME_BETTORS_SUCCESS, (data: AppResponse<BettorOfDucks[]>) => {
      console.log("GamePage -> data", data);
      setListBettorOfDucks(data.data || []);
    });
    return () => {
      socket.off(SocketEvents.ON.START_GAME_SUCCESS);
      socket.off(SocketEvents.ON.START_TURN_FAILED);
      socket.off(SocketEvents.ON.START_TURN_SUCCESS);
      socket.off(SocketEvents.ON.START_GAME_FAILED);
      socket.off(SocketEvents.ON.LEFT_ROOM_SUCCESS);
      socket.off(SocketEvents.ON.LEFT_ROOM_FAILED);
      socket.off(SocketEvents.ON.CREATE_NEW_GAME_SUCCESS);
      socket.off(SocketEvents.ON.CREATE_NEW_GAME_FAILED);
      socket.off(SocketEvents.ON.CHANGE_TIME_SUCCESS);
      socket.off(SocketEvents.ON.CHANGE_TIME_FAILED);
      socket.off(SocketEvents.ON.START_BET_SUCCESS);
      socket.off(SocketEvents.ON.START_BET_FAILED);
      socket.off(SocketEvents.ON.END_BET);
      socket.off(SocketEvents.ON.START_GAME_NOW);
    };
  }, [
    setListDucks,
    setTotalDucks,
    socket,
    gameId,
    setCurrentGame,
    navigate,
    setIsRacing,
    setIsResetGame,
    setGameStatus,
    setIsCompletedAll,
    setOpenModalBet,
    roomId,
    currentUser?.id,
    setListBettorOfDucks,
    setCurrentRoom,
  ]);

  useEffect(() => {
    window.Mezon.WebView?.postEvent("GET_CLAN_USERS" as MezonWebViewEvent, {}, () => {});
    window.Mezon.WebView?.onEvent("CLAN_USERS_RESPONSE" as MezonAppEvent, (_, data) => {
      setMezonClanUsers(data as IMezonUser[]);
    });
    window.Mezon.WebView?.postEvent("GET_CLAN_ROLES" as MezonWebViewEvent, {}, () => {});
    window.Mezon.WebView?.onEvent("CLAN_ROLES_RESPONSE" as MezonAppEvent, (_, data) => {
      setMezonClanRoles(data as IMezonClan[]);
      if ((data as IMezonClan[]).length > 0) {
        setSelectedClanRole((data as IMezonClan[])[0].id);
      }
    });
  }, [setMezonClanRoles, setMezonClanUsers, setSelectedClanRole]);

  useEffect(() => {
    listDuckPickedRef.current = listDuckPicked;
  }, [listDuckPicked]);
  useEffect(() => {
    if (!socket) return;
    window.Mezon.WebView?.onEvent("SEND_TOKEN_RESPONSE_SUCCESS" as MezonAppEvent, () => {
      socket.emit(SocketEvents.EMIT.BET_FOR_DUCK, {
        ducks: listDuckPickedRef.current?.map((duck) => duck.duckId),
        gameId: currentRoom?.currentGame,
        userId: currentUser.id,
        betAmount: currentRoom?.roomInfo.roomBet ?? 1,
        roomId: currentRoom?.roomId,
      });
      setIsConfirmedBet(true);
    });
    window.Mezon.WebView?.onEvent("SEND_TOKEN_RESPONSE_FAILED" as MezonAppEvent, (_, response: any) => {
      console.log("send token failed", response);
    });
    return () => {
      window.Mezon.WebView?.offEvent("SEND_TOKEN_RESPONSE_SUCCESS" as MezonAppEvent, () => {});
      window.Mezon.WebView?.offEvent("SEND_TOKEN_RESPONSE_FAILED" as MezonAppEvent, () => {});
    };
  }, [currentRoom?.currentGame, currentRoom?.roomId, currentRoom?.roomInfo.roomBet, currentUser.id, setIsConfirmedBet, socket]);

  const countdownRef = useRef<{ startCountdown: () => void; resetCountdown: () => void }>(null);

  const handleStartGame = () => {
    if (!socket) return;
    if (gameStatus !== "waiting") {
      toast.warning("Game is racing, please wait for the next game");
      return;
    }
    if (currentRoom?.ownerId !== currentUser.id) {
      toast.warning("You are not the owner of this room");
      return;
    }
    if (listDucks.length < 5) {
      toast.warning("You need at least 5 ducks to start the game");
      return;
    }
    socket.emit(SocketEvents.EMIT.START_BET, {
      gameId,
      roomId,
      userId: currentUser?.id,
    });
  };

  const handleResetGame = () => {
    if (!socket) return;
    if (gameStatus === "racing") {
      toast.warning("Game is racing, you can't reset game");
      return;
    }
    if (currentRoom?.ownerId !== currentUser.id) {
      toast.warning("You are not the owner of this room");
      return;
    }
    socket.emit(SocketEvents.EMIT.CREATE_NEW_GAME, {
      roomId,
      userId: currentUser?.id,
    });
  };

  const handleOutGame = () => {
    if (!socket) return;
    socket.emit(SocketEvents.EMIT.LEFT_ROOM, {
      roomId,
      userId: currentUser?.id,
    });
  };
  return (
    <div className='h-full w-full bg-[#21107266] rounded-lg relative'>
      <ListPlayer />
      <div className='absolute top-2 left-0 w-full flex justify-center items-center'>
        <div
          onClick={handleOutGame}
          className='w-[60px] h-[60px] flex justify-center items-center cursor-pointer absolute top-0 left-2 hover:scale-[0.98] transition-all active:scale-[1.0]'
        >
          <img src='/Buttons/SmallButton-pressed.png' />
          <img className='w-[30px] absolute top-[12px] left-[12px]' src='/Icons/ExitIcon.png' />
        </div>
        <div
          className='w-[500px] h-[150px] flex justify-center items-center absolute top-0 left-[50%] translate-x-[-50%]'
          style={{ filter: "drop-shadow(0 0 .3rem rgba(124, 6, 226, .874))" }}
        >
          <img className='w-full h-full' src='/Window/SmallSubstrate.png' />
          <div className='w-[150px] h-[55px] justify-center items-center left-[10px] absolute top-[20px] '>
            <img className='w-full h-full' src='/Buttons/Button-hover.png' />
            <CountdownTime ref={countdownRef} initTime={currentRoom?.expiredTime} />
          </div>
          {isRacing ? (
            <button
              onClick={handleResetGame}
              disabled={gameStatus === "racing"}
              className='w-[150px] h-[55px] cursor-pointer justify-center items-center left-[10px] absolute bottom-[10px] filter hover:drop-shadow-[0_0_0.1rem_rgba(124,6,226,0.874)] transition-all active:drop-shadow-[0_0_0.2rem_rgba(124,6,226,0.874)]'
            >
              <img
                className='w-full h-full'
                src={
                  gameStatus !== "waiting" || currentRoom?.ownerId !== currentUser.id
                    ? "/Buttons/Button-disabled.png"
                    : "/Buttons/Button.png"
                }
              />
              <div className='flex  justify-center items-center gap-2 text-[30px] font-titan text-white absolute top-1 left-1/2 transform -translate-x-1/2 '>
                <img className='w-[20px] ' src='/Icons/RefreshIcon.png' />
                <span>Reset</span>
              </div>
            </button>
          ) : (
            <button
              onClick={handleStartGame}
              disabled={gameStatus !== "waiting"}
              className='w-[150px] h-[55px] cursor-pointer justify-center items-center left-[10px] absolute bottom-[10px] filter hover:drop-shadow-[0_0_0.1rem_rgba(124,6,226,0.874)] transition-all active:drop-shadow-[0_0_0.2rem_rgba(124,6,226,0.874)]'
            >
              <img
                className='w-full h-full'
                src={
                  gameStatus !== "waiting" || currentRoom?.ownerId !== currentUser.id
                    ? "/Buttons/Button-disabled.png"
                    : "/Buttons/Button.png"
                }
              />
              <div className='flex  justify-center items-center gap-2 text-[30px] font-titan text-white absolute top-1 left-1/2 transform -translate-x-1/2 '>
                <img className='w-[20px] ' src='/Icons/PlayIcon.png' />
                <span>Start</span>
              </div>
            </button>
          )}
          <div
            style={{ filter: "drop-shadow(0 0 .3rem rgba(124, 6, 226, .874))" }}
            className='w-[300px] h-[130px] justify-center items-center right-[10px] absolute top-[50%] translate-y-[-50%] '
          >
            <img className='w-full h-full' src='/Window/SmallSubstrate.png' />
            <div className=' items-center w-full py-1 px-3 text-[20px] font-titan text-white absolute top-2 left-1/2 transform -translate-x-1/2 '>
              {gameStatus !== "waiting" &&
                listDuckToShow?.map((player, index) => (
                  <div key={index} className='flex items-center gap-2'>
                    <div className="bg-[url('/Icons/StarIcon.png')] flex items-center justify-center bg-center bg-no-repeat bg-cover w-[35px] h-[35px]">
                      {index + 1}
                    </div>
                    <span>{player.name ?? player.user?.display_name}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {currentRoom?.ownerId === currentUser.id ? (
          <>
            <ModalShowResult onResetGame={handleResetGame} />
            <ModalBet />
            <ModalUser />
            <ModalSetup />
            <ModalShowRank />
          </>
        ) : (
          <>
            <ModalShowResult onResetGame={handleResetGame} />
            <ModalShowRank />
            <ModalBet />
          </>
        )}
      </div>
    </div>
  );
};
export default GamePage;
