const MyDeco = () => {
  return (target: Function) => {
    console.log(target);
  };
};


@MyDeco()
export class Pokemon {
  constructor(
    public readonly id: number,
    public name: string,
  ) {
  }

  scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak() {
    console.log(`${this.name}, ${this.name}!!`);
  }
}

export const chaman = new Pokemon(4, 'chairman');
chaman.scream();
chaman.speak();
