// stores/counterStore.ts
import { ICreateRoomData, IDuck, IMezonClan, IMezonUser, Room } from "@/interface/room/Room";
import { create } from "zustand";

interface RoomState {
  createRoomData: ICreateRoomData;
  listRoom: Room[];
  currentRoom: Room | null;
  listDucks: IDuck[];
  totalDucks: number;
  openModalShowUser: boolean;
  addDuckText: string;
  mezonClanRoles: IMezonClan[];
  selectedClanRole: string | null;
  mezonClanUsers: IMezonUser[];
  listMezonUser: IMezonUser[];
  tabs: string;
  openModalShowRank: boolean;
  openModalShowResult: boolean;

  setCreateRoomData: (data: ICreateRoomData) => void;
  resetCreateRoomData: () => void;
  setListRoom: (data: Room[]) => void;
  setCurrentRoom: (data: Room | null) => void;
  setListDucks: (data: IDuck[]) => void;
  setTotalDucks: (data: number) => void;
  setOpenModalShowUser: (openModalShowUser: boolean) => void;
  setAddDuckText: (addDuckText: string) => void;
  setMezonClanRoles: (mezonClanRoles: IMezonClan[]) => void;
  setSelectedClanRole: (selectedClanRole: string | null) => void;
  setMezonClanUsers: (mezonClanUsers: IMezonUser[]) => void;
  setListMezonUser: (listMezonUser: IMezonUser[] | []) => void;
  setTabs: (tabs: string) => void;
  setOpenModalShowRank: (openModalShowRank: boolean) => void;
  setOpenModalShowResult: (openModalShowResult: boolean) => void;
}

const useRoomStore = create<RoomState>((set) => ({
  createRoomData: {
    roomName: "",
    roomBet: 1,
  },
  listRoom: [],
  currentRoom: null,
  listDucks: [],
  totalDucks: 0,
  openModalShowUser: false,
  addDuckText: "",
  mezonClanRoles: [],
  selectedClanRole: null,
  mezonClanUsers: [],
  listMezonUser: [],
  tabs: "list-user",
  openModalShowRank: false,
  openModalShowResult: false,

  setCreateRoomData: (data: ICreateRoomData) => set({ createRoomData: data }),
  resetCreateRoomData: () => set({ createRoomData: { roomName: "", roomBet: 1 } }),
  setListRoom: (data: Room[]) => set({ listRoom: data }),
  setCurrentRoom: (data: Room | null) => set({ currentRoom: data }),
  setListDucks: (data: IDuck[]) => set({ listDucks: data }),
  setTotalDucks: (data: number) => set({ totalDucks: data }),
  setOpenModalShowUser: (openModalShowUser: boolean) => set({ openModalShowUser }),
  setAddDuckText: (addDuckText: string) => set({ addDuckText }),
  setMezonClanRoles: (mezonClanRoles: IMezonClan[]) => set({ mezonClanRoles }),
  setSelectedClanRole: (selectedClanRole: string | null) => set({ selectedClanRole }),
  setMezonClanUsers: (mezonClanUsers: IMezonUser[]) => set({ mezonClanUsers }),
  setListMezonUser: (listMezonUser: IMezonUser[] | []) => set({ listMezonUser }),
  setTabs: (tabs: string) => set({ tabs }),
  setOpenModalShowRank: (openModalShowRank: boolean) => set({ openModalShowRank }),
  setOpenModalShowResult: (openModalShowResult: boolean) => set({ openModalShowResult }),
}));

export default useRoomStore;
