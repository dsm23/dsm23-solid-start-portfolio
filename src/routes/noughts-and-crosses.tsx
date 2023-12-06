import {
  Component,
  JSX,
  createSignal,
  For,
  createEffect,
  mergeProps,
  splitProps,
} from "solid-js";
import cx from "clsx";
import { Anchor, Main } from "~/components/";
import { createStore } from "solid-js/store";
import StyledGoBack from "~/components/styled-go-back";

// import { SEO } from "../components/seo";

type Squares = (null | "X" | "O")[];

const Square: Component<JSX.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  const [local, others] = splitProps(props, ["children", "class", "onClick"]);

  return (
    <button
      {...others}
      class={cx("w-full h-20 md:h-40 border", local.class)}
      onClick={local.onClick}
    >
      {local.children}
    </button>
  );
};

const Board: Component<
  Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
    squares: Squares;
    onClick: (arg0: number) => void;
  }
> = (props) => (
  <div class="grid grid-cols-3 gap-0">
    <For each={Array.from({ length: 9 }, (_, i) => i)}>
      {(index) => (
        <Square
          onClick={() => props.onClick(index)}
          aria-label={`game board, position: ${index % 3} ${Math.floor(
            index / 3
          )}`}
        >
          {props.squares[index]}
        </Square>
      )}
    </For>
  </div>
);

const Game = () => {
  const [history, setHistory] = createStore<{ squares: Squares }[]>([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [stepNumber, setStepNumber] = createSignal(0);
  const [xIsNext, setNextPlayer] = createSignal(true);

  const current = () => history[stepNumber()];
  const winner = () => calculateWinner(current()?.squares ?? []);

  const handleClick = (i: number) => {
    // const history = state().history.slice(0, state().stepNumber + 1);
    // const current = history()[history().length - 1];
    const squares = current()?.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext() ? "X" : "O";

    setHistory((prevHistory) => [
      ...prevHistory,
      {
        squares,
      },
    ]);
    setStepNumber(history.length - 1);
    setNextPlayer((prevPlayer) => !prevPlayer);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setNextPlayer(step % 2 === 0);
  };

  let status = () => "Next player: " + (xIsNext() ? "X" : "O");
  // let status = () => "";

  createEffect(() => {
    if (winner()) {
      status = () => "Winner: " + winner();
    } else {
      status = () => "Next player: " + (xIsNext() ? "X" : "O");
    }
    // console.log(current().squares);
  });

  return (
    <>
      <div class="w-full">
        <Board
          squares={current()?.squares}
          onClick={(i: number) => handleClick(i)}
        />
      </div>
      <div>
        <div>{status()}</div>
        <ol>
          <For each={history}>
            {(_, move) => (
              <li>
                <button onClick={() => jumpTo(move())}>
                  {move() ? "Go to move #" + move() : "Go to game start"}
                </button>
              </li>
            )}
          </For>
        </ol>
      </div>
    </>
  );
};

function calculateWinner(squares: Squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const NoughtsAndCrosses: Component<{}> = () => {
  return (
    <Main class="px-6 py-8 w-full">
      <StyledGoBack class="mb-4" href="/#projects" />
      <h1 class="text-4xl text-sky-600 tracking-widest uppercase">
        Noughts and Crosses
      </h1>

      <p class="text-gray-900">
        The tutorial example from{" "}
        <Anchor href="https://reactjs.org/tutorial/tutorial.html">
          reactjs docs
        </Anchor>{" "}
        re-styled and with types
      </p>

      <Game />
    </Main>
  );
};

export default NoughtsAndCrosses;
