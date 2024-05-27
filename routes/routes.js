import express from "express";
const router = express.Router();
import path from "path";
const __dirname = import.meta.dirname;
import { addRoommate, getRoommates} from "../controllers/roomControllers.js";
import { addGasto, getGastos, editarGasto, borrarGasto} from "../controllers/gastosControllers.js";

routes.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.post("/roommate", addRoommate );

router.get("/roommates", getRoommates);

router.get("/gastos",getGastos);

router.post("/gasto",addGasto);

router.put("/gasto", editarGasto);

router.delete("/gasto",borrarGasto)

export default router;