import { describe, it, test, expect } from 'bun:test';

describe("Get Gists", () => {
  it("Should return a list of Gists", () => {
    document.body.innerHTML = `<button>My button</button>`;
    const button = document.querySelector('button');
    expect(button?.innerText).toEqual('@My button');
  })
})

describe("Create Gists", () => {
  it("Should create a new gist", () => {
    expect(2 + 2).toEqual(4)
  })
})

