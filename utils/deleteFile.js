// importing inbuilt modules
import fs from "fs";

export default function deleteFile(path) {
  fs.unlinkSync(path);
}
