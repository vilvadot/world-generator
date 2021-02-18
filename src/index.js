import { UI } from "./ui/index";
import { Universe } from "./engine/universe";
import {Bus} from './engine/events'

const bus = new Bus();

new Universe(bus).bigBang();
new UI(bus).draw();
