export default class GameZones {
  public foundation: Phaser.GameObjects.Zone[];
  public tableu: Phaser.GameObjects.Zone[];
  constructor() {
    this.foundation = [];
    this.tableu = [];
  }
  clear() {
    this.foundation = [];
    this.tableu = [];
  }
  build(scene: Phaser.Scene) {}
}
