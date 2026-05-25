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
    title: "Build Me Up Buttercup",
    artist: "The Foundations",
    level: "Open",
    events: [],
    file: require("../../assets/audio/Build Me Up Buttercup cut.mp3"),
  },
  {
    id: "3",
    title: "Death Approaches",
    level: "Adult Bronze",
    events: [],
    file: require("../../assets/audio/Death Approaches.mp3"),
  },
];
