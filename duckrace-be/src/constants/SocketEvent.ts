export const SocketEvents = {
  ON: {
    USER_CONNECTION: "userConnection",
    USER_DISCONNECT: "disconnect",
    USER_VISIT_GAME: "userVisitGame",
    GET_LIST_USERS: "getListUsers",

    CREATE_GAME: "createGame",
    START_GAME: "startGame",
    START_TURN: "startTurn",
    GET_GAME: "getGame",
    ADD_USER_TO_GAME: "addUserToGame",
    REMOVE_USER_FROM_GAME: "removeUserFromGame",
    OUT_GAME: "outGame",
    RESET_GAME: "resetGame",
    CHANGE_TIME: "changeTime",
    UPDATE_USER_OF_GAME: "updateUserOfGame",
  },
  EMIT: {
    USER_CONNECTED: "userConnected",
    USER_DISCONNECTED: "userDisconnected",
    USER_VISIT_GAME_SUCCESS: "userVisitGameSuccess",
    USER_VISIT_GAME_FAILED: "userVisitGameFailed",
    GET_LIST_USERS_SUCCESS: "getListUsersSuccess",
    GET_LIST_USERS_FAILED: "getListUsersFailed",

    CREATE_GAME_SUCCESS: "createGameSuccess",
    CREATE_GAME_FAILED: "createGameFailed",
    START_GAME_SUCCESS: "startGameSuccess",
    START_GAME_FAILED: "startGameFailed",
    START_TURN_SUCCESS: "startTurnSuccess",
    START_TURN_FAILED: "startTurnFailed",
    GET_GAME_SUCCESS: "getGameSuccess",
    GET_GAME_FAILED: "getGameFailed",
    ADD_USER_TO_GAME_SUCCESS: "addUserToGameSuccess",
    ADD_USER_TO_GAME_FAILED: "addUserToGameFailed",
    REMOVE_USER_FROM_GAME_SUCCESS: "removeUserFromGameSuccess",
    REMOVE_USER_FROM_GAME_FAILED: "removeUserFromGameFailed",
    OUT_GAME_SUCCESS: "outGameSuccess",
    OUT_GAME_FAILED: "outGameFailed",
    RESET_GAME_SUCCESS: "resetGameSuccess",
    RESET_GAME_FAILED: "resetGameFailed",
    CHANGE_TIME_SUCCESS: "changeTimeSuccess",
    CHANGE_TIME_FAILED: "changeTimeFailed",
    UPDATE_USER_OF_GAME_SUCCESS: "updateUserOfGameSuccess",
    UPDATE_USER_OF_GAME_FAILED: "updateUserOfGameFailed",
  },
};
