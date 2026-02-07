import { synologyChatPlugin } from "./src/channel.js";
import { setSynologyChatRuntime } from "./src/runtime.js";

export default function register(api: any) {
  setSynologyChatRuntime(api.runtime);
  api.registerChannel({ plugin: synologyChatPlugin });
}
