import { readMapCoords } from "./map";

async function run() {
  const data = await readMapCoords();
  console.log("DATA", data);
}

run().catch((e) => console.log(e));
