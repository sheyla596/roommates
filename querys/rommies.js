import fs from "fs";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const apiUrl = "https://randomuser.me/api";
//API RandomUser

//agregar ✅
const addRandom = async (req, res) => {
  try {
    const dataApi = await axios.get(apiUrl);
    const randomUser = dataApi.data.results[0];
    const id = uuidv4().slice(4, 12);
    const roomie = {
      id,
      name: `${randomUser.name.first} ${randomUser.name.last}`,
      email: randomUser.email,
      debe: 0,
      recibe: 0,
    };
    const { roommates } = JSON.parse(
      fs.readFileSync("./data/roommates.json", "utf8")
    );
    roommates.push(roomie);
    fs.writeFileSync("./data/roommates.json", JSON.stringify({ roommates }));
    return roomie;
  } catch (error) {
    console.log(error.message);
  }
};

const getRandom = async (req, res) => {
  try {
    const roommatesUsers = await JSON.parse(
      fs.readFileSync("./data/roommates.json", "utf8")
    );
    return roommatesUsers;
  } catch (error) {
    console.log(error.message);
  }
};

const calcularCuentas = async() => {
  let { roommates } = JSON.parse(
    fs.readFileSync("./data/roommates.json", "utf8")
  );

  let { gastos } = JSON.parse(fs.readFileSync("./data/gastos.json", "utf8"));
  roommates.forEach((r) => {
    r.debe = 0;
    r.recibe = 0;
    r.total = 0;
  });
  gastos.forEach((g) => {
    const montoRoommie = g.monto / roommates.length;
    roommates.forEach((r) => {
      if (g.name === r.name) {
        r.recibe += montoRoommie * (roommates.length - 1);
      } else {
        r.debe -= montoRoommie;
      }
      r.total = r.recibe - r.debe;
    });
  });
  fs.writeFileSync("./data/roommates.json", JSON.stringify({ roommates }));
};

export { addRandom, getRandom, calcularCuentas };