import GameBoard from "../../src/model/modules/GameBoard";

let testBoard = new GameBoard();
const testShipLength = 2;

beforeEach(() => {
  testBoard = new GameBoard();
});

it("returns a board of null values", () => {
  expect(testBoard.board[0][0]).toBe(null);
  expect(
    testBoard.board[testBoard.board.length - 1][testBoard.board.length - 1],
  ).toBe(null);
});

test("place() places ship at coordinates, in line", () => {
  testBoard.place(testShipLength, 0, 0);
  expect(testBoard.board[0][0]).not.toBe(null);
  expect(testBoard.board[0][1]).not.toBe(null);
});

test("place() returns error if ship is placed out of bounds", () => {
  const outOfBoundary = testBoard.board.length;
  expect(() =>
    testBoard.place(testShipLength, outOfBoundary, outOfBoundary),
  ).toThrow(Error);
  expect(() =>
    testBoard.place(testShipLength, outOfBoundary - 1, outOfBoundary - 1),
  ).toThrow(Error);
});

test("place() throws error if ship placement collides with another ship", () => {
  testBoard.place(1, 0, 1);
  testBoard.place(1, 1, 0);
  expect(() => testBoard.place(3, 0, 0)).toThrow(Error);
  expect(() => testBoard.place(3, 0, 0, 2)).toThrow(Error);
});

test("place() switches orientation", () => {
  testBoard.place(testShipLength, 0, 0, 2);
  expect(testBoard.board[0][0]).not.toBe(null);
  expect(testBoard.board[1][0]).not.toBe(null);
  expect(testBoard.board[0][1]).toBe(null);
});

test("receiveAttack() records ship hit and miss", () => {
  testBoard.place(1, 0, 0);
  testBoard.receiveAttack(0, 0);
  testBoard.receiveAttack(0, 1);
  expect(testBoard.board[0][0]).toBe(2);
  expect(testBoard.board[0][1]).toBe(3);
});

test("receiveAttack() throws error if target is already hit or missed", () => {
  testBoard.place(1, 0, 0);
  testBoard.receiveAttack(0, 0);
  expect(() => testBoard.receiveAttack(0, 0)).toThrow(Error);
});

test("allSunk() reports true if all ships are sunk, false if otherwise", () => {
  testBoard.place(1, 0, 0);
  expect(testBoard.allSunk()).toBe(false);
  testBoard.receiveAttack(0, 0);
  expect(testBoard.allSunk()).toBe(true);
});
