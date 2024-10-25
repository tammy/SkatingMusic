import { Program } from "@/src/@types";

export const programs: Program[] = [
  {
    id: "1",
    title: "Hustle and Bustle of Ormos",
    level: "Adult Pre-bronze",
    events: ["Sky Rink Classic", "Empire State Games"],
    file: require("../../assets/audio/Hustle and Bustle of Ormos.mp3"),
  },
  {
    id: "2",
    title: "Build me up buttercup",
    level: "Open",
    events: [],
    file: require("../../assets/audio/Build Me Up Buttercup cut.mp3"),
  },
  {
    id: "3",
    title: "Death approaches",
    level: "Adult Bronze",
    events: [],
    file: require("../../assets/audio/Death Approaches.mp3"),
  },
];
