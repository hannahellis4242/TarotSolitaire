const createOption = (
  scene: Phaser.Scene,
  x: number,
  y: number,
  label: string,
  colours: { base: string; hover: string },
  onClick: () => void
) => {
  const button = new Phaser.GameObjects.Text(scene, x, y, label, {
    color: colours.base,
    fontSize: "32px",
  })
    .setOrigin(0.5)
    .setInteractive();
  button.on("pointerover", () => {
    button.setColor(colours.hover);
  });
  button.on("pointerout", () => {
    button.setColor(colours.base);
  });
  button.on("pointerdown", onClick);
  return button;
};

export default createOption;
