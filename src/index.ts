import {generateUID} from "./uid";
import {UID, UIDReset, UIDConsumer, UIDFork} from "./Component";

const uid = generateUID();

export {
  generateUID,
  uid,

  UID,
  UIDConsumer,
  UIDReset,
  UIDFork
}