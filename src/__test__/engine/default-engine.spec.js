import DefaultEngine from "../../engine/default-engine";

it("returns a default engine object", () => {
  const engine = new DefaultEngine(null);
  expect(engine).toBeTruthy();
});
