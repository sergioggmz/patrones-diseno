/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

interface MovementStrategy {
  move(): void;
}

// Estrategia #1 - Rápida pero costosa
class SwimFast implements MovementStrategy {
  move(): void {
    console.log("%cEl pato nada rápidamente sobre el agua", COLORS.blue);
  }
}
// Estrategia #2 - No tan rápida pero no tan costosa
class FlyOverWater implements MovementStrategy {
  move(): void {
    console.log("%cEl pato vuela elegantemente sobre el agua", COLORS.pink);
  }
}
// Estrategia #3 - Lenta y económica
class WalkClumsily implements MovementStrategy {
  move(): void {
    console.log("%cEl pato vuela torpemente sobre la orilla", COLORS.green);
  }
}

class Duck {
  private name: string;
  private movementStrategy: MovementStrategy;
  constructor(name: string, strategy: MovementStrategy) {
    this.name = name;
    this.movementStrategy = strategy;
    console.log(`%c${name} %clisto para competir`, COLORS.green, COLORS.white);
  }

  performMove() {
    console.log(`\n%c${this.name} se prepara para moverse...`, COLORS.white);
    this.movementStrategy.move();
  }

  setMovementStrategy(strategy: MovementStrategy) {
    this.movementStrategy = strategy;
    console.log(`\n%c${this.name} cambió de estrategia.`, COLORS.pink);
  }
}
function main() {
  console.log("%c=== INICIO DE LA CARRERA DE PATOS ===\n", COLORS.green);

  const duck1 = new Duck("Pátito rápido", new SwimFast());
  const duck2 = new Duck("Pátito volador", new FlyOverWater());
  const duck3 = new Duck("Pátito torpe", new WalkClumsily());

  console.log("\n%c--- Ronda 1: Estrategias iniciales ---", COLORS.yellow);
  duck1.performMove();
  duck2.performMove();
  duck3.performMove();

  console.log(
    "\n%c--- Ronda 2: Cambio de estrategias a mitad de la carrera ---",
    COLORS.yellow,
  );

  // El pátito torpe decide volar
  duck3.setMovementStrategy(new FlyOverWater());
  duck3.performMove();

  // El pátito rápido intenta caminar (mala decisión)
  duck1.setMovementStrategy(new WalkClumsily());
  duck1.performMove();

  console.log("\n%c=== FIN DE LA CARRERA ===\n", COLORS.green);
}

main();
