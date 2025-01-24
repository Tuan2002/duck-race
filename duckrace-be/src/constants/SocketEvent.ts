export const SocketEvents = {
  ON: {
    USER_CONNECTION: "userConnection",
    USER_DISCONNECT: "disconnect",
    USER_VISIT_GAME: "userVisitGame",
    GET_LIST_USERS: "getListUsers",

    CREATE_ROOM: "createRoom",
    GET_LIST_ROOMS: "getListRooms",
    JOIN_ROOM: "joinRoom",
    LEFT_ROOM: "leftRoom",
    CHECK_ROOM_BEFORE_JOIN: "checkRoomBeforeJoin",
    GET_MEMBER_OF_ROOM: "getMemberOfRoom",
    GET_ROOM_INFO: "getRoomInfo",
    UPDATE_LIST_DUCK_OF_ROOM: "updateUserOfGame",
    ADD_DUCK_TO_ROOM: "addDuckToRoom",
    REMOVE_USER_FROM_GAME: "removeUserFromGame",

    CREATE_NEW_GAME: "createNewGame",
    START_GAME: "startGame",
    START_TURN: "startTurn",
    OUT_GAME: "outGame",
    RESET_GAME: "resetGame",
    CHANGE_TIME: "changeTime",
    GET_GAME_BETTORS: "getGameBettors",

    START_BET: "startBet",
    BET_FOR_DUCK: "betForDuck",
    END_BET: "endBet",
    GET_LIST_BET: "getListBet",
  },
  EMIT: {
    USER_CONNECTED: "userConnected",
    USER_DISCONNECTED: "userDisconnected",
    USER_VISIT_GAME_SUCCESS: "userVisitGameSuccess",
    USER_VISIT_GAME_FAILED: "userVisitGameFailed",
    GET_LIST_USERS_SUCCESS: "getListUsersSuccess",
    GET_LIST_USERS_FAILED: "getListUsersFailed",

    CREATE_ROOM_SUCCESS: "createRoomSuccess",
    CREATE_ROOM_FAILED: "createRoomFailed",
    GET_LIST_ROOMS_SUCCESS: "getListRoomsSuccess",
    GET_LIST_ROOMS_FAILED: "getListRoomsFailed",
    JOIN_ROOM_SUCCESS: "joinRoomSuccess",
    JOIN_ROOM_FAILED: "joinRoomFailed",
    LEFT_ROOM_SUCCESS: "leftRoomSuccess",
    LEFT_ROOM_FAILED: "leftRoomFailed",
    CHECK_ROOM_BEFORE_JOIN_SUCCESS: "checkRoomBeforeJoinSuccess",
    CHECK_ROOM_BEFORE_JOIN_FAILED: "checkRoomBeforeJoinFailed",
    GET_MEMBER_OF_ROOM_SUCCESS: "getMemberOfRoomSuccess",
    GET_MEMBER_OF_ROOM_FAILED: "getMemberOfRoomFailed",
    GET_ROOM_INFO_SUCCESS: "getRoomInfoSuccess",
    GET_ROOM_INFO_FAILED: "getRoomInfoFailed",
    GET_DUCKS_OF_ROOM_SUCCESS: "getDucksOfRoomSuccess",
    GET_DUCKS_OF_ROOM_FAILED: "getDucksOfRoomFailed",

    START_GAME_NOW: "startGameNow",
    START_GAME_SUCCESS: "startGameSuccess",
    START_GAME_FAILED: "startGameFailed",
    START_TURN_SUCCESS: "startTurnSuccess",
    START_TURN_FAILED: "startTurnFailed",
    ADD_DUCK_TO_ROOM_SUCCESS: "addDuckToRoomSuccess",
    ADD_DUCK_TO_ROOM_FAILED: "addDuckToRoomFailed",
    REMOVE_USER_FROM_GAME_SUCCESS: "removeUserFromGameSuccess",
    REMOVE_USER_FROM_GAME_FAILED: "removeUserFromGameFailed",
    OUT_GAME_SUCCESS: "outGameSuccess",
    OUT_GAME_FAILED: "outGameFailed",
    RESET_GAME_SUCCESS: "resetGameSuccess",
    RESET_GAME_FAILED: "resetGameFailed",
    CHANGE_TIME_SUCCESS: "changeTimeSuccess",
    CHANGE_TIME_FAILED: "changeTimeFailed",
    UPDATE_LIST_DUCK_OF_ROOM_SUCCESS: "updateUserOfGameSuccess",
    UPDATE_LIST_DUCK_OF_ROOM_FAILED: "updateUserOfGameFailed",
    CREATE_NEW_GAME_SUCCESS: "createNewGameSuccess",
    CREATE_NEW_GAME_FAILED: "createNewGameFailed",

    GET_GAME_BETTORS_SUCCESS: "getGameBettorsSuccess",
    GET_GAME_BETTORS_FAILED: "getGameBettorsFailed",
    START_BET_SUCCESS: "startBetSuccess",
    START_BET_FAILED: "startBetFailed",
    END_BET: "endBetSuccess",
    END_BET_SUCCESS: "endBetSuccess",
    END_BET_FAILED: "endBetFailed",
    BET_FOR_DUCK_SUCCESS: "betForDuckSuccess",
    BET_FOR_DUCK_FAILED: "betForDuckFailed",
    GET_LIST_BET_SUCCESS: "getListBetSuccess",
    GET_LIST_BET_FAILED: "getListBetFailed",
    END_GAME_SUCCESS: "endGameSuccess",
    END_GAME_FAILED: "endGameFailed",
  },
};
