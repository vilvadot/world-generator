import { UI } from "./ui/index";
import { Universe } from "./universe";
import {Bus} from './events'

const bus = new Bus();

new Universe(bus).bigBang();
new UI(bus).draw();
