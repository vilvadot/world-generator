import Markov from "markov-text";
import { randomIntegerBetween } from "../utils";

export const names =
  "Luna Deimos Phobos Ganymede Callisto Io Europa Amalthea Himalia Thebe Elara Pasiphae Metis Carme Sinope Lysithea Ananke Adrastea Leda Callirrhoe Themisto Praxidike Locaste Kalyke Megaclite Taygete Dia Eirene Autonoe Harpalyke Thyone Hermippe Chaldene Aoede Isonoe Helike Eukelade Carpo Arche Eurydome Euanthe Aitne Hegomone Erinome Ersa Sponde Kallichore Pasithee Kore Cyllene Euporie Thelxinoe Mneme Kale Pandia Eupheme Orthosie Herse Philphrosyne Valetudo Titan Rhea Iapetus Dione Tethys Enceladus Mimas Hyperion Phoebe Janus Epimetheus Prometheus Pandora Siarnaq Helene Albiorix Atlas Pan Telesto Paaliaq Calypso Ymir Kiviuq Tarvos Ijiraq Erriapus Skathi Hyrrokkin Daphnis Tarqeq Narvi Mundilfari Suttungr Thrymr Bestla Kari Skoll Bebhionm Loge Fornjot Pallene Aegir Bergelmir Greip Hati Jarnsaxa Surtur Farbauti Fenrir Methone Polydueces Anthe Aegaeon Titania Oberon Umbriel Ariel Miranda Sycorax Puck Portia Juliet Caliban Belinda Cressida Rosalind Desdemona Bianca Ophelia Cordelia Perdita Prospero Setebos Mab Stephano Cupid Francisco Ferdinand Margeret Trinculo Triton Proteus Nereid Larissa Galatea Despina Thalassa Naiad Halimede Neso Sao Laomedeia Psamathe Hippocamp Charon Hydra Nix Kerberos Styx Orcus  Vanth Salacia  Actaea Haumea  Hi'iaka Namaka Quaoar  Weywot Makemake  Varda  Illmare Gonggong Xiangliu Eris Dysnomia";

export class NameGenerator {
  static generate() {
    const length = randomIntegerBetween(1, 12);

    this.generator = new Markov({
      order: 3,
      mode: "single",
    });
    this.generator.seed(names);

    return this.generator.generate(length);
  }
}
